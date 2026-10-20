import { t, localizedURL, language } from './i18n.js?v=845612f31882';
import { readTrace, sourcePath } from './certichat-trace.js?v=845612f31882';
import { createPilotState, applyPilotProgress, setPilotBanks, showPilotTrace, pilotNodeCollection, pilotColors } from './certichat-pilot-state.js?v=845612f31882';

let mounted;
const instances = new WeakMap();
export const getGraphPilotDebug = root => instances.get(root)?.debug() || null;
export const resetGraphPilotPerformance = root => instances.get(root)?.resetPerformance();

export function mountGraphPilot(scope = document) {
  const parentSignal = scope instanceof AbortSignal ? scope : null;
  if (parentSignal) scope = document;
  const root = scope.matches?.('[data-graph-pilot]') ? scope : scope.querySelector('[data-graph-pilot]');
  if (mounted?.root === root) { const current = mounted; parentSignal?.addEventListener('abort', () => current.destroy(), { once: true }); return current; }
  mounted?.destroy();
  if (!root) return null;
  const canvas = root.querySelector('[data-pilot-canvas]'), status = root.querySelector('[data-pilot-status]');
  const selection = root.querySelector('[data-pilot-selection]');
  const siteRoot = document.querySelector('[data-certichat]')?.dataset.siteRoot || new URL(root.dataset.siteRoot, location.href).href;
  const apiBase = document.querySelector('[data-certichat]')?.dataset.api || root.dataset.apiBase;
  const abort = new AbortController(), signal = abort.signal;
  const element = (tag, text) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; return node; };
  const viewport = canvas.parentElement;
  let labels = root.querySelector('[data-pilot-labels]');
  if (!labels) { labels = element('div'); labels.dataset.pilotLabels = ''; viewport.append(labels); }
  labels.classList.add('graph-pilot-labels');
  const renderStatus = element('p'); renderStatus.className = 'graph-pilot-render-status'; renderStatus.setAttribute('role', 'status'); renderStatus.hidden = true; viewport.append(renderStatus);
  const concepts = root.querySelector('[data-pilot-concepts]'), relations = root.querySelector('[data-pilot-relations]');
  const card = root.querySelector('[data-pilot-card]'), connector = root.querySelector('[data-pilot-card-connector]');
  const activeFit = root.querySelector('[data-pilot-active-fit]'), zoom = root.querySelector('[data-pilot-zoom]');
  const replayButton = root.querySelector('[data-pilot-replay]'), reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const walk = root.querySelector('[data-pilot-walk]');
  const scrollButtons = [...root.querySelectorAll('[data-pilot-scroll]')];
  const timestamp = new Intl.DateTimeFormat(language, { timeZone: 'America/Lima', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  const sourceName = id => ({ certitips: 'tips', certitube: 'tube', certisearch: 'search' })[id] || 'unknown';
  let follow = true, generatedAt, checkedAt, indexing = false, healthRequest;
  const updating = element('span'); updating.className = 'certichat-spinner chat-graph-updating';
  updating.hidden = true; updating.setAttribute('role', 'status'); updating.setAttribute('aria-label', t('Actualizando el índice de conocimiento'));
  function updateScroll() {
    scrollButtons[0].disabled = concepts.scrollLeft <= 4;
    scrollButtons[1].disabled = concepts.scrollLeft >= concepts.scrollWidth - concepts.clientWidth - 4;
  }
  for (const button of scrollButtons) button.addEventListener('click', () => concepts.scrollBy({ left: Number(button.dataset.pilotScroll) * concepts.clientWidth * .8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }), { signal });
  concepts.addEventListener('scroll', updateScroll, { signal, passive: true });
  const stripSize = new ResizeObserver(updateScroll); stripSize.observe(concepts);
  function anchorCard(anchor) {
    card.hidden = !anchor; connector.toggleAttribute('hidden', !anchor);
    if (!anchor) return;
    const left = Math.max(8, Math.min(anchor.x - card.offsetWidth / 2, anchor.width - card.offsetWidth - 54));
    const top = Math.max(8, Math.min(anchor.y - card.offsetHeight - 18, anchor.height - card.offsetHeight - 54));
    card.style.left = `${left}px`; card.style.top = `${top}px`;
    const line = connector.querySelector('line');
    line.setAttribute('x1', Math.max(left + 8, Math.min(anchor.x, left + card.offsetWidth - 8)));
    line.setAttribute('y1', top + card.offsetHeight); line.setAttribute('x2', anchor.x); line.setAttribute('y2', anchor.y);
  }
  const compact = matchMedia('(max-width: 800px)');
  let state, banks, scene, serverLoaded = false, events = [], selectedId, sceneRevision = 0, bankRequest, bankTimer;
  let animating = false;
  let hoveredBank = null, focusedBank = null;
  const enabledBanks = new Set();
  const previewLegend = () => scene?.preview([...new Set([...enabledBanks, hoveredBank, focusedBank].filter(Boolean))]);
  for (const chip of root.querySelectorAll('.chat-graph-legend [data-source]')) {
    const bank = { tips: 'certitips', tube: 'certitube', search: 'certisearch' }[chip.dataset.source];
    const preview = previewLegend;
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      if (enabledBanks.has(bank)) enabledBanks.delete(bank); else enabledBanks.add(bank);
      chip.setAttribute('aria-pressed', String(enabledBanks.has(bank))); preview();
    }, { signal });
    chip.addEventListener('pointerdown', () => { focusedBank = null; }, { signal });
    chip.addEventListener('pointerenter', () => { hoveredBank = bank; preview(); }, { signal });
    chip.addEventListener('pointerleave', () => { hoveredBank = null; preview(); }, { signal });
    chip.addEventListener('focus', () => { focusedBank = chip.matches(':focus-visible') ? bank : null; preview(); }, { signal });
    chip.addEventListener('blur', () => { focusedBank = null; preview(); }, { signal });
  }
  function motionControl(running = animating) {
    animating = running; root.dataset.animating = String(running);
    const label = reducedMotion.matches ? t('Animación desactivada por la preferencia de movimiento reducido.') : running ? t('Detener animación') : state?.active.size ? t('Repetir animación') : t('Girar mapa');
    replayButton.disabled = reducedMotion.matches || !scene || !state || !running && state.active.size > 0 && (state.provisional || state.mismatch);
    replayButton.title = label; replayButton.setAttribute('aria-label', label);
    replayButton.setAttribute('aria-pressed', String(running));
    replayButton.querySelector('use').setAttribute('href', new URL(`./icons/lucide-${running ? 'square' : 'play'}.svg`, import.meta.url).href);
  }
  function dismiss() {
    if (!selectedId) return;
    selectedId = undefined; selection.textContent = ''; card.hidden = true; connector.setAttribute('hidden', '');
    for (const button of concepts.querySelectorAll('button')) button.setAttribute('aria-pressed', 'false');
    scene?.clearSelection();
  }
  document.addEventListener('click', event => {
    if (![card, canvas, concepts].some(node => event.composedPath().includes(node))) dismiss();
  }, { signal });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); }, { signal });
  function select(id, center = false) {
    if (!id) { dismiss(); return; }
    const node = state?.graph.byId.get(id); if (!node) return;
    selectedId = id;
    const bank = pilotNodeCollection(state, id);
    root.style.setProperty('--pilot-color', pilotColors[bank]); card.dataset.source = sourceName(bank);
    const title = root.querySelector('[data-pilot-card-title]'); title.replaceChildren();
    const tag = [...concepts.querySelectorAll('button')].find(button => button.dataset.nodeId === id);
    const ordinal = tag?.querySelector('.chat-graph-number')?.textContent;
    if (ordinal) { const number = element('span', ordinal); number.className = 'chat-graph-number'; title.append(number); }
    title.append(element('span', t(node.label)));
    const target = root.querySelector('[data-pilot-card-sources]'); target.replaceChildren();
    const sources = state.sources.filter(source => source.nodeId === id);
    if (!sources.length) target.append(element('p', t('Sin referencia asociada a esta consulta.')));
    for (const source of sources) {
      const path = sourcePath(source.url, siteRoot); if (!path) continue;
      const link = element('a', t(source.title)); link.href = localizedURL(path); link.title = t(source.title);
      link.dataset.source = /(?:^|\/)certisearch\//.test(path) ? 'search' : /(?:^|\/)certitube\//.test(path) ? 'tube' : 'tips'; link.setAttribute('aria-label', t('Profundizar: {title}', { title: t(source.title) })); target.append(link);
    }
    const count = state.edges.filter(edge => edge.source === id || edge.target === id).length;
    selection.textContent = t('{label}. {count} relaciones en la evidencia mostrada.', { label: t(node.label), count });
    for (const button of concepts.querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.nodeId === id));
    card.hidden = false;
    scene?.select(id, center);
    const button = [...concepts.querySelectorAll('button')].find(button => button.dataset.nodeId === id);
    if (button) concepts.scrollTo({ left: concepts.scrollLeft + button.getBoundingClientRect().left - concepts.getBoundingClientRect().left - (concepts.clientWidth - button.offsetWidth) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function statusMessage() {
    if (state.mismatch) return t('El mapa y la consulta corresponden a versiones distintas. Actualiza la página para cargar el mapa publicado más reciente.');
    const messages = {
      idle: t('Haz una consulta en CertiChat para recorrer sus fuentes verificadas.'), accepted: t('Consulta admitida. Esperando los métodos de búsqueda.'),
      'search.started': t('Buscando información. Los métodos se muestran cuando el servidor los confirma.'),
      'search.completed': t('Método de búsqueda completado.'), 'search.failed': t('Un método de búsqueda no está disponible; la consulta puede continuar con los demás.'),
      candidates: t('Candidatos recuperados. Todavía no son fuentes de la respuesta.'), 'context.selected': t('Contexto seleccionado. Preparando la respuesta.'),
      'answer.started': t('Generando y validando la respuesta.'), complete: state.cached ? t('Respuesta recuperada de la misma solicitud; no se repite la búsqueda.') : t('Respuesta validada. Se muestran únicamente sus conceptos y fuentes finales.'),
      error: t('La consulta no se completó. No hay información que resaltar.'), history: t('Evidencia de una respuesta guardada; no se ha realizado otra búsqueda.'),
      'legacy.complete': t('Respuesta final disponible. Esta conexión no notifica avances de búsqueda.'),
    };
    return messages[state.phase] || '';
  }
  function renderMethods() {
    const target = root.querySelector('[data-pilot-methods]'); target.replaceChildren();
    const names = { document: t('Documentos'), lexical: t('Coincidencias de texto'), graph: t('Relaciones del grafo') };
    const phases = { started: t('Buscando'), completed: t('Completado'), failed: t('No disponible') };
    for (const [lane, phase] of state.lanes) { const row = element('div'); row.dataset.lane = lane; row.dataset.state = phase; row.append(element('dt', names[lane]), element('dd', phases[phase])); target.append(row); }
    if (!state.lanes.size) target.append(element('p', t('Sin métodos notificados.')));
  }
  function renderCollections() {
    const target = root.querySelector('[data-pilot-collections]'); target.replaceChildren();
    for (const bank of state.collections) {
      const row = element('li'), count = [...state.active].filter(id => state.memberships.get(id)?.has(bank.id)).length;
      const legend = root.querySelector(`.chat-graph-legend [data-source="${sourceName(bank.id)}"]`);
      legend.title = bank.available ? bank.label : `${bank.label} · ${t('Sin documentos indexados')}`;
      legend.setAttribute('aria-label', legend.title); legend.dataset.available = String(bank.available);
      row.dataset.bankId = bank.id; row.dataset.available = String(bank.available);
      row.append(element('strong', bank.label), element('span', bank.available ? t('{count} conceptos recuperados · {documents} documentos indexados', { count, documents: bank.documentCount }) : t('Sin documentos indexados'))); target.append(row);
    }
    if (!state.collections.length) target.append(element('li', state.bankMismatch ? t('La procedencia de las colecciones se está actualizando. Los conceptos permanecen neutrales.') : t('La procedencia por colección no está disponible. Los conceptos permanecen neutrales.')));
  }
  function renderEvidence() {
    const target = root.querySelector('[data-pilot-sources]'); target.replaceChildren();
    const sources = [...new Map(state.sources.map(source => [source.url, source])).values()];
    for (const source of sources) {
      const path = sourcePath(source.url, siteRoot); if (!path) continue;
      const row = element('li'), link = element('a', t(source.title)); link.href = localizedURL(path); link.title = t(source.title); row.append(link); target.append(row);
    }
    if (!sources.length) target.append(element('li', state.provisional ? t('Las fuentes finales aparecerán después de validar la respuesta.') : t('Sin referencias asociadas.')));
    concepts.replaceChildren(); relations.replaceChildren();
    for (const id of [...state.active].sort((a, b) => t(state.graph.byId.get(a).label).localeCompare(t(state.graph.byId.get(b).label), language, { numeric: true, sensitivity: 'base' }))) {
      const row = element('li'), button = element('button');
      const number = element('span', String(concepts.children.length + 1)), label = element('span', t(state.graph.byId.get(id).label)); number.className = 'chat-graph-number'; label.className = 'chat-graph-label'; button.append(number, label); button.dataset.source = sourceName(pilotNodeCollection(state, id)); button.type = 'button'; button.dataset.nodeId = id; button.setAttribute('aria-pressed', String(id === selectedId)); button.addEventListener('click', () => select(id, true), { signal }); row.append(button); concepts.append(row);
    }
    for (const edge of state.edges) relations.append(element('li', `${t(state.graph.byId.get(edge.source).label)} → ${t(edge.label)} → ${t(state.graph.byId.get(edge.target).label)}`));
  }
  function renderMeta() {
    const target = root.querySelector('[data-pilot-meta]'); target.replaceChildren();
    const when = checkedAt || generatedAt, date = new Date(when);
    for (const [name, value] of [[t('Conceptos'), `${state.active.size}/${state.graph.nodes.length.toLocaleString(language)}`], [t('Relaciones'), `${state.edges.length}/${state.graph.edges.length.toLocaleString(language)}`], [t('Actualización'), Number.isFinite(date.getTime()) ? timestamp.format(date).replaceAll('/', '-').replace(',', '') : t('fecha no disponible')], [t('Versión'), state.graphVersion.slice(0, 12)]]) {
      const item = element('div'); item.append(element('dt', name), element('dd', value)); target.append(item);
    }
    const version = target.lastElementChild.querySelector('dd');
    version.title = state.graphVersion; version.setAttribute('aria-busy', String(indexing));
    updating.hidden = !indexing; version.append(updating);
  }
  function render(shouldFollow = follow) {
    status.textContent = statusMessage(); root.dataset.phase = state.phase; root.dataset.provisional = String(state.provisional); root.dataset.versionMismatch = String(state.mismatch);
    if (!selectedId) { card.hidden = true; connector.setAttribute('hidden', ''); }
    renderMethods(); renderCollections(); renderEvidence(); renderMeta(); updateScroll(); activeFit.disabled = !state.active.size; scene?.update(state, shouldFollow);
    motionControl();
  }
  function progress(event) {
    const value = event.detail;
    if (!value || !['accepted', 'search.started', 'search.completed', 'search.failed', 'candidates', 'context.selected', 'answer.started', 'complete', 'error'].includes(value.type)) return;
    if (value.type === 'accepted' && events[0]?.requestId !== value.requestId) events = [];
    if (!events.some(item => item.requestId === value.requestId && item.seq === value.seq)) events.push(value);
    events = events.slice(-256);
    if (state && applyPilotProgress(state, value)) {
      if (['accepted', 'candidates', 'context.selected', 'complete', 'error'].includes(value.type)) { selectedId = undefined; selection.textContent = ''; scene?.clearSelection(); }
      render(); if (state.bankMismatch) refreshBanks();
    }
  }
  document.addEventListener('certichat:progress', progress, { signal }); window.addEventListener('certichat:progress', progress, { signal });
  window.addEventListener('certichat:presentation', event => {
    const detail = event.detail;
    if (!state || !detail || !Number.isFinite(detail.progress) || detail.progress < 0 || detail.progress > 1) return;
    if (state.phase !== 'complete' || detail.requestId !== state.requestId) return;
    scene?.present(detail.progress);
  }, { signal });
  window.addEventListener('certichat:focus', event => { if (state && (!state.requestId || state.terminal)) { selectedId = undefined; showPilotTrace(state, event.detail); render(); } }, { signal });
  function clearTrace() { if (state) { selectedId = undefined; events = []; state.requestId = null; state.terminal = false; showPilotTrace(state, null); state.lanes.clear(); render(false); } }
  window.addEventListener('certichat:cleared', clearTrace, { signal });
  window.addEventListener('certichat:trace', event => {
    if (!state) return;
    if (event.detail?.status === 'idle') clearTrace();
    else if (event.detail?.status === 'loading') { events = []; state.requestId = null; state.terminal = false; showPilotTrace(state, null); state.phase = 'loading'; state.lanes.clear(); render(); }
    else if (event.detail?.status === 'ready' && !state.requestId) { showPilotTrace(state, event.detail.trace, 'legacy.complete'); state.terminal = true; render(); }
  }, { signal });
  root.querySelector('[data-pilot-fit]').addEventListener('click', () => { follow = true; root.dataset.followPaused = 'false'; scene?.fit(); }, { signal });
  activeFit.addEventListener('click', () => { follow = true; root.dataset.followPaused = 'false'; scene?.fitActive(); }, { signal });
  root.querySelector('[data-pilot-zoom-in]').addEventListener('click', () => scene?.zoom(1.25), { signal });
  root.querySelector('[data-pilot-zoom-out]').addEventListener('click', () => scene?.zoom(.8), { signal });
  replayButton.addEventListener('click', () => {
    if (animating) { scene?.stop(); return; }
    dismiss(); follow = true; root.dataset.followPaused = 'false'; scene?.replay();
  }, { signal });
  window.addEventListener('certichat:stop', () => scene?.stop(), { signal });
  window.addEventListener('certivoice:command', event => { if (['stop', 'interrupt', 'exit'].includes(event.detail)) scene?.stop(); }, { signal });
  reducedMotion.addEventListener('change', () => { if (state) render(false); }, { signal });
  async function json(url, api = false) { const response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]), ...(api ? { headers: { 'X-CertiChat': '1' }, cache: 'no-store' } : {}) }); if (!response.ok) throw new Error('Graph unavailable'); return response.json(); }
  function refreshBanks() {
    if (!apiBase || bankRequest || bankTimer || signal.aborted) return;
    bankRequest = json(`${apiBase}/api/graph/banks`, true).then(data => { banks = data; if (state && !signal.aborted) { setPilotBanks(state, banks); render(); } }).catch(() => {}).finally(() => {
      bankRequest = null;
      if (!signal.aborted && state?.bankMismatch) bankTimer = setTimeout(() => { bankTimer = null; refreshBanks(); }, 30000);
    });
  }
  function install(snapshot, server = false) {
    if (signal.aborted || serverLoaded && !server) return;
    const next = createPilotState(snapshot, banks, siteRoot);
    if (!next.graph.nodes.length) throw new Error('Graph empty');
    if (events.length) for (const event of events) applyPilotProgress(next, event); else { const saved = readTrace(siteRoot); if (saved) showPilotTrace(next, saved); }
    generatedAt = snapshot.generatedAt; state = next; serverLoaded ||= server; render(); if (state.bankMismatch) refreshBanks();
  }
  const tasks = [];
  if (root.dataset.graphUrl) tasks.push(json(root.dataset.graphUrl).then(data => install(data)));
  if (apiBase) {
    tasks.push(json(`${apiBase}/api/graph`, true).then(data => install(data, true)));
    tasks.push(json(`${apiBase}/api/graph/banks`, true).then(data => { banks = data; if (state) { setPilotBanks(state, banks); render(); } }));
  }
  function refreshHealth() {
    if (!apiBase || document.hidden || signal.aborted || healthRequest) return;
    healthRequest = json(`${apiBase}/api/health`, true).then(data => {
      indexing = data.knowledge?.indexing === true; checkedAt = data.knowledge?.checkedAt;
    }).catch(() => { indexing = false; }).finally(() => { healthRequest = null; if (state && !signal.aborted) renderMeta(); });
    return healthRequest;
  }
  tasks.push(refreshHealth());
  const healthTimer = setInterval(refreshHealth, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshHealth(); }, { signal });
  Promise.allSettled(tasks).then(() => { if (!signal.aborted && !state) status.textContent = t('No se pudo cargar la instantánea del mapa. Actualiza la página para volver a intentarlo.'); });
  function availability(available) {
    root.dataset.renderer = available ? 'webgl2' : 'fallback'; canvas.hidden = !available; labels.hidden = !available; renderStatus.hidden = available;
    root.querySelector('[data-pilot-fallback]').hidden = available;
    if (!available) { renderStatus.textContent = compact.matches ? t('En pantalla pequeña se muestra la búsqueda como lista accesible de conceptos y fuentes.') : t('La vista 3D no está disponible. Puedes explorar los métodos, conceptos y fuentes de la consulta en esta página.'); }
  }
  async function configureRenderer() {
    const revision = ++sceneRevision; scene?.destroy(); scene = undefined;
    if (compact.matches) { availability(false); return; }
    try {
      const { createPilotScene } = await import('./certichat-pilot-scene.js?v=845612f31882');
      if (signal.aborted || revision !== sceneRevision) return;
      availability(true); canvas.dataset.disposed = 'false';
      scene = createPilotScene(canvas, labels, select, () => { follow = false; root.dataset.followPaused = 'true'; }, availability, anchorCard, value => { zoom.textContent = `${Math.round(value * 100)}%`; }, (running, bank = '') => {
        root.dataset.replaying = String(running); root.dataset.replayBank = bank; replayButton.setAttribute('aria-busy', String(running));
        status.textContent = running ? t('Reproduciendo la animación del último resultado. No se realiza otra consulta.') : statusMessage();
      }, activity => {
        walk.hidden = !activity;
        if (!activity) return;
        walk.style.setProperty('--walk-color', pilotColors[activity.bank]);
        root.querySelector('[data-pilot-walk-bank]').textContent = state.collections.find(bank => bank.id === activity.bank)?.label || t('Conceptos');
        root.querySelector('[data-pilot-walk-concepts]').textContent = activity.nodes.map(node => t(node.label)).join('\n');
      }, motionControl);
      if (state) scene.update(state, follow);
      previewLegend();
    } catch { if (!signal.aborted && revision === sceneRevision) availability(false); }
  }
  compact.addEventListener('change', configureRenderer, { signal }); void configureRenderer();
  const instance = {
    root,
    resetPerformance: () => scene?.resetPerformance(),
    debug: () => ({ phase: state?.phase || 'loading', graphVersion: state?.graphVersion, requestId: state?.requestId, seq: state?.seq, activeIds: [...(state?.active || [])], provisional: state?.provisional, sources: state?.sources.map(source => ({ ...source })), memberships: state ? [...state.memberships].map(([nodeId, values]) => ({ nodeId, banks: [...values] })) : [], renderer: scene?.stats(), follow, selectedId }),
    destroy() { if (signal.aborted) return; abort.abort(); clearTimeout(bankTimer); clearInterval(healthTimer); scene?.destroy(); stripSize.disconnect(); renderStatus.remove(); instances.delete(root); if (mounted === instance) mounted = undefined; },
  };
  parentSignal?.addEventListener('abort', () => instance.destroy(), { once: true });
  instances.set(root, instance); mounted = instance; return instance;
}

if (typeof document !== 'undefined' && document.querySelector('[data-graph-pilot]')) mountGraphPilot();
