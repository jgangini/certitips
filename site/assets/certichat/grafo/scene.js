import * as THREE from '../../vendor/three/three.module.js?v=a9c3981cedae';
import { OrbitControls } from '../../vendor/three/OrbitControls.js?v=a9c3981cedae';
import { collectionIds, pilotLayout, pilotNodeCollections, pilotNodeCollection, pilotPreviewZone, pilotPreviewIds, pilotColors } from './state.js?v=a9c3981cedae';
import { pilotCameraStep, pilotFrame, pilotResultCluster } from './camera.js?v=a9c3981cedae';
import { createPilotMotion, pilotWorldPixel } from './motion.js?v=a9c3981cedae';
import { buildPilotReplay, pilotReplayFrame, pilotPresentationFrame, pilotQueryFrame, pilotDiscoveryCounts } from './replay.js?v=a9c3981cedae';
import { createPilotSpider } from './spider.js?v=a9c3981cedae';
import { createPilotHighlight } from './highlight.js?v=a9c3981cedae';
import { createPilotEntry } from './entry.js?v=a9c3981cedae';

function blendZoneColor(zones, colors, key, value) {
  const matches = zones.filter(zone => zone[key].has(value));
  if (!matches.length) return new THREE.Color(colors.unknown);
  const color = new THREE.Color(0, 0, 0);
  for (const zone of matches) color.add(new THREE.Color(colors[zone.bank]).multiplyScalar(1 / matches.length));
  return color;
}

