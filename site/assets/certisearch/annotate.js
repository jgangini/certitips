import { t } from '../site/i18n.js?v=bbc7627528f5';
import { captureVoice, encodeVoiceWav } from '../certichat/voz/audio.js?v=bbc7627528f5';

/** Validate request/case correlation before an editable transcript can reach the current case. */
function validateDictationResponse(current,pending,result){
  if(current.id!==pending.advisor.case.id||current.revision!==pending.advisor.case.revision)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
  if(result.requestId!==pending.requestId||result.caseId!==pending.advisor.case.id||result.baseRevision!==pending.advisor.case.revision||!result.dictation||typeof result.transcript!=='string'||result.transcript.length>1500)throw new Error('No se pudo completar la consulta de voz.');
}

/** Acquire capture for the current session; the caller must recheck its epoch after awaiting this helper. */
async function beginAnnotationCapture(audio,capture,isCurrent,onSamples,onEnd){
  await audio.resume();
  if(!isCurrent())return;
  const recorder=await capture(audio,onSamples,onEnd,{isCurrent});
  if(!isCurrent()){recorder.stop();return;}
  return recorder;
}

/** Own one bounded recording buffer; stale samples are ignored and the 30-second limit ends capture. */
function createAnnotationAudioBuffer(sampleRate,isCurrent,onLimit){
  const chunks=[];let samples=0;
  return {
    append(chunk){
      if(!isCurrent())return;
      const value=chunk.subarray(0,Math.max(0,sampleRate*30-samples));chunks.push(value);samples+=value.length;
      if(samples>=sampleRate*30)onLimit();
    },
    encode(){return encodeVoiceWav(chunks,sampleRate);},
  };
}

/** Capture at most 30 seconds for an editable annotation. Retry preserves its UUID; cancellation or case changes discard late text. */
export function createAnnotationDictation({ context, request, onText, onState, onError, capture = captureVoice, createContext = () => new AudioContext() }) {
  let epoch=0, audio, recorder, buffer, recording=false, pending;
  function release(){recorder?.stop();recorder=null;if(audio){void audio.close().catch(()=>{});audio=null;}}
  function failCapture(error,token){if(token!==epoch)return;release();onState('idle');onError(error);}
  async function transcribe(token){
    onState('transcribing');
    try{
      const result=await request('voice',pending);
      if(token!==epoch)return;
      validateDictationResponse(context().advisor.case,pending,result);
      onText(result.transcript);pending=null;
    }catch(error){if(token===epoch)onError(error);}
    finally{if(token===epoch)onState('idle');}
  }
  async function finish(){
    if(!recording)return;
    recording=false;const token=epoch,activeBuffer=buffer;
    onState('transcribing');
    try{
      await recorder.flush();
      if(token!==epoch)return;
      pending={...context(),requestId:crypto.randomUUID(),audio:activeBuffer.encode(),audioOutput:'browser'};
      release();buffer=null;await transcribe(token);
    }catch(error){failCapture(error,token);}
  }
  return {
    async toggle(){
      if(recording){await finish();return;}
      if(pending){await transcribe(epoch);return;}
      const token=++epoch;onState('starting');
      try{
        const active=audio=createContext();
        buffer=createAnnotationAudioBuffer(active.sampleRate,()=>token===epoch,()=>void finish());
        const captured=await beginAnnotationCapture(active,capture,()=>token===epoch,buffer.append,()=>void finish());
        if(!captured||token!==epoch){captured?.stop();return;}
        recorder=captured;
        recording=true;onState('recording');
      }catch(error){failCapture(error,token);}
    },
    cancel(){epoch++;recording=false;pending=null;buffer=null;release();onState('idle');},
  };
}

/** Reconnect a selected annotation anchor after the workspace replaces its rendered contents. */
function annotationAnchor(root,selected,anchor){
  if(selected&&!anchor?.isConnected){
    anchor=[...root.querySelectorAll('#search-view [data-select]')].find(element=>element.dataset.select===selected.kind&&element.dataset.id===selected.id);
    anchor?.classList.add('search-selected');
  }
  return anchor;
}

/** Render recording status and accessible controls independently of editor positioning. */
function renderAnnotationAudioState(panel,mic,send,state){
  panel.dataset.recording=String(state==='recording');mic.disabled=['starting','transcribing'].includes(state);send.disabled=state!=='idle';mic.setAttribute('aria-pressed',String(state==='recording'));
  mic.title=t(state==='recording'?'Detener dictado':'Dictar anotación');mic.setAttribute('aria-label',mic.title);
  panel.querySelector('[role=status]').textContent=t(state==='transcribing'?'Transcribiendo…':state==='recording'?'Grabando…':'');
}

/** Bind native form/keyboard/voice controls; local save never submits a chat turn. */
function bindAnnotationForm(panel,field,mic,send,dictation,{save,voiceActive,notice},signal){
  panel.addEventListener('toggle',()=>{if(!panel.matches(':popover-open'))dictation.cancel();},{signal});
  panel.addEventListener('submit',async event=>{event.preventDefault();const text=field.value.trim();if(!text||send.disabled)return;try{await save(text);field.value='';panel.hidePopover();}catch(error){notice(error.message);}},{signal});
  field.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();panel.requestSubmit();}},{signal});
  mic.addEventListener('click',()=>{if(voiceActive()){notice('Termina la escucha antes de cambiar de caso.');return;}void dictation.toggle();},{signal});
}

