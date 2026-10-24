import * as THREE from '../../vendor/three/three.module.js?v=283ef5ffed52';

const MINIMUM_HOLD_MS = 1500;

/** Extrude the approved Oracle contour into a gently turning volume, preserving its authored outline. */
function createOracleMark(camera, target, pathData) {
  const path = new Path2D(pathData), probe = document.createElement('canvas').getContext('2d');
  const samples = [];
  let cursor = 1, movingSamples = [], volumeSamples = [];
  const position = new THREE.Vector3(), local = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3(), normal = new THREE.Vector3();
  const rotation = new THREE.Euler();
  const radical = (value, base) => { let fraction = 1, result = 0; while (value) { fraction /= base; result += value % base * fraction; value = Math.floor(value / base); } return result; };
  function sample(count) {
    while (samples.length < count && cursor < count * 32 + 1024) {
      const x = radical(cursor, 2) * 256, y = radical(cursor++, 3) * 256;
      if (probe.isPointInPath(path, x, y, 'evenodd')) samples.push([x - 128, 128.5 - y]);
    }
    if (samples.length < count) throw new Error('Oracle entry path cannot supply points');
    return samples;
  }
  function mark(count, width, height, now) {
    const scale = .7 * Math.min(width * .55, height * .6, 340) / 256;
    const worldPixel = 2 * camera.position.distanceTo(target) * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / height;
    right.setFromMatrixColumn(camera.matrixWorld, 0); up.setFromMatrixColumn(camera.matrixWorld, 1); normal.setFromMatrixColumn(camera.matrixWorld, 2);
    rotation.set(-.18 + Math.sin(now / 2400) * .06, .32 + Math.sin(now / 2100) * .16, 0);
    const values = new Float32Array(count * 3);
    movingSamples = []; volumeSamples = [];
    sample(count).slice(0, count).forEach(([x, y], index) => {
      const dx = Math.sin(now / 650 + index * 1.7) * 2.4, dy = Math.cos(now / 800 + index * 2.3) * 2.4;
      if (probe.isPointInPath(path, x + dx + 128, 128.5 - y - dy, 'evenodd')) { x += dx; y += dy; }
      const depth = (radical(index + 1, 5) * 2 - 1) * 18;
      if (index < 6) { movingSamples.push([x, y]); volumeSamples.push([x, y, depth]); }
      local.set(x, y, depth).applyEuler(rotation).multiplyScalar(scale * worldPixel);
      position.copy(target).addScaledVector(right, local.x).addScaledVector(up, local.y).addScaledVector(normal, local.z).toArray(values, index * 3);
    });
    return values;
  }
  return { positions: mark, samples, get movingSamples() { return movingSamples; }, get volumeSamples() { return volumeSamples; } };
}

/** Update only the existing point buffer, preserving the scene object's identity. */
function writePositions(points, values) {
  let attribute = points.geometry.getAttribute('position');
  if (!attribute || attribute.array.length !== values.length) {
    attribute = new THREE.BufferAttribute(new Float32Array(values.length), 3); points.geometry.setAttribute('position', attribute);
  }
  attribute.array.set(values); attribute.needsUpdate = true; points.geometry.computeBoundingSphere();
}

/** Burst out in three dimensions, then settle exactly on real targets without a camera zoom. */
function interpolatePositions(working, starts, ends, ease) {
  const burst = Math.sin(Math.PI * ease) * (1 - ease) * 110;
  for (let index = 0; index < working.length / 3; index++) {
    const angle = index * 2.399963229728653;
    const vertical = ((index * .61803398875) % 1) * 2 - 1;
    const horizontal = Math.sqrt(1 - vertical * vertical);
    working[index * 3] = THREE.MathUtils.lerp(starts[index * 3], ends[index * 3], ease) + Math.cos(angle) * horizontal * burst;
    working[index * 3 + 1] = THREE.MathUtils.lerp(starts[index * 3 + 1], ends[index * 3 + 1], ease) + vertical * burst;
    working[index * 3 + 2] = THREE.MathUtils.lerp(starts[index * 3 + 2], ends[index * 3 + 2], ease) + Math.sin(angle) * horizontal * burst;
  }
}

