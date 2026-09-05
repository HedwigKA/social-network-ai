/**
 * 5-Mode Profesor AI Workbench & Multi-turn Chat Component with Modal Config.
 */
import { PROF_MODES_CONFIG, GEMINI_MODELS } from '../config/appConfig.js';
import { storageService } from '../services/storageService.js';
import { geminiService } from '../services/geminiService.js';
import { exportService } from '../services/exportService.js';
import { $, addEvent, setText } from '../utils/dom.js';
import { parseMarkdown, renderKaTeX } from '../utils/formatters.js';

export const aiLabComponent = {
    activeProfMode: 'gap',

    init() {
        this.bindEvents();
        this.updateUIConfigDisplays();
        this.switchProfMode('gap');
        storageService.initSessions();
        this.renderSessionSelectOptions();
        this.renderChatFeed();
    },

    bindEvents() {
        // Mode selector buttons
        ['gap', 'bridge', 'paradox', 'rq', 'trend'].forEach(m => {
            const btn = $(`prof-tab-${m}`);
            if (btn) addEvent(btn, 'click', () => this.switchProfMode(m));
        });

        // Send Query Button
        const sendBtn = $('prof-send-btn');
        if (sendBtn) addEvent(sendBtn, 'click', () => this.sendQuery());

        // Textarea enter key submit (Ctrl+Enter or Enter without shift)
        const promptInput = $('prof-prompt-input');
        if (promptInput) {
            addEvent(promptInput, 'keydown', (e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    this.sendQuery();
                }
            });
        }

        // Session controls
        const selectSession = $('prof-session-select');
        if (selectSession) addEvent(selectSession, 'change', (e) => this.switchSession(e.target.value));

        const newSessionBtn = $('prof-new-session-btn');
        if (newSessionBtn) addEvent(newSessionBtn, 'click', () => this.createNewSession());

        const deleteSessionBtn = $('prof-delete-session-btn');
        if (deleteSessionBtn) addEvent(deleteSessionBtn, 'click', () => this.deleteSession());

        const clearMsgBtn = $('prof-clear-messages-btn');
        if (clearMsgBtn) addEvent(clearMsgBtn, 'click', () => this.clearMessages());

        const exportMdBtn = $('prof-export-md-btn');
        if (exportMdBtn) addEvent(exportMdBtn, 'click', () => this.exportMarkdown());

        // AI Config Modal controls
        const openModalBtn = $('open-ai-config-btn');
        if (openModalBtn) addEvent(openModalBtn, 'click', () => this.openConfigModal());

        const closeModalBtn = $('close-ai-config-modal-btn');
        if (closeModalBtn) addEvent(closeModalBtn, 'click', () => this.closeConfigModal());

        const saveConfigBtn = $('save-ai-config-btn');
        if (saveConfigBtn) addEvent(saveConfigBtn, 'click', () => this.saveAIConfig());

        const testConnBtn = $('test-ai-connection-btn');
        if (testConnBtn) addEvent(testConnBtn, 'click', () => this.testConnection());

        const modalModelSelect = $('modal-gemini-model');
        if (modalModelSelect) addEvent(modalModelSelect, 'change', () => this.toggleCustomModelInput());
    },

    switchProfMode(mode) {
        this.activeProfMode = mode;
        const modes = ['gap', 'bridge', 'paradox', 'rq', 'trend'];
        modes.forEach(m => {
            const btn = $(`prof-tab-${m}`);
            if (!btn) return;
            if (m === mode) {
                btn.className = 'py-2.5 px-3 rounded-xl bg-white text-brand-700 shadow-sm border border-slate-200 transition flex items-center justify-center gap-1.5 font-bold';
            } else {
                btn.className = 'py-2.5 px-3 rounded-xl text-slate-600 hover:bg-white hover:text-slate-900 transition flex items-center justify-center gap-1.5 font-semibold';
            }
        });

        const config = PROF_MODES_CONFIG[mode];
        const descElem = $('prof-mode-description');
        if (descElem && config) {
            descElem.innerHTML = `<strong>${config.title}</strong><br>${config.desc}`;
        }

        const presetsElem = $('prof-mode-presets');
        if (presetsElem && config) {
            presetsElem.innerHTML = '';
            config.presets.forEach(p => {
                const btn = document.createElement('button');
                btn.className = 'bg-white text-slate-700 hover:border-brand-500 hover:text-brand-600 px-3 py-1.5 rounded-xl border border-slate-200 transition text-xs text-left shadow-2xs font-medium';
                btn.textContent = p;
                btn.onclick = () => {
                    const input = $('prof-prompt-input');
                    if (input) input.value = p;
                };
                presetsElem.appendChild(btn);
            });
        }
    },

    async sendQuery() {
        const inputElem = $('prof-prompt-input');
        if (!inputElem) return;
        const userText = inputElem.value.trim();
        if (!userText) return;

        const sendBtn = $('prof-send-btn');
        const spinner = $('prof-btn-spinner');
        const btnText = $('prof-btn-text');

        if (sendBtn) sendBtn.disabled = true;
        if (spinner) spinner.classList.remove('hidden');
        if (btnText) btnText.textContent = 'Profesor Sedang Menganalisis...';

        const activeId = storageService.getActiveSessionId();
        const sessions = storageService.getProfSessions();
        let session = sessions.find(s => s.id === activeId);

        if (!session) {
            storageService.initSessions();
            session = storageService.getProfSessions()[0];
        }

        const userMsg = {
            role: 'user',
            text: userText,
            mode: this.activeProfMode,
            timestamp: new Date().toISOString()
        };
        session.messages.push(userMsg);
        storageService.saveProfSessions(sessions);
        this.renderChatFeed();
        inputElem.value = '';

        const modeConfig = PROF_MODES_CONFIG[this.activeProfMode];
        const contents = session.messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const payload = {
            contents: contents,
            systemInstruction: { parts: [{ text: modeConfig.systemPrompt }] }
        };

        try {
            const result = await geminiService.callAPI(payload);
            const replyText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Gagal mendapatkan respons.';

            const citations = [];
            const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (Array.isArray(groundingChunks)) {
                groundingChunks.forEach(chunk => {
                    if (chunk.web?.uri && chunk.web?.title) {
                        citations.push({ title: chunk.web.title, url: chunk.web.uri });
                    }
                });
            }

            const modelMsg = {
                role: 'model',
                text: replyText,
                citations: citations,
                timestamp: new Date().toISOString()
            };
            session.messages.push(modelMsg);
            storageService.saveProfSessions(sessions);
            this.renderChatFeed();
            this.renderSessionSelectOptions();
        } catch (err) {
            const errMsg = {
                role: 'model',
                text: `⚠️ **Terjadi Kesalahan Koneksi/API Key**: ${err.message}\n\n*Silakan periksa API Key atau ganti model melalui tombol '🔑 Model & Key' di bagian atas halaman.*`,
                timestamp: new Date().toISOString()
            };
            session.messages.push(errMsg);
            storageService.saveProfSessions(sessions);
            this.renderChatFeed();
        } finally {
            if (sendBtn) sendBtn.disabled = false;
            if (spinner) spinner.classList.add('hidden');
            if (btnText) btnText.textContent = '🚀 Minta Analisis Profesor Riset';
        }
    },

    renderChatFeed() {
        const feedElem = $('prof-chat-feed');
        const countElem = $('prof-message-count');
        if (!feedElem) return;

        const activeId = storageService.getActiveSessionId();
        const sessions = storageService.getProfSessions();
        const session = sessions.find(s => s.id === activeId);

        if (!session || session.messages.length === 0) {
            if (countElem) countElem.textContent = '0 Pesan';
            feedElem.innerHTML = `
                <div class="text-center py-12 text-slate-400 space-y-3">
                    <div class="text-4xl">🎓</div>
                    <p class="text-xs font-semibold">Sesi riset siap. Pilih mode di atas atau ketik pertanyaan riset Anda untuk memulai kolaborasi ilmiah dengan Profesor Riset AI.</p>
                </div>
            `;
            return;
        }

        if (countElem) countElem.textContent = `${session.messages.length} Pesan`;
        feedElem.innerHTML = '';

        session.messages.forEach(msg => {
            const msgCard = document.createElement('div');

            if (msg.role === 'user') {
                msgCard.className = 'bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2';
                msgCard.innerHTML = `
                    <div class="flex justify-between items-center border-b border-slate-100 pb-2.5">
                        <div class="flex items-center space-x-2">
                            <span class="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">👤</span>
                            <span class="font-bold text-slate-900 text-xs">Pertanyaan Peneliti</span>
                            <span class="text-[10px] bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-bold uppercase">${msg.mode || 'gap'}</span>
                        </div>
                        <span class="text-[10px] text-slate-400">${new Date(msg.timestamp).toLocaleTimeString('id-ID')}</span>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium whitespace-pre-line">${msg.text}</div>
                `;
            } else {
                msgCard.className = 'bg-white border border-brand-200 rounded-2xl p-6 shadow-md space-y-4';
                const htmlContent = parseMarkdown(msg.text);

                let citationsHtml = '';
                if (msg.citations && msg.citations.length > 0) {
                    citationsHtml = `
                        <div class="pt-4 border-t border-slate-200 space-y-2">
                            <strong class="text-xs font-bold text-slate-700 block">📚 Rujukan Literatur & Web Real-time:</strong>
                            <div class="flex flex-wrap gap-2 text-xs">
                                ${msg.citations.map(c => `
                                    <a href="${c.url}" target="_blank" class="bg-slate-50 border border-slate-200 hover:border-brand-500 text-brand-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1 font-semibold truncate max-w-xs">
                                        <span>📄 ${c.title}</span> ↗
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                msgCard.innerHTML = `
                    <div class="flex justify-between items-center border-b border-slate-200 pb-3">
                        <div class="flex items-center space-x-2.5">
                            <span class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">🎓</span>
                            <div>
                                <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm">Analisis Profesor Riset AI</h4>
                                <span class="text-[10px] text-slate-500">Grounded Search Real-time</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="copy-btn text-xs text-slate-500 hover:text-brand-600 border border-slate-200 px-2 py-1 rounded-lg bg-slate-50">📋 Salin Teks</button>
                            <span class="text-[10px] text-slate-400">${new Date(msg.timestamp).toLocaleTimeString('id-ID')}</span>
                        </div>
                    </div>
                    <div class="prose text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">${htmlContent}</div>
                    ${citationsHtml}
                `;

                const copyBtn = msgCard.querySelector('.copy-btn');
                if (copyBtn) {
                    addEvent(copyBtn, 'click', () => {
                        navigator.clipboard.writeText(msg.text);
                        copyBtn.textContent = '✅ Tersalin';
                        setTimeout(() => copyBtn.textContent = '📋 Salin Teks', 2000);
                    });
                }
            }

            feedElem.appendChild(msgCard);
            renderKaTeX(msgCard);
        });
    },

    renderSessionSelectOptions() {
        const select = $('prof-session-select');
        if (!select) return;
        const sessions = storageService.getProfSessions();
        const activeId = storageService.getActiveSessionId();

        select.innerHTML = '';
        sessions.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = `${s.title} (${s.messages.length} msgs)`;
            if (s.id === activeId) opt.selected = true;
            select.appendChild(opt);
        });
    },

    createNewSession() {
        const title = prompt('Masukkan Judul / Topik Sesi Riset Baru:', 'Riset SNA: ');
        if (!title) return;

        const sessions = storageService.getProfSessions();
        const newSession = {
            id: 'session_' + Date.now(),
            title: title.trim(),
            createdAt: new Date().toISOString(),
            messages: []
        };
        sessions.unshift(newSession);
        storageService.saveProfSessions(sessions);
        storageService.setActiveSessionId(newSession.id);

        this.renderSessionSelectOptions();
        this.renderChatFeed();
    },

    switchSession(id) {
        storageService.setActiveSessionId(id);
        this.renderSessionSelectOptions();
        this.renderChatFeed();
    },

    deleteSession() {
        const sessions = storageService.getProfSessions();
        if (sessions.length <= 1) {
            alert('Tidak dapat menghapus sesi terakhir. Anda harus memiliki setidaknya satu sesi.');
            return;
        }

        const activeId = storageService.getActiveSessionId();
        const activeSession = sessions.find(s => s.id === activeId);
        if (!confirm(`Apakah Anda yakin ingin menghapus sesi riset "${activeSession?.title}"?`)) return;

        const updated = sessions.filter(s => s.id !== activeId);
        storageService.saveProfSessions(updated);
        storageService.setActiveSessionId(updated[0].id);

        this.renderSessionSelectOptions();
        this.renderChatFeed();
    },

    clearMessages() {
        if (!confirm('Sapu bersih seluruh isi riwayat chat pada sesi ini?')) return;
        const activeId = storageService.getActiveSessionId();
        const sessions = storageService.getProfSessions();
        const session = sessions.find(s => s.id === activeId);
        if (session) {
            session.messages = [];
            storageService.saveProfSessions(sessions);
            this.renderChatFeed();
            this.renderSessionSelectOptions();
        }
    },

    exportMarkdown() {
        const activeId = storageService.getActiveSessionId();
        const sessions = storageService.getProfSessions();
        const session = sessions.find(s => s.id === activeId);
        exportService.exportSessionToMarkdown(session, storageService.getModel());
    },

    // Modal Config Functions
    openConfigModal() {
        const modal = $('ai-config-modal');
        if (modal) modal.classList.remove('hidden');
        this.updateUIConfigDisplays();
    },

    closeConfigModal() {
        const modal = $('ai-config-modal');
        if (modal) modal.classList.add('hidden');
    },

    updateUIConfigDisplays() {
        const model = storageService.getModel();
        const key = storageService.getApiKey();
        const search = storageService.getSearchGrounding();

        const modalModelSelect = $('modal-gemini-model');
        const customInput = $('modal-custom-model-input');
        const apiKeyInput = $('modal-gemini-api-key');
        const searchCheck = $('modal-search-grounding');

        if (modalModelSelect) {
            const predefined = GEMINI_MODELS.find(m => m.id === model);
            if (predefined) {
                modalModelSelect.value = model;
                if (customInput) customInput.classList.add('hidden');
            } else {
                modalModelSelect.value = 'custom';
                if (customInput) {
                    customInput.value = model;
                    customInput.classList.remove('hidden');
                }
            }
        }

        if (apiKeyInput) apiKeyInput.value = key;
        if (searchCheck) searchCheck.checked = search;
    },

    toggleCustomModelInput() {
        const modalModelSelect = $('modal-gemini-model');
        const customInput = $('modal-custom-model-input');
        if (modalModelSelect && customInput) {
            if (modalModelSelect.value === 'custom') {
                customInput.classList.remove('hidden');
            } else {
                customInput.classList.add('hidden');
            }
        }
    },

    async testConnection() {
        const modalModelSelect = $('modal-gemini-model');
        const customInput = $('modal-custom-model-input');
        const apiKeyInput = $('modal-gemini-api-key');
        const statusBox = $('modal-test-status');
        const spinner = $('test-spinner');

        let targetModel = modalModelSelect ? modalModelSelect.value : 'gemini-2.5-flash';
        if (targetModel === 'custom' && customInput) {
            targetModel = customInput.value.trim();
        }

        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';

        if (spinner) spinner.classList.remove('hidden');
        if (statusBox) {
            statusBox.className = 'p-3 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 block';
            statusBox.textContent = '⏳ Memeriksa koneksi API Key & Model...';
        }

        try {
            await geminiService.testConnection(targetModel, apiKey);
            if (statusBox) {
                statusBox.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 block';
                statusBox.textContent = '✅ Koneksi Berhasil! API Key valid dan model Gemini merespons dengan baik.';
            }
        } catch (err) {
            if (statusBox) {
                statusBox.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 block';
                statusBox.textContent = `❌ Gagal Terhubung: ${err.message}`;
            }
        } finally {
            if (spinner) spinner.classList.add('hidden');
        }
    },

    saveAIConfig() {
        const modalModelSelect = $('modal-gemini-model');
        const customInput = $('modal-custom-model-input');
        const apiKeyInput = $('modal-gemini-api-key');
        const searchCheck = $('modal-search-grounding');

        let selectedModel = modalModelSelect ? modalModelSelect.value : 'gemini-2.5-flash';
        if (selectedModel === 'custom' && customInput) {
            selectedModel = customInput.value.trim();
        }

        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        const searchGrounding = searchCheck ? searchCheck.checked : true;

        storageService.setModel(selectedModel);
        storageService.setApiKey(apiKey);
        storageService.setSearchGrounding(searchGrounding);

        this.closeConfigModal();
        alert('Pengaturan AI & API Key telah tersimpan.');
    }
};
