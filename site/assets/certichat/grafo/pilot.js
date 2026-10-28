import { t, localizedURL, language } from '../../site/i18n.js?v=ebf266315b85';
import { readTrace, sourcePath } from '../trace.js?v=ebf266315b85';
import { createPilotState, validatePilotSnapshot, applyPilotProgress, setPilotBanks, showPilotTrace, pilotNodeCollection, pilotSourceCollection, pilotColors } from './state.js?v=ebf266315b85';

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
  const renderStatus = element('div'); renderStatus.className = 'graph-pilot-render-status'; renderStatus.setAttribute('role', 'status'); renderStatus.hidden = true; viewport.append(renderStatus);
  const concepts = root.querySelector('[data-pilot-concepts]'), relations = root.querySelector('[data-pilot-relations]');
  const card = root.querySelector('[data-pilot-card]'), connector = root.querySelector('[data-pilot-card-connector]');
  const contactCards = new Map();
  let contactSources, contactRevision;
  const activeFit = root.querySelector('[data-pilot-active-fit]'), zoom = root.querySelector('[data-pilot-zoom]');
  const replayButton = root.querySelector('[data-pilot-replay]'), reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const walk = root.querySelector('[data-pilot-walk]');
  const scrollButtons = [...root.querySelectorAll('[data-pilot-scroll]')];
  const number = new Intl.NumberFormat(language, { useGrouping: 'always' });
  const timestamp = new Intl.DateTimeFormat(language, { timeZone: 'America/Lima', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  const sourceName = id => ({ certitips: 'tips', certiquiz: 'quiz', certitube: 'tube', certirss: 'rss', certisearch: 'search', cognee: 'cognee' })[id] || 'unknown';
  let discoveryCounts = { nodes: 0, edges: 0 };
  let follow = true, generatedAt, checkedAt, indexing = false, healthRequest;
  const freshness = element('span'); freshness.className = 'graph-pilot-freshness'; freshness.dataset.pilotFreshness = ''; freshness.hidden = true; freshness.setAttribute('role', 'img');
  const updating = element('span'); updating.className = 'certichat-spinner chat-graph-updating';
  updating.hidden = true; updating.setAttribute('role', 'status'); updating.setAttribute('aria-label', t('Actualizando el índice de conocimiento'));
  function updateScroll() {
    scrollButtons[0].disabled = concepts.scrollLeft <= 4;
    scrollButtons[1].disabled = concepts.scrollLeft >= concepts.scrollWidth - concepts.clientWidth - 4;
  }
  let scrollFeedback;
  /** Momentary feedback shared by wheel and native button activation, without moving focus. */
  function scrollConcepts(delta, behavior) {
    const available = delta > 0 ? concepts.scrollWidth - concepts.clientWidth - concepts.scrollLeft : concepts.scrollLeft;
    if (!delta || available <= 1) return false;
    concepts.scrollBy({ left: delta, behavior });
    for (const button of scrollButtons) button.classList.toggle('is-scrolling', Number(button.dataset.pilotScroll) === Math.sign(delta));
    clearTimeout(scrollFeedback);
    scrollFeedback = setTimeout(() => scrollButtons.forEach(button => button.classList.remove('is-scrolling')), 200);
    return true;
  }
  for (const button of scrollButtons) button.addEventListener('click', () => scrollConcepts(Number(button.dataset.pilotScroll) * concepts.clientWidth * .8, reducedMotion.matches ? 'instant' : 'smooth'), { signal });
  concepts.closest('.chat-graph-evidence').addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey) return;
    const unit = event.deltaMode === 1 ? parseFloat(getComputedStyle(concepts).lineHeight) || 16 : event.deltaMode === 2 ? concepts.clientWidth : 1;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (scrollConcepts(delta * unit, 'instant')) event.preventDefault();
  }, { signal, passive: false });
  signal.addEventListener('abort', () => { clearTimeout(scrollFeedback); scrollButtons.forEach(button => button.classList.remove('is-scrolling')); }, { once: true });
  concepts.addEventListener('scroll', updateScroll, { signal, passive: true });
  const stripSize = new ResizeObserver(updateScroll); stripSize.observe(concepts);
  function anchorCard(anchor, target = card, lineLayer = connector, occupied = []) {
    target.hidden = !anchor; lineLayer.toggleAttribute('hidden', !anchor);
    if (!anchor) return;
    // Preserve fractional projection coordinates so slow camera motion never snaps to pixels.
    const { width, height } = target.getBoundingClientRect();
    const maxLeft = Math.max(8, anchor.width - width - 54), maxTop = Math.max(8, anchor.height - height - 54);
    const clampX = x => Math.max(8, Math.min(x, maxLeft));
    const clampY = y => Math.max(8, Math.min(y, maxTop));
    const preferred = { left: clampX(anchor.x - width / 2), top: clampY(anchor.y - height - 18) };
    // Try nearby free rectangles before moving to an edge; leave space for map controls.
    const xs = [preferred.left, 8, maxLeft, ...occupied.flatMap(box => [box.left - width - 8, box.left + box.width + 8])].map(clampX);
    const ys = [preferred.top, 8, maxTop, ...occupied.flatMap(box => [box.top - height - 8, box.top + box.height + 8])].map(clampY);
    let placement = preferred, score = Infinity;
    for (const left of xs) for (const top of ys) {
      if (occupied.some(box => left < box.left + box.width + 8 && left + width + 8 > box.left && top < box.top + box.height + 8 && top + height + 8 > box.top)) continue;
      const distance = (left - preferred.left) ** 2 + (top - preferred.top) ** 2;
      if (distance < score) { placement = { left, top }; score = distance; }
    }
    const { left, top } = placement;
    target.style.left = `${left}px`; target.style.top = `${top}px`;
    const line = lineLayer.querySelector('line');
    line.setAttribute('x1', Math.max(left + 8, Math.min(anchor.x, left + width - 8)));
    line.setAttribute('y1', top + height); line.setAttribute('x2', anchor.x); line.setAttribute('y2', anchor.y);
    return { left, top, width, height };
  }
  /** Reconcile all current contacts independently; retain their DOM until that foot leaves. */
  function syncContactCards(anchors) {
    const ids = new Set(anchors.map(anchor => anchor.id));
    for (const [id, nodes] of contactCards) if (!ids.has(id)) { nodes.card.remove(); nodes.connector.remove(); contactCards.delete(id); }
    const occupied = card.hidden ? [] : [{ left: parseFloat(card.style.left), top: parseFloat(card.style.top), width: card.getBoundingClientRect().width, height: card.getBoundingClientRect().height }];
    const sourcesChanged = contactSources !== state?.sources || contactRevision !== state?.layoutRevision;
    contactSources = state?.sources; contactRevision = state?.layoutRevision;
    for (const anchor of anchors) {
      let nodes = contactCards.get(anchor.id), created = false;
      if (!nodes) {
        const detail = card.cloneNode(true), line = connector.cloneNode(true);
        detail.removeAttribute('data-pilot-card'); detail.dataset.pilotContactCard = anchor.id;
        for (const part of ['title', 'sources']) {
          const child = detail.querySelector(`[data-pilot-card-${part}]`);
          child.removeAttribute(`data-pilot-card-${part}`); child.setAttribute(`data-pilot-contact-${part}`, '');
        }
        line.removeAttribute('data-pilot-card-connector'); line.dataset.pilotContactConnector = anchor.id;
        viewport.insertBefore(line, card); viewport.insertBefore(detail, card);
        nodes = { card: detail, connector: line }; contactCards.set(anchor.id, nodes); created = true;
      }
      if (created || sourcesChanged) renderCard(anchor.id, nodes.card, nodes.connector);
      occupied.push(anchorCard(anchor, nodes.card, nodes.connector, occupied));
    }
  }
  const compact = matchMedia('(max-width: 800px)');
  let state, banks, scene, serverLoaded = false, events = [], selectedId, sceneRevision = 0, bankRequest, snapshotRequest, lastBankCheck, nextSnapshotCheck = 0;
  let animating = false, loadFailed = false, serverSettled = !apiBase, banksPending = Boolean(apiBase), snapshotRetry = false;
  const enabledBanks = new Set();
  // Native button activation (click, Enter or Space) alone changes the selected source layers.
  const updateLegendSelection = () => scene?.preview([...enabledBanks]);
  for (const chip of root.querySelectorAll('.chat-graph-legend [data-source]')) {
    const bank = { tips: 'certitips', quiz: 'certiquiz', tube: 'certitube', rss: 'certirss', search: 'certisearch', cognee: 'cognee' }[chip.dataset.source];
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      if (enabledBanks.has(bank)) enabledBanks.delete(bank); else enabledBanks.add(bank);
      chip.setAttribute('aria-pressed', String(enabledBanks.has(bank))); updateLegendSelection();
    }, { signal });
  }
  function motionControl(running = animating) {
    animating = running; root.dataset.animating = String(running);
    const label = running ? t('Detener') : t('Reproducir');
    if (reducedMotion.matches) replayButton.setAttribute('aria-description', t('Animación desactivada por la preferencia de movimiento reducido.'));
    else replayButton.removeAttribute('aria-description');
    replayButton.disabled = reducedMotion.matches || !scene || !state || !running && !selectedId && state.active.size > 0 && (state.provisional || state.mismatch);
    replayButton.title = label; replayButton.setAttribute('aria-label', label);
    replayButton.setAttribute('aria-pressed', String(running));
    replayButton.querySelector('use').setAttribute('href', new URL(`../../icons/lucide-${running ? 'square' : 'play'}.svg`, import.meta.url).href);
  }
  function dismiss() {
    if (!selectedId) return;
    selectedId = undefined; selection.textContent = ''; card.hidden = true; connector.setAttribute('hidden', '');
    for (const button of concepts.querySelectorAll('button')) button.setAttribute('aria-pressed', 'false');
    scene?.clearSelection(); motionControl();
  }
  document.addEventListener('click', event => {
    if (event.composedPath().some(node => node instanceof Element && node.hasAttribute('data-pilot-contact-card'))) return;
    if (![card, canvas, concepts, root.querySelector('.chat-graph-toolbar')].some(node => event.composedPath().includes(node))) dismiss();
  }, { signal });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); }, { signal });
  function renderCard(id, targetCard = card, targetConnector = connector) {
    const node = state?.graph.byId.get(id); if (!node) return;
    const bank = pilotNodeCollection(state, id);
    const color = bank === 'certiquiz' ? 'var(--quiz-accent)' : pilotColors[bank];
    targetCard.style.setProperty('--pilot-color', color); targetConnector.style.setProperty('--pilot-color', color); targetCard.dataset.source = sourceName(bank);
    const title = targetCard.querySelector('[data-pilot-card-title], [data-pilot-contact-title]'); title.replaceChildren();
    const tag = [...concepts.querySelectorAll('button')].find(button => button.dataset.nodeId === id);
    const ordinal = tag?.querySelector('.chat-graph-number')?.textContent;
    if (ordinal) { const number = element('span', ordinal); number.className = 'chat-graph-number'; title.append(number); }
    title.append(element('span', t(node.label)));
    const target = targetCard.querySelector('[data-pilot-card-sources], [data-pilot-contact-sources]'); target.replaceChildren();
    const sources = state.sources.filter(source => source.nodeId === id);
    for (const source of sources) {
      const path = sourcePath(source.url, siteRoot); if (!path) continue;
      const link = element('a', t(source.title)); link.href = localizedURL(path); link.dataset.sourceUrl = source.url; link.title = t(source.title);
      link.dataset.source = sourceName(pilotSourceCollection(source.url)); link.setAttribute('aria-label', t('Profundizar: {title}', { title: t(source.title) })); target.append(link);
    }
    target.hidden = target.childElementCount === 0;
    targetCard.hidden = false;
  }
  function select(id, center = false) {
    if (!id) { dismiss(); return; }
    const node = state?.graph.byId.get(id); if (!node) return;
    selectedId = id; renderCard(id);
    const count = state.edges.filter(edge => edge.source === id || edge.target === id).length;
    selection.textContent = t('{label}. {count} relaciones en la evidencia mostrada.', { label: t(node.label), count });
    for (const button of concepts.querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.nodeId === id));
    card.hidden = false;
    scene?.select(id, center); motionControl();
    const button = [...concepts.querySelectorAll('button')].find(button => button.dataset.nodeId === id);
    if (button) concepts.scrollTo({ left: concepts.scrollLeft + button.getBoundingClientRect().left - concepts.getBoundingClientRect().left - (concepts.clientWidth - button.offsetWidth) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function statusMessage() {
    if (state.mismatch) return t('El mapa y la consulta corresponden a versiones distintas. Actualiza la página para cargar el mapa publicado más reciente.');
    const messages = {
      idle: t('Haz una consulta en CertiChat para recorrer sus fuentes verificadas.'), accepted: t('Consulta admitida. Esperando los métodos de búsqueda.'),
      'search.started': t('Buscando'),
      'search.completed': t('Método de búsqueda completado.'), 'search.failed': t('Un método de búsqueda no está disponible; la consulta puede continuar con los demás.'),
      candidates: t('Candidatos recuperados. Todavía no son fuentes de la respuesta.'), 'context.selected': t('Contexto seleccionado. Preparando la respuesta.'),
      'answer.started': t('Generando y validando la respuesta.'), complete: state.cached ? t('Respuesta recuperada de la misma solicitud; no se repite la búsqueda.') : t('Respuesta validada. Se muestran únicamente sus conceptos y fuentes finales.'),
      error: t('La consulta no se completó. No hay información que resaltar.'), history: t('Evidencia de una respuesta guardada; no se ha realizado otra búsqueda.'),
      'legacy.complete': t('Respuesta final disponible. Esta conexión no notifica avances de búsqueda.'),
    };
    return messages[state.phase] || '';
  }
  function renderCollections() {
    for (const legend of root.querySelectorAll('.chat-graph-legend [data-source]')) {
      const bank = state.collections.find(value => sourceName(value.id) === legend.dataset.source);
      legend.disabled = loadFailed || !bank?.available;
      legend.setAttribute('aria-busy', String(banksPending));
      legend.removeAttribute('title');
      legend.setAttribute('aria-label', bank?.available ? legend.textContent.trim() : `${legend.textContent.trim()} · ${t('Sin documentos indexados')}`); legend.dataset.available = String(Boolean(bank?.available));
    }
  }
  function renderEvidence() {
    concepts.replaceChildren(); relations.replaceChildren();
    for (const id of [...state.active].sort((a, b) => t(state.graph.byId.get(a).label).localeCompare(t(state.graph.byId.get(b).label), language, { numeric: true, sensitivity: 'base' }))) {
      const row = element('li'), button = element('button');
      const number = element('span', String(concepts.children.length + 1)), label = element('span', t(state.graph.byId.get(id).label)); number.className = 'chat-graph-number'; label.className = 'chat-graph-label'; button.append(number, label); button.dataset.source = sourceName(pilotNodeCollection(state, id)); button.type = 'button'; button.dataset.nodeId = id; button.setAttribute('aria-pressed', String(id === selectedId)); button.addEventListener('click', () => select(id, true), { signal }); row.append(button); concepts.append(row);
    }
    for (const edge of state.edges) relations.append(element('li', `${t(state.graph.byId.get(edge.source).label)} → ${t(edge.label)} → ${t(state.graph.byId.get(edge.target).label)}`));
  }
  function renderFreshness() {
    const warning = freshness;
    root.dataset.graphSource = loadFailed || !serverLoaded ? 'unavailable' : 'api';
    warning.hidden = !loadFailed;
    const message = t('No se pudo cargar la instantánea del mapa. Actualiza la página para volver a intentarlo.');
    warning.title = message; warning.setAttribute('aria-label', message);
  }
  function renderMeta() {
    const target = root.querySelector('[data-pilot-meta]'); target.replaceChildren();
    const processed = new Date(generatedAt), date = checkedAt || processed;
    const counts = root.dataset.renderer !== 'fallback' && !reducedMotion.matches ? discoveryCounts : { nodes: state.active.size, edges: state.edges.length };
    for (const [name, value] of [[t('Conceptos'), `${number.format(counts.nodes)}/${number.format(state.graph.nodes.length)}`], [t('Relaciones'), `${number.format(counts.edges)}/${number.format(state.graph.edges.length)}`], [t('Actualización'), Number.isFinite(date.getTime()) ? timestamp.format(date).replaceAll('/', '-').replace(',', '') : t('fecha no disponible')], [t('Versión'), state.graphVersion.slice(0, 12)]]) {
      const item = element('div'); item.append(element('dt', name), element('dd', value)); target.append(item);
    }
    const sync = target.children[2].querySelector('dd');
    sync.dataset.pilotSync = '';
    sync.title = t(checkedAt ? 'Última sincronización con el repositorio (hora de Perú, UTC−5). Índice generado el {when}.' : 'Índice generado el {when} (hora de Perú, UTC−5). Sincronización del repositorio pendiente de comprobar.', { when: Number.isFinite(processed.getTime()) ? timestamp.format(processed).replaceAll('/', '-').replace(',', '') : t('fecha no disponible') });
    const version = target.lastElementChild.querySelector('dd');
    version.title = state.graphVersion; version.setAttribute('aria-busy', String(indexing));
    updating.hidden = !indexing; version.append(updating, freshness);
  }
  function render(shouldFollow = follow) {
    if (loadFailed) { loadFailure(); return; }
    status.textContent = statusMessage(); root.dataset.phase = state.phase; root.dataset.provisional = String(state.provisional); root.dataset.versionMismatch = String(state.mismatch);
    if (!selectedId) { card.hidden = true; connector.setAttribute('hidden', ''); }
    renderCollections(); renderEvidence(); renderMeta(); renderFreshness(); updateScroll(); activeFit.disabled = !state.active.size; scene?.update(state, shouldFollow, serverLoaded || serverSettled);
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
    else if (event.detail?.status === 'error') scene?.stop(true);
    else if (event.detail?.status === 'loading') { events = []; state.requestId = null; state.terminal = false; showPilotTrace(state, null); state.phase = 'loading'; state.lanes.clear(); render(); }
    else if (event.detail?.status === 'ready' && !state.requestId) { showPilotTrace(state, event.detail.trace, 'legacy.complete'); state.terminal = true; render(); }
  }, { signal });
  root.querySelector('[data-pilot-fit]').addEventListener('click', () => { follow = true; root.dataset.followPaused = 'false'; scene?.fit(); }, { signal });
  activeFit.addEventListener('click', () => { follow = true; root.dataset.followPaused = 'false'; scene?.fitActive(); }, { signal });
  root.querySelector('[data-pilot-zoom-in]').addEventListener('click', () => scene?.zoom(1.25), { signal });
  root.querySelector('[data-pilot-zoom-out]').addEventListener('click', () => scene?.zoom(.8), { signal });
  replayButton.addEventListener('click', () => {
    if (animating) { scene?.stop(); return; }
    follow = !selectedId; root.dataset.followPaused = String(!follow); scene?.replay();
  }, { signal });
  window.addEventListener('certichat:stop', () => scene?.stop(true), { signal });
  window.addEventListener('certivoice:command', event => { if (['stop', 'interrupt', 'exit'].includes(event.detail)) scene?.stop(true); }, { signal });
  reducedMotion.addEventListener('change', () => { if (state) render(false); }, { signal });
  async function json(url, api = false) { const response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]), ...(api ? { headers: { 'X-CertiChat': '1' }, cache: 'no-store' } : {}) }); if (!response.ok) throw new Error('Graph unavailable'); return response.json(); }
  function refreshBanks() {
    if (!apiBase || bankRequest || snapshotRequest || signal.aborted) return;
    bankRequest = json(`${apiBase}/api/graph/banks`, true).then(data => {
      if (!state || signal.aborted) return;
      if (data?.version !== state.graphVersion || state.expectedContentVersion && data.contentVersion !== state.expectedContentVersion || !Array.isArray(data.banks) || !Array.isArray(data.memberships)) throw new Error('Incompatible memberships');
      validatePilotSnapshot({version:state.graphVersion,nodes:state.graph.nodes,edges:state.graph.edges},data);
      banks = data; if(!setPilotBanks(state, banks)) throw new Error('Incompatible memberships'); render(false);
    }).catch(() => { snapshotRetry = true; if(!signal.aborted) loadFailure(); }).finally(() => {
      bankRequest = null;
      if (!signal.aborted) { snapshotRetry ||= Boolean(state?.bankMismatch); renderFreshness(); }
    });
  }
  function install(snapshot, server = false, matchingBanks = banks) {
    if (signal.aborted || serverLoaded && !server) return;
    const next = createPilotState(snapshot, matchingBanks, siteRoot);
    if (!next.graph.nodes.length) throw new Error('Graph empty');
    if (events.length) for (const event of events) applyPilotProgress(next, event); else { const saved = readTrace(siteRoot); if (saved) showPilotTrace(next, saved); }
    renderStatus.classList.remove('graph-pilot-load-error');
    generatedAt = snapshot.generatedAt; state = next; banks = matchingBanks; serverLoaded ||= server;
    if (selectedId && !state.graph.byId.has(selectedId)) selectedId = undefined;
    const recovering=loadFailed; loadFailed=false;
    render(); if (selectedId) select(selectedId); if (state.bankMismatch) refreshBanks();
    if (recovering) { for (const button of root.querySelectorAll('.chat-graph-toolbar > button')) button.disabled = false; availability(root.dataset.renderer === 'webgl2'); renderCollections(); }
  }
  async function readSnapshot() {
    const first=await json(apiBase+'/api/health', true);
    const pair=await Promise.all([json(apiBase+'/api/graph',true),json(apiBase+'/api/graph/banks',true)]);
    const last=await json(apiBase+'/api/health', true);
    if(first.ok!==true || last.ok!==true || first.knowledge?.graphVersion!==last.knowledge?.graphVersion ||
        first.knowledge?.version!==last.knowledge?.version) throw new Error('Knowledge identity changed');
    validatePilotSnapshot(pair[0],pair[1],last.knowledge);
    return pair;
  }
  const tasks = [];
  if (apiBase) {
    snapshotRequest = readSnapshot()
      .then(([snapshot, matchingBanks]) => acceptSnapshot(snapshot, matchingBanks))
      .catch(error => { snapshotRetry = true; throw error; })
      .finally(() => { snapshotRequest = null; serverSettled = true; banksPending = false; if (state && !signal.aborted && !loadFailed) render(false); });
    tasks.push(snapshotRequest);
  }
  /** Reuse health identity; older backends receive a bounded full check every five minutes. */
  function needsSnapshot(version) {
    if (!serverLoaded || snapshotRetry) return true;
    if (/^[a-f0-9]{64}$/.test(version || '')) return version !== state?.graphVersion;
    return Date.now() >= nextSnapshotCheck;
  }
  /** Latest corpus membership can change while the active graph identity remains unchanged. */
  function refreshCurrentBanks(checkedAt) {
    if (Date.now() < nextSnapshotCheck && (!checkedAt || checkedAt === lastBankCheck)) return;
    lastBankCheck = checkedAt; nextSnapshotCheck = Date.now() + 300000; refreshBanks();
  }
  /** Validate the pair before mutating the visible snapshot; stale pairs keep the last good view. */
  function acceptSnapshot(snapshot, matchingBanks, checkedAt) {
    validatePilotSnapshot(snapshot, matchingBanks);
    const candidate = createPilotState(snapshot, matchingBanks, siteRoot);
    if (!candidate.graph.nodes.length || !setPilotBanks(candidate, matchingBanks)) throw new Error('Graph and memberships are not coherent');
    if (signal.aborted) return;
    snapshotRetry = false; lastBankCheck = checkedAt; nextSnapshotCheck = Date.now() + 300000;
    if (!serverLoaded || state?.graphVersion !== snapshot.version) install(snapshot, true, matchingBanks);
    else if (loadFailed) install(snapshot, true, matchingBanks);
    else if (state.bankContentVersion !== matchingBanks.contentVersion || state.bankMismatch) { banks = matchingBanks; setPilotBanks(state, banks); render(false); }
  }
  /** Revalidate after a version change/failure, keeping one request and an atomic graph/banks pair. */
  function refreshSnapshot(version, checkedAt) {
    if (!serverSettled || banksPending || snapshotRequest || bankRequest || signal.aborted) return;
    if (!needsSnapshot(version)) { refreshCurrentBanks(checkedAt); return; }
    snapshotRequest = readSnapshot()
      .then(([snapshot, matchingBanks]) => acceptSnapshot(snapshot, matchingBanks, checkedAt))
      .catch(() => { snapshotRetry = true; if (!signal.aborted) loadFailure(); }).finally(() => { snapshotRequest = null; if (!signal.aborted) renderFreshness(); });
  }
  function refreshHealth() {
    if (!apiBase || document.hidden || signal.aborted || healthRequest) return;
    healthRequest = json(`${apiBase}/api/health`, true).then(data => {
      indexing = data.knowledge?.indexing === true;
      // Only server-confirmed, timezone-aware sync times may advance the visible date.
      const value = data.knowledge?.checkedAt;
      if (typeof value === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/i.test(value) && Number.isFinite(Date.parse(value))) checkedAt = new Date(value);
      if (!data.knowledge || !/^[a-f0-9]{64}$/.test(data.knowledge.graphVersion || '')) throw new Error('Knowledge identity unavailable');
      refreshSnapshot(data.knowledge?.graphVersion, data.knowledge?.checkedAt);
    }).catch(() => { indexing = false; snapshotRetry = true; if (!signal.aborted) loadFailure(); }).finally(() => { healthRequest = null; if (state && !signal.aborted) { renderMeta(); renderFreshness(); } });
    return healthRequest;
  }
  tasks.push(refreshHealth());
  const healthTimer = setInterval(refreshHealth, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshHealth(); }, { signal });
  function loadFailure() {
    loadFailed = true; scene?.stop(); canvas.setAttribute('aria-busy', 'false'); canvas.hidden = true; renderStatus.hidden = false;
    labels.hidden = true; syncContactCards([]); card.hidden = true; connector.hidden = true;
    for (const button of root.querySelectorAll('.chat-graph-toolbar > button, .chat-graph-legend > button')) button.disabled = true;
    status.textContent = t('No se pudo cargar la instantánea del mapa. Actualiza la página para volver a intentarlo.');
    renderStatus.classList.add('graph-pilot-load-error');
    const heading = element('h2', t('Mapa no disponible'));
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 512 512'); icon.setAttribute('aria-hidden', 'true'); icon.setAttribute('focusable', 'false');
    const use = document.createElementNS(icon.namespaceURI, 'use');
    const iconURL = new URL('../../icons/certichat-brain.svg', import.meta.url); iconURL.hash = 'certichat-brain';
    use.setAttribute('href', iconURL.href);
    icon.append(use); heading.prepend(icon);
    const detail = element('p', t('No se pudo conectar con el mapa de conocimiento.'));
    const hint = element('p'); hint.className = 'graph-pilot-retry-hint';
    hint.append(document.createTextNode(t('Pulsa') + ' '), element('kbd', 'F5'), document.createTextNode(' ' + t('para volver a intentar la conexión.')));
    renderStatus.replaceChildren(heading, detail, hint);
  }
  Promise.allSettled(tasks).then(() => { if (!signal.aborted && !state) loadFailure(); });
  function availability(available) {
    if (!available) syncContactCards([]);
    root.dataset.renderer = available ? 'webgl2' : 'fallback'; if (!available) canvas.setAttribute('aria-busy', 'false'); canvas.hidden = !available; labels.hidden = !available; renderStatus.hidden = available || compact.matches;
    if (state) renderMeta();
    if (loadFailed) { loadFailure(); return; }
    if (!available && !compact.matches) renderStatus.textContent = t('La vista 3D no está disponible. Selecciona un concepto para consultar sus fuentes.');
  }
  async function configureRenderer() {
    const revision = ++sceneRevision; scene?.destroy(); scene = undefined; discoveryCounts = { nodes: 0, edges: 0 };
    if (compact.matches) { availability(false); return; }
    try {
      const { createPilotScene } = await import('./scene.js?v=ebf266315b85');
      if (signal.aborted || revision !== sceneRevision) return;
      availability(true); canvas.dataset.disposed = 'false';
      scene = createPilotScene(canvas, labels, select, () => { follow = false; root.dataset.followPaused = 'true'; }, availability, anchorCard, value => { zoom.textContent = `${Math.round(value * 100)}%`; }, (running, bank = '') => {
        root.dataset.replaying = String(running); root.dataset.replayBank = bank; replayButton.setAttribute('aria-busy', String(running));
        status.textContent = running ? t('Reproduciendo la animación del último resultado. No se realiza otra consulta.') : statusMessage();
      }, activity => {
        walk.hidden = !activity;
        if (!activity) return;
        walk.style.setProperty('--walk-color', activity.bank === 'certiquiz' ? 'var(--quiz-accent)' : pilotColors[activity.bank]);
        root.querySelector('[data-pilot-walk-bank]').textContent = state.collections.find(bank => bank.id === activity.bank)?.label || t('Conceptos');
        root.querySelector('[data-pilot-walk-concepts]').textContent = activity.nodes.map(node => t(node.label)).join('\n');
      }, motionControl, syncContactCards, counts => { discoveryCounts = counts; renderMeta(); });
      if (state) { scene.update(state, follow, serverLoaded || serverSettled); renderMeta(); }
      if (loadFailed) loadFailure();
      updateLegendSelection();
    } catch { if (!signal.aborted && revision === sceneRevision) availability(false); }
  }
  compact.addEventListener('change', configureRenderer, { signal }); void configureRenderer();
  const instance = {
    root,
    resetPerformance: () => scene?.resetPerformance(),
    debug: () => ({ snapshot: { source: serverLoaded ? 'api' : 'unavailable', refreshing: Boolean(snapshotRequest || bankRequest), retry: snapshotRetry }, phase: state?.phase || 'loading', graphVersion: state?.graphVersion, requestId: state?.requestId, seq: state?.seq, activeIds: [...(state?.active || [])], provisional: state?.provisional, sources: state?.sources.map(source => ({ ...source })), memberships: state ? [...state.memberships].map(([nodeId, values]) => ({ nodeId, banks: [...values] })) : [], renderer: scene?.stats(), follow, selectedId, contactIds: [...contactCards.keys()] }),
    destroy() { if (signal.aborted) return; abort.abort(); clearInterval(healthTimer); scene?.destroy(); syncContactCards([]); stripSize.disconnect(); renderStatus.remove(); instances.delete(root); if (mounted === instance) mounted = undefined; },
  };
  parentSignal?.addEventListener('abort', () => instance.destroy(), { once: true });
  instances.set(root, instance); mounted = instance; return instance;
}

if (typeof document !== 'undefined' && document.querySelector('[data-graph-pilot]')) mountGraphPilot();
