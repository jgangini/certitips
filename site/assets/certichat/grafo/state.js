import { indexGraph } from './model.js?v=06c036a5fa01';
import { normalizeTrace } from '../trace.js?v=06c036a5fa01';

export const collectionIds = ['certitips', 'certiquiz', 'certitube', 'certisearch'];
export const pilotPreviewIds = [...collectionIds, 'cognee'];
export const pilotColors = { certitips: '#c74634', certiquiz: '#b58a00', certitube: '#0d65ad', certisearch: '#2e7d32', unknown: '#747680' };
/** Classify already validated public citations; indexed memberships remain authoritative. */
export function pilotSourceCollection(url) {
  const path = new URL(url).pathname;
  return path.includes('/certitube/') ? 'certitube' : path.includes('/certisearch/') ? 'certisearch' : /\/practice\/$/.test(path) ? 'certiquiz' : 'certitips';
}
export function pilotNodeCollections(state, id) {
  const banks = new Set(state.memberships.get(id) || []);
  if (!banks.size) for (const source of state.sources) if (source.nodeId === id) banks.add(pilotSourceCollection(source.url));
  return collectionIds.filter(bank => banks.has(bank));
}
export function pilotNodeCollection(state, id) {
  const banks = pilotNodeCollections(state, id);
  return banks.includes('certitube') ? 'certitube' : banks.includes('certisearch') ? 'certisearch' : banks.includes('certiquiz') ? 'certiquiz' : banks[0] || 'unknown';
}
export function pilotSourceZone(state, bank) {
  const nodes = new Set(collectionIds.includes(bank) ? state.graph.nodes.filter(node => pilotNodeCollections(state, node.id).includes(bank)).map(node => node.id) : []);
  const edges = new Set();
  state.graph.edges.forEach((edge, index) => { if (nodes.has(edge.source) && nodes.has(edge.target)) edges.add(index); });
  return { nodes, edges };
}
/** Cognee previews the full structural network; it is not an evidence source or collection. */
export function pilotPreviewZone(state, bank) {
  return bank === 'cognee' ? { nodes: new Set(state.graph.nodes.map(node => node.id)), edges: new Set(state.graph.edges.map((_, index) => index)) } : pilotSourceZone(state, bank);
}
export const relationKey = edge => JSON.stringify([edge.source, edge.target, edge.label]);
export const collectionCenters = { certitips: [-330, 30, 0], certiquiz: [40, 250, -60], certitube: [290, 75, 160], certisearch: [20, -120, -320], unknown: [0, 0, 50] };

export function createPilotState(snapshot, banks, siteRoot) {
  if (!/^[a-f0-9]{64}$/.test(snapshot?.version)) throw new Error('Invalid graph version');
  const graph = indexGraph(snapshot);
  const state = { graph, graphVersion: snapshot.version, siteRoot, memberships: new Map(), collections: [], requestId: null, seq: -1, phase: 'idle', lanes: new Map(), candidateTraces: new Map(), active: new Set(), edges: [], sources: [], provisional: true, mismatch: false, cached: false, terminal: false };
  setPilotBanks(state, banks);
  return state;
}

export function setPilotBanks(state, banks) {
  state.layoutRevision = (state.layoutRevision || 0) + 1;
  state.memberships.clear(); state.collections = [];
  if (!banks || banks.version !== state.graphVersion || state.expectedContentVersion && banks.contentVersion !== state.expectedContentVersion || !Array.isArray(banks.banks) || !Array.isArray(banks.memberships)) return false;
  state.bankContentVersion = banks.contentVersion; state.bankMismatch = false;
  for (const collection of banks.banks) {
    if (!collectionIds.includes(collection?.id)) continue;
    state.collections.push({ id: collection.id, label: typeof collection.label === 'string' ? collection.label.slice(0, 160) : collection.id, available: Number.isSafeInteger(collection.indexedDocumentCount) && collection.indexedDocumentCount > 0, documentCount: Number.isSafeInteger(collection.indexedDocumentCount) ? collection.indexedDocumentCount : 0 });
  }
  for (const membership of banks.memberships) {
    if (!state.graph.byId.has(membership?.nodeId) || !Array.isArray(membership.banks)) continue;
    const ids = membership.banks.filter(id => state.collections.some(collection => collection.id === id && collection.available));
    if (ids.length) state.memberships.set(membership.nodeId, new Set(ids));
  }
  return true;
}

