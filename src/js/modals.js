/**
 * Modal Popups
 */
export function initModals() {
    // Impressum Modal
    setupModal('impressum-modal', 'a[href="#impressum"]');

    // Datenschutz Modal
    setupModal('datenschutz-modal', 'a[href="#datenschutz"]');

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: block"]');
            openModals.forEach((modal) => {
                closeModal(modal);
            });
        }
    });
}

function setupModal(modalId, triggerSelector) {
    const modal = document.getElementById(modalId);
    const triggers = document.querySelectorAll(triggerSelector);
    const closeBtn = modal.querySelector('.close-modal');

    if (!modal || !triggers.length || !closeBtn) {
        return;
    }

    // Open modal when clicking trigger
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(modal);
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', function () {
        closeModal(modal);
    });
}

function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}
