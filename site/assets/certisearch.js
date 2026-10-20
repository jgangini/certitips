import { t, locale, siteBase } from './i18n.js?v=34550d9fa378';
import { createCase, validateCase, parseCase, reviseCase, stamp, applyProposal, applyEstimate, restoreOracleEstimate, canRetryRequest, assertCurrentResponse, stageIssues, recordStageReview, caseStorage, downloadJSON } from './certisearch-case.js?v=34550d9fa378';
import { esc, caseView, architectureView, estimateView, stagesView, reportView, sourceLinks, oracleChangesView, proposalReview } from './certisearch-view.js?v=34550d9fa378';
import { mountDecks } from './certisearch-deck.js?v=34550d9fa378';
import { setSearchAdvisor, refreshSearchChat, searchRequest } from './certisearch-client.js?v=34550d9fa378';
import { mountChapterScroll } from './certitube.js?v=34550d9fa378';
import { appendMeetingText } from './certisearch-meeting.js?v=34550d9fa378';

export async function mountSearch(signal) {
  const root=document.querySelector('[data-certisearch]');
  if(!root || signal.aborted)return;
  try { await start(root,signal); }
  catch(error){if(signal.aborted)return;root.querySelector('[data-notice]').hidden=false;root.querySelector('[data-notice]').textContent=t(error.message);}
}
async function start(root,signal) {
  const fetchJSON=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('No se pudo cargar el banco de preguntas.');return response.json();};
  const [catalog,pricing]=await Promise.all([fetchJSON(`${siteBase}${locale}/assets/certisearch/catalog.json`),fetchJSON(`${siteBase}assets/certisearch/pricing.json`)]);
  const profiles=pricing.profiles;
  if(signal.aborted)return;
  let current=createCase(catalog,locale),tab='case',selection=null,draft=null,busy=false,pending=null,caseEpoch=0,saving=Promise.resolve(),voiceActive=false,annotating=false;
  let disposeDeck=()=>{};
  signal.addEventListener('abort',()=>disposeDeck(),{once:true});
  window.addEventListener('certivoice:state',event=>{voiceActive=Boolean(event.detail?.active);},{signal});
  signal.addEventListener('abort',()=>{caseEpoch++;},{once:true});
  const view=root.querySelector('[data-certisearch] #search-view')||root.querySelector('#search-view');
  let printView;
  const clearPrint=()=>{printView?.remove();printView=undefined;};
  function preparePrint() {
    clearPrint(); printView=document.createElement('div');
    printView.className='certisearch search-print-view'; printView.dataset.searchPrint='';
    printView.innerHTML=reportView(catalog,current);
    printView.querySelectorAll('details').forEach(details=>{details.open=true;});
    document.body.append(printView);
  }
  window.addEventListener('beforeprint',preparePrint,{signal});
  window.addEventListener('afterprint',clearPrint,{signal});
  signal.addEventListener('abort',clearPrint,{once:true});
  const client={request:searchRequest};
  const notice=message=>{const element=root.querySelector('[data-notice]');element.hidden=!message;element.textContent=t(message);};
  const guarded=fn=>async(...args)=>{try{await fn(...args);}catch(error){notice(error instanceof SyntaxError?'El expediente no es válido o utiliza una versión no compatible.':error.message);}};
  try {const saved=await caseStorage('get');if(saved)current=validateCase(saved);pending=await caseStorage('get',undefined,'pending');}
  catch(error){notice(`${t('No se pudo recuperar el guardado local.')} ${error.message}`);}

  function render() {
    const shown=draft||current;
    const renderers={case:()=>caseView(catalog,shown),architecture:()=>architectureView(catalog,shown),estimate:()=>estimateView(shown,profiles,catalog),stages:()=>stagesView(catalog,shown)};
    disposeDeck();
    view.innerHTML=renderers[tab]();view.setAttribute('aria-labelledby',`search-tab-${tab}`);
    if(draft)view.querySelectorAll('[data-select]').forEach(element=>{element.setAttribute('aria-disabled','true');element.tabIndex=-1;if(element.tagName==='BUTTON')element.disabled=true;});
    disposeDeck=mountDecks(view,signal);
    root.querySelectorAll('[data-tab]').forEach(button=>{button.setAttribute('aria-selected',String(button.dataset.tab===tab));button.tabIndex=button.dataset.tab===tab?0:-1;});
    root.querySelector('[data-sizing-actions]').hidden=tab!=='estimate';
    root.querySelector('[data-action="estimate"]').disabled=!current.sizing.length||Boolean(draft);
    root.querySelector('[data-action="oracle-export"]').disabled=!current.oracleDocument||Boolean(current.estimates.at(-1)?.stale)||Boolean(draft);
    root.querySelector('[data-action="oracle-undo"]').disabled=!current.oraclePrevious||Boolean(draft);
    view.querySelectorAll('[data-select]').forEach(element=>{element.setAttribute('aria-disabled',String(!annotating||Boolean(draft)));if(!annotating)element.tabIndex=-1;});
    if(selection)setSelection(selection.kind,selection.id);
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
    const dialog=root.querySelector('[data-confirm]');
    dialog.querySelector('h2').textContent=t(title);dialog.querySelector('[data-confirm-content]').innerHTML=html;
    return new Promise(resolve=>{const close=value=>{dialog.close();dialog.oncancel=null;resolve(value);};dialog.querySelector('[data-confirm-yes]').onclick=()=>close(true);dialog.querySelector('[data-confirm-no]').onclick=()=>close(false);dialog.oncancel=event=>{event.preventDefault();close(false);};dialog.showModal();dialog.querySelector('h2').focus();});
  }
  function resetChat(){refreshSearchChat();}
  function selectionAnnotation() {
    if(!selection)return null;
    const {kind,id}=selection;
    const entries={question:catalog.questions,node:current.architecture.nodes,edge:current.architecture.edges,sizing:current.sizing,estimate:current.estimates.at(-1)?.lines||[],stage:catalog.stages,requirement:current.requirements,decision:current.decisions};
    const item=entries[kind]?.find(item=>item.id===id),label=item?.text||item?.label||item?.name||profiles.find(profile=>profile.id===item?.profileId)?.name||id;
    return item?{...selection,label,description:t(item.purpose||item.description||'')}:null;
  }
  function setSelection(kind,id) {
    selection=kind?{kind,id}:null;
    if(selection&&!selectionAnnotation())selection=null;
    root.querySelectorAll('[data-select]').forEach(element=>element.classList.toggle('search-selected',Boolean(selection)&&element.dataset.select===selection.kind&&element.dataset.id===selection.id));
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
        await commit({...next,sources:mergeSources(current.sources,result.sources||[])});container.replaceChildren();
      }
    }));
  }
  async function send(message,action) {
    if(busy)throw new Error('Hay una solicitud en curso.');
    busy=true;notice('');
    const epoch=caseEpoch, context={caseId:current.id,baseRevision:current.revision}, requestedSelection=structuredClone(selection);
    let operationRequest;
    try {
      if(!canRetryRequest(pending,current,message,action,requestedSelection,locale)){
        if(action==='message')await remember('user',message);
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
    finally{busy=false;}
  }
  async function estimate(action='estimate',oracleDocument) {
    if(busy)throw new Error('Hay una solicitud en curso.');busy=true;
    try {
      const epoch=caseEpoch, request={requestId:crypto.randomUUID(),action,case:structuredClone(current),...(oracleDocument?{oracleDocument}:{})};
      const result=await client.request('estimate',request);
      assertCurrentResponse(current,result,request);
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Calcula de nuevo con los datos actuales.');
      const economic=result.estimate;
      if(action==='import'&&!await confirm('Importar cambios de Oracle',`<p>${esc(t('Se sustituirá la estimación y se revisará su coherencia con la arquitectura.'))}</p>${oracleChangesView(result.diff||economic.diff||{})}`))return;
      assertCurrentResponse(current,result,request);
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Calcula de nuevo con los datos actuales.');
      const next=applyEstimate(current,result,action);
      await commit(next);notice(action==='import'?'Archivo Oracle conservado. Revisa las diferencias de arquitectura.':'Estimación calculada.');
    }finally{busy=false;}
  }

  const actions={
    'show-chat':()=>{root.dataset.mobile='chat';root.querySelector('[data-action="show-workspace"]').focus();},'show-workspace':()=>{delete root.dataset.mobile;root.querySelector('[data-action="show-chat"]').focus();},
    'clear-chat':async()=>{if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');if(busy)throw new Error('Hay una solicitud en curso.');await commit({...current,history:[],updatedAt:new Date().toISOString()},false);pending=null;await caseStorage('delete',undefined,'pending');},
    'region-review':async button=>{const before=current,decision=current.decisions.find(item=>item.id===button.dataset.id);if(!decision||decision.region!==current.region)throw new Error('Define la región y los servicios antes de confirmar su disponibilidad.');if(await confirm('Confirmar revisión regional',`<p>${esc(decision.text||'')}</p>${sourceLinks([{url:decision.sourceUrl}])}`)){if(before!==current)throw new Error('El caso cambió. Solicita una propuesta actualizada.');await commit(reviseCase(current,{decisions:current.decisions.map(item=>item===decision?{...item,status:'confirmed',reviewedAt:new Date().toISOString()}:item)}));}},
    annotate:button=>{annotating=!annotating;button.setAttribute('aria-pressed',String(annotating));root.dataset.annotating=String(annotating);render();},
    export:()=>downloadJSON(current,`certisearch-${current.id}.json`),import:()=>root.querySelector('[data-case-file]').click(),
    new:async()=>{if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');if(await confirm('Iniciar otro caso',`<p>${esc(t('Guarda un archivo del caso actual antes de reemplazarlo.'))}</p>`)){caseEpoch++;await commit(createCase(catalog,locale));pending=null;await caseStorage('delete',undefined,'pending');setSelection(null);root.querySelector('[data-proposals]').replaceChildren();await resetChat();}},
    estimate:()=>estimate(), 'oracle-import':()=>root.querySelector('[data-oracle-file]').click(),
    'oracle-export':()=>{if(!current.oracleDocument)throw new Error('Calcula una estimación antes de descargar el archivo Oracle.');if(current.estimates.at(-1)?.stale)throw new Error('Recalcula la estimación antes de exportar.');downloadJSON(current.oracleDocument,`oracle-${current.id}.json`);},
    'oracle-undo':async()=>{const before=current;if(before.oraclePrevious&&await confirm('Restaurar estimación anterior',`<p>${esc(t('Se recuperará la instantánea anterior de costes.'))}</p>`)){if(current!==before)throw new Error('El caso cambió. Calcula de nuevo con los datos actuales.');await commit(restoreOracleEstimate(current));}},
    print:async()=>{preparePrint();await document.fonts.ready;if(signal.aborted||!root.isConnected)return;window.print();},
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
    const tabButton=event.target.closest('[data-tab]');if(tabButton){tab=tabButton.dataset.tab;render();tabButton.scrollIntoView({block:'nearest',inline:'nearest'});return;}
    const selected=event.target.closest('[data-select]');if(selected){if(annotating&&!draft)setSelection(selected.dataset.select,selected.dataset.id);return;}
    const button=event.target.closest('[data-action]');if(button&&actions[button.dataset.action])await actions[button.dataset.action](button);
  }),{signal});
  root.addEventListener('keydown',event=>{
    const tabButton=event.target.closest('[data-tab]');
    if(tabButton&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      event.preventDefault();const tabs=[...root.querySelectorAll('[data-tab]')],at=tabs.indexOf(tabButton);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(at+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[next].click();tabs[next].focus();
    }
    if(['Enter',' '].includes(event.key)&&event.target.matches('svg [role=button]')){event.preventDefault();if(annotating&&!draft)setSelection(event.target.dataset.select,event.target.dataset.id);}
  },{signal});
  root.addEventListener('change',guarded(async event=>{
    const field=event.target;
    if(field.matches('[data-case-file]')){const file=field.files[0];field.value='';await importCase(file);return;}
    if(field.matches('[data-oracle-file]')){const file=field.files[0];field.value='';if(file){if(file.size>1024*1024)throw new Error('El archivo supera el límite admitido.');await estimate('import',JSON.parse(await file.text()));}}
  }),{signal});
  async function importCase(file){
    if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');
    if(!file)return;if(file.size>1024*1024)throw new Error('El archivo supera el límite admitido.');
    const imported=parseCase(await file.text());
    if(await confirm('Abrir caso',`<p>${esc(imported.title||imported.id)}</p><p>${esc(t('Se conservarán respuestas, decisiones y archivos de estimación.'))}</p>`)){caseEpoch++;await commit(imported);pending=null;await caseStorage('delete',undefined,'pending');setSelection(null);root.querySelector('[data-proposals]').replaceChildren();await resetChat();notice('Caso restaurado. Puedes continuar en el chat.');}
  }
  if(signal.aborted)return;
  const acceptedVoice=new Set();
  setSearchAdvisor({
    get history(){return current.history;},
    get annotation(){return selectionAnnotation();},
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
  render();
  const linkedQuestion=new URL(location.href).searchParams.get('question');
  if(catalog.questions.some(question=>question.id===linkedQuestion)){
    setSelection('question',linkedQuestion);
    root.querySelector(`[data-question="${CSS.escape(linkedQuestion)}"]`)?.scrollIntoView({block:'center'});
  }
  resetChat();
}

function mergeSources(previous,incoming){return [...new Map([...previous,...incoming].map(source=>[`${source.id||''}:${source.url}`,source])).values()];}
