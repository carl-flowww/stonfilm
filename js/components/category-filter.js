// ==========================================
// Category Filter Component
// Handles category button filtering for portfolio
// ==========================================

class CategoryFilter {
    constructor(masonryGrid) {
        this.masonryGrid = masonryGrid;
        this.filterButtons = document.querySelectorAll('.category-btn');
        this.currentCategory = 'ALL';
    }

    /**
     * Initialize category filter
     */
    init() {
        if (this.filterButtons.length === 0) {
            console.error('Category filter buttons not found');
            return;
        }

        this.attachEventListeners();
        this.setActiveButton('ALL');
    }

    /**
     * Attach click event listeners to filter buttons
     */
    attachEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.handleCategoryChange(category);
            });
        });
    }

    /**
     * Handle category change
     */
    async handleCategoryChange(category) {
        if (category === this.currentCategory) {
            return; // Already on this category
        }

        this.currentCategory = category;
        this.setActiveButton(category);

        // Filter masonry grid
        if (this.masonryGrid) {
            await this.masonryGrid.filterByCategory(category);
        }
    }

    /**
     * Set active state on button
     */
    setActiveButton(category) {
        this.filterButtons.forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Get current category
     */
    getCurrentCategory() {
        return this.currentCategory;
    }

    /**
     * Reset to ALL category
     */
    reset() {
        this.handleCategoryChange('ALL');
    }
}

// Export for use in main.js
window.CategoryFilter = CategoryFilter;
