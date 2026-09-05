/**
 * DOM Manipulation and Element Query Helpers.
 */

/**
 * Shorthand for document.getElementById
 * @param {string} id 
 * @returns {HTMLElement|null}
 */
export function $(id) {
    return document.getElementById(id);
}

/**
 * Creates an element with optional CSS classes and attributes
 * @param {string} tag 
 * @param {string} className 
 * @param {Object} attributes 
 * @returns {HTMLElement}
 */
export function createElement(tag, className = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.keys(attributes).forEach(key => {
        el.setAttribute(key, attributes[key]);
    });
    return el;
}

/**
 * Safely sets inner text of an element if it exists
 * @param {string|HTMLElement} target 
 * @param {string} text 
 */
export function setText(target, text) {
    const el = typeof target === 'string' ? $(target) : target;
    if (el) el.textContent = text;
}

/**
 * Safely adds an event listener if element exists
 * @param {string|HTMLElement} target 
 * @param {string} event 
 * @param {Function} handler 
 */
export function addEvent(target, event, handler) {
    const el = typeof target === 'string' ? $(target) : target;
    if (el) el.addEventListener(event, handler);
}
