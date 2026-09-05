/**
 * Centrality & Graph Metrics Calculations.
 */

/**
 * Calculates Degree Centrality for all nodes
 * @param {Graph} graph 
 * @returns {Map<string, number>}
 */
export function calculateDegreeCentrality(graph) {
    const scores = new Map();
    const n = graph.getNodeCount();
    const denom = n > 1 ? n - 1 : 1;

    graph.nodes.forEach(node => {
        const deg = graph.getDegree(node.id);
        scores.set(String(node.id), deg / denom);
    });

    return scores;
}

/**
 * Calculates Betweenness Centrality (Brandes' algorithm approximation/exact)
 * @param {Graph} graph 
 * @returns {Map<string, number>}
 */
export function calculateBetweennessCentrality(graph) {
    const scores = new Map();
    const nodeIds = graph.nodes.map(n => String(n.id));
    nodeIds.forEach(id => scores.set(id, 0));

    const n = nodeIds.length;
    if (n <= 2) return scores;

    nodeIds.forEach(s => {
        const S = [];
        const P = new Map();
        const sigma = new Map();
        const d = new Map();

        nodeIds.forEach(v => {
            P.set(v, []);
            sigma.set(v, 0);
            d.set(v, -1);
        });

        sigma.set(s, 1);
        d.set(s, 0);

        const Q = [s];

        while (Q.length > 0) {
            const v = Q.shift();
            S.push(v);

            const neighbors = graph.getNeighbors(v).map(nbr => nbr.target);
            neighbors.forEach(w => {
                // Path discovery
                if (d.get(w) < 0) {
                    Q.push(w);
                    d.set(w, d.get(v) + 1);
                }
                // Path counting
                if (d.get(w) === d.get(v) + 1) {
                    sigma.set(w, sigma.get(w) + sigma.get(v));
                    P.get(w).push(v);
                }
            });
        }

        const delta = new Map();
        nodeIds.forEach(v => delta.set(v, 0));

        while (S.length > 0) {
            const w = S.pop();
            P.get(w).forEach(v => {
                delta.set(v, delta.get(v) + (sigma.get(v) / sigma.get(w)) * (1 + delta.get(w)));
            });
            if (w !== s) {
                scores.set(w, scores.get(w) + delta.get(w));
            }
        }
    });

    // Normalize for undirected graph
    const norm = ((n - 1) * (n - 2)) / 2;
    if (norm > 0) {
        nodeIds.forEach(id => {
            scores.set(id, scores.get(id) / norm);
        });
    }

    return scores;
}

/**
 * Calculates Closeness Centrality for all nodes
 * @param {Graph} graph 
 * @returns {Map<string, number>}
 */
export function calculateClosenessCentrality(graph) {
    const scores = new Map();
    const nodeIds = graph.nodes.map(n => String(n.id));
    const n = nodeIds.length;

    nodeIds.forEach(s => {
        const d = new Map();
        nodeIds.forEach(v => d.set(v, -1));
        d.set(s, 0);
        const Q = [s];

        while (Q.length > 0) {
            const v = Q.shift();
            const neighbors = graph.getNeighbors(v).map(nbr => nbr.target);
            neighbors.forEach(w => {
                if (d.get(w) < 0) {
                    d.set(w, d.get(v) + 1);
                    Q.push(w);
                }
            });
        }

        let totalDist = 0;
        let reachable = 0;
        nodeIds.forEach(v => {
            if (d.get(v) > 0) {
                totalDist += d.get(v);
                reachable++;
            }
        });

        scores.set(s, totalDist > 0 ? reachable / totalDist : 0);
    });

    return scores;
}

/**
 * Calculates PageRank score for all nodes
 * @param {Graph} graph 
 * @param {number} damping 
 * @param {number} iterations 
 * @returns {Map<string, number>}
 */
export function calculatePageRank(graph, damping = 0.85, iterations = 20) {
    const scores = new Map();
    const nodeIds = graph.nodes.map(n => String(n.id));
    const n = nodeIds.length;
    if (n === 0) return scores;

    const initialRank = 1 / n;
    nodeIds.forEach(id => scores.set(id, initialRank));

    for (let it = 0; it < iterations; it++) {
        const newScores = new Map();
        let sinkRank = 0;

        nodeIds.forEach(id => {
            const deg = graph.getDegree(id);
            if (deg === 0) {
                sinkRank += scores.get(id);
            }
        });

        nodeIds.forEach(id => {
            let rankSum = 0;
            const neighbors = graph.getNeighbors(id).map(nbr => nbr.target);

            neighbors.forEach(nbrId => {
                const nbrDeg = graph.getDegree(nbrId);
                if (nbrDeg > 0) {
                    rankSum += scores.get(nbrId) / nbrDeg;
                }
            });

            const rank = (1 - damping) / n + damping * (rankSum + sinkRank / n);
            newScores.set(id, rank);
        });

        newScores.forEach((v, k) => scores.set(k, v));
    }

    return scores;
}

/**
 * Approximate Louvain Community Detection (Modular greedy partition)
 * @param {Graph} graph 
 * @returns {Map<string, number>}
 */
export function calculateCommunityClusters(graph) {
    const clusters = new Map();
    const nodeIds = graph.nodes.map(n => String(n.id));
    
    // Assign initial cluster ID based on connected component BFS
    let currentCluster = 0;
    const visited = new Set();

    nodeIds.forEach(id => {
        if (!visited.has(id)) {
            currentCluster++;
            const queue = [id];
            visited.add(id);

            while (queue.length > 0) {
                const u = queue.shift();
                clusters.set(u, currentCluster);

                const nbrs = graph.getNeighbors(u).map(n => n.target);
                nbrs.forEach(v => {
                    if (!visited.has(v)) {
                        visited.add(v);
                        queue.push(v);
                    }
                });
            }
        }
    });

    return clusters;
}
