/**
 * Research, CS Domains, Thesis Topics, and Roadmap Component.
 */
import { csDomainsData } from '../data/domains.js';
import { researchProblemsData } from '../data/research.js';
import { thesisTopicsData } from '../data/thesis.js';
import { roadmapSteps } from '../data/roadmap.js';
import { $, addEvent, createElement } from '../utils/dom.js';

export const researchComponent = {
    init() {
        this.renderCSDomains();
        this.renderResearchProblems();
        this.renderThesisTopics();
        this.renderRoadmap();
        this.bindEvents();
    },

    bindEvents() {
        const btnRes = $('btn-show-research');
        const btnThe = $('btn-show-thesis');

        if (btnRes) addEvent(btnRes, 'click', () => this.switchRisetTab('research'));
        if (btnThe) addEvent(btnThe, 'click', () => this.switchRisetTab('thesis'));
    },

    renderCSDomains() {
        const tabsContainer = $('domain-tabs');
        if (!tabsContainer) return;
        tabsContainer.innerHTML = '';

        csDomainsData.forEach((dom, idx) => {
            const btn = createElement('button', `p-3 rounded-xl text-left border transition flex items-center space-x-2 ${idx === 0 ? 'bg-brand-600 text-white border-brand-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`);
            btn.id = `domain-btn-${dom.id}`;
            btn.onclick = () => this.selectCSDomain(dom.id);
            btn.innerHTML = `
                <span class="text-xl">${dom.icon}</span>
                <span class="text-xs font-bold truncate">${dom.title}</span>
            `;
            tabsContainer.appendChild(btn);
        });

        if (csDomainsData.length > 0) {
            this.selectCSDomain(csDomainsData[0].id);
        }
    },

    selectCSDomain(id) {
        csDomainsData.forEach(dom => {
            const btn = $(`domain-btn-${dom.id}`);
            if (!btn) return;
            if (dom.id === id) {
                btn.className = 'p-3 rounded-xl text-left border transition flex items-center space-x-2 bg-brand-600 text-white border-brand-600 shadow-md';
            } else {
                btn.className = 'p-3 rounded-xl text-left border transition flex items-center space-x-2 bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
            }
        });

        const dom = csDomainsData.find(d => d.id === id);
        const detailBox = $('domain-detail-box');
        if (!dom || !detailBox) return;

        detailBox.innerHTML = `
            <div class="flex items-center space-x-3 border-b border-slate-200 pb-3">
                <span class="text-3xl">${dom.icon}</span>
                <div>
                    <h3 class="text-lg font-bold text-slate-900">${dom.title}</h3>
                    <span class="text-xs text-brand-600 font-semibold">Cabang Sinergi Informatika</span>
                </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-4 text-xs">
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong class="text-slate-800">Mengapa Relevan?</strong>
                    <p class="text-slate-600 leading-relaxed">${dom.rel}</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong class="text-slate-800">Konsep Kunci Digunakan:</strong>
                    <p class="text-slate-600 font-mono text-[11px] leading-relaxed">${dom.concept}</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <strong class="text-slate-800">Contoh Penerapan Real:</strong>
                    <p class="text-slate-600 leading-relaxed">${dom.app}</p>
                </div>
            </div>
        `;
    },

    renderResearchProblems() {
        const container = $('research-problems-area');
        if (!container) return;
        container.innerHTML = '';

        researchProblemsData.forEach(p => {
            const card = createElement('div', 'bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs');
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-slate-900 text-sm">${p.title}</h4>
                    <span class="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">${p.domain}</span>
                </div>
                <p class="text-slate-600"><strong>Masalah:</strong> ${p.prob}</p>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                    <div><strong class="text-slate-800">Data:</strong> <span class="text-slate-600">${p.data}</span></div>
                    <div><strong class="text-slate-800">Metode:</strong> <span class="text-brand-700 font-mono">${p.method}</span></div>
                    <div><strong class="text-slate-800">Output:</strong> <span class="text-slate-600">${p.output}</span></div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderThesisTopics() {
        const container = $('thesis-topics-area');
        if (!container) return;
        container.innerHTML = '';

        thesisTopicsData.forEach((t, i) => {
            const card = createElement('div', 'bg-white p-6 rounded-2xl border border-brand-200 shadow-md space-y-4 text-xs');
            card.innerHTML = `
                <div class="flex items-center space-x-3 border-b border-slate-200 pb-3">
                    <span class="bg-brand-600 text-white font-bold px-3 py-1 rounded-lg text-xs">Topik Skripsi ${i + 1}</span>
                    <h3 class="font-bold text-slate-900 text-base">${t.title}</h3>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <strong class="text-slate-900">1. Latar Belakang Permasalahan:</strong>
                        <p class="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">${t.bg}</p>
                    </div>
                    <div class="space-y-2">
                        <strong class="text-slate-900">2. Kebutuhan Dataset:</strong>
                        <p class="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">${t.dataset}</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <strong class="text-slate-900">3. Rancangan Metodologi:</strong>
                        <p class="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-mono">${t.method}</p>
                    </div>
                    <div class="space-y-2">
                        <strong class="text-slate-900">4. Kontribusi Ilmiah Skripsi:</strong>
                        <p class="text-slate-600 bg-brand-50 p-3 rounded-xl border border-brand-200 leading-relaxed text-brand-900 font-semibold">${t.contrib}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    switchRisetTab(tab) {
        const resArea = $('research-problems-area');
        const theArea = $('thesis-topics-area');
        const btnRes = $('btn-show-research');
        const btnThe = $('btn-show-thesis');

        if (!resArea || !theArea) return;

        if (tab === 'research') {
            resArea.classList.remove('hidden');
            theArea.classList.add('hidden');
            if (btnRes) btnRes.className = 'px-4 py-2 font-bold text-xs sm:text-sm rounded-xl bg-brand-600 text-white';
            if (btnThe) btnThe.className = 'px-4 py-2 font-bold text-xs sm:text-sm rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200';
        } else {
            resArea.classList.add('hidden');
            theArea.classList.remove('hidden');
            if (btnRes) btnRes.className = 'px-4 py-2 font-bold text-xs sm:text-sm rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200';
            if (btnThe) btnThe.className = 'px-4 py-2 font-bold text-xs sm:text-sm rounded-xl bg-brand-600 text-white';
        }
    },

    renderRoadmap() {
        const container = $('roadmap-timeline');
        if (!container) return;
        container.innerHTML = '';

        roadmapSteps.forEach(s => {
            const item = createElement('div', 'relative space-y-1 text-xs');
            item.innerHTML = `
                <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-600 border-2 border-white"></div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">${s.stage}</span>
                    <span class="text-slate-400 font-semibold">${s.time}</span>
                </div>
                <h4 class="font-bold text-slate-900 text-sm">${s.name}</h4>
                <p class="text-slate-600 leading-relaxed">${s.focus}</p>
            `;
            container.appendChild(item);
        });
    }
};
