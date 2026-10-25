import * as THREE from '../../vendor/three/three.module.js?v=e53cf0bb714b';
import { pilotPreviewIds, pilotColors, pilotPreviewZone } from './state.js?v=e53cf0bb714b';

// The overlay contains only existing members/edges; it never strengthens grey context.
export function createPilotHighlight(scene) {
  const layers = pilotPreviewIds.map(bank => {
    const group = new THREE.Group(); group.visible = false; scene.add(group);
    const cloud = new THREE.Points(new THREE.BufferGeometry(), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { color: { value: new THREE.Color(pilotColors[bank] || pilotColors.unknown) }, opacity: { value: 0 }, size: { value: 12 * Math.min(2, devicePixelRatio || 1) } },
      vertexShader: 'uniform float size; void main(){ gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_PointSize=size; }',
      fragmentShader: 'uniform vec3 color; uniform float opacity; void main(){ float glow=1.0-smoothstep(0.0,0.5,length(gl_PointCoord-0.5)); gl_FragColor=vec4(color,opacity*glow*glow);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
    }));
    const lines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: pilotColors[bank] || pilotColors.unknown, transparent: true, depthWrite: false, opacity: 0 }));
    group.add(cloud, lines);
    return { bank, group, cloud, lines };
  });
  return {
    configure(state, positions) {
      const byId = new Map(positions.map(node => [node.id, node]));
      for (const { bank, cloud, lines } of layers) {
        const zone = pilotPreviewZone(state, bank);
        const vertices = [...zone.nodes].flatMap(id => { const node = byId.get(id); return [node.x, node.y, node.z]; });
        const edges = [...zone.edges].flatMap(index => [state.graph.edges[index].source, state.graph.edges[index].target].flatMap(id => { const node = byId.get(id); return [node.x, node.y, node.z]; }));
        for (const [mesh, values] of [[cloud, vertices], [lines, edges]]) {
          mesh.geometry.dispose(); mesh.geometry = new THREE.BufferGeometry();
          mesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(values, 3)); mesh.geometry.computeBoundingSphere();
        }
      }
    },
    draw(weights, dark, contextColor, quizColor = pilotColors.certiquiz) {
      layers.forEach(({ bank, group, cloud, lines }, index) => {
        if (bank === 'cognee' || bank === 'certiquiz') { const color = bank === 'cognee' ? contextColor : quizColor; cloud.material.uniforms.color.value.set(color); lines.material.color.set(color); }
        group.visible = weights[index] > 0;
        // Dense source layers must not become opaque surfaces when their lines overlap.
        const edges = (lines.geometry.attributes.position?.count || 0) / 2;
        const density = Math.sqrt(400 / Math.max(400, edges));
        cloud.material.uniforms.size.value = (dark ? 5 : 12) * Math.min(2, devicePixelRatio || 1);
        cloud.material.uniforms.opacity.value = weights[index] * (dark ? .24 : .045);
        lines.material.opacity = weights[index] * (dark ? .15 * density : .3);
      });
    },
    stats: () => layers.map(({ bank, group, cloud, lines }) => ({ bank, visible: group.visible, color: lines.material.color.getHexString(), points: cloud.geometry.attributes.position?.count || 0, edges: (lines.geometry.attributes.position?.count || 0) / 2, lineOpacity: lines.material.opacity, cloudOpacity: cloud.material.uniforms.opacity.value, pointSize: cloud.material.uniforms.size.value })),
  };
}
