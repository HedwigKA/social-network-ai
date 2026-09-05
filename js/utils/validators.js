/**
 * Input Validation & Data Sanitation Helpers.
 */

/**
 * Validates Gemini API Key format
 * @param {string} apiKey 
 * @returns {boolean}
 */
export function isValidApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') return false;
    const trimmed = apiKey.trim();
    return trimmed.length >= 10;
}

/**
 * Validates Graph payload structure (nodes & links arrays)
 * @param {Object} graphData 
 * @returns {boolean}
 */
export function isValidGraphData(graphData) {
    if (!graphData || typeof graphData !== 'object') return false;
    if (!Array.isArray(graphData.nodes) || !Array.isArray(graphData.links)) return false;
    return true;
}

/**
 * Sanitizes input string to prevent basic injection
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeString(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
