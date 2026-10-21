import { language } from "../../site/i18n.js?v=d74a86d320d2";

/** Index a public snapshot without mutating it, dropping malformed nodes and dangling edges. */
export function indexGraph(data) {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) throw new Error("Invalid knowledge graph");
  const byId = new Map(), neighbors = new Map(), edges = [];
  for (const node of data.nodes) {
    if (typeof node?.id !== "string" || !node.id || typeof node.label !== "string" || !node.label.trim() || byId.has(node.id)) continue;
    byId.set(node.id, { id: node.id, label: node.label, type: typeof node.type === "string" ? node.type : "Concepto" });
    neighbors.set(node.id, new Map());
  }
  for (const edge of data.edges) {
    if (!byId.has(edge?.source) || !byId.has(edge?.target) || typeof edge.label !== "string") continue;
    edges.push({ source: edge.source, target: edge.target, label: edge.label });
    for (const [from, to] of edge.source === edge.target ? [[edge.source, edge.target]] : [[edge.source, edge.target], [edge.target, edge.source]]) {
      const links = neighbors.get(from);
      if (!links.has(to)) links.set(to, []);
      links.get(to).push(edges.at(-1));
    }
  }
  return { byId, neighbors, edges, nodes: [...byId.values()].sort((a, b) => a.label.localeCompare(b.label, language, { numeric: true, sensitivity: "base" })) };
}
