/**
 * Encapsulated LocalStorage Management for Gemini API Credentials & Chat Sessions.
 */
import {
    STORAGE_KEY_API_KEY,
    STORAGE_KEY_MODEL,
    STORAGE_KEY_SEARCH_GROUNDING,
    STORAGE_KEY_PROF_SESSIONS,
    STORAGE_KEY_ACTIVE_SESSION,
    DEFAULT_GEMINI_MODEL,
    DEFAULT_API_KEY
} from '../config/appConfig.js';

export const storageService = {
    // API Credentials
    getApiKey() {
        return localStorage.getItem(STORAGE_KEY_API_KEY) || DEFAULT_API_KEY;
    },

    setApiKey(key) {
        if (key) {
            localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
        } else {
            localStorage.removeItem(STORAGE_KEY_API_KEY);
        }
    },

    getModel() {
        return localStorage.getItem(STORAGE_KEY_MODEL) || DEFAULT_GEMINI_MODEL;
    },

    setModel(model) {
        if (model) {
            localStorage.setItem(STORAGE_KEY_MODEL, model.trim());
        }
    },

    getSearchGrounding() {
        const val = localStorage.getItem(STORAGE_KEY_SEARCH_GROUNDING);
        return val === null ? true : val === 'true';
    },

    setSearchGrounding(enabled) {
        localStorage.setItem(STORAGE_KEY_SEARCH_GROUNDING, enabled ? 'true' : 'false');
    },

    // Profesor AI Sessions
    getProfSessions() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_PROF_SESSIONS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Failed to parse prof sessions:', e);
            return [];
        }
    },

    saveProfSessions(sessions) {
        localStorage.setItem(STORAGE_KEY_PROF_SESSIONS, JSON.stringify(sessions));
    },

    getActiveSessionId() {
        return localStorage.getItem(STORAGE_KEY_ACTIVE_SESSION);
    },

    setActiveSessionId(id) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, id);
    },

    initSessions() {
        let sessions = this.getProfSessions();
        if (sessions.length === 0) {
            const defaultSession = {
                id: 'session_' + Date.now(),
                title: 'Riset Utama Social Network Analysis',
                createdAt: new Date().toISOString(),
                messages: []
            };
            sessions = [defaultSession];
            this.saveProfSessions(sessions);
            this.setActiveSessionId(defaultSession.id);
        } else if (!this.getActiveSessionId()) {
            this.setActiveSessionId(sessions[0].id);
        }
        return sessions;
    }
};
