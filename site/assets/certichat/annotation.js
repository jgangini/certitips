import { t } from '../site/i18n.js?v=849f77efdc35';

const icon = name => `<span class="annotation-icon annotation-${name}" aria-hidden="true"></span>`;

// One selected case element, attached to the existing Deep Chat composer.
export function createChatAnnotation(clearSelection, focusInput, editSelection = () => {}) {
  const element = document.createElement('div');
  element.id = 'certichat-annotation'; element.hidden = true;
  element.innerHTML = `<div class="annotation-chip"><button type="button" data-annotation-toggle aria-expanded="false" aria-controls="certichat-annotation-detail">${icon('message')}<span></span></button><button type="button" data-annotation-remove>${icon('close')}</button></div><section id="certichat-annotation-detail" popover="auto"><div class="annotation-content"><header><span class="annotation-kind"></span><button type="button" data-annotation-edit>${icon('edit')}</button><button type="button" data-annotation-remove>${icon('trash')}</button></header><p class="annotation-comment"></p></div></section>`;
  const toggle = element.querySelector('[data-annotation-toggle]'), detail = element.querySelector('[popover]');
  let selected, closeTimer, pinned = false;
  const isOpen = () => detail.matches(':popover-open');
  function close() {
    clearTimeout(closeTimer); pinned = false;
    if (isOpen()) detail.hidePopover();
    toggle.setAttribute('aria-expanded', 'false');
  }
  function position() {
    const box = element.parentElement.getBoundingClientRect(), anchor = element.getBoundingClientRect();
    detail.style.width = `${Math.min(420, box.width - 24)}px`;
    detail.style.left = `${box.left + 12}px`;
    detail.style.bottom = `${innerHeight - anchor.top + 8}px`;
    detail.style.maxHeight = `${Math.max(80, anchor.top - 16)}px`;
  }
  function open() {
    clearTimeout(closeTimer);
    if (!selected || element.hidden) return;
    position();
    if (!isOpen()) detail.showPopover();
    toggle.setAttribute('aria-expanded', 'true');
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!pinned && !element.matches(':focus-within') && !detail.matches(':hover')) close();
    }, 140);
  }
  element.querySelector('.annotation-chip').addEventListener('pointerenter', open);
  element.querySelector('.annotation-chip').addEventListener('pointerleave', scheduleClose);
  detail.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  detail.addEventListener('pointerleave', scheduleClose);
  // Popover focus restoration can run during another show operation; inspect the settled focus first.
  element.addEventListener('focusin', () => queueMicrotask(() => { if (element.matches(':focus-within')) open(); }));
  element.addEventListener('focusout', event => { if (!element.contains(event.relatedTarget)) close(); });
  toggle.addEventListener('click', () => { if (pinned) close(); else { open(); pinned = true; } });
  detail.addEventListener('toggle', () => { toggle.setAttribute('aria-expanded', String(isOpen())); if (!isOpen()) pinned = false; });
  element.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) { event.preventDefault(); event.stopPropagation(); toggle.focus(); close(); }
  });
  element.querySelectorAll('[data-annotation-remove]').forEach(button => button.addEventListener('click', () => { close(); clearSelection(); focusInput(); }));
  element.querySelector('[data-annotation-edit]').addEventListener('click', () => { close(); editSelection(); });
  const resize = new ResizeObserver(() => { if (isOpen()) position(); });
  resize.observe(element);
  return { element, sync(value, container) {
    if (!value || value.kind !== selected?.kind || value.id !== selected?.id) close();
    selected = value; element.hidden = !value;
    toggle.querySelector('span:last-child').textContent = t('1 anotación');
    element.querySelectorAll('[data-annotation-remove]').forEach(button => { button.title = t('Quitar anotación'); button.setAttribute('aria-label', t('Quitar anotación')); });
    const kinds = { node: 'Componente', edge: 'Conexión', stage: 'Etapa', question: 'Pregunta', sizing: 'Sizing', estimate: 'Sizing', requirement: 'Requisito', decision: 'Decisión', image: 'Imagen' };
    detail.querySelector('.annotation-kind').textContent = t(kinds[value?.kind] || 'Contexto seleccionado');
    detail.setAttribute('aria-label',value?.label||t('Contexto seleccionado'));
    detail.querySelector('.annotation-comment').textContent = value?.comment || value?.description || '';
    const edit=detail.querySelector('[data-annotation-edit]');edit.title=t('Editar anotación');edit.setAttribute('aria-label',edit.title);
    if (value) { element.dataset.kind = value.kind; element.dataset.id = value.id; }
    else { delete element.dataset.kind; delete element.dataset.id; }
    if (container && element.parentElement !== container) container.prepend(element);
  } };
}