/** Highlight the nearest selectable item without intercepting touch; clear on disable or disposal. */
function trackAnnotationProximity(root,signal,isEnabled){
  let nearby;
  const clear=()=>{nearby?.classList.remove('annotation-near');nearby=undefined;};
  function proximity(event){
    let next;
    if(isEnabled()&&event.pointerType!=='touch'){
      let nearest=13;
      for(const candidate of root.querySelectorAll('#search-view [data-select]:not([aria-disabled=true])')){
        if(!candidate.getClientRects().length)continue;
        const box=candidate.getBoundingClientRect(),distance=Math.hypot(Math.max(box.left-event.clientX,0,event.clientX-box.right),Math.max(box.top-event.clientY,0,event.clientY-box.bottom));
        // A nearby child is more specific than its selectable section, including the 12px proximity halo.
        if(distance<13&&(!next||next.contains(candidate)||(!candidate.contains(next)&&distance<nearest))){nearest=distance;next=candidate;}
      }
    }
    if(next===nearby)return;
    clear();nearby=next;nearby?.classList.add('annotation-near');
  }
  root.ownerDocument.addEventListener('pointermove',proximity,{signal,passive:true});
  signal.addEventListener('abort',clear,{once:true});
  return clear;
}

/** Attach one local annotation editor to the workspace; saving edits context without submitting a chat turn. */
export function mountCaseAnnotation(root,signal,{context,request,save,voiceActive,notice}) {
  const panel=document.createElement('form');
  panel.className='case-annotation-editor';panel.popover='auto';panel.setAttribute('aria-label',t('Agregar anotación'));
  panel.innerHTML=`<textarea rows="1" maxlength="1500" aria-label="${t('Agrega un comentario…')}" placeholder="${t('Agrega un comentario…')}"></textarea><div class="case-annotation-actions"><button type="button" data-dictate aria-label="${t('Dictar anotación')}" title="${t('Dictar anotación')}"><span aria-hidden="true"></span></button><button type="submit" aria-label="${t('Agregar anotación')}" title="${t('Agregar anotación')}"><span aria-hidden="true"></span></button></div><span class="visually-hidden" role="status"></span>`;
  root.append(panel);
  const field=panel.querySelector('textarea'),mic=panel.querySelector('[data-dictate]'),send=panel.querySelector('[type=submit]');
  let selected,anchor,enabled=false,audioState='idle';
  const clearProximity=trackAnnotationProximity(root,signal,()=>enabled);
  const dictation=createAnnotationDictation({context,request,onText:text=>{field.value=[field.value.trim(),text].filter(Boolean).join(' ');field.dispatchEvent(new Event('input'));field.focus();},onError:error=>notice(error.message),onState:state=>{
    audioState=state;renderAnnotationAudioState(panel,mic,send,state);resizeEditor();
  }});
  function position(){
    if(!enabled)return;
    anchor=annotationAnchor(root,selected,anchor);
    const box=anchor?.getBoundingClientRect();if(!box||!anchor.isConnected)return;
    panel.style.left=`${Math.max(8,Math.min(innerWidth-panel.getBoundingClientRect().width-8,box.right+20))}px`;
    panel.style.top=`${Math.max(8,Math.min(innerHeight-panel.offsetHeight-8,box.top-12))}px`;
  }
  function open(){if(!enabled||!selected)return;position();if(!panel.matches(':popover-open'))panel.showPopover();field.dispatchEvent(new Event('input'));field.focus();}
  function resizeEditor(){
    const microphone=!field.value.trim()||audioState!=='idle';mic.hidden=!microphone;send.hidden=microphone;
    panel.dataset.stacked='false';field.style.height='auto';
    const style=getComputedStyle(field),oneLine=parseFloat(style.lineHeight)+parseFloat(style.paddingTop)+parseFloat(style.paddingBottom);
    panel.dataset.stacked=String(field.scrollHeight>oneLine+1);
    field.style.height=`${Math.min(parseFloat(style.maxHeight),field.scrollHeight)}px`;position();
  }
  bindAnnotationForm(panel,field,mic,send,dictation,{save,voiceActive,notice},signal);
  field.addEventListener('input',resizeEditor,{signal});
  window.addEventListener('resize',position,{signal});window.addEventListener('scroll',position,{signal,capture:true});
  const resize=new ResizeObserver(position);resize.observe(root.querySelector('#search-view'));
  signal.addEventListener('abort',()=>{dictation.cancel();resize.disconnect();panel.remove();},{once:true});
  return {edit(text){field.value=text;field.dispatchEvent(new Event('input'));open();},sync(value,target,active,expand=false){
    if(!value||value.kind!==selected?.kind||value.id!==selected?.id){dictation.cancel();field.value='';if(panel.matches(':popover-open'))panel.hidePopover();}
    selected=value;anchor=target;enabled=active;position();
    if(!enabled){clearProximity();if(panel.matches(':popover-open'))panel.hidePopover();}
    if(expand)open();else requestAnimationFrame(position);
  }};
}

/** Append only an explicitly saved annotation; reject an over-limit message before transport. */
export function annotatedMessage(message,annotation){
  if(!annotation?.comment)return message;
  const combined=`${message}\n\n${t('Anotación sobre {label}: {comment}',{label:annotation.label,comment:annotation.comment})}`;
  if(combined.length>1500)throw new Error(t('El mensaje y la anotación no pueden superar 1500 caracteres.'));
  return combined;
}
