import { t, locale, siteBase } from '../site/i18n.js?v=2e73772e0e66';
import { createCase, validateCase, reviseCase, stamp, applyProposal, applyEstimate, canRetryRequest, assertCurrentResponse, stageIssues, recordStageReview, caseStorage, downloadJSON } from './case.js?v=2e73772e0e66';
import { esc, caseView, architectureView, estimateView, stagesView, reportView, sourceLinks, oracleChangesView, proposalReview } from './view.js?v=2e73772e0e66';
import { mountDecks } from './deck.js?v=2e73772e0e66';
import { setSearchAdvisor, refreshSearchChat, searchRequest, sharedChatRequest } from './api-client.js?v=2e73772e0e66';
import { mountCaseAnnotation, annotatedMessage } from './annotate.js?v=2e73772e0e66';
import { mountChapterScroll } from '../site/chapter-scroll.js?v=2e73772e0e66';
import { appendMeetingText } from './meeting.js?v=2e73772e0e66';
import { validateIllustration, caseArchive, parseCaseArchive, requestIllustration } from './image.js?v=2e73772e0e66';

export async function mountSearch(signal) {
  const root=document.querySelector('[data-certisearch]');
  if(!root || signal.aborted)return;
  const status=root.querySelector('[data-notice]');
  signal.addEventListener('abort',()=>status.remove(),{once:true});
  try { await start(root,signal,status); }
  catch(error){if(!signal.aborted)showNotice(status,error.message);}
}
function showNotice(element,message){
  document.querySelector('#certichat-panel > header')?.after(element);
  element.hidden=!message;element.textContent=t(message);
}
async function start(root,signal,status) {
  const fetchJSON=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('No se pudo cargar el banco de preguntas.');return response.json();};
  const [catalog,pricing]=await Promise.all([fetchJSON(`${siteBase}${locale}/assets/certisearch/catalog.json`),fetchJSON(`${siteBase}assets/certisearch/pricing.json`)]);
  const profiles=pricing.profiles;
  if(signal.aborted)return;
  const tabHashes={case:'use-case',architecture:'architecture',estimate:'sizing',stages:'stages'};
  const tabFromHash=()=>Object.keys(tabHashes).find(key=>tabHashes[key]===location.hash.slice(1))||'case';
  let current=createCase(catalog,locale),tab=tabFromHash(),selection=null,draft=null,busy=false,pending=null,caseEpoch=0,saving=Promise.resolve(),voiceActive=false,annotating=false;
  let disposeDeck=()=>{};
  let illustration=null,annotationText='';
  let estimateTimer=0,lastEstimateAttempt='';
  signal.addEventListener('abort',()=>disposeDeck(),{once:true});
  signal.addEventListener('abort',()=>clearTimeout(estimateTimer),{once:true});
  window.addEventListener('certivoice:state',event=>{voiceActive=Boolean(event.detail?.active);if(!voiceActive)scheduleEstimate();},{signal});
  window.addEventListener('online',()=>{lastEstimateAttempt='';scheduleEstimate();},{signal});
  signal.addEventListener('abort',()=>{caseEpoch++;},{once:true});
  const view=root.querySelector('[data-certisearch] #search-view')||root.querySelector('#search-view');
  let printView;
  const clearPrint=()=>{printView?.remove();printView=undefined;};
  function preparePrint() {
    clearPrint(); printView=document.createElement('div');
    printView.className='certisearch search-print-view'; printView.dataset.searchPrint='';
    printView.innerHTML=reportView(catalog,current,illustration);
    printView.querySelectorAll('details').forEach(details=>{details.open=true;});
    document.body.append(printView);
  }
  window.addEventListener('beforeprint',preparePrint,{signal});
  window.addEventListener('afterprint',clearPrint,{signal});
  signal.addEventListener('abort',clearPrint,{once:true});
  const client={request:searchRequest};
  const notice=message=>showNotice(status,message);
  const guarded=fn=>async(...args)=>{try{await fn(...args);}catch(error){notice(error instanceof SyntaxError?'El expediente no es válido o utiliza una versión no compatible.':error.message);}};
  function setBusy(value){busy=value;root.querySelector('[data-action="oracle-import"]').disabled=busy;}
  function scheduleEstimate() {
    clearTimeout(estimateTimer);
    estimateTimer=setTimeout(async()=>{
      const latest=current.estimates.at(-1),key=`${current.id}:${current.revision}`,epoch=caseEpoch;
      if(signal.aborted||busy||voiceActive||draft||!current.sizing.length&&!latest||latest&&!latest.stale||key===lastEstimateAttempt)return;
      // One attempt per confirmed revision; navigation/reconnection can retry an error.
      lastEstimateAttempt=key;
      try{await estimate();}catch(error){if(!signal.aborted&&epoch===caseEpoch)notice(error.message);}
    },200);
  }
  try {const saved=await caseStorage('get');if(saved)current=validateCase(saved);pending=await caseStorage('get',undefined,'pending');}
  catch(error){notice(`${t('No se pudo recuperar el guardado local.')} ${error.message}`);}
  if(current.imageId){try{illustration=await validateIllustration(await caseStorage('get',undefined,`image:${current.imageId}`),current.imageId);}catch(error){notice(error.message);}}
  if(signal.aborted)return;
  const annotationUI=mountCaseAnnotation(root,signal,{
    context:()=>({pageUrl:new URL(`${locale}/certisearch/`,document.querySelector('[data-certichat]').dataset.siteRoot).href,locale,advisor:{case:structuredClone(current),selection:structuredClone(selection),mode:'dictation'}}),
    request:sharedChatRequest,voiceActive:()=>voiceActive,notice,
    save:text=>{if(busy)throw new Error('Hay una solicitud en curso.');annotationText=text;window.dispatchEvent(new Event('certisearch:selection'));},
  });

  function render() {
    const shown=draft||current;
    const renderers={case:()=>caseView(catalog,shown,illustration),architecture:()=>architectureView(catalog,shown),estimate:()=>estimateView(shown,profiles,catalog),stages:()=>stagesView(catalog,shown)};
    disposeDeck();
    view.innerHTML=renderers[tab]();view.setAttribute('aria-labelledby',`search-tab-${tab}`);
    if(draft)view.querySelectorAll('[data-select]').forEach(element=>{element.setAttribute('aria-disabled','true');element.tabIndex=-1;if(element.tagName==='BUTTON')element.disabled=true;});
    disposeDeck=mountDecks(view,signal);
    root.querySelectorAll('[data-tab]').forEach(button=>{button.setAttribute('aria-selected',String(button.dataset.tab===tab));button.tabIndex=button.dataset.tab===tab?0:-1;});
    root.querySelector('[data-sizing-actions]').hidden=tab!=='estimate';
    root.querySelector('[data-action="oracle-import"]').disabled=busy;
    root.querySelector('[data-action="oracle-export"]').disabled=!current.oracleDocument||Boolean(current.estimates.at(-1)?.stale)||Boolean(draft);
    view.querySelectorAll('[data-select]').forEach(element=>{element.setAttribute('aria-disabled',String(!annotating||Boolean(draft)));if(!annotating)element.tabIndex=-1;});
    if(selection)setSelection(selection.kind,selection.id);else annotationUI.sync(null,null,annotating&&!draft);
    scheduleEstimate();
  }
  async function commit(next, redraw=true, expected=current) {
    const save=saving.then(async()=>{
      if(current!==expected)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      validateCase(next);
      // Save succeeds before replacing the active document; queued writes cannot overwrite a newer case.
      await caseStorage('put',next,'case',expected);current=next;
      if(redraw){draft=null;render();}
    });
    saving=save.catch(()=>{});await save;
  }
  function confirm(title,html) {
    const dialog=root.querySelector('[data-confirm]');dialog.classList.toggle('is-review',['Aplicar propuesta','Importar cambios de Oracle'].includes(title));
    dialog.querySelector('h2').textContent=t(title);dialog.querySelector('[data-confirm-content]').innerHTML=html;
    return new Promise(resolve=>{const close=value=>{dialog.close();dialog.oncancel=null;resolve(value);};dialog.querySelector('[data-confirm-yes]').onclick=()=>close(true);dialog.querySelector('[data-confirm-no]').onclick=()=>close(false);dialog.oncancel=event=>{event.preventDefault();close(false);};dialog.showModal();dialog.querySelector('h2').focus();});
  }
  function resetChat(){refreshSearchChat();}
  function selectionAnnotation() {
    if(!selection)return null;
    const {kind,id}=selection;
    if(kind==='image'&&id==='case-image')return {...selection,label:t('Imagen del caso'),description:current.imagePrompt||t('Activa Anotar y pide al agente crear o editar la imagen del caso.')};
    const entries={question:catalog.questions,node:current.architecture.nodes,edge:current.architecture.edges,sizing:current.sizing,estimate:current.estimates.at(-1)?.lines||[],stage:catalog.stages,requirement:current.requirements,decision:current.decisions};
    const item=entries[kind]?.find(item=>item.id===id),label=item?.text||item?.label||item?.name||profiles.find(profile=>profile.id===item?.profileId)?.name||id;
    return item?{...selection,label,description:t(item.purpose||item.description||'')}:null;
  }
  function savedAnnotation(){
    const selected=selectionAnnotation();
    if(!selected||!annotationText)return null;
    return {...selected,comment:annotationText};
  }
  function setSelection(kind,id,expand=false) {
    if(selection?.kind!==kind||selection?.id!==id)annotationText='';
    selection=kind?{kind,id}:null;
    if(selection&&!selectionAnnotation())selection=null;
    root.querySelectorAll('[data-select]').forEach(element=>element.classList.toggle('search-selected',annotating&&!draft&&Boolean(selection)&&element.dataset.select===selection.kind&&element.dataset.id===selection.id));
    annotationUI.sync(selectionAnnotation(),root.querySelector('.search-selected'),annotating&&!draft,expand);
    window.dispatchEvent(new Event('certisearch:selection'));
  }
  async function remember(role,text){await saving;await commit({...current,history:[...current.history,{role,text}],updatedAt:new Date().toISOString()},false);}
  async function clearPending(request){
    if(!request)return;
    await caseStorage('delete',undefined,'pending',{requestId:request.requestId});
    if(pending===request)pending=null;
  }
  function showProposals(result) {
    const container=root.querySelector('[data-proposals]');
    if(result.proposals?.length){draft=applyProposal(current,result,result.proposals[0]);render();notice('Borrador del asesor. Revisa la propuesta para incorporarla al expediente.');}
    container.innerHTML=sourceLinks(result.sources||[])+(result.proposals||[]).map((proposal,index)=>`<section class="search-card"><strong>${esc(proposal.title)}</strong><p>${esc(proposal.reason)}</p><button type="button" class="button button-secondary" data-proposal="${index}">${esc(t('Revisar propuesta'))}</button></section>`).join('');
    container.querySelectorAll('[data-proposal]').forEach(button=>button.onclick=guarded(async()=>{
      const proposal=result.proposals[Number(button.dataset.proposal)];
      applyProposal(current,result,proposal);
      const epoch=caseEpoch;
      if(await confirm('Aplicar propuesta',proposalReview(proposal,current,catalog,profiles))){
        if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
        const next=applyProposal(current,result,proposal);
        if(proposal.changes.some(change=>change.section==='imagePrompt')){
          await generateImage(next,result.sources||[]);container.replaceChildren();return;
        }
        await commit({...next,sources:mergeSources(current.sources,result.sources||[])});container.replaceChildren();
      }
    }));
  }
  async function generateImage(next,sources){
    if(busy)throw new Error('Hay una solicitud en curso.');
    setBusy(true);notice('Generando la imagen del caso…');
    const before=current,epoch=caseEpoch;
    let request;
    try{
      const previous=await caseStorage('get',undefined,'pending-image');
      const base={case:structuredClone(before),prompt:next.imagePrompt,reference:illustration?.dataUrl||null};
      request=previous&&JSON.stringify({...previous,requestId:null})===JSON.stringify({...base,requestId:null})?previous:{...base,requestId:crypto.randomUUID()};
      await caseStorage('put',request,'pending-image');
      const image=await requestIllustration(before,next.imagePrompt,illustration,request,body=>client.request('image',body));
      if(signal.aborted||epoch!==caseEpoch||current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      await caseStorage('put',image,`image:${image.id}`);
      await commit({...next,imageId:image.id,sources:mergeSources(before.sources,sources)},false,before);
      illustration=image;draft=null;render();notice('Imagen del caso actualizada.');
      await caseStorage('delete',undefined,'pending-image',{requestId:request.requestId});
    }catch(error){
      if(request&&error.status&&error.code!=='request_pending')await caseStorage('delete',undefined,'pending-image',{requestId:request.requestId});
      throw error;
    }finally{setBusy(false);scheduleEstimate();}
  }
  async function send(rawMessage,action) {
    const message=action==='message'?annotatedMessage(rawMessage,savedAnnotation()):rawMessage;
    if(busy)throw new Error('Hay una solicitud en curso.');
    setBusy(true);notice('');
    const epoch=caseEpoch, context={caseId:current.id,baseRevision:current.revision}, requestedSelection=structuredClone(selection);
    let operationRequest;
    try {
      if(!canRetryRequest(pending,current,message,action,requestedSelection,locale)){
        if(action==='message')await remember('user',rawMessage);
        assertCurrentResponse(current,context);
        if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
        pending={requestId:crypto.randomUUID(),action,message,locale,case:structuredClone(current),selection:requestedSelection};await caseStorage('put',pending,'pending');
      }
      const request=operationRequest=pending, result=await client.request('chat',request);
      if(epoch!==caseEpoch||current.id!==request.case.id||current.revision!==request.case.revision){
        if(!signal.aborted)await clearPending(request);
        throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      }
      assertCurrentResponse(current,result,request);
      await remember('ai',result.answer);
      assertCurrentResponse(current,result,request);
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      showProposals(result);
      await clearPending(request);
      return result;
    } catch(error){if(!signal.aborted&&error.status&&error.code!=='request_pending')await clearPending(operationRequest);throw error;}
    finally{setBusy(false);scheduleEstimate();}
  }
  async function estimate(action='estimate',oracleDocument) {
    if(busy)throw new Error('Hay una solicitud en curso.');setBusy(true);
    try {
      const epoch=caseEpoch, request={requestId:crypto.randomUUID(),action,case:structuredClone(current),...(oracleDocument?{oracleDocument}:{})};
      const result=await client.request('estimate',request);
      assertCurrentResponse(current,result,request);
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      const economic=result.estimate;
      if(action==='import'&&!await confirm('Importar cambios de Oracle',`<p>${esc(t('Se sustituirá la estimación y se revisará su coherencia con la arquitectura.'))}</p>${oracleChangesView(result.diff||economic.diff||{})}`))return;
      assertCurrentResponse(current,result,request);
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      const next=applyEstimate(current,result,action);
      await commit(next);notice(action==='import'?'Archivo Oracle conservado. Revisa las diferencias de arquitectura.':'');
    }finally{setBusy(false);scheduleEstimate();}
  }

  const actions={
    'show-chat':()=>{root.dataset.mobile='chat';if(document.querySelector('#certichat-panel')?.hidden)document.querySelector('[data-chat-open]')?.click();root.querySelector('[data-action="show-workspace"]').focus();},'show-workspace':()=>{delete root.dataset.mobile;root.querySelector('[data-action="show-chat"]').focus();},
    'clear-chat':async()=>{if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');if(busy)throw new Error('Hay una solicitud en curso.');await commit({...current,history:[],updatedAt:new Date().toISOString()},false);pending=null;await caseStorage('delete',undefined,'pending');},
    'region-review':async button=>{const before=current,decision=current.decisions.find(item=>item.id===button.dataset.id);if(!decision||decision.region!==current.region)throw new Error('Define la región y los servicios antes de confirmar su disponibilidad.');if(await confirm('Confirmar revisión regional',`<p>${esc(decision.text||'')}</p>${sourceLinks([{url:decision.sourceUrl}])}`)){if(before!==current)throw new Error('El caso cambió. Solicita una propuesta actualizada.');await commit(reviseCase(current,{decisions:current.decisions.map(item=>item===decision?{...item,status:'confirmed',reviewedAt:new Date().toISOString()}:item)}));}},
    annotate:button=>{annotating=!annotating;button.setAttribute('aria-pressed',String(annotating));root.dataset.annotating=String(annotating);render();},
    export:async()=>{if(await confirm('Guardar archivo',`<p>${esc(t('Descarga el caso completo en JSON para retomarlo con Abrir Caso.'))}</p>`))downloadJSON(await caseArchive(current,illustration),`certisearch-${current.id}.json`);},
    import:async()=>{if(await confirm('Abrir caso',`<p>${esc(t('Selecciona un archivo .json guardado desde CertiSearch para recuperar el caso y su conversación.'))}</p><p>${esc(t('Los archivos de Oracle Cost Estimator se importan desde Sizing.'))}</p>`))root.querySelector('[data-case-file]').click();},
    new:async()=>{if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');if(await confirm('Iniciar otro caso',`<p>${esc(t('Guarda un archivo del caso actual antes de reemplazarlo.'))}</p>`)){caseEpoch++;await commit(createCase(catalog,locale),false);notice('');illustration=null;draft=null;render();pending=null;await caseStorage('delete',undefined,'pending');setSelection(null);root.querySelector('[data-proposals]').replaceChildren();await resetChat();}},
    'oracle-import':async()=>{if(await confirm('Oracle Cloud Cost Estimator',`<p>${esc(t('Selecciona el archivo JSON exportado desde Oracle Cloud Cost Estimator para importar sus cantidades y costos.'))}</p><p><a href="https://www.oracle.com/cloud/costestimator.html" target="_blank" rel="noopener noreferrer" lang="en" translate="no">Oracle Cloud Cost Estimator ↗</a></p>`))root.querySelector('[data-oracle-file]').click();},
    'oracle-export':async()=>{if(!current.oracleDocument)throw new Error('Los costos todavía no están disponibles para exportar.');if(current.estimates.at(-1)?.stale)throw new Error('Espera a que se actualicen los costos antes de exportar.');const before=current;if(await confirm('Cloud Cost Estimator | Oracle',`<p>${esc(t('Descarga la estimación en JSON para importarla en Oracle Cloud Cost Estimator.'))}</p><p><a href="https://www.oracle.com/cloud/costestimator.html" target="_blank" rel="noopener noreferrer" lang="en" translate="no">Oracle Cloud Cost Estimator ↗</a></p>`)){if(current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');downloadJSON(current.oracleDocument,`oracle-${current.id}.json`);}},
    print:async()=>{if(!await confirm('Informe',`<p>${esc(t('Se abrirá el cuadro de impresión del navegador con el informe completo: caso de uso, arquitectura, sizing, etapas, decisiones y fuentes.'))}</p><p>${esc(t('Elige Guardar como PDF para descargar el informe.'))}</p>`)||signal.aborted)return;preparePrint();await document.fonts.ready;if(signal.aborted||!root.isConnected)return;window.print();},
    'remove-node':async button=>{const id=button.dataset.id;await commit(reviseCase(current,{architecture:{nodes:current.architecture.nodes.filter(node=>node.id!==id),edges:current.architecture.edges.filter(edge=>edge.source!==id&&edge.target!==id)}}));},
    'remove-edge':async button=>{await commit(reviseCase(current,{architecture:{...current.architecture,edges:current.architecture.edges.filter(edge=>edge.id!==button.dataset.id)}}));},
    'remove-sizing':async button=>{await commit(reviseCase(current,{sizing:current.sizing.filter(line=>line.id!==button.dataset.id)}));},
    'review-stage':async button=>reviewStage(button.dataset.id,false), 'accept-stage':async button=>reviewStage(button.dataset.id,true),
  };
  async function reviewStage(id,acceptance) {
    const stage=catalog.stages.find(item=>item.id===id);
    if(!stage)throw new Error('El expediente no es válido o utiliza una versión no compatible.');
    const issues=stageIssues(current,id);if(issues.length)throw new Error(issues.map(t).join(' '));
    if(acceptance&&current.stages.find(item=>item.id===id)?.status!=='reviewed')throw new Error('Revisa la etapa antes de registrar la aceptación del cliente.');
    const before=current;
    if(await confirm(acceptance?'Registrar aceptación del cliente':'Confirmar revisión',`<p>${esc(t(stage.description))}</p><ul>${stage.sufficiency.map(item=>`<li>${esc(t(item))}</li>`).join('')}</ul>`)){
      if(current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      await commit(recordStageReview(current,id,acceptance));
    }
  }
  root.addEventListener('click',guarded(async event=>{
    const tabButton=event.target.closest('[data-tab]');if(tabButton){tab=tabButton.dataset.tab;if(tab==='estimate')lastEstimateAttempt='';const hash=`#${tabHashes[tab]}`;if(location.hash!==hash)history.pushState(history.state,'',hash);render();tabButton.scrollIntoView({block:'nearest',inline:'nearest'});return;}
    const selected=event.target.closest('[data-select]');if(selected){if(annotating&&!draft)setSelection(selected.dataset.select,selected.dataset.id,true);return;}
    const button=event.target.closest('[data-action]');if(button&&actions[button.dataset.action])await actions[button.dataset.action](button);
  }),{signal});
  root.addEventListener('keydown',event=>{
    const tabButton=event.target.closest('[data-tab]');
    if(tabButton&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      event.preventDefault();const tabs=[...root.querySelectorAll('[data-tab]')],at=tabs.indexOf(tabButton);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(at+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[next].click();tabs[next].focus();
    }
    if(['Enter',' '].includes(event.key)&&event.target.matches('svg [role=button]')){event.preventDefault();if(annotating&&!draft)setSelection(event.target.dataset.select,event.target.dataset.id,true);}
  },{signal});
  root.addEventListener('change',guarded(async event=>{
    const field=event.target;
    if(field.matches('[data-case-file]')){const file=field.files[0];field.value='';await importCase(file);return;}
    if(field.matches('[data-oracle-file]')){const file=field.files[0];field.value='';if(file){if(file.size>1024*1024)throw new Error('El archivo supera el límite admitido.');await estimate('import',JSON.parse(await file.text()));}}
  }),{signal});
  async function importCase(file){
    if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');
    if(!file)return;if(file.size>1024*1024)throw new Error('El archivo supera el límite admitido.');
    const archive=await parseCaseArchive(await file.text()),imported=archive.current;
    if(await confirm('Abrir caso',`<p>${esc(imported.title||imported.id)}</p><p>${esc(t('Se conservarán respuestas, decisiones y archivos de estimación.'))}</p>`)){caseEpoch++;if(archive.illustration)await caseStorage('put',archive.illustration,`image:${archive.illustration.id}`);await commit(imported,false);illustration=archive.illustration;draft=null;render();pending=null;await caseStorage('delete',undefined,'pending');setSelection(null);root.querySelector('[data-proposals]').replaceChildren();await resetChat();notice('Caso restaurado. Puedes continuar en el chat.');}
  }
  if(signal.aborted)return;
  const acceptedVoice=new Set();
  setSearchAdvisor({
    get history(){return current.history;},
    get annotation(){return savedAnnotation();},
    editAnnotation:()=>{annotating=true;root.dataset.annotating='true';root.querySelector('[data-action=annotate]').setAttribute('aria-pressed','true');render();annotationUI.edit(annotationText);},
    clearSelection:()=>setSelection(null),
    send:message=>send(message,'message'),
    clear:actions['clear-chat'],
    voiceContext:mode=>({case:structuredClone(current),selection:structuredClone(selection),mode}),
    acceptVoice:async result=>{
      if(signal.aborted)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      if(acceptedVoice.has(result.requestId))return;
      assertCurrentResponse(current,result);
      for(const proposal of result.proposals||[])applyProposal(current,result,proposal);
      const messages=[{role:'user',text:result.transcript},{role:'ai',text:result.answer}].filter(item=>item.text?.trim());
      await commit({...current,history:[...current.history,...messages],updatedAt:new Date().toISOString()},false);
      acceptedVoice.add(result.requestId);
      showProposals(result);
    },
    appendMeeting:async text=>{
      if(signal.aborted)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      await saving;await commit({...current,history:appendMeetingText(current.history,text,t('Reunión')),updatedAt:new Date().toISOString()},false);
    },
    reviewMeeting:async()=>{if(busy)return false;await send('','resume');resetChat();return true;},
  },signal);
  mountChapterScroll(root.querySelector('.search-tabs'),signal);
  const restoreTab=()=>{const next=tabFromHash();if(next!==tab){tab=next;render();}};
  window.addEventListener('hashchange',restoreTab,{signal});
  window.addEventListener('popstate',restoreTab,{signal});
  render();
  const linkedQuestion=new URL(location.href).searchParams.get('question');
  if(catalog.questions.some(question=>question.id===linkedQuestion)){
    setSelection('question',linkedQuestion);
    root.querySelector(`[data-question="${CSS.escape(linkedQuestion)}"]`)?.scrollIntoView({block:'center'});
  }
  resetChat();
}

function mergeSources(previous,incoming){return [...new Map([...previous,...incoming].map(source=>[`${source.id||''}:${source.url}`,source])).values()];}
