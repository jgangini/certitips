import { t } from '../site/i18n.js?v=c6c63c136710';

/** Build an inert view miniature without controls or a second case controller. */
function thumbnail(tab,html,index) {
  const doc=tab.ownerDocument,button=doc.createElement('button');button.type='button';
  button.setAttribute('aria-label',tab.textContent.trim());button.title=tab.textContent.trim();button.dataset.caseTab=tab.id;
  button.dataset.slideNumber=String(index+1);
  const preview=doc.createElement('span');preview.className='case-slide-preview';preview.inert=true;preview.setAttribute('aria-hidden','true');
  preview.innerHTML=html;
  for(const control of preview.querySelectorAll('button')){const copy=doc.createElement('span');copy.className=control.className;copy.append(...control.childNodes);control.replaceWith(copy);}
  for(const element of preview.querySelectorAll('[data-select],[data-action],[tabindex]'))for(const name of ['data-select','data-action','tabindex'])element.removeAttribute(name);
  button.append(preview);
  return button;
}

/** Present the live case in the shared viewer; keep its controller, storage and chat instance. */
export function mountCasePresentation(dialog, setMenu, signal, animate) {
  const content=dialog.querySelector('.dialog-content'), filmstrip=dialog.querySelector('.diagram-presentation-nav');
  const image=content.querySelector('img'), description=dialog.querySelector('#diagram-description'), present=dialog.querySelector('[data-diagram-present]'),menu=dialog.querySelector('[data-diagram-menu]');
  let current, observer;
  const thumbnails=new ResizeObserver(entries=>{
    for(const {target,contentRect} of entries)target.style.setProperty('--case-preview-scale',String(contentRect.width/1280));
  });
  const tabs=()=>[...current.root.querySelectorAll('#search-tab-list [role=tab]')];

  function caption() {
    const selected=tabs().find(tab=>tab.getAttribute('aria-selected')==='true');
    dialog.querySelector('#diagram-group').textContent='CertiSearch';
    dialog.querySelector('#diagram-caption').textContent=selected?.textContent.trim()||'CertiSearch';
    dialog.dataset.sourceId='';
    return selected;
  }

  function refresh() {
    if(!current)return;
    const selected=caption();
    const previews=new Map((current.views?.()||[]).map(view=>[view.kind,view.html]));
    const scroll=filmstrip.scrollTop;thumbnails.disconnect();
    const buttons=tabs().map((tab,index)=>{
      const button=thumbnail(tab,previews.get(tab.dataset.tab)||'',index);
      button.setAttribute('aria-current',String(tab===selected));
      thumbnails.observe(button.firstElementChild);
      button.addEventListener('click',()=>show(index),{signal});
      return button;
    });
    filmstrip.replaceChildren(...buttons);filmstrip.scrollTop=scroll;
    dialog.querySelector('.diagram-slide-count').textContent=`${tabs().indexOf(selected)+1}/${buttons.length}`;
  }

  function show(index) {
    if(!current||dialog.classList.contains('is-closing'))return false;
    const views=tabs();
    views[(index+views.length)%views.length]?.click();
    refresh();setMenu(false);content.focus({preventScroll:true});
    return true;
  }

  function restore(state) {
    if(current!==state)return;
    current=null;observer?.disconnect();observer=null;thumbnails.disconnect();
    state.placeholder.replaceWith(state.root);
    image.hidden=state.imageHidden;present.hidden=state.presentHidden;
    menu.title=state.menuTitle;filmstrip.setAttribute('aria-label',state.navigationLabel);
    if(description)description.hidden=state.descriptionHidden;
    delete dialog.dataset.casePresentation;delete dialog.dataset.sourceId;
    dialog.classList.remove('is-presenting','is-closing');setMenu(false);filmstrip.replaceChildren();
    if(dialog.open)dialog.close();
    if(!signal.aborted)state.opener.focus({preventScroll:true});
  }

  function close(immediate=false) {
    if(!current)return;
    const state=current;
    if(state.closing&&!immediate)return;
    state.closing=true;
    const finish=()=>restore(state);
    const motion=!immediate&&dialog.open?animate?.(true,state.origin):null;
    if(motion){dialog.classList.add('is-closing');motion.finished.then(finish,finish);}else finish();
  }

  function open(root,opener,views) {
    if(current||dialog.open||!root?.matches('[data-certisearch]'))return;
    const origin=root.querySelector('.search-deck-host').getBoundingClientRect();
    const placeholder=document.createComment('live case presentation');root.before(placeholder);
    current={root,opener,placeholder,views,origin,imageHidden:image.hidden,presentHidden:present.hidden,descriptionHidden:description?.hidden,menuTitle:menu.title,navigationLabel:filmstrip.getAttribute('aria-label')};
    content.append(root);image.hidden=true;present.hidden=true;if(description)description.hidden=true;
    dialog.dataset.casePresentation='true';dialog.classList.add('is-presenting');
    filmstrip.setAttribute('aria-label',t('Vistas del caso'));
    menu.title=t('Vistas del caso');
    observer=new MutationObserver(refresh);observer.observe(root.querySelector('#search-tab-list'),{subtree:true,childList:true,attributes:true,attributeFilter:['aria-selected']});
    refresh();setMenu(false);dialog.showModal();animate?.(false,origin);content.focus({preventScroll:true});
  }

  window.addEventListener('certisearch:present',event=>open(event.detail?.root,event.detail?.opener,event.detail?.views),{signal});
  // Native close events are queued: an old event must not close a freshly reopened case.
  dialog.addEventListener('close',()=>{if(!dialog.open)close(true);},{signal});signal.addEventListener('abort',()=>close(true),{once:true});
  return {get active(){return Boolean(current);},show,close,get index(){return current?tabs().findIndex(tab=>tab.getAttribute('aria-selected')==='true'):0;}};
}