function validTrace(state, value) {
  const trace = normalizeTrace(value, state.siteRoot);
  if (!trace) return null;
  if (trace.version !== state.graphVersion) { state.mismatch = true; return null; }
  state.mismatch = false;
  const nodes = trace.nodes.filter(id => state.graph.byId.has(id)), ids = new Set(nodes);
  const edges = trace.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target) && state.graph.neighbors.get(edge.source)?.get(edge.target)?.some(actual => relationKey(actual) === relationKey(edge)));
  return { ...trace, nodes, edges, sources: (trace.sources || []).filter(source => ids.has(source.nodeId)) };
}

export function applyPilotProgress(state, event) {
  if (!event || !['accepted', 'search.started', 'search.completed', 'search.failed', 'candidates', 'context.selected', 'answer.started', 'complete', 'error'].includes(event.type) || typeof event.requestId !== 'string' || !event.requestId || event.requestId.length > 128 || !Number.isSafeInteger(event.seq) || event.seq < 0) return false;
  if (event.type === 'accepted') {
    if (state.requestId === event.requestId && event.seq <= state.seq) return false;
    Object.assign(state, { requestId: event.requestId, seq: -1, phase: 'accepted', lanes: new Map(), candidateTraces: new Map(), active: new Set(), edges: [], sources: [], provisional: true, mismatch: false, cached: Boolean(event.cached), terminal: false });
  }
  if (event.type === 'error' && event.transport === true && (!state.requestId || state.terminal)) Object.assign(state, { requestId: event.requestId, seq: -1, terminal: false });
  if (event.requestId !== state.requestId || event.seq <= state.seq || state.terminal) return false;
  state.seq = event.seq;
  if (/^[a-f0-9]{64}$/.test(event.contentVersion || '') && state.bankContentVersion && event.contentVersion !== state.bankContentVersion && event.contentVersion !== state.expectedContentVersion) {
    state.expectedContentVersion = event.contentVersion; state.bankMismatch = true; state.memberships.clear(); state.collections = []; state.layoutRevision++;
  }
  if (['document', 'lexical', 'graph'].includes(event.lane) && event.type.startsWith('search.')) state.lanes.set(event.lane, event.type.slice(7));
  if (event.type === 'candidates' || event.type === 'context.selected' || event.type === 'complete') {
    const trace = validTrace(state, event.type === 'complete' ? event.result?.graphTrace : event.graphTrace);
    if (event.type === 'candidates' && trace && ['document', 'lexical', 'graph'].includes(event.lane)) {
      state.candidateTraces.set(event.lane, trace);
      const traces = [...state.candidateTraces.values()];
      state.active = new Set(traces.flatMap(value => value.nodes));
      state.edges = [...new Map(traces.flatMap(value => value.edges).map(edge => [relationKey(edge), edge])).values()];
      state.sources = [...new Map(traces.flatMap(value => value.sources).map(source => [`${source.nodeId}:${source.url}`, source])).values()];
    } else { state.active = new Set(trace?.nodes || []); state.edges = trace?.edges || []; state.sources = trace?.sources || []; }
    state.provisional = event.type !== 'complete';
  }
  state.phase = event.type;
  if (event.type === 'complete') state.cached = event.cached === true;
  state.terminal = event.type === 'complete' || event.type === 'error';
  if (event.type === 'error') { state.active.clear(); state.edges = []; state.sources = []; }
  return true;
}

export function showPilotTrace(state, value, phase = 'history') {
  const trace = validTrace(state, value);
  state.active = new Set(trace?.nodes || []); state.edges = trace?.edges || []; state.sources = trace?.sources || [];
  state.phase = trace ? phase : 'idle'; state.provisional = false;
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return (result >>> 0) / 4294967296;
}

/** Preserve node identity and internal spacing while optionally separating collection centers. */
export function pilotLayout(state, separation = 1) {
  return state.graph.nodes.map(node => {
    const collections = [...(state.memberships.get(node.id) || [])].sort();
    const centers = (collections.length ? collections : ['unknown']).map(id => collectionCenters[id]);
    const center = [0, 1, 2].map(axis => centers.reduce((sum, value) => sum + value[axis], 0) / centers.length * separation);
    const angle = hash(node.id) * Math.PI * 2, vertical = hash(`${node.id}:y`) * 2 - 1, radius = 24 + 130 * Math.cbrt(hash(`${node.id}:r`));
    const horizontal = Math.sqrt(1 - vertical ** 2) * radius;
    return { ...node, collections, x: center[0] + Math.cos(angle) * horizontal, y: center[1] + vertical * radius, z: center[2] + Math.sin(angle) * horizontal };
  });
}

