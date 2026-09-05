/**
 * Core Graph Data Structure Representation (SOLID: Single Responsibility).
 */
export class Graph {
    constructor(nodes = [], links = [], isDirected = false) {
        this.nodes = [];
        this.links = [];
        this.isDirected = isDirected;
        this.adjacencyMap = new Map();

        this.init(nodes, links);
    }

    init(nodes, links) {
        this.nodes = nodes.map(n => typeof n === 'object' ? { ...n } : { id: String(n) });
        this.adjacencyMap.clear();

        this.nodes.forEach(n => {
            this.adjacencyMap.set(String(n.id), []);
        });

        links.forEach(l => {
            const src = typeof l.source === 'object' ? String(l.source.id) : String(l.source);
            const tgt = typeof l.target === 'object' ? String(l.target.id) : String(l.target);
            const weight = l.weight || l.value || 1;

            if (!this.adjacencyMap.has(src)) this.adjacencyMap.set(src, []);
            if (!this.adjacencyMap.has(tgt)) this.adjacencyMap.set(tgt, []);

            this.adjacencyMap.get(src).push({ target: tgt, weight });
            if (!this.isDirected) {
                this.adjacencyMap.get(tgt).push({ target: src, weight });
            }

            this.links.push({ source: src, target: tgt, weight });
        });
    }

    getNodeCount() {
        return this.nodes.length;
    }

    getEdgeCount() {
        return this.links.length;
    }

    getNeighbors(nodeId) {
        return this.adjacencyMap.get(String(nodeId)) || [];
    }

    getDegree(nodeId) {
        return this.getNeighbors(nodeId).length;
    }

    getDensity() {
        const n = this.getNodeCount();
        if (n <= 1) return 0;
        const e = this.getEdgeCount();
        const maxEdges = this.isDirected ? n * (n - 1) : (n * (n - 1)) / 2;
        return e / maxEdges;
    }

    toAdjacencyMatrix() {
        const nodeIds = this.nodes.map(n => String(n.id));
        const n = nodeIds.length;
        const matrix = Array.from({ length: n }, () => Array(n).fill(0));
        const indexMap = new Map(nodeIds.map((id, idx) => [id, idx]));

        this.links.forEach(l => {
            const u = indexMap.get(String(l.source));
            const v = indexMap.get(String(l.target));
            if (u !== undefined && v !== undefined) {
                matrix[u][v] = 1;
                if (!this.isDirected) {
                    matrix[v][u] = 1;
                }
            }
        });

        return { labels: nodeIds, matrix };
    }

    toAdjacencyListString() {
        const lines = [];
        this.nodes.forEach(n => {
            const neighbors = this.getNeighbors(n.id).map(nbr => nbr.target);
            lines.push(`${n.id} -> [${neighbors.join(', ')}]`);
        });
        return lines.join('\n');
    }

    toEdgeListString() {
        return this.links.map(l => `(${l.source}, ${l.target})`).join('\n');
    }
}
