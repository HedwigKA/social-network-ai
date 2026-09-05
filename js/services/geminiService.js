/**
 * Service for interacting with Google Gemini REST API with Grounding & Fallback handling.
 */
import { storageService } from './storageService.js';
import { GEMINI_API_BASE_URL, GEMINI_FALLBACK_MODELS } from '../config/appConfig.js';

export const geminiService = {
    /**
     * Executes fetch request to Gemini API
     * @param {Object} payload 
     * @param {string} [overrideModel] 
     * @param {string} [overrideKey] 
     * @returns {Promise<Object>}
     */
    async callAPI(payload, overrideModel = null, overrideKey = null) {
        const apiKey = overrideKey || storageService.getApiKey();
        const model = overrideModel || storageService.getModel();
        const searchGrounding = storageService.getSearchGrounding();

        if (!apiKey) {
            throw new Error('API Key Google AI Studio belum dikonfigurasi. Klik tombol "🔑 Model & Key" untuk memasukkan API Key Anda.');
        }

        // Attach Grounding tool if enabled and payload doesn't have tools
        const requestPayload = { ...payload };
        if (searchGrounding && !requestPayload.tools) {
            requestPayload.tools = [{ googleSearch: {} }];
        }

        const modelsToTry = [model, ...GEMINI_FALLBACK_MODELS.filter(m => m !== model)];
        let lastError = null;

        for (const targetModel of modelsToTry) {
            const url = `${GEMINI_API_BASE_URL}/${targetModel}:generateContent?key=${apiKey}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestPayload)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    const errMsg = errData.error?.message || `HTTP ${response.status} ${response.statusText}`;

                    // If model not found or forbidden, try next fallback model
                    if (response.status === 404 || response.status === 400) {
                        console.warn(`Model ${targetModel} failed: ${errMsg}. Trying fallback model...`);
                        lastError = new Error(errMsg);
                        continue;
                    }
                    throw new Error(errMsg);
                }

                const data = await response.json();
                return data;
            } catch (err) {
                lastError = err;
            }
        }

        throw lastError || new Error('Gagal menghubungi Gemini API setelah beberapa percobaan.');
    },

    /**
     * Tests API Key connection using a minimal prompt
     * @param {string} model 
     * @param {string} apiKey 
     * @returns {Promise<boolean>}
     */
    async testConnection(model, apiKey) {
        const testPayload = {
            contents: [{ parts: [{ text: 'Ping test' }] }]
        };
        const result = await this.callAPI(testPayload, model, apiKey);
        return !!(result.candidates && result.candidates.length > 0);
    },

    /**
     * Sends graph topology analysis prompt to Gemini
     * @param {Array} nodes 
     * @param {Array} links 
     * @returns {Promise<string>}
     */
    async analyzeGraphTopology(nodes, links) {
        const nodeIds = nodes.map(n => n.id);
        const linkStr = links.map(l => `(${typeof l.source === 'object' ? l.source.id : l.source}, ${typeof l.target === 'object' ? l.target.id : l.target})`);

        const systemPrompt = "Anda adalah dosen dan peneliti senior Informatika ahli Teori Graf, Social Network Analysis, dan Graph Machine Learning. Analisis ringkas (maksimal 3 paragraf pendek) struktur graf yang dibuat mahasiswa: sebutkan karakteristik simpul (apakah ada hub, broker/jembatan, atau simpul terisolasi), kepadatan (density), dan rekomendasikan metrik sentralitas atau algoritma yang relevan untuk graf ini. Berikan bahasa ramah, mendidik, dan aplikatif.";
        const userPrompt = `Mahasiswa telah menggambar graf dengan:\nSimpul: [${nodeIds.join(', ')}] (Total: ${nodeIds.length})\nSisi: [${linkStr.join(', ')}] (Total: ${linkStr.length})\nBerikan evaluasi topologis akademis dan saran eksplorasi analisis untuk mahasiswa ini.`;

        const payload = {
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        const result = await this.callAPI(payload);
        return result.candidates?.[0]?.content?.parts?.[0]?.text || 'Gagal memuat evaluasi AI.';
    }
};
