import { t } from './i18n.js?v=845612f31882';

const icon = name => `<span class="annotation-icon annotation-${name}" aria-hidden="true"></span>`;

// One selected case element, attached to the existing Deep Chat composer.
export function createChatAnnotation(clearSelection, focusInput) {
  const element = document.createElement('div');
  element.id = 'certichat-annotation'; element.hidden = true;
  element.innerHTML = `<div class="annotation-chip"><button type="button" data-annotation-toggle aria-expanded="false" aria-controls="certichat-annotation-detail">${icon('message')}<span></span></button><button type="button" data-annotation-remove>${icon('close')}</button></div><section id="certichat-annotation-detail" popover="auto" aria-labelledby="annotation-title"><header><span class="annotation-preview">${icon('message')}</span><span class="annotation-kind"></span><button type="button" data-annotation-remove>${icon('trash')}</button></header><p id="annotation-title" role="status"></p><p class="annotation-description"></p></section>`;
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
  element.addEventListener('focusin', open);
  element.addEventListener('focusout', event => { if (!element.contains(event.relatedTarget)) close(); });
  toggle.addEventListener('click', () => { if (pinned) close(); else { open(); pinned = true; } });
  detail.addEventListener('toggle', () => { toggle.setAttribute('aria-expanded', String(isOpen())); if (!isOpen()) pinned = false; });
  element.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) { event.preventDefault(); event.stopPropagation(); toggle.focus(); close(); }
  });
  element.querySelectorAll('[data-annotation-remove]').forEach(button => button.addEventListener('click', () => { close(); clearSelection(); focusInput(); }));
  const resize = new ResizeObserver(() => { if (isOpen()) position(); });
  resize.observe(element);
  return { element, sync(value, container) {
    if (!value || value.kind !== selected?.kind || value.id !== selected?.id) close();
    selected = value; element.hidden = !value;
    toggle.querySelector('span:last-child').textContent = t('1 anotación');
    element.querySelectorAll('[data-annotation-remove]').forEach(button => { button.title = t('Quitar anotación'); button.setAttribute('aria-label', t('Quitar anotación')); });
    const kinds = { node: 'Componente', edge: 'Conexión', stage: 'Etapa', question: 'Pregunta', sizing: 'Sizing', estimate: 'Sizing', requirement: 'Requisito', decision: 'Decisión' };
    detail.querySelector('.annotation-kind').textContent = t(kinds[value?.kind] || 'Contexto seleccionado');
    detail.querySelector('#annotation-title').textContent = value?.label || '';
    detail.querySelector('.annotation-description').textContent = value?.description || '';
    if (value) { element.dataset.kind = value.kind; element.dataset.id = value.id; }
    else { delete element.dataset.kind; delete element.dataset.id; }
    if (container && element.parentElement !== container) container.prepend(element);
  } };
}

export const chatAnnotationStyles = `
  #text-input-container { min-width:0; max-width:100%; overflow-x:clip; }
  #text-input-container:has(#certichat-annotation:not([hidden])) { flex-direction:column; }
  #text-input { min-width:0; max-width:100%; box-sizing:border-box; overflow-x:hidden; }
  #certichat-annotation { align-self:flex-start; min-width:0; max-width:calc(100% - 24px); margin:8px 12px 0; color:var(--ink); font-family:inherit; font-size:12px; line-height:1.4; }
  #certichat-annotation[hidden] { display:none; }
  .annotation-chip { display:inline-flex; align-items:center; max-width:100%; border:1px solid var(--line); border-radius:18px; background:var(--hover); }
  #certichat-annotation button { display:inline-flex; align-items:center; justify-content:center; gap:6px; flex:none; border:1px solid transparent; border-radius:16px; background:transparent; color:var(--ink); font:inherit; min-height:30px; padding:4px 8px; cursor:pointer; }
  #certichat-annotation button[data-annotation-remove] { width:28px; padding:4px; }
  #certichat-annotation button:is(:hover,:focus-visible) { color:var(--red); border-color:var(--red); }
  #certichat-annotation button:focus-visible { outline:2px solid var(--red); outline-offset:2px; }
  #certichat-annotation button[aria-expanded=true], #certichat-annotation button[aria-expanded=true]:hover { background:var(--red); color:var(--on-red); border-color:var(--red); }
  #certichat-annotation-detail { position:fixed; inset:auto; box-sizing:border-box; margin:0; padding:14px; border:1px solid var(--line); border-top:4px solid var(--red); border-radius:12px; color:var(--ink); background:var(--paper); box-shadow:0 8px 28px var(--shadow); overflow:auto; overflow-wrap:anywhere; font-family:inherit; font-size:13px; line-height:1.5; }
  #certichat-annotation-detail header { display:flex; align-items:center; gap:8px; }
  #certichat-annotation-detail header button { margin-left:auto; }
  .annotation-preview { display:grid; place-items:center; width:32px; height:28px; border:1px solid var(--line); border-radius:6px; background:var(--hover); }
  .annotation-kind { padding:1px 7px; border:1px solid var(--line); border-radius:10px; color:var(--muted); font-size:11px; }
  #certichat-annotation-detail p { margin:10px 0 0; }
  #annotation-title { font-weight:600; }
  #certichat-annotation-detail .annotation-description { color:var(--muted); }
  #certichat-annotation-detail .annotation-description:empty { display:none; }
  .annotation-icon { display:inline-block; flex:none; width:15px; height:15px; background:currentColor; mask:center/contain no-repeat; }
  .annotation-message { mask-image:url("${new URL('./icons/lucide-message-square.svg', import.meta.url).href}"); }
  .annotation-trash { mask-image:url("${new URL('./icons/lucide-trash.svg', import.meta.url).href}"); }
  .annotation-close { mask-image:url("${new URL('./icons/voice-exit.svg', import.meta.url).href}"); }
`;
