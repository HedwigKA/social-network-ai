/**
 * Step-by-step BFS, Dijkstra, and GNN Layer Algorithm Workbench Component.
 */
import { PRESET_GRAPHS } from '../data/graphs.js';
import { Graph } from '../domain/graph/Graph.js';
import { generateBFSSteps } from '../domain/algorithms/bfs.js';
import { generateDijkstraSteps } from '../domain/algorithms/dijkstra.js';
import { $, addEvent, setText } from '../utils/dom.js';

export const algorithmWorkbenchComponent = {
    currentAlgo: 'bfs',
    steps: [],
    currentStepIdx: 0,
    isPlaying: false,
    timer: null,
    graphDomainObj: null,

    init() {
        this.bindEvents();
        this.loadAlgorithm('bfs');
    },

    bindEvents() {
        const btnBfs = $('wb-tab-bfs');
        const btnDijkstra = $('wb-tab-dijkstra');
        const btnGnn = $('wb-tab-gnn');

        if (btnBfs) addEvent(btnBfs, 'click', () => this.loadAlgorithm('bfs'));
        if (btnDijkstra) addEvent(btnDijkstra, 'click', () => this.loadAlgorithm('dijkstra'));
        if (btnGnn) addEvent(btnGnn, 'click', () => this.loadAlgorithm('gnn'));

        const playBtn = $('wb-play-btn');
        const prevBtn = $('wb-prev-btn');
        const nextBtn = $('wb-next-btn');
        const resetBtn = $('wb-reset-btn');

        if (playBtn) addEvent(playBtn, 'click', () => this.togglePlay());
        if (prevBtn) addEvent(prevBtn, 'click', () => this.prevStep());
        if (nextBtn) addEvent(nextBtn, 'click', () => this.nextStep());
        if (resetBtn) addEvent(resetBtn, 'click', () => this.resetSteps());

        const startSelect = $('wb-start-node-select');
        if (startSelect) {
            addEvent(startSelect, 'change', () => this.loadAlgorithm(this.currentAlgo));
        }
    },

    loadAlgorithm(algoName) {
        this.currentAlgo = algoName;
        this.pause();

        ['bfs', 'dijkstra', 'gnn'].forEach(a => {
            const btn = $(`wb-tab-${a}`);
            if (!btn) return;
            if (a === algoName) {
                btn.className = 'px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white shadow-sm';
            } else {
                btn.className = 'px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200';
            }
        });

        const raw = PRESET_GRAPHS.karate;
        this.graphDomainObj = new Graph(raw.nodes.slice(0, 10), raw.links.filter(l => parseInt(l.source) < 10 && parseInt(l.target) < 10));

        this.populateStartNodeSelect();

        const startSelect = $('wb-start-node-select');
        const startNodeId = startSelect ? startSelect.value || '0' : '0';

        if (algoName === 'bfs') {
            this.steps = generateBFSSteps(this.graphDomainObj, startNodeId);
        } else if (algoName === 'dijkstra') {
            this.steps = generateDijkstraSteps(this.graphDomainObj, startNodeId);
        } else {
            // GNN Aggregation steps mock
            this.steps = [
                { type: 'GNN_INIT', description: 'Layer 0: Inisialisasi fitur awal simpul $h_v^{(0)} = x_v$.', visited: [], queue: [] },
                { type: 'GNN_AGGREGATE', description: 'Layer 1 Message Passing: Agregasi tetangga $m_v^{(1)} = \\text{AGGREGATE}(\\{h_u^{(0)}, u \\in \\mathcal{N}(v)\\})$.', visited: ['0', '1'], queue: [] },
                { type: 'GNN_UPDATE', description: 'Layer 1 Update: Transformasi non-linear $h_v^{(1)} = \\sigma(W \\cdot m_v^{(1)})$.', visited: ['0', '1', '2', '3'], queue: [] }
            ];
        }

        this.currentStepIdx = 0;
        this.renderStep();
    },

    populateStartNodeSelect() {
        const select = $('wb-start-node-select');
        if (!select || !this.graphDomainObj) return;
        select.innerHTML = '';
        this.graphDomainObj.nodes.forEach(n => {
            const opt = document.createElement('option');
            opt.value = n.id;
            opt.textContent = `Simpul ${n.id}`;
            select.appendChild(opt);
        });
    },

    renderStep() {
        const step = this.steps[this.currentStepIdx];
        if (!step) return;

        setText('wb-step-counter', `Step ${this.currentStepIdx + 1} / ${this.steps.length}`);
        const descElem = $('wb-step-description');
        if (descElem) descElem.textContent = step.description;

        this.renderSvgVisualization(step);
    },

    renderSvgVisualization(step) {
        const svg = d3.select('#wbSvg');
        if (svg.empty() || !this.graphDomainObj) return;

        svg.selectAll('*').remove();
        const width = svg.node().clientWidth || 500;
        const height = svg.node().clientHeight || 300;

        const g = svg.append('g');

        const nodes = this.graphDomainObj.nodes.map(n => ({ id: n.id }));
        const links = this.graphDomainObj.links.map(l => ({ source: l.source, target: l.target }));

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(50))
            .force('charge', d3.forceManyBody().strength(-120))
            .force('center', d3.forceCenter(width / 2, height / 2));

        for (let i = 0; i < 60; i++) simulation.tick();

        const link = g.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke', '#cbd5e1')
            .attr('stroke-width', 2);

        const node = g.append('g')
            .selectAll('g')
            .data(nodes)
            .enter().append('g');

        const visitedSet = new Set(step.visited || []);
        const queueSet = new Set(step.queue || []);

        node.append('circle')
            .attr('r', 14)
            .attr('fill', d => {
                if (d.id === step.currentNode) return '#ef4444'; // Red current
                if (queueSet.has(d.id)) return '#f59e0b'; // Amber queue
                if (visitedSet.has(d.id)) return '#10b981'; // Green visited
                return '#94a3b8'; // Slate default
            })
            .attr('stroke', '#0f172a')
            .attr('stroke-width', 2);

        node.append('text')
            .text(d => d.id)
            .attr('x', 0)
            .attr('y', 4)
            .attr('text-anchor', 'middle')
            .attr('fill', '#ffffff')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold');

        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    },

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    play() {
        this.isPlaying = true;
        setText('wb-play-btn', '⏸️ Pause');
        this.timer = setInterval(() => {
            if (this.currentStepIdx < this.steps.length - 1) {
                this.currentStepIdx++;
                this.renderStep();
            } else {
                this.pause();
            }
        }, 1200);
    },

    pause() {
        this.isPlaying = false;
        setText('wb-play-btn', '▶️ Play');
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    nextStep() {
        this.pause();
        if (this.currentStepIdx < this.steps.length - 1) {
            this.currentStepIdx++;
            this.renderStep();
        }
    },

    prevStep() {
        this.pause();
        if (this.currentStepIdx > 0) {
            this.currentStepIdx--;
            this.renderStep();
        }
    },

    resetSteps() {
        this.pause();
        this.currentStepIdx = 0;
        this.renderStep();
    }
};
