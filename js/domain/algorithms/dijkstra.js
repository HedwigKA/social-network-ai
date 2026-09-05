/**
 * Step-by-Step Dijkstra Shortest Path Visualizer Generator.
 */

/**
 * Computes all execution steps of Dijkstra's Algorithm for visualization.
 * @param {Graph} graph 
 * @param {string} startNodeId 
 * @returns {Array<Object>}
 */
export function generateDijkstraSteps(graph, startNodeId) {
    const steps = [];
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    const visited = new Set();

    graph.nodes.forEach(node => {
        const id = String(node.id);
        distances.set(id, Infinity);
        previous.set(id, null);
        unvisited.add(id);
    });

    const startId = String(startNodeId);
    distances.set(startId, 0);

    steps.push({
        type: 'INIT',
        currentNode: startId,
        distances: new Map(distances),
        visited: Array.from(visited),
        activeEdges: [],
        description: `Inisialisasi Jarak Dijkstra: Set $d(${startId}) = 0$, simpul lain $= \\infty$.`
    });

    while (unvisited.size > 0) {
        // Find unvisited node with smallest distance
        let current = null;
        let smallestDist = Infinity;

        unvisited.forEach(nodeId => {
            if (distances.get(nodeId) < smallestDist) {
                smallestDist = distances.get(nodeId);
                current = nodeId;
            }
        });

        if (current === null || smallestDist === Infinity) {
            break; // Remaining nodes are unreachable
        }

        unvisited.delete(current);
        visited.add(current);

        steps.push({
            type: 'SELECT_MIN',
            currentNode: current,
            distances: new Map(distances),
            visited: Array.from(visited),
            activeEdges: [],
            description: `Memilih simpul unvisited jarak terkecil: ${current} ($d = ${smallestDist}$).`
        });

        const neighbors = graph.getNeighbors(current);

        neighbors.forEach(nbr => {
            const v = nbr.target;
            const weight = nbr.weight || 1;
            const alt = distances.get(current) + weight;

            if (unvisited.has(v)) {
                const edgeKey = `${current}->${v}`;
                if (alt < distances.get(v)) {
                    distances.set(v, alt);
                    previous.set(v, current);

                    steps.push({
                        type: 'RELAX_SUCCESS',
                        currentNode: current,
                        targetNode: v,
                        distances: new Map(distances),
                        visited: Array.from(visited),
                        activeEdges: [edgeKey],
                        description: `Relaksasi Sisi (${current}, ${v}): Ditemukan jalur lebih pendek ke ${v} ($d = ${alt}$).`
                    });
                } else {
                    steps.push({
                        type: 'RELAX_SKIP',
                        currentNode: current,
                        targetNode: v,
                        distances: new Map(distances),
                        visited: Array.from(visited),
                        activeEdges: [edgeKey],
                        description: `Relaksasi Sisi (${current}, ${v}): Jalur baru ($d=${alt}$) tidak lebih pendek dari yang ada ($d=${distances.get(v)}$).`
                    });
                }
            }
        });
    }

    steps.push({
        type: 'COMPLETE',
        currentNode: null,
        distances: new Map(distances),
        visited: Array.from(visited),
        activeEdges: [],
        description: 'Dijkstra Selesai! Seluruh jarak terpendek dari awal telah terhitung.'
    });

    return steps;
}
