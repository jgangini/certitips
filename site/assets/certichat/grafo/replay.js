import { collectionIds, pilotNodeCollections } from './state.js?v=283ef5ffed52';

// Show the complete spider from the first frame; on exit retract before fading the core.
export function pilotSpiderEnvelope(elapsed, closing = false) {
  const ease = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };
  const core = closing ? 1 - ease((elapsed - 240) / 200) : ease(elapsed / 180);
  const legs = Array.from({ length: 8 }, () => closing ? 1 - ease(elapsed / 240) : 1);
  const phase = closing ? elapsed >= 440 ? 'hidden' : elapsed < 240 ? 'retracting' : 'fading' : elapsed >= 180 ? 'active' : 'appearing';
  return { core, legs, phase };
}

// A replay of saved evidence and its real one-hop neighborhood, never a retrieval event.
export function buildPilotReplay(state) {
  const banks = new Map(state.graph.nodes.map(node => [node.id, pilotNodeCollections(state, node.id)]));
  return [...collectionIds, 'unknown'].flatMap(bank => {
    const belongs = id => bank === 'unknown' ? !banks.get(id)?.length : banks.get(id)?.includes(bank);
    const recovered = [...state.active].filter(belongs).slice(0, 32), seeds = new Set(recovered);
    if (!recovered.length) return [];
    const edges = state.graph.edges.filter(edge => (seeds.has(edge.source) || seeds.has(edge.target)) && belongs(edge.source) && belongs(edge.target)).slice(0, 32);
    return [{ bank, edges, members: new Set([...banks.keys()].filter(belongs)), nodeIds: [...new Set([...recovered, ...edges.flatMap(edge => [edge.source, edge.target])])] }];
  });
}

export function pilotReplayFrame(groups, elapsed) {
  const index = Math.floor(Math.max(0, elapsed) / 3200), group = groups[index];
  if (!group) return null;
  const time = Math.max(0, elapsed) % 3200;
  const progress = group.edges.map((_, edge) => Math.max(0, Math.min(1, (time - edge * 40) / 1400)));
  return { ...pilotTentacleFrame(group.nodeIds, time), active: true, index, group, progress };
}

export function pilotDiscoveryFrame(ids, edges, elapsed, groups) {
  const progress = edges.map((_, index) => Math.max(0, Math.min(1, (elapsed - index * 40) / 1400)));
  if (groups && Number.isFinite(elapsed)) {
    const step = pilotReplayFrame(groups, elapsed);
    if (step) return { ...step, progress };
  }
  return { ...pilotTentacleFrame(ids, elapsed), progress };
}

export function pilotPresentationFrame(ids, edges, groups, progress) {
  const fraction = Math.max(0, Math.min(1, progress));
  const elapsed = fraction === 1 ? Infinity : fraction * Math.max(1, groups.length) * 3200;
  const frame = pilotDiscoveryFrame(ids, edges, elapsed, groups);
  return { ...frame, active: ids.length > 0 && fraction > 0 && fraction < 1 };
}

export function pilotQueryFrame(ids, edges, groups, elapsed) {
  // Discovery starts only after real candidates arrive.
  if (!ids.length) return { active: false, targets: [], touched: new Set(), progress: [] };
  return { ...pilotDiscoveryFrame(ids, edges, Math.max(0, elapsed) % (Math.max(1, groups.length) * 3200), groups), active: true };
}

export function pilotTentacleFrame(ids, elapsed) {
  const batches = Math.max(1, Math.ceil(ids.length / 8)), span = Math.min(800, 3000 / batches);
  const batch = Math.min(batches - 1, Math.floor(Math.max(0, elapsed) / span));
  const targets = ids.slice(batch * 8, batch * 8 + 8).map((id, index) => ({ id, progress: Math.max(0, Math.min(1, (elapsed - batch * span - index * span * .04) / (span * .68))) }));
  const touched = new Set(ids.slice(0, batch * 8));
  for (const target of targets) if (target.progress >= 1) touched.add(target.id);
  return { targets, touched, active: ids.length > 0 && elapsed < batches * span + 180 };
}

/** Count unique discovered evidence; a relation requires both of its real endpoints. */
export function pilotDiscoveryCounts(discovered, state) {
  const nodes = new Set([...state.active].filter(id => discovered.has(id)));
  return { nodes: nodes.size, edges: state.edges.filter(edge => nodes.has(edge.source) && nodes.has(edge.target)).length };
}