/** Report all current foot contacts separately from manual selection; camera controls retain selection. */
export function createPilotScene(canvas, labels, onSelect, onGesture, onAvailability = () => {}, onAnchor = () => {}, onZoom = () => {}, onReplay = () => {}, onActivity = () => {}, onMotion = () => {}, onContact = () => {}, onDiscovery = () => {}) {
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
  if (!context) throw new Error('WebGL2 unavailable');
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(48, 1, .5, 6000);
  camera.position.set(560, 330, 1050);
  const controls = new OrbitControls(camera, canvas);
  controls.cursorStyle = 'grab';
  controls.mouseButtons.LEFT = THREE.MOUSE.PAN; controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
  controls.touches.ONE = THREE.TOUCH.PAN; controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
  controls.enableDamping = false; controls.minDistance = 45; controls.maxDistance = 2600;
  const motion = matchMedia('(prefers-reduced-motion: reduce)'), scope = new AbortController();
  const geometry = () => new THREE.BufferGeometry();
  const points = new THREE.Points(geometry(), new THREE.PointsMaterial({ size: 1.35, vertexColors: true, transparent: true, opacity: .2, sizeAttenuation: false, depthWrite: false }));
  const contextEdges = new THREE.LineSegments(geometry(), new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .05, depthWrite: false }));
  const focus = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 12, 8), new THREE.MeshBasicMaterial(), 512);
  focus.count = 0;
  const focusEdges = new THREE.LineSegments(geometry(), new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .85 }));
  const arrows = new THREE.InstancedMesh(new THREE.ConeGeometry(2.2, 6, 6), new THREE.MeshBasicMaterial(), 1024); arrows.count = 0;
  scene.add(points, contextEdges, focus, focusEdges, arrows);
  const pageGlass = document.getElementById('language-transition');
  delete canvas.dataset.firstFrame;
  const entry = canvas.dataset.entryPath ? createPilotEntry(points, camera, controls.target, canvas.dataset.entryPath) : null;
  const motionField = createPilotMotion(scene);
  const spider = createPilotSpider(scene);
  const highlight = createPilotHighlight(scene);
  let state, positions = [], byId = new Map(), key, frame = 0, destroyed = false, lost = false, travel, reveal, selected, selectedIds = [], renderedEdges = [], width = 1, height = 1, follow = true, interacting = false, previousActive = false, lastFrame = 0, overviewDistance = 1, lastFocusKey;
  const frameIntervals = [], renderCpuMs = [];
  let replay, replayRun = 0, presentationProgress = 1, liveEdges = [], liveGroups = [], animationIds = [], spiderTarget, activityKey, manualFrame = false;
  let stopped = false, requestId, overviewOrbit = true, wasDiscovering = false, textStarted = false, cameraGroup;
  const discovered = new Set();
  let discoveryCounts = { nodes: 0, edges: 0 };
  /** Keep counts across banks and repeated contacts; only a new query/tour resets them. */
  function reportDiscovery(ids = [], reset = false) {
    if (reset) discovered.clear();
    for (const id of ids) discovered.add(id);
    const counts = pilotDiscoveryCounts(discovered, state);
    if (counts.nodes !== discoveryCounts.nodes || counts.edges !== discoveryCounts.edges) { discoveryCounts = counts; onDiscovery(counts); }
  }
  let queryStarted = 0, arrowTime = 0, previousArrowFrame = 0, relationCurves = [], arrowProgress = [];
  const querying = () => !textStarted && (state?.phase === 'loading' || Boolean(state?.requestId && !state.terminal) || state?.phase === 'complete' && presentationProgress === 0);
  let previewBanks = [], previewTransition, previewWeights = pilotPreviewIds.map(() => 0);
  const sample = (values, value) => { values.push(value); if (values.length > 240) values.shift(); };
  const object = new THREE.Object3D(), raycaster = new THREE.Raycaster();
  const palette = () => { const style = getComputedStyle(canvas); return { ...pilotColors, certiquiz: style.getPropertyValue('--quiz-accent').trim() || pilotColors.certiquiz, unknown: style.getPropertyValue('--muted').trim() || pilotColors.unknown, cognee: style.getPropertyValue('--muted').trim() || pilotColors.unknown, spider: style.getPropertyValue('--pilot-spider').trim() }; };
  function invalidate() { if (!frame && !destroyed && !lost && !document.hidden) frame = requestAnimationFrame(draw); }
  function changeGeometry(target, values, colors) {
    target.geometry.dispose(); target.geometry = geometry();
    target.geometry.setAttribute('position', new THREE.Float32BufferAttribute(values, 3));
    if (colors) target.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    target.geometry.computeBoundingSphere();
  }
  function nodeColor(id, colors) { return colors[pilotNodeCollection(state, id)]; }
  function rebuildContext() {
    positions = pilotLayout(state, document.documentElement.dataset.theme === 'dark' ? 1.15 : 1); byId = new Map(positions.map(node => [node.id, node]));
    const colors = palette(), vertices = [], shades = [], lines = [], lineColors = [];
    for (const node of positions) { vertices.push(node.x, node.y, node.z); new THREE.Color(colors.unknown).toArray(shades, shades.length); }
    for (const edge of state.graph.edges) for (const id of [edge.source, edge.target]) { const node = byId.get(id); lines.push(node.x, node.y, node.z); new THREE.Color(colors.unknown).toArray(lineColors, lineColors.length); }
    changeGeometry(points, vertices, shades); changeGeometry(contextEdges, lines, lineColors);
    highlight.configure(state, positions);
    colorContext();
    refreshOverview();
  }
  function colorContext() {
    const zones = previewBanks.map(bank => ({ bank, ...pilotPreviewZone(state, bank) }));
    const colors = palette();
    const nodeColors = points.geometry.attributes.color, edgeColors = contextEdges.geometry.attributes.color;
    const nodes = new Float32Array(nodeColors.array.length), edges = new Float32Array(edgeColors.array.length);
    positions.forEach((node, index) => blendZoneColor(zones, colors, 'nodes', node.id).toArray(nodes, index * 3));
    state.graph.edges.forEach((edge, index) => {
      const color = blendZoneColor(zones, colors, 'edges', index);
      color.toArray(edges, index * 6); color.toArray(edges, index * 6 + 3);
    });
    previewTransition = { started: performance.now(), weights: [...previewWeights], attributes: [[nodeColors, nodeColors.array.slice(), nodes], [edgeColors, edgeColors.array.slice(), edges]] };
    invalidate();
  }
  function advancePreview(now) {
    if (!previewTransition) return;
    const phase = motion.matches ? 1 : THREE.MathUtils.smoothstep((now - previewTransition.started) / 360, 0, 1);
    previewWeights = pilotPreviewIds.map((bank, index) => THREE.MathUtils.lerp(previewTransition.weights[index], Number(previewBanks.includes(bank)), phase));
    for (const [attribute, start, end] of previewTransition.attributes) {
      for (let i = 0; i < end.length; i++) attribute.array[i] = THREE.MathUtils.lerp(start[i], end[i], phase);
      attribute.needsUpdate = true;
    }
    if (phase === 1) previewTransition = null;
  }
  function edgeCurve(edge) {
    const a = byId.get(edge.source), b = byId.get(edge.target), start = new THREE.Vector3(a.x, a.y, a.z), end = new THREE.Vector3(b.x, b.y, b.z);
    const middle = start.clone().lerp(end, .5).add(new THREE.Vector3(0, 16, 22));
    if (edge.source === edge.target) middle.add(new THREE.Vector3(25, 20, 0));
    return new THREE.QuadraticBezierCurve3(start, middle, end);
  }
  function rebuildFocus(animate = true, group) {
    const colors = palette(), ids = group ? [...group.nodeIds] : [...state.active];
    const sourceURLs = new Map();
    for (const source of state.sources) { if (!sourceURLs.has(source.nodeId)) sourceURLs.set(source.nodeId, new Set()); sourceURLs.get(source.nodeId).add(source.url); }
    if (selected && !ids.includes(selected)) ids.unshift(selected);
    // Match the validated trace contract: 512 concepts and 1024 real relations.
    selectedIds = ids.slice(0, 512).filter(id => byId.has(id));
    selectedIds.forEach((id, index) => focus.setColorAt(index, new THREE.Color(nodeColor(id, colors))));
    focus.count = selectedIds.length; focus.instanceMatrix.needsUpdate = true; if (focus.instanceColor) focus.instanceColor.needsUpdate = true; focus.computeBoundingSphere();
    const visible = new Set(selectedIds), vertices = [], shades = [];
    renderedEdges = (group ? group.edges : state.edges).filter(edge => visible.has(edge.source) && visible.has(edge.target)).slice(0, 1024);
    relationCurves = renderedEdges.map(edgeCurve);
    renderedEdges.forEach((edge, index) => {
      const curve = relationCurves[index], samples = curve.getPoints(16);
      const commonVideo = [...(sourceURLs.get(edge.source) || [])].some(url => /\/certitube\/[\w-]{11}\/$/.test(new URL(url).pathname) && sourceURLs.get(edge.target)?.has(url));
      const common = pilotNodeCollections(state, edge.source).filter(bank => pilotNodeCollections(state, edge.target).includes(bank));
      const color = new THREE.Color(group ? colors[group.bank] : commonVideo ? colors.certitube : common.includes('certisearch') ? colors.certisearch : common.includes('certiquiz') ? colors.certiquiz : common.includes('certitips') ? colors.certitips : colors.unknown);
      for (let i = 1; i < samples.length; i++) for (const value of [samples[i - 1], samples[i]]) { value.toArray(vertices, vertices.length); color.toArray(shades, shades.length); }
      object.position.copy(curve.getPoint(.8)); object.scale.setScalar(1); object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(.8).normalize()); object.updateMatrix(); arrows.setMatrixAt(index, object.matrix); arrows.setColorAt(index, color);
    });
    changeGeometry(focusEdges, vertices, shades);
    arrows.count = renderedEdges.length; arrows.instanceMatrix.needsUpdate = true; if (arrows.instanceColor) arrows.instanceColor.needsUpdate = true; arrows.computeBoundingSphere();
    focus.count = selectedIds.length; arrows.count = renderedEdges.length;
    if (!group) {
      liveEdges = [...renderedEdges];
      const known = new Set(liveEdges.map(edge => JSON.stringify(edge)));
      for (const bank of buildPilotReplay(state)) for (const edge of bank.edges) {
        const edgeKey = JSON.stringify(edge);
        if (!known.has(edgeKey) && liveEdges.length < 64) { known.add(edgeKey); liveEdges.push(edge); }
      }
    }
    const order = id => (collectionIds.indexOf(pilotNodeCollection(state, id)) + 1) || 4;
    animationIds = [...selectedIds].sort((a, b) => order(a) - order(b));
    if (!group) liveGroups = [...collectionIds, 'unknown'].map(bank => ({ bank, edges: [], nodeIds: animationIds.filter(id => pilotNodeCollection(state, id) === bank) })).filter(group => group.nodeIds.length);
    const motionNodes = animationIds.map(id => { const node = byId.get(id), bank = group?.bank || pilotNodeCollection(state, id), banks = group ? [group.bank] : pilotNodeCollections(state, id); return { ...node, bank, color: colors[bank], colors: (banks.length ? banks : ['unknown']).map(bank => colors[bank]) }; });
    motionField.configure(motionNodes, selected); spider.configure(motionNodes);
    focusEdges.material.opacity = group ? .22 : .85;
    reveal = animate && !motion.matches && !stopped && presentationProgress > 0 ? { started: performance.now(), duration: 600 } : null;
    invalidate();
  }
  function stopReplay() {
    if (!replay) return;
    replay = undefined; rebuildFocus(false); onReplay(false);
  }
  // Project every unique contacted concept; repeated feet never duplicate a card.
  function anchor(id) {
    const node = byId.get(id); if (!node) return null;
    const screen = new THREE.Vector3(node.x, node.y, node.z).project(camera);
    return screen.z >= -1 && screen.z <= 1 ? { id, x: (screen.x + 1) * width / 2, y: (1 - screen.y) * height / 2, width, height } : null;
  }
  function stop(immediate = false) {
    onContact([]);
    if (immediate) spider.hide();
    entry?.finish(); controls.enabled = true; stopped = true; stopReplay(); travel = reveal = null; onActivity(null); onMotion(false); invalidate();
  }
  function advanceReplay(now) {
    if (!replay) return null;
    const step = pilotReplayFrame(replay.groups, now - replay.started);
    if (!step) { stopReplay(); presentationProgress = 1; return null; }
    if (step.index !== replay.index) {
      replay.index = step.index; rebuildFocus(false, step.group); onReplay(true, step.group.bank);
    }
    replay.touched = step.touched;
    const colors = palette();
    selectedIds.forEach((id, index) => focus.setColorAt(index, new THREE.Color(colors[step.touched.has(id) ? step.group.bank : 'unknown'])));
    if (focus.instanceColor) focus.instanceColor.needsUpdate = true;
    return step;
  }
  function framing(ids, direction = camera.position.clone().sub(controls.target)) {
    const nodes = ids?.length ? ids.map(id => byId.get(id)).filter(Boolean) : positions;
    // The full graph orbits its layout origin; local clusters use their own bounds center.
    const value = pilotFrame(nodes, direction, camera.fov, camera.aspect, controls.minDistance, ids?.length ? undefined : { x: 0, y: 0, z: 0 });
    return { target: new THREE.Vector3(value.target.x, value.target.y, value.target.z), distance: Math.min(controls.maxDistance, value.distance) };
  }
  function fit(ids, turn = 0) {
    const direction = camera.position.clone().sub(controls.target);
    if (!motion.matches) direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), turn);
    const { target, distance } = framing(ids, direction);
    if (!ids?.length) { overviewDistance = distance; controls.minDistance = overviewDistance / 12; }
    moveCamera(target, distance, direction);
    if (travel && !ids?.length) travel.overview = true;
  }
  /** Resize against the destination orientation while the overview camera is travelling. */
  function refreshOverview() {
    const direction = travel?.overview ? new THREE.Vector3().setFromSpherical(travel.end) : undefined;
    overviewDistance = framing(undefined, direction).distance;
    controls.minDistance = overviewDistance / 12;
    if (travel?.overview) travel.end.radius = overviewDistance;
  }
  function moveCamera(target, distance, direction = camera.position.clone().sub(controls.target), retreat) {
    const start = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    const end = new THREE.Spherical().setFromVector3(direction); end.radius = distance;
    end.theta = start.theta + Math.atan2(Math.sin(end.theta - start.theta), Math.cos(end.theta - start.theta));
    const position = new THREE.Vector3().setFromSpherical(end).add(target);
    travel = motion.matches ? null : { start, end, retreat, target: controls.target.clone(), look: target, started: performance.now() };
    if (!travel) { camera.position.copy(position); controls.target.copy(target); controls.update(); }
    invalidate();
  }
  function frameSpider(step) {
    spiderTarget = spider.draw(performance.now(), camera, height, false, step, palette().spider);
    const direction = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), .2);
    const distance = THREE.MathUtils.clamp(framing(step.group.nodeIds).distance * .65, overviewDistance / 6, overviewDistance * .7);
    moveCamera(spiderTarget, distance, direction); travel.followSpider = true;
  }
  /** Share the Play camera approach and tracking with real thinking, without inventing targets. */
  function followDiscovery(discovery) {
    if (!discovery.active) { cameraGroup = undefined; return; }
    if (!discovery.group || motion.matches || stopped || !follow || manualFrame || selected || interacting) return;
    const group = replay ? `replay-${replayRun}` : requestId;
    if (cameraGroup === group) return;
    cameraGroup = group; frameSpider(discovery);
  }
  /** Render the same point cloud while awaiting data and during the one-time entrance. */
  function drawEntry(now) {
    if (!entry?.active) { canvas.dataset.entryPhase = 'ready'; canvas.setAttribute('aria-busy', 'false'); controls.enabled = true; return false; }
    camera.updateMatrixWorld();
    const active = entry.draw(now, width, height, motion.matches, palette().unknown, !pageGlass || getComputedStyle(pageGlass).display === 'none');
    canvas.dataset.entryPhase = entry.stats().phase; canvas.setAttribute('aria-busy', String(active));
    controls.enabled = !active;
    if (!active) return false;
    const visible = scene.children.map(node => node.visible);
    scene.children.forEach(node => { node.visible = node === points; });
    renderer.render(scene, camera);
    if (!canvas.dataset.firstFrame) canvas.dataset.firstFrame = 'true';
    scene.children.forEach((node, index) => { node.visible = visible[index]; });
    canvas.dataset.drawCount = String(Number(canvas.dataset.drawCount || 0) + 1);
    if (!motion.matches) invalidate();
    return true;
  }
  function draw(now) {
    frame = 0; if (destroyed || lost || document.hidden) return;
    if (drawEntry(now) || !state) return;
    const started = performance.now(), replayStep = advanceReplay(now);
    advancePreview(now);
    const searching = querying() && !motion.matches && !stopped;
    const discovery = replayStep || (searching ? pilotQueryFrame(animationIds, liveEdges, liveGroups, now - queryStarted) : pilotPresentationFrame(animationIds, liveEdges, liveGroups, 1));
    if (wasDiscovering && !discovery.active && !stopped && follow && !manualFrame && !selected) { overviewOrbit = true; fit(); }
    wasDiscovering = discovery.active;
    followDiscovery(discovery);
    const activeBanks = new Set(discovery.targets.map(target => replayStep?.group.bank || pilotNodeCollection(state, target.id)));
    if (discovery.active) discovery.touched = new Set([...discovery.touched].filter(id => activeBanks.has(replayStep?.group.bank || pilotNodeCollection(state, id))));
    discovery.cursor = discovery.active;
    const delta = lastFrame ? Math.min(50, now - lastFrame) : 16;
    const tracking = discovery.active && follow && !manualFrame && !selected;
    const orbiting = !stopped && !motion.matches && !tracking;
    const active = Boolean(searching || replay || travel || reveal || interacting || orbiting || (!stopped && !motion.matches && (state.active.size || selected)));
    if (active && previousActive && now - lastFrame < 250) sample(frameIntervals, now - lastFrame);
    lastFrame = now; previousActive = active;
    if (travel) {
      if (travel.followSpider && spiderTarget) travel.look.copy(spiderTarget);
      const phase = motion.matches ? 1 : Math.min(1, (now - travel.started) / (travel.duration ?? (travel.retreat === undefined ? 1400 : 2200)));
      const step = pilotCameraStep(travel.start, travel.end, phase, travel.retreat);
      const orbit = new THREE.Spherical(step.radius, step.phi, step.theta);
      controls.target.lerpVectors(travel.target, travel.look, step.targetPhase); camera.position.setFromSpherical(orbit).add(controls.target); controls.update(); if (phase === 1) travel = null;
    }
    if (orbiting && !travel) {
      const direction = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), delta * .000045);
      // Manual pan/zoom/selection cancels automatic framing, not the Play orbit.
      if (follow && !manualFrame && overviewOrbit && !selected) {
        const bounds = framing(undefined, direction); overviewDistance = bounds.distance;
        controls.target.copy(bounds.target); direction.normalize().multiplyScalar(overviewDistance);
      }
      camera.position.copy(direction).add(controls.target); controls.update();
    }
    const paletteColors = palette();
    camera.updateMatrixWorld();
    const autoFollow = follow && !manualFrame && !stopped && !selected;
    spiderTarget = spider.draw(now, camera, height, motion.matches, { ...discovery, active: discovery.active && !stopped }, paletteColors.spider, position => {
      if (!travel && autoFollow && discovery.active && !motion.matches && !interacting) {
        const orbit = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target)); orbit.theta += delta * .00012;
        controls.target.lerp(position, 1 - Math.exp(-Math.min(delta, 16) / 80)); camera.position.setFromSpherical(orbit).add(controls.target); controls.update(); camera.updateMatrixWorld();
      }
    });
    const phase = reveal && !motion.matches ? Math.min(1, (now - reveal.started) / reveal.duration) : 1;
    focus.count = Math.ceil(selectedIds.length * phase); arrows.count = Math.floor(renderedEdges.length * phase);
    focusEdges.visible = arrows.visible = discovery.touched.size > 0 || Boolean(selected);
    if (replayStep) arrows.count = replayStep.progress.filter(value => value >= 1).length;
    focusEdges.geometry.setDrawRange(0, Math.floor(focusEdges.geometry.getAttribute('position')?.count * phase / 2) * 2 || 0);
    if (phase === 1) reveal = null;
    camera.updateMatrixWorld();
    selectedIds.forEach((id, index) => {
      const node = byId.get(id); object.position.set(node.x, node.y, node.z); object.quaternion.identity(); object.scale.setScalar(pilotWorldPixel(node, camera, height) * 2.8); object.updateMatrix(); focus.setMatrixAt(index, object.matrix);
      if (!replayStep) focus.setColorAt(index, new THREE.Color(id === selected || discovery.touched.has(id) ? nodeColor(id, paletteColors) : paletteColors.unknown));
      const color = new THREE.Color(); focus.getColorAt(index, color);
      const memberships = pilotNodeCollections(state, id);
      collectionIds.forEach((bank, i) => { if (memberships.includes(bank)) color.lerp(new THREE.Color(paletteColors[bank]), previewWeights[i]); });
      focus.setColorAt(index, color);
    });
    focus.instanceMatrix.needsUpdate = true; if (focus.instanceColor) focus.instanceColor.needsUpdate = true; focus.computeBoundingSphere();
    // One arrow follows each evidenced relation from source to target, never backwards.
    if (!stopped && !motion.matches && previousArrowFrame) arrowTime += Math.min(50, now - previousArrowFrame);
    previousArrowFrame = now;
    arrowProgress = relationCurves.map((curve, index) => {
      const progress = motion.matches ? .8 : .12 + ((arrowTime / 2200 + index * .17) % 1) * .76;
      object.position.copy(curve.getPoint(progress));
      object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(progress).normalize());
      object.scale.setScalar(pilotWorldPixel(object.position, camera, height)); object.updateMatrix(); arrows.setMatrixAt(index, object.matrix);
      return progress;
    });
    arrows.instanceMatrix.needsUpdate = true; arrows.computeBoundingSphere();
    const focused = Boolean(selected || state.active.size);
    const dark = document.documentElement.dataset.theme === 'dark';
    points.material.size = dark ? 1.15 : 1.35; points.material.opacity = dark ? (focused ? .14 : .32) : (focused ? .1 : .2); contextEdges.material.opacity = dark ? (focused ? .007 : .018) : (focused ? .018 : .05);
    highlight.draw(previewWeights, dark, paletteColors.unknown, paletteColors.certiquiz);
    const animating = motionField.draw(now, camera, height, motion.matches, discovery, stopped || presentationProgress === 0 && !replay && !searching);
    const touched = [...discovery.touched].slice(-3), bank = discovery.group?.bank || pilotNodeCollection(state, discovery.targets[0]?.id);
    const nextActivity = JSON.stringify([bank, touched, discovery.active]);
    if (nextActivity !== activityKey) { activityKey = nextActivity; onActivity(discovery.active && animationIds.length ? { bank, nodes: touched.map(id => ({ id, label: state.graph.byId.get(id)?.label })).filter(node => node.label) } : null); }
    renderer.render(scene, camera);
    if (!canvas.dataset.firstFrame) canvas.dataset.firstFrame = 'true';
    onAnchor(anchor(selected));
    onContact(spider.contacts().filter(id => id !== selected).map(anchor).filter(Boolean));
    if (discovery.active && !stopped) reportDiscovery(spider.contacts());
    onZoom(overviewDistance / camera.position.distanceTo(controls.target));
    sample(renderCpuMs, performance.now() - started);
    Object.assign(canvas.dataset, { renderer: 'webgl2', nodeCount: String(positions.length), edgeCount: String(state.graph.edges.length), activeNodeCount: String(state.active.size), activeEdgeCount: String(state.edges.length), renderedNodes: String(focus.count), renderedEdges: String(arrows.count), cameraMoving: String(Boolean(travel)), drawCount: String(Number(canvas.dataset.drawCount || 0) + 1), drawCalls: String(renderer.info.render.calls), geometryCount: String(renderer.info.memory.geometries), textureCount: String(renderer.info.memory.textures) });
    if (searching || replay || travel || reveal || animating || orbiting || previewTransition || spider.stats().transitioning) invalidate();
  }
  function resize() { width = Math.max(1, canvas.clientWidth); height = Math.max(1, canvas.clientHeight); camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); if (state) refreshOverview(); invalidate(); }
  function gesture() { entry?.finish(); controls.enabled = true; travel = null; follow = false; onGesture(); invalidate(); }
  /** Accumulate rapid zoom commands against their destination; drag/selection can cancel travel. */
  function zoom(factor) {
    if (!state) return;
    const distance = travel?.zoomDistance ?? camera.position.distanceTo(controls.target);
    const target = controls.target.clone(), direction = camera.position.clone().sub(target);
    gesture();
    const next = THREE.MathUtils.clamp(distance / factor, controls.minDistance, controls.maxDistance);
    moveCamera(target, next, direction);
    if (travel) { travel.duration = 280; travel.zoomDistance = next; }
  }

  controls.addEventListener('start', () => { interacting = true; gesture(); }); controls.addEventListener('end', () => { interacting = false; invalidate(); }); controls.addEventListener('change', invalidate);
  let down;
  canvas.addEventListener('pointerdown', event => { down = [event.clientX, event.clientY]; }, { signal: scope.signal });
  function pick(x, y) {
    if (!state || entry?.active) return;
    raycaster.setFromCamera(new THREE.Vector2(x / width * 2 - 1, -y / height * 2 + 1), camera);
    raycaster.params.Points.threshold = controls.maxDistance * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / height * 6;
    const hits = raycaster.intersectObject(focus, false);
    const candidates = hits.length ? [] : raycaster.intersectObject(points, false).map(hit => {
      const node = positions[hit.index], screen = new THREE.Vector3(node.x, node.y, node.z).project(camera);
      return { ...hit, pixels: Math.hypot((screen.x + 1) * width / 2 - x, (1 - screen.y) * height / 2 - y) };
    }).filter(hit => hit.pixels <= 6).sort((a, b) => a.pixels - b.pixels);
    const hit = hits[0] || candidates[0];
    const id = hit?.instanceId !== undefined ? selectedIds[hit.instanceId] : positions[hit?.index]?.id;
    onSelect(id || null);
  }
  canvas.addEventListener('pointerup', event => { const press = down; down = undefined; if (event.button !== 0 || !press || Math.hypot(event.clientX - press[0], event.clientY - press[1]) > 5) return; const box = canvas.getBoundingClientRect(); pick(event.clientX - box.left, event.clientY - box.top); }, { signal: scope.signal });
  canvas.addEventListener('pointercancel', () => { down = undefined; }, { signal: scope.signal });
  canvas.addEventListener('keydown', event => {
    if (!state || event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.key === 'Home') { gesture(); fit(); } else if (event.key.toLowerCase() === 'f') { gesture(); fit([...state.active]); }
    else if (event.key === 'Enter') pick(width / 2, height / 2);
    else if (['+', '=', '-'].includes(event.key)) zoom(event.key === '-' ? 1 / 1.2 : 1.25);
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) { gesture(); const orbit = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target)); orbit.theta += event.key === 'ArrowLeft' ? -.12 : event.key === 'ArrowRight' ? .12 : 0; orbit.phi = THREE.MathUtils.clamp(orbit.phi + (event.key === 'ArrowUp' ? -.12 : event.key === 'ArrowDown' ? .12 : 0), .05, Math.PI - .05); camera.position.setFromSpherical(orbit).add(controls.target); controls.update(); }
    else return; event.preventDefault(); invalidate();
  }, { signal: scope.signal });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; canvas.dataset.webglLost = 'true'; labels.hidden = true; onAvailability(false); }, { signal: scope.signal });
  canvas.addEventListener('webglcontextrestored', () => { lost = false; canvas.dataset.webglLost = 'false'; labels.hidden = false; onAvailability(true); resize(); }, { signal: scope.signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else invalidate(); }, { signal: scope.signal });
  motion.addEventListener('change', () => { if (motion.matches && state) reportDiscovery(state.active); stopReplay(); travel = reveal = null; onMotion(!motion.matches && !stopped); invalidate(); }, { signal: scope.signal });
  function projectedNode(id, index) {
    const node = byId.get(id), screen = new THREE.Vector3(node.x, node.y, node.z).project(camera);
    focus.getMatrixAt(index, object.matrix);
    const radius = new THREE.Vector3().setFromMatrixScale(object.matrix).x;
    const edge = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(radius).add(node).project(camera);
    const color = new THREE.Color(); focus.getColorAt(index, color);
    return { id, color: color.getHexString(), x: (screen.x + 1) * width / 2, y: (1 - screen.y) * height / 2, radiusPixels: Math.hypot((edge.x - screen.x) * width / 2, (edge.y - screen.y) * height / 2) };
  }
  function previewStats() {
    const bank = previewBanks.length === 1 ? previewBanks[0] : null;
    const result = { bank, banks: [...previewBanks], weights: [...previewWeights], transitioning: Boolean(previewTransition), points: 0, edges: 0 };
    if (!bank) return result;
    const matches = (mesh, index) => new THREE.Color().fromBufferAttribute(mesh.geometry.attributes.color, index).getHexString() === new THREE.Color(palette()[bank]).getHexString();
    result.points = positions.filter((node, index) => matches(points, index)).length;
    result.edges = state.graph.edges.filter((edge, index) => matches(contextEdges, index * 2) && matches(contextEdges, index * 2 + 1)).length;
    return result;
  }
  const resizeObserver = new ResizeObserver(resize), theme = new MutationObserver(() => { if (state) { rebuildContext(); rebuildFocus(false, replay?.groups[replay.index]); } });
  resizeObserver.observe(canvas); theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }); resize();
  return {
    preview(banks) { const values = Array.isArray(banks) ? banks : [banks]; const next = pilotPreviewIds.filter(bank => values.includes(bank)); if (next.join() === previewBanks.join()) return; previewBanks = next; if (state) colorContext(); },
    update(next, shouldFollow = true, entryReady = true) {
      const resetDiscovery = next.requestId !== requestId || ['loading', 'accepted'].includes(next.phase);
      state = next; follow = shouldFollow;
      const focusKey = JSON.stringify([[...state.active], state.edges, state.sources]);
      const restored = ['history', 'legacy.complete'].includes(next.phase) && focusKey !== lastFocusKey;
      reportDiscovery(motion.matches || restored ? next.active : [], resetDiscovery || restored);
      if (next.requestId !== requestId || ['loading', 'accepted'].includes(next.phase)) {
        presentationProgress = next.requestId ? 0 : 1; textStarted = false; cameraGroup = undefined;
        if (['loading', 'accepted'].includes(next.phase)) { stopped = false; travel = null; queryStarted = performance.now(); }
      }
      if (['history', 'legacy.complete', 'idle', 'error'].includes(next.phase)) { presentationProgress = 1; textStarted = true; spider.hide(); }
      requestId = next.requestId; onMotion(!motion.matches && !stopped);
      const nextKey = `${state.graphVersion}:${state.layoutRevision || 0}`;

      if (focusKey !== lastFocusKey) { overviewOrbit = !state.active.size || presentationProgress === 1; wasDiscovering = false; if (querying()) queryStarted = performance.now(); }
      if (replay && (nextKey !== key || focusKey !== lastFocusKey)) stopReplay();
      if (nextKey !== key) { manualFrame = false; const first = key === undefined; key = nextKey; rebuildContext(); rebuildFocus(false); if (first || follow && !manualFrame && ['idle', 'history', 'legacy.complete'].includes(state.phase)) {
        const initial = framing(); overviewDistance = initial.distance;
        camera.position.sub(controls.target).normalize().multiplyScalar(initial.distance).add(initial.target);
        controls.target.copy(initial.target); controls.update(); travel = null;
      } else if (follow && !stopped && presentationProgress === 1) fit();
        camera.updateMatrixWorld(); if (entryReady) entry?.configure(positions, width, height); }
      else if (focusKey !== lastFocusKey) { manualFrame = false; selected = undefined; rebuildFocus(); }
      if (entryReady && entry?.stats().phase === 'waiting') { camera.updateMatrixWorld(); entry.configure(positions, width, height); }
      lastFocusKey = focusKey; invalidate();
    },
    /** The presentation event represents actual visible text, not SSE status/metadata. */
    present(progress) {
      if (!Number.isFinite(progress) || progress <= 0 || progress > 1 || textStarted) return;
      textStarted = true; presentationProgress = 1; reportDiscovery(state.active);
      if (!replay) {
        spider.hide(); onContact([]); cameraGroup = undefined; wasDiscovering = false; onActivity(null);
        if (!stopped && follow && !manualFrame) { overviewOrbit = true; fit(); }
      }
      invalidate();
    },
    select(id, center = false) {
      if (!byId.has(id)) return;
      entry?.finish(); controls.enabled = true;
      const previous = selected;
      stopReplay(); selected = id; rebuildFocus(false);
      if (center) {
        manualFrame = true;
        const node = byId.get(id), current = camera.position.distanceTo(controls.target);
        const direction = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), .55);
        const distance = Math.max(controls.minDistance, Math.min(current, overviewDistance / 4));
        const retreat = Math.min(controls.maxDistance, Math.max(current * 1.35, distance * 1.6, framing([previous, id].filter(Boolean), direction).distance));
        moveCamera(new THREE.Vector3(node.x, node.y, node.z), distance, direction, retreat);
      }
    },
    replay() {
      if (motion.matches || !state || !selected && state.active.size && (state.provisional || state.mismatch)) return false;
      // Play resumes the current view while a concept is selected; the tour is for the overview.
      if (selected) { stopped = false; follow = false; manualFrame = true; travel = reveal = null; onMotion(true); invalidate(); return true; }
      stopped = false; follow = true; manualFrame = false; overviewOrbit = !state.active.size; wasDiscovering = false; onMotion(true);
      if (!state.active.size) { fit(); return true; }
      const groups = buildPilotReplay(state); if (!groups.length) return false;
      reportDiscovery([], true);
      selected = undefined; onAnchor(null); follow = true; manualFrame = false; replay = { groups, index: -1, started: performance.now() }; replayRun++; travel = reveal = null;
      advanceReplay(replay.started);
      invalidate(); return true;
    },
    clearSelection() { onContact([]); selected = undefined; onAnchor(null); rebuildFocus(false); },
    stop,
    fit() { if (!state) return; entry?.finish(); controls.enabled = true; follow = true; manualFrame = true; stopReplay(); fit(undefined, .4); },
    fitActive() {
      if (!state?.active.size) return;
      entry?.finish(); controls.enabled = true; follow = true;
      manualFrame = true;
      stopReplay();
      const nodes = pilotResultCluster([...state.active].map(id => byId.get(id)).filter(Boolean));
      const orbit = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
      orbit.theta += .38; orbit.phi = THREE.MathUtils.clamp(orbit.phi - .12, .2, Math.PI - .2);
      const direction = new THREE.Vector3().setFromSpherical(orbit), { target, distance } = framing(nodes.map(node => node.id), direction);
      moveCamera(target, distance, direction);
    },
    zoom,
    stats() { return { arrowHeads: { visible: arrows.visible, count: arrows.count }, discoveryCounts: { ...discoveryCounts }, entry: entry?.stats(), preview: previewStats(), highlight: highlight.stats(), ...motionField.stats(), spider: spider.stats(), replay: { running: Boolean(replay), run: replayRun, bank: replay?.groups[replay.index]?.bank, touched: [...(replay?.touched || [])] }, contextGeometry: [points.geometry.uuid, contextEdges.geometry.uuid], contextColors: positions.slice(0, 6).map((node, index) => ({ id: node.id, color: new THREE.Color().fromBufferAttribute(points.geometry.attributes.color, index).getHexString() })), selectedId: selected, nodePositions: selectedIds.map(projectedNode), pan: controls.mouseButtons.LEFT === THREE.MOUSE.PAN, framePending: Boolean(frame), camera: camera.position.toArray(), target: controls.target.toArray(), renderedIds: [...selectedIds], renderedRelations: renderedEdges.map(edge => ({ ...edge })), arrows: renderedEdges.map((edge, index) => { const color = new THREE.Color(); arrows.getColorAt(index, color); const lineColor = new THREE.Color().fromBufferAttribute(focusEdges.geometry.attributes.color, index * 32); return { ...edge, progress: arrowProgress[index], color: '#' + color.getHexString(), lineColor: '#' + lineColor.getHexString() }; }), contextLost: lost, pointsPixelSize: points.material.size, pointSizeAttenuation: points.material.sizeAttenuation, contextOpacity: points.material.opacity, contextEdgeOpacity: contextEdges.material.opacity, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, drawCalls: renderer.info.render.calls, frameIntervals: [...frameIntervals], renderCpuMs: [...renderCpuMs] }; },
    resetPerformance() { frameIntervals.length = renderCpuMs.length = 0; previousActive = false; },
    destroy() {
      onActivity(null); onContact([]);
      if (replay) { replay = undefined; onReplay(false); }
      destroyed = true; cancelAnimationFrame(frame); scope.abort(); resizeObserver.disconnect(); theme.disconnect(); controls.dispose();
      scene.traverse(node => { if (node.isInstancedMesh) node.dispose(); node.geometry?.dispose(); if (node.material) node.material.dispose(); }); renderer.dispose(); onAnchor(null); canvas.dataset.cameraMoving = 'false'; canvas.dataset.disposed = 'true'; canvas.setAttribute('aria-busy', 'false');
    },
  };
}
