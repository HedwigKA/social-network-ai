/**
 * Navigation Component (Mobile Menu, Smooth Scroll, Nav Status Dots).
 */
import { $, addEvent } from '../utils/dom.js';
import { storageService } from '../services/storageService.js';

export const navigationComponent = {
    init() {
        // Mobile menu toggle
        const btn = $('mobile-menu-btn');
        const menu = $('mobile-menu');
        if (btn && menu) {
            addEvent(btn, 'click', () => {
                menu.classList.toggle('hidden');
            });

            // Close mobile menu when clicking nav links
            const mobileLinks = menu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                addEvent(link, 'click', () => {
                    menu.classList.add('hidden');
                });
            });
        }

        // Logo click smooth scroll to top
        const logo = $('nav-logo-btn');
        if (logo) {
            addEvent(logo, 'click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        this.updateKeyStatusDot();
    },

    updateKeyStatusDot() {
        const dot = $('nav-key-status-dot');
        if (!dot) return;
        const key = storageService.getApiKey();
        if (key) {
            dot.className = 'w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse';
            dot.title = 'API Key Tersedia & Aktif';
        } else {
            dot.className = 'w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping';
            dot.title = 'API Key Belum Disetting';
        }
    }
};
