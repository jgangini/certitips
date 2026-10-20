import * as THREE from './vendor/three/three.module.js';
import { collectionIds, pilotColors, pilotSourceZone } from './certichat-pilot-state.js?v=845612f31882';

// The overlay contains only existing members/edges; it never strengthens grey context.
export function createPilotHighlight(scene) {
  const layers = collectionIds.map(bank => {
    const group = new THREE.Group(); group.visible = false; scene.add(group);
    const cloud = new THREE.Points(new THREE.BufferGeometry(), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { color: { value: new THREE.Color(pilotColors[bank]) }, opacity: { value: 0 }, size: { value: 12 * Math.min(2, devicePixelRatio || 1) } },
      vertexShader: 'uniform float size; void main(){ gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_PointSize=size; }',
      fragmentShader: 'uniform vec3 color; uniform float opacity; void main(){ float glow=1.0-smoothstep(0.0,0.5,length(gl_PointCoord-0.5)); gl_FragColor=vec4(color,opacity*glow*glow);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
    }));
    const lines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: pilotColors[bank], transparent: true, depthWrite: false, opacity: 0 }));
    group.add(cloud, lines);
    return { bank, group, cloud, lines };
  });
  return {
    configure(state, positions) {
      const byId = new Map(positions.map(node => [node.id, node]));
      for (const { bank, cloud, lines } of layers) {
        const zone = pilotSourceZone(state, bank);
        const vertices = [...zone.nodes].flatMap(id => { const node = byId.get(id); return [node.x, node.y, node.z]; });
        const edges = [...zone.edges].flatMap(index => [state.graph.edges[index].source, state.graph.edges[index].target].flatMap(id => { const node = byId.get(id); return [node.x, node.y, node.z]; }));
        for (const [mesh, values] of [[cloud, vertices], [lines, edges]]) {
          mesh.geometry.dispose(); mesh.geometry = new THREE.BufferGeometry();
          mesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(values, 3)); mesh.geometry.computeBoundingSphere();
        }
      }
    },
    draw(weights, dark) {
      layers.forEach(({ group, cloud, lines }, index) => {
        group.visible = weights[index] > 0;
        cloud.material.uniforms.opacity.value = weights[index] * (dark ? .065 : .045);
        lines.material.opacity = weights[index] * (dark ? .34 : .3);
      });
    },
    stats: () => layers.map(({ bank, group, cloud, lines }) => ({ bank, visible: group.visible, color: lines.material.color.getHexString(), points: cloud.geometry.attributes.position?.count || 0, edges: (lines.geometry.attributes.position?.count || 0) / 2, lineOpacity: lines.material.opacity, cloudOpacity: cloud.material.uniforms.opacity.value })),
  };
}
