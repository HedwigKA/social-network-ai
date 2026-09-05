/**
 * Unit Test Suite for Graph Domain Class and Centrality Metrics.
 */
import { Graph } from '../js/domain/graph/Graph.js';
import { calculateDegreeCentrality, calculateBetweennessCentrality, calculateClosenessCentrality } from '../js/domain/graph/graphMetrics.js';

export function runGraphTests() {
    const results = [];
    
    // Test 1: Node and Edge count
    try {
        const nodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
        const links = [{ source: 'A', target: 'B' }, { source: 'B', target: 'C' }];
        const g = new Graph(nodes, links);

        if (g.getNodeCount() === 3 && g.getEdgeCount() === 2) {
            results.push({ name: 'Graph Initialization & Counts', status: 'PASS' });
        } else {
            results.push({ name: 'Graph Initialization & Counts', status: 'FAIL', error: `Expected 3 nodes 2 edges, got ${g.getNodeCount()}, ${g.getEdgeCount()}` });
        }
    } catch (e) {
        results.push({ name: 'Graph Initialization & Counts', status: 'FAIL', error: e.message });
    }

    // Test 2: Degree Centrality calculation
    try {
        const nodes = [{ id: '1' }, { id: '2' }, { id: '3' }];
        const links = [{ source: '1', target: '2' }, { source: '1', target: '3' }];
        const g = new Graph(nodes, links);
        const degrees = calculateDegreeCentrality(g);

        if (degrees.get('1') === 1.0 && degrees.get('2') === 0.5) {
            results.push({ name: 'Degree Centrality Calculation', status: 'PASS' });
        } else {
            results.push({ name: 'Degree Centrality Calculation', status: 'FAIL', error: `Unexpected values: node 1=${degrees.get('1')}` });
        }
    } catch (e) {
        results.push({ name: 'Degree Centrality Calculation', status: 'FAIL', error: e.message });
    }

    // Test 3: Betweenness Centrality for line graph (B is broker between A and C)
    try {
        const nodes = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
        const links = [{ source: 'A', target: 'B' }, { source: 'B', target: 'C' }];
        const g = new Graph(nodes, links);
        const bet = calculateBetweennessCentrality(g);

        if (bet.get('B') > bet.get('A') && bet.get('B') > bet.get('C')) {
            results.push({ name: 'Betweenness Centrality Broker Check', status: 'PASS' });
        } else {
            results.push({ name: 'Betweenness Centrality Broker Check', status: 'FAIL', error: `Node B score ${bet.get('B')} not highest` });
        }
    } catch (e) {
        results.push({ name: 'Betweenness Centrality Broker Check', status: 'FAIL', error: e.message });
    }

    return results;
}

if (typeof window !== 'undefined') {
    window.runGraphTests = runGraphTests;
}
