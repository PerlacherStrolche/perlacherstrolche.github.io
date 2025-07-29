/**
 * Perlacher Strolche e.V. Main JavaScript
 * Handles interactive elements like menu toggle, modals, and scroll effects
 */

import { initCarousel } from './carousel.js';
import { initMobileMenu } from './mobile.js';
import { initModals } from './modals.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initCarousel();
    initModals();
    initBackToTop();
    initSmoothScrolling();
});

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (!backToTopBtn) {
        return;
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicking the button
    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            // Skip if it's a modal trigger
            if (link.getAttribute('href') === '#impressum' || link.getAttribute('href') === '#datenschutz') {
                return;
            }

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            // Calculate header height for offset
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        });
    });
}
