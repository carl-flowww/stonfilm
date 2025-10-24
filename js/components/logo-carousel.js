// ==========================================
// Logo Carousel Component
// Auto-scrolling partner/client logos
// ==========================================

class LogoCarousel {
    constructor() {
        this.carouselElement = document.querySelector('.logo-carousel');

        // Company names in order from Figma
        this.companies = [
            'Samsung',
            'Emart',
            'Com2us',
            'Lotteria',
            'WorldVision',
            'KMA',
            'inkode',
            '랜덤투유',
            '삼육대학교',
            '360Photo',
            '서울필름아카데미',
            '청년창업사관학교',
            'PHOS',
            '경기콘텐츠진흥원',
            'gimmick',
            '강원도',
            'Dierneas',
            'studioBom',
            'AND GROUP'
        ];

        // Detect dark mode preference
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Listen for dark mode changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.darkMode = e.matches;
            this.renderLogos();
            // Recalculate after images change
            this.waitForImagesAndCalculate();
        });

        // Recalculate on window resize (responsive) with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateExactScrollDistance();
            }, 250);
        });
    }

    /**
     * Initialize logo carousel
     */
    init() {
        if (!this.carouselElement) {
            console.error('Logo carousel element not found');
            return;
        }

        this.renderLogos();

        // Calculate exact scroll distance after images load
        this.waitForImagesAndCalculate();
    }

    /**
     * Wait for all images to load, then calculate exact scroll distance
     */
    waitForImagesAndCalculate() {
        const images = this.carouselElement.querySelectorAll('img');
        let loadedCount = 0;

        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                // Small delay to ensure layout is stable
                setTimeout(() => this.calculateExactScrollDistance(), 100);
            }
        };

        images.forEach(img => {
            if (img.complete) {
                checkAllLoaded();
            } else {
                img.addEventListener('load', checkAllLoaded);
                img.addEventListener('error', checkAllLoaded); // Handle errors too
            }
        });
    }

    /**
     * Calculate exact scroll distance based on first group width
     */
    calculateExactScrollDistance() {
        const firstGroup = this.carouselElement.querySelector('.logo-group');
        if (!firstGroup) return;

        // Get exact width of first group (including all logos + gaps + padding)
        const groupWidth = firstGroup.offsetWidth;

        // Set as CSS variable for animation to use
        this.carouselElement.style.setProperty('--group-width', `${groupWidth}px`);

        console.log(`Carousel: Calculated group width = ${groupWidth}px`);
    }

    /**
     * Get logo path based on company name and dark mode
     */
    getLogoPath(companyName) {
        const maskingMode = this.darkMode ? 'On' : 'Off';
        return `assets/images/logos/company=${companyName}, DarkModeMasking=${maskingMode}.png`;
    }

    /**
     * Render logos to DOM
     * Creates two groups for seamless infinite scroll
     */
    renderLogos() {
        // Clear existing content
        this.carouselElement.innerHTML = '';

        // Create first group (original set)
        const group1 = document.createElement('div');
        group1.className = 'logo-group';

        this.companies.forEach((company) => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            logoItem.innerHTML = `<img src="${this.getLogoPath(company)}" alt="${company}" loading="lazy">`;
            group1.appendChild(logoItem);
        });

        // Create second group (duplicate set)
        const group2 = document.createElement('div');
        group2.className = 'logo-group';
        group2.setAttribute('aria-hidden', 'true'); // Hide from screen readers

        this.companies.forEach((company) => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            logoItem.innerHTML = `<img src="${this.getLogoPath(company)}" alt="${company}" loading="lazy">`;
            group2.appendChild(logoItem);
        });

        // Append both groups to carousel
        this.carouselElement.appendChild(group1);
        this.carouselElement.appendChild(group2);
    }

    /**
     * Update company list (for admin functionality)
     */
    updateCompanies(newCompanies) {
        if (!Array.isArray(newCompanies) || newCompanies.length === 0) {
            console.warn('Invalid companies array');
            return;
        }

        this.companies = newCompanies;
        this.renderLogos();
    }

    /**
     * Get current companies
     */
    getCompanies() {
        return this.companies;
    }
}

// Export for use in main.js
window.LogoCarousel = LogoCarousel;