/** Preserve matching node positions when membership data changes during the entrance. */
function retainOrigins(nodes, displayed, next, origins) {
  if (!displayed) return origins;
  const previous = new Map(nodes.map((node, index) => [node.id, displayed.slice(index * 3, index * 3 + 3)]));
  next.forEach((node, index) => { const position = previous.get(node.id); if (position) origins.set(position, index * 3); });
  return origins;
}


/** Morph the existing context points from the approved Oracle path into real node positions.
 * Waiting particles have no graph identity; the first snapshot binds their stable sample indices.
 * No progress is invented: the hold starts after the page glass is gone; expansion also needs valid targets.
 * The original SVG path is supplied by the static shell; invalid geometry fails to the normal graph. */
export function createPilotEntry(points, camera, target, pathData) {
  const mark = createOracleMark(camera, target, pathData);
  let nodes = [], starts, ends, working, started, firstDraw, phase = 'waiting', progress = 0, lastNow = 0;
  const write = values => writePositions(points, values);
  function finish() {
    if (phase === 'ready') return;
    if (ends) write(ends);
    phase = 'ready'; progress = 1; points.material.vertexColors = true; points.material.color.set('#ffffff'); points.material.needsUpdate = true;
  }
  return {
    get active() { return phase !== 'ready'; },
    /** Rebind by node ID during an early snapshot/bank refresh without replaying the entrance. */
    configure(next, width, height) {
      if (phase === 'ready') return;
      const origins = mark.positions(next.length, width, height, lastNow);
      starts = retainOrigins(nodes, working, next, origins);
      nodes = next; ends = new Float32Array(next.flatMap(node => [node.x, node.y, node.z]));
      working = new Float32Array(starts);
      started = undefined; phase = 'expanding'; progress = 0; write(starts);
    },
    draw(now, width, height, reduced, color, visible) {
      if (phase === 'ready') return false;
      if (visible) { firstDraw ??= now; started ??= Math.max(now, firstDraw + MINIMUM_HOLD_MS); }
      lastNow = reduced ? 0 : now;
      if (reduced && ends) { finish(); return false; }
      if (!ends) write(mark.positions(1024, width, height, lastNow));
      else {
        progress = started === undefined ? 0 : Math.max(0, Math.min(1, (now - started) / 1400));
        if (progress === 0) starts = mark.positions(nodes.length, width, height, lastNow);
        const ease = 1 - (1 - progress) ** 3;
        interpolatePositions(working, starts, ends, ease);
        write(working);
        if (progress === 1) { finish(); return false; }
      }
      if (points.material.vertexColors) { points.material.vertexColors = false; points.material.needsUpdate = true; }
      points.material.color.set(color);
      points.material.size = THREE.MathUtils.lerp(2.4, 1.35, progress);
      points.material.opacity = THREE.MathUtils.lerp(.9, .2, progress);
      return true;
    },
    finish,
    stats() { return { phase, progress, boundNodes: nodes.length, pointCount: points.geometry.getAttribute('position')?.count || 0, pointsId: points.uuid, nodeIds: nodes.slice(0, 6).map(node => node.id), oracleSamples: mark.samples.slice(0, 6), movingSamples: mark.movingSamples, oracleVolumeSamples: mark.volumeSamples, volumeDepth: 36, collections: [...new Set(nodes.flatMap(node => node.collections || []))], minimumMs: MINIMUM_HOLD_MS, markScale: .7, visibleAt: firstDraw ?? null, elapsedMs: firstDraw === undefined ? 0 : Math.max(0, lastNow - firstDraw), positions: Array.from(points.geometry.getAttribute('position')?.array.slice(0, 18) || []), targets: Array.from(ends?.slice(0, 18) || []) }; },
  };
}
