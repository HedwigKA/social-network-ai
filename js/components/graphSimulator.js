/**
 * D3.js Physics Simulator, Hero Constellation Canvas, & Matrix Generator Component.
 */
import { PRESET_GRAPHS } from '../data/graphs.js';
import { Graph } from '../domain/graph/Graph.js';
import {
    calculateDegreeCentrality,
    calculateBetweennessCentrality,
    calculateClosenessCentrality,
    calculatePageRank,
    calculateCommunityClusters
} from '../domain/graph/graphMetrics.js';
import { generateBarabasiAlbertGraph, generateWattsStrogatzGraph } from '../domain/graph/graphUtils.js';
import { geminiService } from '../services/geminiService.js';
import { exportService } from '../services/exportService.js';
import { $, addEvent, setText } from '../utils/dom.js';
import { parseMarkdown } from '../utils/formatters.js';

export const graphSimulatorComponent = {
    currentGraphData: null,
    graphDomainObj: null,
    simulation: null,
    selectedNodeForEdge: null,
    activeRepTab: 'adj-mat',

    init() {
        this.initHeroCanvas();
        this.bindEvents();
        this.loadPreset('karate');
    },

    bindEvents() {
        const presetSelect = $('preset-graph-select');
        if (presetSelect) {
            addEvent(presetSelect, 'change', (e) => this.loadPreset(e.target.value));
        }

        const colorSelect = $('color-node-select');
        if (colorSelect) {
            addEvent(colorSelect, 'change', (e) => this.updateNodeColoring(e.target.value));
        }

        const resetBtn = $('reset-graph-btn');
        if (resetBtn) {
            addEvent(resetBtn, 'click', () => {
                const val = presetSelect ? presetSelect.value : 'karate';
                this.loadPreset(val);
            });
        }

        const analyzeBtn = $('ai-analyze-graph-btn');
        if (analyzeBtn) {
            addEvent(analyzeBtn, 'click', () => this.analyzeTopologyWithAI());
        }

        const closeAnalysisBtn = $('close-ai-analysis-btn');
        if (closeAnalysisBtn) {
            addEvent(closeAnalysisBtn, 'click', () => {
                const container = $('ai-graph-analysis-container');
                if (container) container.classList.add('hidden');
            });
        }

        const tabMat = $('tab-adj-mat');
        const tabList = $('tab-adj-list');
        const tabEdge = $('tab-edge-list');

        if (tabMat) addEvent(tabMat, 'click', () => this.switchRepTab('adj-mat'));
        if (tabList) addEvent(tabList, 'click', () => this.switchRepTab('adj-list'));
        if (tabEdge) addEvent(tabEdge, 'click', () => this.switchRepTab('edge-list'));

        const exportJsonBtn = $('export-graph-json-btn');
        if (exportJsonBtn) {
            addEvent(exportJsonBtn, 'click', () => {
                if (this.currentGraphData) {
                    exportService.exportGraphToJSON(this.currentGraphData);
                }
            });
        }
    },

    initHeroCanvas() {
        const canvas = $('heroCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = canvas.parentElement.offsetWidth);
        let height = (canvas.height = canvas.parentElement.offsetHeight);

        const particles = [];
        const numParticles = 45;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#10b981';
                ctx.fill();

                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 130})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }
        });
    },

    loadPreset(presetKey) {
        if (presetKey === 'scalefree') {
            this.graphDomainObj = generateBarabasiAlbertGraph(22, 2);
            this.currentGraphData = {
                nodes: this.graphDomainObj.nodes,
                links: this.graphDomainObj.links
            };
        } else if (presetKey === 'smallworld') {
            this.graphDomainObj = generateWattsStrogatzGraph(20, 4, 0.2);
            this.currentGraphData = {
                nodes: this.graphDomainObj.nodes,
                links: this.graphDomainObj.links
            };
        } else {
            const raw = PRESET_GRAPHS[presetKey] || PRESET_GRAPHS.karate;
            this.currentGraphData = JSON.parse(JSON.stringify(raw));
            this.graphDomainObj = new Graph(this.currentGraphData.nodes, this.currentGraphData.links);
        }

        this.renderForceGraph();
        this.updateStats();
        this.renderRepDisplay();
    },

    renderForceGraph() {
        const svg = d3.select('#forceSvg');
        if (svg.empty()) return;

        svg.selectAll('*').remove();
        const width = svg.node().clientWidth || 600;
        const height = svg.node().clientHeight || 360;

        const g = svg.append('g');

        // Zoom capability
        const zoom = d3.zoom().on('zoom', (event) => {
            g.attr('transform', event.transform);
        });
        svg.call(zoom);

        const links = this.currentGraphData.links.map(d => ({ ...d }));
        const nodes = this.currentGraphData.nodes.map(d => ({ ...d }));

        this.simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(60))
            .force('charge', d3.forceManyBody().strength(-140))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(22));

        const link = g.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke', '#334155')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', 1.8);

        const node = g.append('g')
            .selectAll('g')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'node-group')
            .call(d3.drag()
                .on('start', (event, d) => {
                    if (!event.active) this.simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on('drag', (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on('end', (event, d) => {
                    if (!event.active) this.simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

        node.append('circle')
            .attr('r', 12)
            .attr('fill', '#10b981')
            .attr('stroke', '#064e3b')
            .attr('stroke-width', 2)
            .attr('class', 'cursor-pointer transition-all duration-300');

        node.append('text')
            .text(d => d.id)
            .attr('x', 0)
            .attr('y', 4)
            .attr('text-anchor', 'middle')
            .attr('fill', '#ffffff')
            .attr('font-size', '10px')
            .attr('font-weight', 'bold')
            .attr('pointer-events', 'none');

        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Apply initial coloring mode
        const colorSelect = $('color-node-select');
        this.updateNodeColoring(colorSelect ? colorSelect.value : 'degree');
    },

    updateNodeColoring(mode) {
        if (!this.graphDomainObj) return;

        let scoreMap = new Map();

        switch (mode) {
            case 'betweenness':
                scoreMap = calculateBetweennessCentrality(this.graphDomainObj);
                break;
            case 'closeness':
                scoreMap = calculateClosenessCentrality(this.graphDomainObj);
                break;
            case 'pagerank':
                scoreMap = calculatePageRank(this.graphDomainObj);
                break;
            case 'community':
                scoreMap = calculateCommunityClusters(this.graphDomainObj);
                break;
            case 'degree':
            default:
                scoreMap = calculateDegreeCentrality(this.graphDomainObj);
                break;
        }

        const colorScale = mode === 'community'
            ? d3.scaleOrdinal(d3.schemeCategory10)
            : d3.scaleSequential(d3.interpolateViridis);

        const values = Array.from(scoreMap.values());
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values) || 1;

        d3.select('#forceSvg').selectAll('circle')
            .transition()
            .duration(400)
            .attr('fill', d => {
                const val = scoreMap.get(String(d.id)) || 0;
                if (mode === 'community') {
                    return colorScale(val);
                }
                const norm = (val - minVal) / (maxVal - minVal || 1);
                return colorScale(norm);
            });
    },

    updateStats() {
        if (!this.graphDomainObj) return;
        setText('node-count-badge', this.graphDomainObj.getNodeCount());
        setText('edge-count-badge', this.graphDomainObj.getEdgeCount());
        setText('density-badge', this.graphDomainObj.getDensity().toFixed(3));
    },

    switchRepTab(tabKey) {
        this.activeRepTab = tabKey;
        const tabs = ['adj-mat', 'adj-list', 'edge-list'];
        tabs.forEach(t => {
            const btn = $(`tab-${t}`);
            if (!btn) return;
            if (t === tabKey) {
                btn.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-brand-600 text-white';
            } else {
                btn.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
            }
        });

        this.renderRepDisplay();
    },

    renderRepDisplay() {
        const area = $('rep-display-area');
        if (!area || !this.graphDomainObj) return;

        if (this.activeRepTab === 'adj-mat') {
            const { labels, matrix } = this.graphDomainObj.toAdjacencyMatrix();
            let html = `// Adjacency Matrix A [${labels.length}x${labels.length}]\n`;
            html += `   ` + labels.map(l => String(l).padStart(3, ' ')).join('') + `\n`;
            matrix.forEach((row, i) => {
                html += String(labels[i]).padStart(2, ' ') + ' ';
                html += row.map(v => String(v).padStart(3, ' ')).join('') + `\n`;
            });
            area.textContent = html;
        } else if (this.activeRepTab === 'adj-list') {
            area.textContent = `// Adjacency List Representation\n` + this.graphDomainObj.toAdjacencyListString();
        } else if (this.activeRepTab === 'edge-list') {
            area.textContent = `// Edge List (Source, Target)\n` + this.graphDomainObj.toEdgeListString();
        }
    },

    async analyzeTopologyWithAI() {
        const container = $('ai-graph-analysis-container');
        const textElem = $('ai-graph-analysis-text');
        const btn = $('ai-analyze-graph-btn');

        if (!container || !textElem || !this.currentGraphData) return;

        container.classList.remove('hidden');
        textElem.innerHTML = '<span class="text-brand-600 font-semibold flex items-center gap-1.5"><span class="animate-spin">⏳</span> Dosen AI sedang menelaah topologi graf Anda...</span>';
        if (btn) btn.disabled = true;

        try {
            const analysis = await geminiService.analyzeGraphTopology(
                this.currentGraphData.nodes,
                this.currentGraphData.links
            );
            textElem.innerHTML = parseMarkdown(analysis);
        } catch (err) {
            textElem.textContent = `⚠️ Gagal memuat evaluasi AI: ${err.message}`;
        } finally {
            if (btn) btn.disabled = false;
        }
    }
};
