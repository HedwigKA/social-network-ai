/**
 * Helper utility functions for Graph object conversions and generative topology.
 */
import { Graph } from './Graph.js';

/**
 * Generates Barabási–Albert Scale-Free graph topology
 * @param {number} numNodes 
 * @param {number} mAttachment 
 * @returns {Graph}
 */
export function generateBarabasiAlbertGraph(numNodes = 25, mAttachment = 2) {
    const nodes = [];
    const links = [];

    for (let i = 0; i < numNodes; i++) {
        nodes.push({ id: `N${i}` });
    }

    // Seed initial complete graph of size mAttachment + 1
    const seedSize = mAttachment + 1;
    for (let i = 0; i < seedSize; i++) {
        for (let j = i + 1; j < seedSize; j++) {
            links.push({ source: `N${i}`, target: `N${j}` });
        }
    }

    // Preferential attachment for remaining nodes
    for (let i = seedSize; i < numNodes; i++) {
        const targetNodeId = `N${i}`;
        const existingNodeDegrees = new Map();

        nodes.slice(0, i).forEach(n => existingNodeDegrees.set(n.id, 0));
        links.forEach(l => {
            if (existingNodeDegrees.has(l.source)) existingNodeDegrees.set(l.source, existingNodeDegrees.get(l.source) + 1);
            if (existingNodeDegrees.has(l.target)) existingNodeDegrees.set(l.target, existingNodeDegrees.get(l.target) + 1);
        });

        const pool = [];
        existingNodeDegrees.forEach((deg, id) => {
            const count = deg + 1; // Smoothing
            for (let c = 0; c < count; c++) pool.push(id);
        });

        const selectedTargets = new Set();
        while (selectedTargets.size < mAttachment && pool.length > 0) {
            const randIdx = Math.floor(Math.random() * pool.length);
            selectedTargets.add(pool[randIdx]);
        }

        selectedTargets.forEach(tgt => {
            links.push({ source: targetNodeId, target: tgt });
        });
    }

    return new Graph(nodes, links);
}

/**
 * Generates Watts–Strogatz Small-World graph topology
 * @param {number} numNodes 
 * @param {number} kNeighbors 
 * @param {number} pRewire 
 * @returns {Graph}
 */
export function generateWattsStrogatzGraph(numNodes = 20, kNeighbors = 4, pRewire = 0.2) {
    const nodes = [];
    const links = [];

    for (let i = 0; i < numNodes; i++) {
        nodes.push({ id: `V${i}` });
    }

    // Create ring lattice
    for (let i = 0; i < numNodes; i++) {
        for (let j = 1; j <= kNeighbors / 2; j++) {
            const target = (i + j) % numNodes;
            links.push({ source: `V${i}`, target: `V${target}` });
        }
    }

    // Rewire edges with probability pRewire
    links.forEach(l => {
        if (Math.random() < pRewire) {
            const srcIdx = parseInt(l.source.substring(1));
            let randTgtIdx = Math.floor(Math.random() * numNodes);
            while (randTgtIdx === srcIdx) {
                randTgtIdx = Math.floor(Math.random() * numNodes);
            }
            l.target = `V${randTgtIdx}`;
        }
    });

    return new Graph(nodes, links);
}
