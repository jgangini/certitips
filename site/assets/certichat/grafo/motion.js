import * as THREE from '../../vendor/three/three.module.js?v=976aefb5a1b9';

export function pilotWorldPixel(point, camera, height) {
  const view = camera.matrixWorldInverse.elements;
  const depth = -(view[2] * point.x + view[6] * point.y + view[10] * point.z + view[14]);
  return Math.max(camera.near, depth) * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / height;
}

// Node waves only; the walking actor owns its temporary dotted tentacles.
export function createPilotMotion(scene) {
  const group = new THREE.Group(); scene.add(group);
  const waves = Array.from({ length: 3 }, () => {
    const mesh = new THREE.InstancedMesh(new THREE.RingGeometry(1, 1.065, 48), new THREE.MeshBasicMaterial({ transparent: true, opacity: .5, depthWrite: false, depthTest: false, side: THREE.DoubleSide }), 97);
    mesh.count = 0; mesh.renderOrder = 3; group.add(mesh); return mesh;
  });
  const object = new THREE.Object3D(), point = new THREE.Vector3();
  let nodes = [], started = 0, selectedId, pulseRadiusPixels = 0, visibleWaveNodes = 0;
  function configure(nextNodes, selected) {
    nodes = nextNodes.slice(0, 97); selectedId = selected; started = performance.now();
    for (let wave = 0; wave < waves.length; wave++) {
      const mesh = waves[wave]; mesh.count = nodes.length;
      nodes.forEach((node, index) => mesh.setColorAt(index, new THREE.Color(node.colors[wave % node.colors.length])));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  }
  function draw(now, camera, height, reduced, replay, paused = false) {
    group.visible = !paused;
    visibleWaveNodes = 0;
    if (paused) { pulseRadiusPixels = 0; return false; }
    const time = Math.max(0, now - started);
    pulseRadiusPixels = 0;
    waves.forEach((mesh, wave) => {
      const phase = reduced ? wave / 6 : (time / 2300 + wave / 3) % 1;
      mesh.material.opacity = reduced ? .25 : (1 - phase) ** 2 * .5;
      nodes.forEach((node, index) => {
        point.set(node.x, node.y, node.z);
        const pixels = reduced && node.id === selectedId || replay?.active && !replay.touched.has(node.id) ? 0 : 7 + phase * 18;
        if (wave === 0 && pixels > 0) visibleWaveNodes++;
        if (node.id === selectedId) pulseRadiusPixels = pixels;
        const radius = pilotWorldPixel(point, camera, height) * pixels;
        object.position.copy(point); object.quaternion.copy(camera.quaternion); object.scale.setScalar(radius); object.updateMatrix(); mesh.setMatrixAt(index, object.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere();
    });
    return !reduced && nodes.length > 0;
  }
  return { configure, draw, stats: () => ({ waveNodes: nodes.length, visibleWaveNodes, pulseRadiusPixels, motionPointClouds: group.children.filter(child => child.isPoints).length }) };
}
