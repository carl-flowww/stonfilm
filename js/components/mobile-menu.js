// ==========================================
// Mobile Menu Component
// Handles hamburger menu toggle and sidebar navigation
// ==========================================

class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.sidebarClose = document.querySelector('.sidebar-close');
        this.mobileSidebar = document.querySelector('.mobile-sidebar');
        this.sidebarOverlay = document.querySelector('.sidebar-overlay');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
    }

    /**
     * Initialize mobile menu
     */
    init() {
        if (!this.menuToggle || !this.mobileSidebar || !this.sidebarOverlay || !this.sidebarClose) {
            console.error('Mobile menu elements not found');
            return;
        }

        this.attachEventListeners();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Toggle menu on hamburger click
        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu on close button click
        this.sidebarClose.addEventListener('click', () => {
            this.closeMenu();
        });

        // Close menu on overlay click
        this.sidebarOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Close menu on nav link click
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Prevent body scroll when menu is open
        this.mobileSidebar.addEventListener('touchmove', (e) => {
            if (this.isOpen) {
                e.stopPropagation();
            }
        });
    }

    /**
     * Toggle menu open/close
     */
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMenu() {
        this.mobileSidebar.classList.add('active');
        this.sidebarOverlay.classList.add('active');
        this.isOpen = true;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    closeMenu() {
        this.mobileSidebar.classList.remove('active');
        this.sidebarOverlay.classList.remove('active');
        this.isOpen = false;

        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Export for use in main.js
window.MobileMenu = MobileMenu;
