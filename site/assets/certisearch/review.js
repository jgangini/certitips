import { t } from '../site/i18n.js?v=849f77efdc35';
import { validateCase } from './case.js?v=849f77efdc35';
import { esc } from './view.js?v=849f77efdc35';

/** Render existing report evidence without exposing a second editor in the review dialog. */
function paintReport(content,markup){
  content.innerHTML=markup;
  content.querySelectorAll('.search-inline-actions,[data-action]').forEach(element=>element.remove());
  content.querySelectorAll('button').forEach(button=>button.replaceWith(...button.childNodes));
  content.querySelectorAll('[data-select]').forEach(element=>{element.removeAttribute('data-select');element.removeAttribute('tabindex');});
}

function revisionOptions(value){
  return `<option value="">${esc(t('Selecciona una revisión anterior'))}</option>`+(value.revisions||[])
    .filter(item=>Number.isSafeInteger(item.revision)&&item.revision<value.revision)
    .map(item=>`<option value="${item.revision}">${esc(t('Revisión'))} ${item.revision} · ${esc(item.created_at||'')}</option>`).join('');
}

/** Own one server review and reject completions after the dialog or case context changes. */
class CaseReview {
  constructor(root,dependencies){
    Object.assign(this,dependencies);
    this.dialog=root.querySelector('[data-case-review]');this.trigger=root.querySelector('[data-action="review-case"]');
    this.approve=this.dialog.querySelector('[data-review-approve]');this.restore=this.dialog.querySelector('[data-review-restore]');
    this.versions=this.dialog.querySelector('[data-review-version]');this.status=this.dialog.querySelector('[data-review-status]');
    this.content=this.dialog.querySelector('[data-review-content]');
    this.snapshot=null;this.caseId='';this.working=false;
    this.bind();
  }
  path(operation){return `runtime/cases/${encodeURIComponent(this.caseId)}/${operation}`;}
  active(){return !this.signal.aborted&&this.dialog.open&&this.getCurrent().id===this.caseId;}
  ready(){return this.snapshot&&Number.isSafeInteger(this.snapshot.barrier?.latest_seq)&&this.snapshot.barrier.intake_seq>=this.snapshot.barrier.latest_seq;}
  controls(){
    this.approve.disabled=this.working||!this.ready()||this.snapshot.approvedRevision===this.snapshot.revision;
    this.restore.disabled=this.working||!this.versions.value;this.versions.disabled=this.working;
    this.dialog.querySelector('[data-review-refresh]').disabled=this.working;
  }
  paint(value,message=''){
    const document=validateCase(value.case);
    if(document.id!==this.caseId||document.revision!==value.revision||!/^[a-f0-9]{64}$/.test(value.contentHash))throw new Error('No se pudo recuperar el expediente actualizado.');
    this.snapshot=value;
    Object.assign(this.dialog.dataset,{revision:String(value.revision),contentHash:value.contentHash,barrierSeq:String(value.barrier?.latest_seq??'')});
    this.dialog.querySelector('[data-review-revision]').textContent=`${t('Revisión')}: ${value.revision}`;
    paintReport(this.content,this.renderCase(document));
    this.versions.innerHTML=revisionOptions(value);
    this.status.textContent=t(message||(value.approvedRevision===value.revision?'Expediente aprobado en esta revisión.':this.ready()?'Revisa el expediente completo antes de aprobar esta versión.':'Hay entradas pendientes. Actualiza la revisión cuando terminen.'));
    this.controls();
  }
  async refresh(message=''){
    const value=await this.request(this.path('review'),undefined,'GET');
    if(!this.active())return;
    await this.adopt(value,false,this.caseId);if(this.active())this.paint(value,message);
  }
  async perform(action){
    if(this.working||!this.active())return;
    this.working=true;this.controls();
    try{await action();}
    catch(error){await this.failure(error);}
    finally{this.working=false;if(this.active())this.controls();}
  }
  async failure(error){
    if(!this.active())return;
    if(error.status!==409){this.status.textContent=t(error.message);return;}
    this.snapshot=null;
    try{await this.refresh('El expediente cambió o tiene trabajos pendientes. Revisa la versión actual antes de aprobar.');}
    catch(refreshError){if(this.active())this.status.textContent=t(refreshError.message);}
  }
  async approveReview(){
    if(!this.ready()||this.snapshot.approvedRevision===this.snapshot.revision)return;
    const reviewed=this.snapshot;
    const result=await this.request(this.path('approve'),{revision:reviewed.revision,contentHash:reviewed.contentHash,barrierSeq:reviewed.barrier.latest_seq});
    if(!this.active())return;
    await this.adopt(result,true,this.caseId);
    if(this.active())await this.refresh();
  }
  async restoreReview(){
    const sourceRevision=Number(this.versions.value),baseRevision=this.snapshot.revision;
    if(!this.versions.value||!this.snapshot.revisions.some(item=>item.revision===sourceRevision))return;
    const accepted=await this.confirm('¿Restaurar esta revisión?',`<p>${esc(t('Se creará una revisión nueva. El historial se conserva y los costos se recalcularán.'))}</p><p>${esc(t('Revisión'))}: ${sourceRevision}</p>`);
    if(!accepted||!this.active())return;
    const result=await this.request(this.path('restore'),{requestId:crypto.randomUUID(),sourceRevision,baseRevision});
    if(!this.active())return;
    await this.adopt(result,true,this.caseId);if(this.active())await this.refresh('Revisión restaurada. Revisa el expediente antes de aprobarlo.');
  }
  bind(){
    const {dialog,signal}=this;
    dialog.querySelector('[data-review-close]').addEventListener('click',()=>dialog.close(),{signal});
    dialog.querySelector('[data-review-refresh]').addEventListener('click',()=>void this.perform(()=>this.refresh()),{signal});
    this.approve.addEventListener('click',()=>void this.perform(()=>this.approveReview()),{signal});
    this.restore.addEventListener('click',()=>void this.perform(()=>this.restoreReview()),{signal});
    this.versions.addEventListener('change',()=>this.controls(),{signal});
    dialog.addEventListener('close',()=>{this.snapshot=null;this.trigger.focus({preventScroll:true});},{signal});
    signal.addEventListener('abort',()=>dialog.close(),{once:true});
  }
  async open(){
    if(this.working)return;
    await this.ensure();if(this.signal.aborted||this.dialog.open)return;
    this.caseId=this.getCurrent().id;this.snapshot=null;this.content.replaceChildren();this.status.textContent=t('Cargando la revisión…');
    this.dialog.showModal();this.dialog.querySelector('h2').focus();await this.perform(()=>this.refresh());
  }
}

/** Mount explicit final approval and reversible history over one immutable server review. */
export function mountCaseReview(root,dependencies){
  const review=new CaseReview(root,dependencies);
  return ()=>review.open();
}
