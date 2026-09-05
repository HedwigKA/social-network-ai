/**
 * Formatters for Markdown parsing, KaTeX rendering, dates, and matrices.
 */

/**
 * Parses markdown to HTML using window.marked if available, or basic fallback.
 * @param {string} mdText 
 * @returns {string}
 */
export function parseMarkdown(mdText) {
    if (!mdText) return '';
    if (window.marked && typeof window.marked.parse === 'function') {
        return window.marked.parse(mdText);
    }
    return mdText
        .replace(/\n\n/g, '<br><br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/**
 * Triggers KaTeX auto-render on a DOM element if window.renderMathInElement is loaded.
 * @param {HTMLElement} element 
 */
export function renderKaTeX(element) {
    if (element && window.renderMathInElement) {
        try {
            window.renderMathInElement(element, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        } catch (e) {
            console.warn('KaTeX rendering error:', e);
        }
    }
}

/**
 * Formats a Date object or ISO string to Indonesian Locale string
 * @param {Date|string} date 
 * @returns {string}
 */
export function formatDateIndonesian(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formats a number to 2 decimal places
 * @param {number} num 
 * @returns {string}
 */
export function formatFloat(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0.00';
    return num.toFixed(2);
}
