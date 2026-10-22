// Camera geometry uses actual graph positions; collection anchors are not visible content.
export function pilotCameraStep(start, end, phase, retreat) {
  const smooth = value => value ** 3 * (value * (value * 6 - 15) + 10);
  const progress = Math.max(0, Math.min(1, phase)), eased = smooth(progress);
  const approach = smooth(Math.max(0, (progress - .4) / .6));
  const radius = retreat === undefined ? start.radius + (end.radius - start.radius) * eased
    : progress < .4 ? start.radius + (retreat - start.radius) * smooth(progress / .4)
      : retreat + (end.radius - retreat) * approach;
  return { radius, phi: start.phi + (end.phi - start.phi) * eased, theta: start.theta + (end.theta - start.theta) * eased, targetPhase: retreat === undefined ? eased : approach };
}

/** Fit every node around the supplied reference, or the bounds center for a local cluster. */
export function pilotFrame(nodes, direction, fov, aspect, minimum = 45, reference) {
  if (!nodes.length) return { target: { x: 0, y: 0, z: 0 }, distance: minimum };
  const target = reference || Object.fromEntries(['x', 'y', 'z'].map(axis => [axis, (Math.min(...nodes.map(n => n[axis])) + Math.max(...nodes.map(n => n[axis]))) / 2]));
  const length = Math.hypot(direction.x, direction.y, direction.z), d = { x: direction.x / length, y: direction.y / length, z: direction.z / length };
  const horizontal = Math.hypot(d.x, d.z) || 1;
  const right = { x: d.z / horizontal, y: 0, z: -d.x / horizontal };
  const up = { x: d.y * right.z, y: d.z * right.x - d.x * right.z, z: -d.y * right.x };
  const tangent = Math.tan(fov * Math.PI / 360), fill = .92;
  const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
  const distance = Math.max(minimum, ...nodes.map(node => {
    const p = { x: node.x - target.x, y: node.y - target.y, z: node.z - target.z };
    return dot(p, d) + Math.max((Math.abs(dot(p, right)) + 12) / (tangent * aspect * fill), (Math.abs(dot(p, up)) + 12) / (tangent * fill));
  }));
  return { target, distance };
}

export function pilotResultCluster(nodes) {
  if (nodes.length < 4) return nodes;
  // The tightest neighbourhood containing a majority avoids sparse result outliers.
  const count = Math.ceil(nodes.length * .6), squared = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
  let best = nodes, spread = Infinity;
  for (const node of nodes) {
    const nearest = nodes.slice().sort((a, b) => squared(a, node) - squared(b, node) || a.id.localeCompare(b.id)).slice(0, count);
    const score = nearest.reduce((sum, other) => sum + squared(node, other), 0);
    if (score < spread) { spread = score; best = nearest; }
  }
  return best;
}
