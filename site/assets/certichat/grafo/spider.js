import * as THREE from '../../vendor/three/three.module.js?v=a9c3981cedae';
import { pilotWorldPixel } from './motion.js?v=a9c3981cedae';
import { pilotSpiderEnvelope } from './replay.js?v=a9c3981cedae';

// A small decorative cursor and its feelers; these are not knowledge nodes or edges.
export function createPilotSpider(scene) {
  const group = new THREE.Group(); scene.add(group); group.visible = false;
  // Use the final render pass with alpha 1 and no blending, above the translucent cloud.
  const solid = { transparent: true, opacity: 1, blending: THREE.NoBlending, toneMapped: false, depthTest: false, depthWrite: false };
  const core = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), new THREE.MeshBasicMaterial(solid));
  core.material.color.set('#00ffff');
  core.renderOrder = 6; group.add(core);
  const geometry = new THREE.BufferGeometry(), positions = new Float32Array(8 * 36 * 3), colors = new Float32Array(positions.length);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
  const material = new THREE.PointsMaterial({ ...solid, size: 1.8, sizeAttenuation: false, vertexColors: true });
  const legs = new THREE.Points(geometry, material); legs.frustumCulled = false; legs.renderOrder = 5; group.add(legs);
  const feet = new THREE.InstancedMesh(new THREE.RingGeometry(5.5, 6.2, 32), new THREE.MeshBasicMaterial({ ...solid, color: '#00ffff', side: THREE.DoubleSide }), 8);
  feet.renderOrder = 6; feet.frustumCulled = false; group.add(feet);
  const foot = new THREE.Object3D();
  let currentColor, contactIds = [];
  const center = new THREE.Vector3(), desired = new THREE.Vector3(), up = new THREE.Vector3(), right = new THREE.Vector3(), point = new THREE.Vector3();
  const steps = Array.from({ length: 8 }, () => ({ id: null, start: new THREE.Vector3(), tip: new THREE.Vector3() }));
  let nodes = new Map(), initialized = false, previous = 0, targets = [], corePixel = 1;
  let wanted = false, started = 0, fadeFrom = 0, exitPositions, extensions = [], phase = 'hidden';
  function visibility(now, active, reduced) {
    if (reduced) { wanted = group.visible = false; phase = 'hidden'; return false; }
    if (active !== wanted) {
      fadeFrom = group.visible ? core.material.opacity : 0;
      started = now; wanted = active;
      if (!active) exitPositions = positions.slice();
    }
    if (!wanted && phase === 'hidden') return false;
    const envelope = pilotSpiderEnvelope(now - started, !wanted);
    phase = envelope.phase; extensions = envelope.legs;
    core.material.opacity = wanted ? fadeFrom + (1 - fadeFrom) * envelope.core : fadeFrom * envelope.core;
    core.material.blending = core.material.opacity === 1 ? THREE.NoBlending : THREE.NormalBlending;
    group.visible = phase !== 'hidden';
    return group.visible;
  }
  function extendLegs(base = positions) {
    for (let arm = 0; arm < 8; arm++) for (let dot = 0; dot < 36; dot++) {
      const offset = (arm * 36 + dot) * 3;
      point.fromArray(base, offset).sub(center).multiplyScalar(extensions[arm]).add(center).toArray(positions, offset);
    }
    const count = extensions.filter(value => value > 0).length;
    geometry.setDrawRange(0, count * 36); geometry.attributes.position.needsUpdate = true;
  }
  function configure(values) { nodes = new Map(values.map(node => [node.id, node])); if (!values.length) { initialized = false; steps.forEach(step => step.id = null); } }
  function targetPosition(camera, height) {
    desired.set(0, 0, 0);
    for (const target of targets) { const node = nodes.get(target.id); desired.add(new THREE.Vector3(node.x, node.y, node.z)); }
    if (targets.length) desired.divideScalar(targets.length);
    const pixel = pilotWorldPixel(desired, camera, height);
    up.setFromMatrixColumn(camera.matrixWorld, 1); right.setFromMatrixColumn(camera.matrixWorld, 0);
    if (targets.length) desired.addScaledVector(up, pixel * 36).addScaledVector(right, -pixel * 20);
    else if (initialized) desired.copy(center);
    return pixel;
  }
  function draw(now, camera, height, reduced, frame, color, track) {
    contactIds = [];
    const contacts = frame.targets.filter(target => nodes.has(target.id));
    const active = frame.active && contacts.length > 0;
    if (!visibility(now, active, reduced)) return null;
    if (!wanted) {
      feet.count = 0; extendLegs(exitPositions);
      return center.clone();
    }
    if (color !== currentColor) {
      currentColor = color; core.material.color.set(color); feet.material.color.set(color);
      for (let offset = 0; offset < colors.length; offset += 3) core.material.color.toArray(colors, offset);
    }
    targets = contacts.length ? Array.from({ length: 8 }, (_, index) => contacts[index % contacts.length]) : [];
    const pixel = targetPosition(camera, height);
    if (!initialized) { center.copy(desired); initialized = true; }
    // A slow collection rebuild must not turn the next visible step into a leap.
    const delta = Math.min(16, Math.max(0, now - previous)); previous = now;
    center.lerp(desired, 1 - Math.exp(-delta / 320));
    track?.(center);
    up.setFromMatrixColumn(camera.matrixWorld, 1); right.setFromMatrixColumn(camera.matrixWorld, 0);
    corePixel = pilotWorldPixel(center, camera, height);
    core.position.copy(center); core.quaternion.copy(camera.quaternion); core.scale.setScalar(8.5 * corePixel);
    feet.count = 0;
    targets.forEach((target, arm) => {
      const node = nodes.get(target.id), end = new THREE.Vector3(node.x, node.y, node.z), bend = arm % 2 ? 1 : -1;
      const step = steps[arm];
      if (step.id !== target.id || target.progress < step.progress) { step.start.copy(step.id ? step.tip : center); step.id = target.id; }
      step.progress = target.progress;
      step.tip.lerpVectors(step.start, end, target.progress);
      const control = center.clone().lerp(step.tip, .45).addScaledVector(right, bend * pixel * (22 + arm * 3)).addScaledVector(up, pixel * 18);
      const curve = new THREE.QuadraticBezierCurve3(center, control, step.tip);
      for (let dot = 0; dot < 36; dot++) {
        curve.getPoint(dot / 35, point).toArray(positions, (arm * 36 + dot) * 3);
      }
      if (target.progress >= 1 && extensions[arm] === 1) {
        if (!contactIds.includes(target.id)) contactIds.push(target.id);
        foot.position.copy(end); foot.quaternion.copy(camera.quaternion); foot.scale.setScalar(pilotWorldPixel(end, camera, height)); foot.updateMatrix(); feet.setMatrixAt(feet.count++, foot.matrix);
      }
    });
    feet.instanceMatrix.needsUpdate = true;
    extendLegs(); geometry.attributes.color.needsUpdate = true;
    return center.clone();
  }
  /** Remove the thinking cursor immediately when real answer text, failure or cancellation arrives. */
  function hide() { contactIds = []; wanted = group.visible = false; phase = 'hidden'; core.material.opacity = 0; feet.count = 0; extensions = []; }
  return { configure, draw, hide, contacts: () => contactIds, stats: () => ({ visible: group.visible, phase, transitioning: phase != 'hidden' && phase != 'active', coreOpacity: core.material.opacity, legExtensions: [...extensions], solid: [core.material, material, feet.material].every(value => value.opacity === 1 && value.blending === THREE.NoBlending && value.transparent && !value.depthTest), color: `#${core.material.color.getHexString()}`, position: center.toArray(), coreRadiusPixels: group.visible ? core.scale.x / corePixel : 0, coreAspect: core.scale.x / core.scale.y, contactCircles: group.visible ? feet.count : 0, contactIds: [...contactIds], tentacles: group.visible ? extensions.filter(value => value > 0).length : 0, targetIds: group.visible ? targets.map(target => target.id) : [] }) };
}