export const chatAnnotationStyles = `
  #text-input-container { min-width:0; max-width:100%; overflow-x:clip; }
  #text-input-container:has(#certichat-annotation:not([hidden])) { flex-direction:column; }
  #text-input { min-width:0; max-width:100%; box-sizing:border-box; overflow-x:hidden; }
  #certichat-annotation { align-self:flex-start; min-width:0; max-width:calc(100% - 24px); margin:8px 12px 0; color:var(--ink); font-family:inherit; font-size:11px; line-height:1.4; }
  #certichat-annotation[hidden] { display:none; }
  .annotation-chip { display:inline-flex; align-items:center; max-width:100%; border:1px solid var(--line); border-radius:18px; background:var(--hover); }
  #certichat-annotation button { display:inline-flex; align-items:center; justify-content:center; gap:6px; flex:none; border:1px solid transparent; border-radius:16px; background:transparent; color:var(--ink); font:inherit; min-height:24px; padding:2px 6px; cursor:pointer; }
  #certichat-annotation button[data-annotation-remove] { width:24px; padding:3px; }
  #certichat-annotation button:is(:hover,:focus-visible) { color:var(--red); border-color:var(--red); }
  #certichat-annotation button:focus-visible { outline:2px solid var(--red); outline-offset:2px; }
  #certichat-annotation .annotation-chip:is(:hover,:focus-within), #certichat-annotation .annotation-chip:has([aria-expanded=true]) { border-color:var(--red); }
  #certichat-annotation .annotation-chip [data-annotation-toggle]:is(:hover,:focus-visible,[aria-expanded=true]) { border-color:transparent; color:var(--ink); background:transparent; }
  #certichat-annotation .annotation-chip [data-annotation-remove]:is(:hover,:focus-visible) { background:var(--red); color:var(--on-red); border-color:var(--red); }
  #certichat-annotation-detail { position:fixed; inset:auto; box-sizing:border-box; margin:0; padding:14px; border:1px solid var(--line); border-radius:12px; color:var(--ink); background:var(--paper); box-shadow:0 8px 28px var(--shadow); overflow:auto; overflow-wrap:anywhere; font-family:inherit; font-size:13px; line-height:1.5; }
  .annotation-content { min-width:0; text-align:left; }
  #certichat-annotation-detail header { display:flex; align-items:center; gap:8px; }
  #certichat-annotation-detail header [data-annotation-edit] { margin-left:auto; }
  .annotation-kind { padding:1px 7px; border:1px solid var(--line); border-radius:10px; color:var(--muted); font-size:11px; }
  #certichat-annotation-detail p { margin:10px 0 0; }
  #certichat-annotation-detail .annotation-comment { color:var(--ink); white-space:pre-wrap; }
  #certichat-annotation-detail .annotation-comment:empty { display:none; }
  .annotation-icon { display:inline-block; flex:none; width:13px; height:13px; background:currentColor; mask:center/contain no-repeat; }
  .annotation-message { mask-image:url("${new URL('../icons/lucide-message-square.svg', import.meta.url).href}"); }
  .annotation-edit { mask-image:url("${new URL('../icons/lucide-pencil.svg', import.meta.url).href}"); }
  .annotation-trash { mask-image:url("${new URL('../icons/lucide-trash.svg', import.meta.url).href}"); }
  .annotation-close { mask-image:url("${new URL('../icons/voice-exit.svg', import.meta.url).href}"); }
`;
