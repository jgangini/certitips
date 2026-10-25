import { t, locale, siteBase } from '../site/i18n.js?v=849f77efdc35';
import { createCase, validateCase, migrateDialogue, reviseCase, applyProposal, applyEstimate, canRetryRequest, assertCurrentResponse, stageIssues, recordStageReview, stageName, caseStorage, downloadJSON } from './case.js?v=849f77efdc35';
import { esc, caseView, architectureView, estimateView, stagesView, reportView, sourceLinks, oracleChangesView, proposalReview } from './view.js?v=849f77efdc35';
import { mountDecks } from './deck.js?v=849f77efdc35';
import { captureReport } from './report.js?v=849f77efdc35';
import { validateArchitectureComponents } from './architecture.js?v=849f77efdc35';
import { setSearchAdvisor, refreshSearchChat, searchRequest, sharedChatRequest, caseRequest, pendingSearchRun, releaseSearchRun } from './api-client.js?v=849f77efdc35';
import { mountCaseAnnotation, annotatedMessage } from './annotate.js?v=849f77efdc35';
import { mountChapterScroll } from '../site/chapter-scroll.js?v=849f77efdc35';
import { mountCaseReview } from './review.js?v=849f77efdc35';
import { voiceContext } from '../certichat/voz/actions.js?v=849f77efdc35';
import { validateMeetingJournal, appendMeetingSegment, mergeMeetingJournal, journalFromHistory, caseDialogue } from './meeting.js?v=849f77efdc35';
import { validateIllustration, caseArchive, parseCaseArchive, requestIllustration, requestsIllustration, ARCHIVE_LIMIT } from './image.js?v=849f77efdc35';

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
  const [catalog,pricing,components]=await Promise.all([fetchJSON(`${siteBase}${locale}/assets/certisearch/catalog.json`),fetchJSON(`${siteBase}assets/certisearch/pricing.json`),fetchJSON(`${siteBase}assets/certisearch/components.json`)]);
  catalog.components=validateArchitectureComponents(components);
  const profiles=pricing.profiles;
  const estimateIsCurrent=value=>Boolean(value&&!value.stale&&value.pricingVersion===pricing.version);
  const workspace=new URL(location.href).searchParams.get('workspace')||'';
  const storage=(operation,value,key='case',expected)=>caseStorage(operation,value,key,expected,workspace);
  if(signal.aborted)return;
  const tabHashes={case:'use-case',architecture:'architecture',estimate:'sizing',stages:'stages'};
  const tabFromHash=()=>Object.keys(tabHashes).find(key=>tabHashes[key]===location.hash.slice(1))||'case';
  let current=createCase(catalog,locale),tab=tabFromHash(),selection=null,draft=null,busy=false,busyCount=0,pending=null,caseEpoch=0,changingCase=false,saving=Promise.resolve(),applying=Promise.resolve(),voiceActive=false,annotating=false;
  let disposeDeck=()=>{};
  let illustration=null,annotationText='',journal=[],serverReady=null,journalExpiresAt=Date.now()+86400000,mirrored=false;
  async function persistJournal(){
    if(journalExpiresAt<=Date.now()){journal=journal.filter(entry=>Date.parse(entry.createdAt)>Date.now()-86400000);journalExpiresAt=Date.now()+86400000;}
    await storage('put',{entries:journal,expiresAt:journalExpiresAt},`journal:${current.id}`);
  }
  const journalTimer=setInterval(()=>{
    if(journalExpiresAt>Date.now())return;
    journal=[];journalExpiresAt=Date.now()+86400000;
    void storage('delete',undefined,`journal:${current.id}`).catch(error=>notice(error.message));refreshSearchChat();
  },30000);
  signal.addEventListener('abort',()=>clearInterval(journalTimer),{once:true});
  let estimateTimer=0,lastEstimateAttempt='',rateRetryKey='';
  signal.addEventListener('abort',()=>disposeDeck(),{once:true});
  signal.addEventListener('abort',()=>clearTimeout(estimateTimer),{once:true});
  window.addEventListener('certivoice:state',event=>{voiceActive=Boolean(event.detail?.active);if(!voiceActive)scheduleEstimate();},{signal});
  window.addEventListener('online',()=>{lastEstimateAttempt='';scheduleEstimate();},{signal});
  window.addEventListener('certichat:case-update',event=>{
    const update=event.detail;
    if(update?.case_id===current.id&&Number.isSafeInteger(update.revision)&&update.revision>current.revision){
      const id=current.id;void caseRequest(id,undefined,'GET').then(snapshot=>adoptSnapshot(snapshot,true,id)).catch(error=>{if(!signal.aborted)notice(error.message);});
    }
  },{signal});
  signal.addEventListener('abort',()=>{caseEpoch++;},{once:true});
  const view=root.querySelector('[data-certisearch] #search-view')||root.querySelector('#search-view');
  let printView;
  const clearPrint=()=>{printView?.remove();printView=undefined;};
  function preparePrint() {
    clearPrint(); printView=document.createElement('div');
    printView.className='certisearch search-print-view'; printView.dataset.searchPrint='';
    printView.innerHTML=reportView(catalog,{...current,history:journal.map(entry=>({role:entry.role||'user',text:entry.text,createdAt:entry.createdAt}))},illustration,profiles);
    printView.querySelectorAll('details').forEach(details=>{details.open=true;});
    document.body.append(printView);
  }
  async function downloadReport() {
    const button=root.querySelector('[data-action="print"]');button.disabled=true;
    try{
      if((current.sizing.length||current.estimates.length)&&current.estimates.at(-1)?.requiresSizingReview!==true&&!estimateIsCurrent(current.estimates.at(-1)))await estimate();
      if(signal.aborted)return;
      button.disabled=true;
      const before=current;
      preparePrint();printView.dataset.reportExport='';printView.style.cssText='display:block;position:fixed;left:-100000px;top:0;width:794px';
      await document.fonts.ready;
      if(signal.aborted||current!==before)return;
      const packet=await captureReport(printView.querySelector('.search-report'));
      const archive=await caseArchive(before,illustration,journal);
      const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(archive,null,2)));
      packet.archiveSha256=[...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
      clearPrint();
      if(signal.aborted||current!==before)return;
      const request={requestId:crypto.randomUUID(),case:structuredClone(before),journal:structuredClone(journal),packet};
      const result=await client.request('report',request);
      if(signal.aborted||current!==before)return;
      assertCurrentResponse(current,result,request);
      if(typeof result.pdf!=='string'||result.pdf.length>11200000||!result.pdf.startsWith('JVBERi0'))throw new Error('No se pudo generar el PDF. Revisa el informe del caso.');
      const bytes=Uint8Array.from(atob(result.pdf),character=>character.charCodeAt(0));
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'})),link=document.createElement('a');
      link.href=url;link.download=`certisearch-${before.id}.pdf`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }finally{clearPrint();button.disabled=false;}
  }
  window.addEventListener('beforeprint',preparePrint,{signal});
  window.addEventListener('afterprint',clearPrint,{signal});
  signal.addEventListener('abort',clearPrint,{once:true});
  const client={request:searchRequest};
  const notice=message=>showNotice(status,message);
  const guarded=fn=>async(...args)=>{try{await fn(...args);}catch(error){notice(error instanceof SyntaxError?'El expediente no es válido o utiliza una versión no compatible.':error.message);}};
  const reviewCase=mountCaseReview(root,{signal,request:sharedChatRequest,ensure:ensureServer,getCurrent:()=>current,adopt:adoptSnapshot,confirm,
    renderCase:value=>reportView(catalog,value,illustration,profiles)});
  function setBusy(value){busyCount=Math.max(0,busyCount+(value?1:-1));busy=busyCount>0;root.querySelector('[data-action="oracle-import"]').disabled=busy;}
  // Only an explicit identity change is exclusive; normal agent work remains concurrent.
  async function changeCase(operation) {
    if(changingCase||signal.aborted)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    const controls=[root.querySelector('.search-workspace'),document.querySelector('#certichat-panel deep-chat')].filter(Boolean);
    const previous=controls.map(element=>({element,inert:element.inert,busy:element.getAttribute('aria-busy')}));
    let focus=document.activeElement;while(focus?.shadowRoot?.activeElement)focus=focus.shadowRoot.activeElement;
    changingCase=true;notice('Solicitud en curso');refreshSearchChat();
    for(const {element} of previous){element.inert=true;element.setAttribute('aria-busy','true');}
    let released=false;
    const release=()=>{
      if(released)return;released=true;changingCase=false;
      for(const {element,inert,busy} of previous){element.inert=inert;if(busy===null)element.removeAttribute('aria-busy');else element.setAttribute('aria-busy',busy);}
      if(!signal.aborted){if(status.textContent===t('Solicitud en curso'))notice('');refreshSearchChat();if(focus?.isConnected&&!focus.closest('[inert]')&&(document.activeElement===document.body||document.activeElement===focus))focus.focus({preventScroll:true});}
    };
    signal.addEventListener('abort',release,{once:true});
    try{await operation();}finally{signal.removeEventListener('abort',release);release();}
  }
  function scheduleEstimate(delay=200) {
    clearTimeout(estimateTimer);
    estimateTimer=setTimeout(async()=>{
      const latest=current.estimates.at(-1),key=`${current.id}:${current.revision}`,epoch=caseEpoch;
      const fresh=estimateIsCurrent(latest);
      if(signal.aborted||busy||draft||!current.sizing.length&&!latest||fresh||key===lastEstimateAttempt)return;
      // One bounded retry for rate limiting; other failures wait for navigation/reconnection.
      lastEstimateAttempt=key;
      try{await estimate();}catch(error){retryEstimate(error,key,epoch);}
    },delay);
  }
  function retryEstimate(error,key,epoch) {
    if(signal.aborted||epoch!==caseEpoch)return;
    notice(error.message);
    if(error.status===429&&rateRetryKey!==key&&key===`${current.id}:${current.revision}`){
      rateRetryKey=key;lastEstimateAttempt='';scheduleEstimate(Math.max(1000,Math.min(61000,(error.retryAfter+1)*1000)));
    }
  }
  try {
    const saved=await storage('get');if(saved){current=migrateDialogue(validateCase(saved));mirrored=true;}
    const diary=await storage('get',undefined,`journal:${current.id}`);
    if(diary&&!Array.isArray(diary)&&Number.isFinite(diary.expiresAt)&&diary.expiresAt>Date.now()){journal=validateMeetingJournal(diary.entries);journalExpiresAt=diary.expiresAt;}
    else if(Array.isArray(diary))journal=validateMeetingJournal(diary);
    else if(diary)await storage('delete',undefined,`journal:${current.id}`);
    journal=journalFromHistory(current,journal);current={...current,history:[]};pending=await storage('get',undefined,'pending');
  }
  catch(error){notice(`${t('No se pudo recuperar el guardado local.')} ${error.message}`);}
  if(current.imageId){try{illustration=await validateIllustration(await storage('get',undefined,`image:${current.imageId}`),current.imageId);}catch(error){notice(error.message);}}
  if(signal.aborted)return;
  const annotationUI=mountCaseAnnotation(root,signal,{
    context:()=>({pageUrl:new URL(`${locale}/certisearch/`,document.querySelector('[data-certichat]').dataset.siteRoot).href,locale,advisor:{case:structuredClone(current),selection:structuredClone(selection),mode:'dictation'}}),
    request:sharedChatRequest,voiceActive:()=>voiceActive,notice,
    save:text=>{if(busy||changingCase)throw new Error('Hay una solicitud en curso.');annotationText=text;window.dispatchEvent(new Event('certisearch:selection'));},
  });

  function viewRenderers() {
    const shown=draft||current;
    return {case:()=>caseView(catalog,shown,illustration),architecture:()=>architectureView(catalog,shown),estimate:()=>estimateView(shown,profiles,catalog),stages:()=>stagesView(catalog,shown)};
  }
  function render() {
    document.title=`${current.title.trim()||t('Propuesta de solución')} | CertiSearch | CertiTips`;
    const renderers=viewRenderers();
    disposeDeck();
    view.innerHTML=renderers[tab]();view.setAttribute('aria-labelledby',`search-tab-${tab}`);
    if(draft)view.querySelectorAll('[data-select]').forEach(element=>{element.setAttribute('aria-disabled','true');element.tabIndex=-1;if(element.tagName==='BUTTON')element.disabled=true;});
    disposeDeck=mountDecks(view,signal);
    root.querySelectorAll('[data-tab]').forEach(button=>{button.setAttribute('aria-selected',String(button.dataset.tab===tab));button.tabIndex=button.dataset.tab===tab?0:-1;});
    root.querySelector('[data-sizing-actions]').hidden=tab!=='estimate';
    root.querySelector('[data-action="oracle-import"]').disabled=busy;
    root.querySelector('[data-action="oracle-export"]').disabled=!current.oracleDocument||Boolean(current.estimates.at(-1)?.stale)||Boolean(draft);
    view.querySelectorAll('[data-select]').forEach(element=>{const enabled=!draft&&(annotating||element.dataset.select==='node');element.setAttribute('aria-disabled',String(!enabled));element.tabIndex=enabled?0:-1;});
    if(selection)setSelection(selection.kind,selection.id);else annotationUI.sync(null,null,annotating&&!draft);
    scheduleEstimate();
  }
  // The server owns case revisions; IndexedDB is a mirror and never overwrites a newer snapshot.
  async function adoptSnapshot(snapshot,redraw=true,expectedId=current.id) {
    const adoption=applying.then(async()=>{
    if(signal.aborted||current.id!==expectedId)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    const next=validateCase(snapshot.case);
    if(next.id!==expectedId)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    const diary=snapshot.journal===undefined?journal:mergeMeetingJournal(journal,snapshot.journal);
    // Dialogue can finish after a newer case revision; retain its immutable entries without rolling back the case.
    if(next.revision<current.revision){journal=diary;await persistJournal();refreshSearchChat();return snapshot;}
    let image=illustration;
    if(next.imageId!==image?.id){
      image=null;
      if(next.imageId){try{image=await validateIllustration(await storage('get',undefined,`image:${next.imageId}`),next.imageId);}catch(error){notice(error.message);}}
    }
    await storage('mirror',next,'case',mirrored?current:undefined);
    current=next;journal=diary;illustration=image;mirrored=true;
    await persistJournal();
    if(redraw){draft=null;render();}refreshSearchChat();
    return snapshot;
    });applying=adoption.catch(()=>{});return adoption;
  }
  async function ensureServer() {
    if(!serverReady){
    const before=current,diary=journal;
      serverReady=(async()=>{
        let snapshot;
        try{snapshot=await caseRequest(before.id,undefined,'GET');}
        catch(error){if(error.status!==404)throw error;snapshot=await caseRequest(before.id,{workspaceId:workspace,case:before,journal:diary});}
        return adoptSnapshot(snapshot,true,before.id);
      })().catch(error=>{serverReady=null;throw error;});
    }
    return serverReady;
  }
  async function commit(next, redraw=true, expected=current) {
    const save=saving.then(async()=>{
      if(signal.aborted||current!==expected)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      validateCase(next);
      if(next.id!==expected.id){
        const snapshot=await caseRequest(next.id,{workspaceId:workspace,case:next,journal:[]});
        if(signal.aborted||current!==expected)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
        await storage('put',snapshot.case,'case',expected);current=validateCase(snapshot.case);mirrored=true;journal=validateMeetingJournal(snapshot.journal||[]);journalExpiresAt=Date.now()+86400000;await persistJournal();serverReady=Promise.resolve(snapshot);
        if(redraw){draft=null;render();}return;
      }
      await ensureServer();
      if(current.revision!==expected.revision)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      const snapshot=await sharedChatRequest(`runtime/cases/${encodeURIComponent(next.id)}/mutate`,{requestId:crypto.randomUUID(),baseRevision:current.revision,case:{...next,revision:current.revision,history:[]}});
      await adoptSnapshot(snapshot,redraw,next.id);
    });
    saving=save.catch(()=>{});await save;
  }
  function confirm(title,html) {
    const dialog=root.querySelector('[data-confirm]');dialog.classList.toggle('is-review',['¿Aplicar la propuesta?','¿Importar los cambios de Cost Estimator?'].includes(title));
    dialog.querySelector('h2').textContent=t(title);dialog.querySelector('[data-confirm-content]').innerHTML=html;
    return new Promise(resolve=>{const close=value=>{dialog.close();dialog.oncancel=null;resolve(value);};dialog.querySelector('[data-confirm-yes]').onclick=()=>close(true);dialog.querySelector('[data-confirm-no]').onclick=()=>close(false);dialog.oncancel=event=>{event.preventDefault();close(false);};dialog.showModal();dialog.querySelector('h2').focus();});
  }
  function resetChat(){refreshSearchChat();}
  function selectionAnnotation() {
    if(!selection)return null;
    const {kind,id}=selection;
    if(kind==='section'){
      const section={
        'use-case':{label:t('Caso de uso'),description:current.title||t('De la necesidad a una solución clara')},
        sizing:{label:t('Consumo OCI'),description:t('Resumen por servicio')},
        stages:{label:t('Etapas de la propuesta'),description:t('Avance de la propuesta y próximos pasos por etapa.')},
      }[id];
      return section?{...selection,...section}:null;
    }
    if(kind==='image'&&id==='case-image')return {...selection,label:t('Imagen del caso'),description:current.imagePrompt||t('Activa Anotar y pide al agente crear o editar la imagen del caso.')};
    const entries={question:catalog.questions,node:current.architecture.nodes,edge:current.architecture.edges,sizing:current.sizing,estimate:current.estimates.at(-1)?.lines||[],stage:current.stages,requirement:current.requirements,decision:current.decisions};
    const item=entries[kind]?.find(item=>item.id===id),label=kind==='stage'?stageName(item,catalog):item?.text||item?.label||item?.name||profiles.find(profile=>profile.id===item?.profileId)?.name||id;
    return item?{...selection,label,description:t(item.purpose||item.description||'')}:null;
  }
  function savedAnnotation(){
    const selected=selectionAnnotation();
    if(!selected||!annotationText)return null;
    return {...selected,comment:annotationText};
  }
  function setSelection(kind,id,expand=false) {
    if(changingCase&&kind)return;
    if(selection?.kind!==kind||selection?.id!==id)annotationText='';
    selection=kind?{kind,id}:null;
    if(selection&&!selectionAnnotation())selection=null;
    root.querySelectorAll('[data-select]').forEach(element=>element.classList.toggle('search-selected',annotating&&!draft&&Boolean(selection)&&element.dataset.select===selection.kind&&element.dataset.id===selection.id));
    annotationUI.sync(selectionAnnotation(),root.querySelector('.search-selected'),annotating&&!draft,expand);
    window.dispatchEvent(new Event('certisearch:selection'));
  }
  async function clearPending(request){
    if(!request)return;
    await storage('delete',undefined,'pending',{requestId:request.requestId});
    if(pending?.requestId===request.requestId)pending=null;
  }
  function showProposals(result) {
    const container=root.querySelector('[data-proposals]');
    if(result.proposals?.length){draft=applyProposal(current,result,result.proposals[0]);render();notice('Borrador del asesor. Revisa la propuesta para incorporarla al expediente.');}
    container.innerHTML=sourceLinks(result.sources||[])+(result.proposals||[]).map((proposal,index)=>`<section class="search-card"><strong>${esc(proposal.title)}</strong><p>${esc(proposal.reason)}</p><button type="button" class="button button-secondary" data-proposal="${index}">${esc(t('Revisar propuesta'))}</button></section>`).join('');
    container.querySelectorAll('[data-proposal]').forEach(button=>button.onclick=guarded(async()=>{
      const proposal=result.proposals[Number(button.dataset.proposal)];
      applyProposal(current,result,proposal);
      const epoch=caseEpoch;
      if(await confirm('¿Aplicar la propuesta?',proposalReview(proposal,current,catalog,profiles))){
        if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
        const applied=await sharedChatRequest(`runtime/cases/${encodeURIComponent(current.id)}/apply`,{requestId:crypto.randomUUID(),baseRevision:current.revision,proposal});
        await adoptSnapshot(applied);container.replaceChildren();
        if(proposal.changes.some(change=>change.section==='imagePrompt'))await generateImage(current,[]);
        window.dispatchEvent(new CustomEvent('certisearch:proposal',{detail:{action:'proposal_accepted',request_id:result.requestId,profile:'solution-advisor',revision:current.revision}}));
      }else{
        window.dispatchEvent(new CustomEvent('certisearch:proposal',{detail:{action:'proposal_rejected',request_id:result.requestId,profile:'solution-advisor',revision:current.revision}}));
      }
    }));
  }
  async function generateImage(next,sources,withinTurn=false){
    if(busy&&!withinTurn)throw new Error('Hay una solicitud en curso.');
    setBusy(true);notice('Generando la imagen del caso…');
    const before=current,epoch=caseEpoch;
    let request;
    try{
      const previous=await storage('get',undefined,'pending-image');
      const base={case:structuredClone(before),prompt:next.imagePrompt,reference:illustration?.dataUrl||null};
      request=previous&&JSON.stringify({...previous,requestId:null})===JSON.stringify({...base,requestId:null})?previous:{...base,requestId:crypto.randomUUID()};
      await storage('put',request,'pending-image');
      const image=await requestIllustration(before,next.imagePrompt,illustration,request,body=>client.request('image',body));
      await commitImage(image,{...next,sources:mergeSources(before.sources,sources)},before,epoch,request.requestId);
    }catch(error){
      if(request&&error.status&&!['request_pending','runtime_reconnect'].includes(error.code))await storage('delete',undefined,'pending-image',{requestId:request.requestId});
      throw error;
    }finally{setBusy(false);scheduleEstimate();}
  }
  async function releaseImage(requestId){await storage('delete',undefined,'pending-image',{requestId});releaseSearchRun(requestId);}
  async function commitImage(image,next,before,epoch,requestId){
    if(signal.aborted||epoch!==caseEpoch||current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    await storage('put',image,`image:${image.id}`);
    await commit({...next,imageId:image.id},false,before);
    illustration=image;draft=null;render();notice('Imagen del caso actualizada.');
    await releaseImage(requestId);
  }
  // Replay the accepted image result through the same identity/byte validation; never call generation again.
  async function recoverImage(requestId,result) {
    if(signal.aborted||busy)return;
    const request=await storage('get',undefined,'pending-image');
    if(!request||request.requestId!==requestId){releaseSearchRun(requestId);return;}
    if(request.case.id!==current.id)return;
    setBusy(true);
    try{
      await ensureServer();
      const before=current,epoch=caseEpoch;
      const reference=request.case.imageId?await storage('get',undefined,`image:${request.case.imageId}`):null;
      const image=await requestIllustration(request.case,request.prompt,reference,request,async()=>result);
      // Reload may occur after the canonical mutation but before local acknowledgement.
      if(before.revision>request.case.revision&&before.imageId===image.id&&before.imagePrompt===request.prompt){await releaseImage(requestId);return;}
      if(before.revision!==request.case.revision){await releaseImage(requestId);throw new Error('El caso cambió. Solicita una propuesta actualizada.');}
      await commitImage(image,{...before,imagePrompt:request.prompt},before,epoch,requestId);
    }finally{setBusy(false);scheduleEstimate();}
  }
  async function send(rawMessage,action,concurrent=false,queuedContext) {
    if(signal.aborted||changingCase)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    const epoch=caseEpoch,caseId=current.id,requestedSelection=structuredClone(selection);
    const turnContext={pageUrl:queuedContext?.pageUrl||document.querySelector('link[rel="canonical"]').href,activeView:tabHashes[tab],context:queuedContext?.context||voiceContext(document)};
    const message=action==='message'?annotatedMessage(rawMessage,savedAnnotation()):rawMessage;
    await ensureServer();
    if(signal.aborted||changingCase||epoch!==caseEpoch||caseId!==current.id)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
    if(busy&&!concurrent)throw new Error('Hay una solicitud en curso.');
    setBusy(true);notice('');
    const context={caseId,baseRevision:current.revision};
    let operationRequest;
    try {
      if(concurrent){operationRequest={requestId:queuedContext.requestId,action,message,locale,case:structuredClone(current),selection:requestedSelection,...turnContext};}
      else if(!canRetryRequest(pending,pendingSearchRun(pending?.requestId)&&pending?.case?.id===current.id?pending.case:current,message,action,requestedSelection,locale,turnContext)){
        // The saved dialogue must retain the same annotation context the agent actually receives.
        assertCurrentResponse(current,context);
        if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
        pending={requestId:crypto.randomUUID(),action,message,locale,case:structuredClone(current),selection:requestedSelection,...turnContext};await storage('put',pending,'pending');
      }
      const request=operationRequest=operationRequest||pending, result=await client.request('chat',request);
      if(epoch!==caseEpoch||current.id!==request.case.id){
        if(!signal.aborted)await clearPending(request);
        throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      }
      assertCurrentResponse(request.case,result,request);
      if(result.case?.revision>=current.revision)await adoptSnapshot(result,false,request.case.id);
      else if(result.case)await adoptSnapshot(await caseRequest(current.id,undefined,'GET'),false);
      else throw new Error('No se pudo recuperar el expediente actualizado.');
      if(epoch!==caseEpoch)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      if(result.proposals?.length&&!result.applied)showProposals(result);else render();
      await clearPending(request);
      if(result.applied===true&&current.imagePrompt&&requestsIllustration(message))await generateImage(current,[],true);
      return {...result,submittedMessage:message};
    } catch(error){if(!signal.aborted&&error.status&&!['request_pending','runtime_reconnect'].includes(error.code))await clearPending(operationRequest);throw error;}
    finally{setBusy(false);scheduleEstimate();}
  }
  async function estimate(action='estimate',oracleDocument) {
    await ensureServer();
    if(busy)throw new Error('Hay una solicitud en curso.');setBusy(true);
    try {
      const epoch=caseEpoch, request={requestId:crypto.randomUUID(),action,case:structuredClone(current),...(oracleDocument?{oracleDocument}:{})};
      const result=await client.request('estimate',request);
      // A conversation event may already have mirrored this run's canonical revision.
      assertCurrentResponse(request.case,result,request);
      if(epoch!==caseEpoch||current.id!==request.case.id)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      const economic=result.estimate;
      if(economic?.pricingVersion!==pricing.version)throw new Error('No se pudieron actualizar los costos. Recarga la página e inténtalo de nuevo.');
      if(action==='import'&&!await confirm('¿Importar los cambios de Cost Estimator?',`<p>${esc(t('Se sustituirá la estimación y se revisará su coherencia con la arquitectura.'))}</p>${oracleChangesView(result.diff||economic.diff||{})}`))return;
      if(epoch!==caseEpoch||current.id!==request.case.id)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      if(action==='import'){assertCurrentResponse(current,result,request);await commit(applyEstimate(current,result,action));}
      else {if(!result.case)throw new Error('No se pudo recuperar el expediente actualizado.');await adoptSnapshot(result);}
      notice(action==='import'?'Archivo Oracle conservado. Revisa las diferencias de arquitectura.':'');
    }finally{setBusy(false);scheduleEstimate();}
  }

  const actions={
    present:opener=>window.dispatchEvent(new CustomEvent('certisearch:present',{detail:{root,opener,views:()=>Object.entries(viewRenderers()).map(([kind,render])=>({kind,html:render()}))}})),
    'show-chat':()=>{root.dataset.mobile='chat';if(document.querySelector('#certichat-panel')?.hidden)document.querySelector('[data-chat-open]')?.click();root.querySelector('[data-action="show-workspace"]').focus();},'show-workspace':()=>{delete root.dataset.mobile;root.querySelector('[data-action="show-chat"]').focus();},
    'clear-chat':async()=>{journal=journal.filter(entry=>entry.meetingId);await adoptSnapshot(await caseRequest(current.id,undefined,'GET'),false);pending=null;await storage('delete',undefined,'pending');},
    'region-review':async button=>{const before=current,decision=current.decisions.find(item=>item.id===button.dataset.id);if(!decision||decision.region!==current.region)throw new Error('Define la región y los servicios antes de confirmar su disponibilidad.');if(await confirm('¿Confirmar la revisión regional?',`<p>${esc(decision.text||'')}</p>${sourceLinks([{url:decision.sourceUrl}])}`)){if(before!==current)throw new Error('El caso cambió. Solicita una propuesta actualizada.');await commit(reviseCase(current,{decisions:current.decisions.map(item=>item===decision?{...item,status:'confirmed',reviewedAt:new Date().toISOString()}:item)}));}},
    annotate:button=>{annotating=!annotating;button.setAttribute('aria-pressed',String(annotating));root.dataset.annotating=String(annotating);render();},
    export:async()=>{if(await confirm('¿Guardar el caso?',`<p>${esc(t('Descarga el caso y su conversación en un archivo JSON.'))}</p>`))downloadJSON(await caseArchive(current,illustration,journal),`certisearch-${current.id}.json`);},
    import:async()=>{if(await confirm('¿Abrir un caso?',`<p>${esc(t('Selecciona un JSON de CertiSearch para recuperar el caso y el chat.'))}</p>`))root.querySelector('[data-case-file]').click();},
    new:async()=>{if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');if(await confirm('¿Iniciar otro caso?',`<p>${esc(t('Guarda un archivo del caso actual antes de reemplazarlo.'))}</p>`))await changeCase(async()=>{caseEpoch++;await commit(createCase(catalog,locale),false);if(signal.aborted)return;notice('');illustration=null;draft=null;render();pending=null;await storage('delete',undefined,'pending');if(signal.aborted)return;setSelection(null);root.querySelector('[data-proposals]').replaceChildren();resetChat();});},
    'oracle-import':async()=>{if(await confirm('¿Importar desde Cost Estimator?',`<p>${esc(t('Selecciona un JSON de Cost Estimator para importar cantidades y costos.'))}</p><p><a href="https://www.oracle.com/cloud/costestimator.html" target="_blank" rel="noopener noreferrer" lang="en" translate="no">Cost Estimator ↗</a></p>`))root.querySelector('[data-oracle-file]').click();},
    'oracle-export':async()=>{if(!current.oracleDocument)throw new Error('Los costos todavía no están disponibles para exportar.');if(current.estimates.at(-1)?.stale)throw new Error('Espera a que se actualicen los costos antes de exportar.');const before=current;if(await confirm('¿Descargar para Cost Estimator?',`<p>${esc(t('Descarga el JSON de la estimación para abrirlo en Cost Estimator.'))}</p><p><a href="https://www.oracle.com/cloud/costestimator.html" target="_blank" rel="noopener noreferrer" lang="en" translate="no">Cost Estimator ↗</a></p>`)){if(current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');downloadJSON(current.oracleDocument,`oracle-${current.id}.json`);}},
    print:async()=>{if(await confirm('¿Descargar el informe?',`<p>${esc(t('Descarga el caso completo en PDF, con su arquitectura, costos y conversación.'))}</p>`)&&!signal.aborted)await downloadReport();},
    'remove-node':async button=>{const id=button.dataset.id;await commit(reviseCase(current,{architecture:{nodes:current.architecture.nodes.filter(node=>node.id!==id),edges:current.architecture.edges.filter(edge=>edge.source!==id&&edge.target!==id)}}));},
    'remove-edge':async button=>{await commit(reviseCase(current,{architecture:{...current.architecture,edges:current.architecture.edges.filter(edge=>edge.id!==button.dataset.id)}}));},
    'remove-sizing':async button=>{await commit(reviseCase(current,{sizing:current.sizing.filter(line=>line.id!==button.dataset.id)}));},
    'review-stage':async button=>reviewStage(button.dataset.id,false), 'accept-stage':async button=>reviewStage(button.dataset.id,true),
    'review-case':reviewCase,
  };
  async function reviewStage(id,acceptance) {
    const stage=current.stages.find(item=>item.id===id);
    if(!stage)throw new Error('El expediente no es válido o utiliza una versión no compatible.');
    const issues=stageIssues(current,id);if(issues.length)throw new Error(issues.map(t).join(' '));
    if(acceptance&&current.stages.find(item=>item.id===id)?.status!=='reviewed')throw new Error('Revisa la etapa antes de registrar la aceptación del cliente.');
    const before=current;
    const criteria=stage.advanceCriteria||stage.sufficiency||catalog.stages.find(item=>item.id===id)?.sufficiency||[];
    const items=Array.isArray(criteria)?criteria:[criteria];
    if(await confirm(acceptance?'¿Registrar la aceptación del cliente?':'¿Confirmar la revisión?',`<p>${esc(stageName(stage,catalog))}</p><ul>${items.map(item=>`<li>${esc(typeof item==='string'?t(item):item.text||item.title||'')}</li>`).join('')}</ul>`)){
      if(current!==before)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      await commit(recordStageReview(current,id,acceptance));
    }
  }
  root.addEventListener('click',guarded(async event=>{
    if(changingCase)return;
    const tabButton=event.target.closest('[data-tab]');if(tabButton){tab=tabButton.dataset.tab;if(tab==='estimate')lastEstimateAttempt='';const hash=`#${tabHashes[tab]}`;if(location.hash!==hash)history.pushState(history.state,'',hash);render();tabButton.scrollIntoView({block:'nearest',inline:'nearest'});return;}
    const selected=event.target.closest('[data-select]');if(selected){if(annotating&&!draft)setSelection(selected.dataset.select,selected.dataset.id,true);return;}
    const button=event.target.closest('[data-action]');if(button&&actions[button.dataset.action])await actions[button.dataset.action](button);
  }),{signal});
  root.addEventListener('keydown',event=>{
    if(changingCase)return;
    const tabButton=event.target.closest('[data-tab]');
    if(tabButton&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      event.preventDefault();const tabs=[...root.querySelectorAll('[data-tab]')],at=tabs.indexOf(tabButton);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(at+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[next].click();tabs[next].focus();
    }
    if(['Enter',' '].includes(event.key)&&event.target.matches('[data-select]:not(button)')){event.preventDefault();if(annotating&&!draft)setSelection(event.target.dataset.select,event.target.dataset.id,true);}
  },{signal});
  root.addEventListener('change',guarded(async event=>{
    const field=event.target;
    if(field.matches('[data-case-file]')){const file=field.files[0];field.value='';await importCase(file);return;}
    if(field.matches('[data-oracle-file]')){const file=field.files[0];field.value='';if(file){if(file.size>1024*1024)throw new Error('El archivo supera el límite admitido.');await estimate('import',JSON.parse(await file.text()));}}
  }),{signal});
  async function importCase(file){
    if(voiceActive)throw new Error('Termina la escucha antes de cambiar de caso.');
    if(!file)return;if(file.size>ARCHIVE_LIMIT)throw new Error('El archivo supera el límite admitido.');
    const archive=await parseCaseArchive(await file.text()),imported=migrateDialogue(archive.current);
    if(await confirm('¿Abrir un caso?',`<p>${esc(imported.title||imported.id)}</p><p>${esc(t('Se conservarán respuestas, decisiones y archivos de estimación.'))}</p>`))await changeCase(async()=>{
      caseEpoch++;
      const importedJournal=journalFromHistory(imported,archive.journal);
      const snapshot=await caseRequest(imported.id,{workspaceId:workspace,case:{...imported,history:[]},journal:importedJournal});
      if(signal.aborted)return;
      if(archive.illustration)await storage('put',archive.illustration,`image:${archive.illustration.id}`);
      await storage('put',validateCase(snapshot.case),'case',current);current=snapshot.case;mirrored=true;
      journal=mergeMeetingJournal(importedJournal,snapshot.journal||[]);journalExpiresAt=Date.now()+86400000;await persistJournal();serverReady=Promise.resolve(snapshot);
      if(signal.aborted)return;
      illustration=archive.illustration;draft=null;render();pending=null;await storage('delete',undefined,'pending');if(signal.aborted)return;setSelection(null);root.querySelector('[data-proposals]').replaceChildren();resetChat();notice('Caso restaurado. Puedes continuar en el chat.');
    });
  }
  if(signal.aborted)return;
  const acceptedVoice=new Set();
  setSearchAdvisor({
    get id(){return current.id;},
    get busy(){return busy;},
    get changingCase(){return changingCase;},
    get updatedAt(){return current.updatedAt;},
    get history(){return caseDialogue(journal);},
    get annotation(){return savedAnnotation();},
    editAnnotation:()=>{if(changingCase)return;annotating=true;root.dataset.annotating='true';root.querySelector('[data-action=annotate]').setAttribute('aria-pressed','true');render();annotationUI.edit(annotationText);},
    clearSelection:()=>setSelection(null),
    send:message=>send(message,'message'),
    enqueue:(message,context)=>send(message,'message',true,context),
    clear:actions['clear-chat'],
    voiceContext:mode=>({case:structuredClone(current),selection:structuredClone(selection),mode,activeView:tabHashes[tab]}),
    meetingContext:async()=>{await ensureServer();return {caseId:current.id,caseRevision:current.revision,workspaceId:workspace};},
    refreshCase:async requestId=>{await adoptSnapshot(await caseRequest(current.id,undefined,'GET'));if(requestId)await clearPending({requestId});},
    recoverImage,
    acceptVoice:async result=>{
      if(signal.aborted)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      if(acceptedVoice.has(result.requestId))return;
      if(!result.case)throw new Error('No se pudo recuperar el expediente actualizado.');
      await adoptSnapshot(result,false);
      acceptedVoice.add(result.requestId);
      if(result.proposals?.length&&!result.applied)showProposals(result);else render();
    },
    acceptMeeting:async result=>{
      if(signal.aborted)throw new Error('El caso cambió. Solicita una propuesta actualizada.');
      if(result.case&&result.case.revision>=current.revision)await adoptSnapshot(result);
      else if(result.journal){journal=mergeMeetingJournal(journal,result.journal);await persistJournal();}
      else if(result.transcript?.trim()){
        const entry=result.segment;
        if(!entry)throw new Error('No se pudo recuperar el diario actualizado.');
        journal=appendMeetingSegment(journal,entry);await persistJournal();
      }
    },
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
  // A remount can recover completed background turns without submitting another model request.
  void ensureServer().catch(error=>{if(!signal.aborted)notice(error.message);});
  window.addEventListener('certichat:session',event=>{if(event.detail?.authenticated&&!event.detail.verificationRequired)void ensureServer().catch(error=>notice(error.message));},{signal});
}

function mergeSources(previous,incoming){return [...new Map([...previous,...incoming].map(source=>[`${source.id||''}:${source.url}`,source])).values()];}
