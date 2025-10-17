// ==========================================
// Main Entry Point
// Initializes all components when DOM is ready
// ==========================================

// Global component instances
let masonryGrid;
let categoryFilter;
let featuredVideo;
let logoCarousel;
let contactForm;
let mobileMenu;

/**
 * Initialize all components
 */
async function initApp() {
    console.log('Initializing STONFILM Landing Page...');

    try {
        // Initialize Hero image
        await initHeroImage();

        // Initialize Featured Video
        featuredVideo = new FeaturedVideo();
        await featuredVideo.init();

        // Initialize Masonry Grid
        masonryGrid = new MasonryGrid();
        await masonryGrid.init();

        // Initialize Category Filter (depends on masonryGrid)
        categoryFilter = new CategoryFilter(masonryGrid);
        categoryFilter.init();

        // Initialize Logo Carousel
        logoCarousel = new LogoCarousel();
        logoCarousel.init();

        // Initialize Contact Form
        contactForm = new ContactForm();
        contactForm.init();

        // Initialize Mobile Menu
        mobileMenu = new MobileMenu();
        mobileMenu.init();

        // Initialize smooth scroll for navigation
        initSmoothScroll();

        // Initialize TopBar scroll behavior
        initTopBarScroll();

        console.log('STONFILM Landing Page initialized successfully');

    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

/**
 * Initialize Hero image from Supabase settings
 */
async function initHeroImage() {
    try {
        const { data, error } = await getHeroImagePath();

        if (error) {
            console.error('Error loading hero image:', error);
            return;
        }

        if (data) {
            const heroImageElement = document.querySelector('.hero-image');
            if (heroImageElement) {
                const { data: urlData } = supabase.storage
                    .from('hero-images')
                    .getPublicUrl(data);

                if (urlData?.publicUrl) {
                    heroImageElement.style.backgroundImage = `url('${urlData.publicUrl}')`;
                }
            }
        }
    } catch (err) {
        console.error('Error initializing hero image:', err);
    }
}

/**
 * Initialize smooth scroll for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if it's an internal anchor link
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    smoothScrollTo(targetElement);
                }
            }
        });
    });
}

/**
 * Smooth scroll to element with offset for fixed topbar
 */
function smoothScrollTo(element, offset = 80) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize TopBar scroll behavior
 * Changes TopBar to filled style when Hero section disappears from view
 */
function initTopBarScroll() {
    const topbar = document.getElementById('topbar');
    const heroSection = document.querySelector('.hero');

    if (!topbar || !heroSection) {
        console.warn('TopBar or Hero section not found');
        return;
    }

    function handleScroll() {
        // Hero 섹션의 끝 위치 (offsetTop + height)
        const heroEndPosition = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;

        // Hero 섹션이 화면에서 완전히 사라졌을 때 filled 클래스 추가
        if (scrollPosition >= heroEndPosition) {
            topbar.classList.add('filled');
        } else {
            topbar.classList.remove('filled');
        }
    }

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM is already ready
    initApp();
}

// Export for debugging
window.STONFILM = {
    masonryGrid,
    categoryFilter,
    featuredVideo,
    logoCarousel,
    contactForm,
    mobileMenu,
    smoothScrollTo
};
