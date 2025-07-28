/**
 * Mobile Menu Toggle
 */
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        menuToggle.setAttribute(
            'aria-expanded',
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
        );
    });

    // Close menu when clicking on a link (for mobile)
    const menuLinks = mainNav.querySelectorAll('a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
