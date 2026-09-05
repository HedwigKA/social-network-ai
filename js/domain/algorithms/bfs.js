/**
 * Step-by-Step Breadth-First Search (BFS) Traversal Visualizer Generator.
 */

/**
 * Computes all execution steps of Breadth-First Search (BFS) for visualization.
 * @param {Graph} graph 
 * @param {string} startNodeId 
 * @returns {Array<Object>}
 */
export function generateBFSSteps(graph, startNodeId) {
    const steps = [];
    const visited = new Set();
    const queue = [String(startNodeId)];
    const parentMap = new Map();

    visited.add(String(startNodeId));

    steps.push({
        type: 'START',
        currentNode: String(startNodeId),
        visited: Array.from(visited),
        queue: [...queue],
        activeEdges: [],
        description: `Memulai BFS dari simpul awal ${startNodeId}. Dimasukkan ke Queue.`
    });

    while (queue.length > 0) {
        const u = queue.shift();

        steps.push({
            type: 'DEQUEUE',
            currentNode: u,
            visited: Array.from(visited),
            queue: [...queue],
            activeEdges: [],
            description: `Mengeluarkan simpul ${u} dari Queue untuk mengecek tetangganya.`
        });

        const neighbors = graph.getNeighbors(u).map(nbr => nbr.target);

        neighbors.forEach(v => {
            const edgeKey = `${u}->${v}`;
            if (!visited.has(v)) {
                visited.add(v);
                parentMap.set(v, u);
                queue.push(v);

                steps.push({
                    type: 'VISIT_NEIGHBOR',
                    currentNode: u,
                    targetNode: v,
                    visited: Array.from(visited),
                    queue: [...queue],
                    activeEdges: [edgeKey],
                    description: `Menemukan tetangga belum dikunjungi: ${v}. Menandai visited dan memasukkan ke Queue.`
                });
            } else {
                steps.push({
                    type: 'SKIP_NEIGHBOR',
                    currentNode: u,
                    targetNode: v,
                    visited: Array.from(visited),
                    queue: [...queue],
                    activeEdges: [edgeKey],
                    description: `Tetangga ${v} sudah dikunjungi sebelumnya. Dilewati.`
                });
            }
        });
    }

    steps.push({
        type: 'COMPLETE',
        currentNode: null,
        visited: Array.from(visited),
        queue: [],
        activeEdges: [],
        description: 'BFS Selesai! Seluruh simpul terjangkau telah ditelusuri.'
    });

    return steps;
}
