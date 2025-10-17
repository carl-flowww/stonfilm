// ==========================================
// Masonry Grid Component
// Handles portfolio grid layout with Masonry.js
// ==========================================

class MasonryGrid {
    constructor() {
        this.gridElement = document.querySelector('.masonry-grid');
        this.masonryInstance = null;
        this.currentCategory = 'ALL';
        this.allPortfolioItems = [];
    }

    /**
     * Initialize Masonry grid
     */
    async init() {
        if (!this.gridElement) {
            console.error('Masonry grid element not found');
            return;
        }

        // Load all portfolio items
        await this.loadPortfolioItems();

        // Initialize Masonry layout
        this.initMasonry();
    }

    /**
     * Load portfolio items from Supabase
     */
    async loadPortfolioItems() {
        this.showLoading();

        try {
            const { data, error } = await getAllPortfolio();

            if (error) {
                console.error('Error loading portfolio:', error);
                this.showError();
                return;
            }

            this.allPortfolioItems = data || [];

            if (this.allPortfolioItems.length === 0) {
                this.showEmpty();
                return;
            }

            // Shuffle for randomized display
            this.allPortfolioItems = shuffleArray(this.allPortfolioItems);

            this.renderPortfolio(this.allPortfolioItems);

        } catch (err) {
            console.error('Error loading portfolio:', err);
            this.showError();
        }
    }

    /**
     * Filter portfolio by category
     */
    async filterByCategory(category) {
        this.currentCategory = category;
        this.showLoading();

        try {
            let portfolioData;

            if (category === 'ALL') {
                portfolioData = this.allPortfolioItems;
            } else {
                const { data, error } = await getPortfolioByCategory(category);

                if (error) {
                    console.error('Error filtering portfolio:', error);
                    this.showError();
                    return;
                }

                portfolioData = data || [];
            }

            if (portfolioData.length === 0) {
                this.showEmpty();
                return;
            }

            // Shuffle for randomized display
            portfolioData = shuffleArray(portfolioData);

            this.renderPortfolio(portfolioData);

        } catch (err) {
            console.error('Error filtering portfolio:', err);
            this.showError();
        }
    }

    /**
     * Render portfolio items to DOM
     */
    renderPortfolio(items) {
        // Clear existing content
        this.gridElement.innerHTML = '';

        // Add grid-sizer element for Masonry column width
        const gridSizer = document.createElement('div');
        gridSizer.className = 'grid-sizer';
        this.gridElement.appendChild(gridSizer);

        items.forEach(item => {
            const card = this.createPortfolioCard(item);
            this.gridElement.appendChild(card);
        });

        // Reinitialize or layout Masonry after images load
        if (this.masonryInstance) {
            this.masonryInstance.reloadItems();
            this.waitForImagesToLoad().then(() => {
                this.masonryInstance.layout();
            });
        } else {
            this.waitForImagesToLoad().then(() => {
                this.initMasonry();
            });
        }
    }

    /**
     * Create portfolio card element
     */
    createPortfolioCard(item) {
        const card = document.createElement('div');
        card.className = 'masonry-item';

        const aspectRatioPercent = aspectRatioToPercent(item.aspect_ratio);

        // Video cards: iframe with hover controls
        if (item.type === 'video' && item.video_id) {
            const embedUrl = this.getYouTubeEmbedUrl(item.video_id, item.start_time);

            card.innerHTML = `
                <div class="portfolio-card portfolio-card-video" data-id="${item.id}" data-type="${item.type}">
                    <div class="portfolio-card-media" style="padding-bottom: ${aspectRatioPercent}%;">
                        <iframe
                            src="${embedUrl}"
                            title="${item.title}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;
        }
        // Image cards: thumbnail with hover scale
        else {
            const thumbnailUrl = this.getThumbnailUrl(item);

            card.innerHTML = `
                <div class="portfolio-card portfolio-card-image" data-id="${item.id}" data-type="${item.type}">
                    <div class="portfolio-card-media" style="padding-bottom: ${aspectRatioPercent}%;">
                        <img src="${thumbnailUrl}" alt="${item.title}" loading="lazy">
                    </div>
                </div>
            `;
        }

        return card;
    }

    /**
     * Generate YouTube embed URL with autoplay, mute, and hidden controls
     */
    getYouTubeEmbedUrl(videoId, startTime = 0) {
        const url = `https://www.youtube.com/embed/${videoId}`;

        const params = new URLSearchParams({
            autoplay: '1',
            mute: '1',
            controls: '0',
            showinfo: '0',
            modestbranding: '1',
            rel: '0',
            loop: '1',
            playlist: videoId,
            fs: '0',
            iv_load_policy: '3',
            disablekb: '1',
            start: (startTime || 0).toString()
        });

        return `${url}?${params.toString()}`;
    }

    /**
     * Get thumbnail URL for portfolio item
     */
    getThumbnailUrl(item) {
        if (item.type === 'video' && item.video_id) {
            // YouTube thumbnail
            return `https://img.youtube.com/vi/${item.video_id}/maxresdefault.jpg`;
        } else if (item.type === 'image' && item.image_path) {
            // Supabase Storage image
            const { data } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(item.image_path);
            return data.publicUrl;
        }

        // Fallback placeholder
        return `https://via.placeholder.com/800x450?text=${encodeURIComponent(item.title)}`;
    }

    /**
     * Open video in modal or new tab
     */
    openVideo(item) {
        if (!item.video_url) return;

        // For now, open in new tab
        // TODO: Implement modal with embedded player
        window.open(item.video_url, '_blank');
    }

    /**
     * Initialize Masonry layout
     */
    initMasonry() {
        if (typeof Masonry === 'undefined') {
            console.error('Masonry.js not loaded');
            return;
        }

        this.masonryInstance = new Masonry(this.gridElement, {
            itemSelector: '.masonry-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: 24,
            transitionDuration: '0.3s'
        });

        console.log('Masonry initialized with 3 columns, 24px gutter');
    }

    /**
     * Wait for all images to load before laying out
     */
    waitForImagesToLoad() {
        const images = this.gridElement.querySelectorAll('img');

        if (images.length === 0) {
            return Promise.resolve();
        }

        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', resolve); // Resolve even on error
                }
            });
        });

        return Promise.all(imagePromises);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.gridElement.innerHTML = '<div class="masonry-grid-loading">Loading portfolio...</div>';
    }

    /**
     * Show error state
     */
    showError() {
        this.gridElement.innerHTML = '<div class="masonry-grid-empty">Failed to load portfolio. Please try again later.</div>';
    }

    /**
     * Show empty state
     */
    showEmpty() {
        this.gridElement.innerHTML = '<div class="masonry-grid-empty">No portfolio items found.</div>';
    }

    /**
     * Destroy Masonry instance
     */
    destroy() {
        if (this.masonryInstance) {
            this.masonryInstance.destroy();
            this.masonryInstance = null;
        }
    }
}

// Export for use in main.js
window.MasonryGrid = MasonryGrid;
