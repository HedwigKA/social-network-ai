/**
 * Interactive Glossary Component with Real-Time Filtering.
 */
import { glossaryData } from '../data/glossary.js';
import { $, addEvent, createElement } from '../utils/dom.js';

export const glossaryComponent = {
    init() {
        const searchInput = $('glossary-search');
        if (searchInput) {
            addEvent(searchInput, 'input', (e) => {
                const term = e.target.value.toLowerCase().trim();
                this.render(term);
            });
        }
        this.render();
    },

    render(filter = '') {
        const container = $('glossary-grid');
        if (!container) return;

        container.innerHTML = '';
        const filtered = glossaryData.filter(item =>
            item.term.toLowerCase().includes(filter) || item.desc.toLowerCase().includes(filter)
        );

        if (filtered.length === 0) {
            container.innerHTML = `<p class="text-xs text-slate-500 col-span-full">Tidak ada istilah yang cocok dengan pencarian.</p>`;
            return;
        }

        filtered.forEach(item => {
            const card = createElement('div', 'bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition space-y-2 text-xs');
            card.innerHTML = `
                <div class="flex justify-between items-center">
                    <h4 class="font-bold text-slate-900 text-xs">${item.term}</h4>
                    <span class="text-[10px] bg-brand-100 text-brand-700 px-2 py-0.5 rounded-md font-semibold">${item.tag}</span>
                </div>
                <p class="text-slate-600 leading-relaxed">${item.desc}</p>
            `;
            container.appendChild(card);
        });
    }
};
