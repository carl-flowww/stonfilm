// ==========================================
// Featured Video Component
// Displays a random 16:9 video at the top of Projects section
// ==========================================

class FeaturedVideo {
    constructor() {
        this.containerElement = document.querySelector('.featured-video-container');
        this.yearElement = document.querySelector('.featured-video-year');
        this.categoryElement = document.querySelector('.featured-video-category');
        this.titleElement = document.querySelector('.featured-video-title');
        this.descriptionElement = document.querySelector('.featured-video-description');
        this.currentVideo = null;
    }

    /**
     * Initialize featured video
     */
    async init() {
        if (!this.containerElement) {
            console.error('Featured video container not found');
            return;
        }

        await this.loadRandomWideVideo();
    }

    /**
     * Load a random 16:9 video from Supabase
     */
    async loadRandomWideVideo() {
        try {
            const { data, error } = await getWideVideos();

            if (error) {
                console.error('Error loading wide videos:', error);
                this.showError();
                return;
            }

            if (!data || data.length === 0) {
                console.warn('No wide videos found');
                this.showError();
                return;
            }

            // Pick a random video
            const randomIndex = Math.floor(Math.random() * data.length);
            this.currentVideo = data[randomIndex];

            this.renderVideo(this.currentVideo);

        } catch (err) {
            console.error('Error loading featured video:', err);
            this.showError();
        }
    }

    /**
     * Render video to DOM
     */
    renderVideo(video) {
        if (!video.video_id) {
            console.error('Video ID not found');
            this.showError();
            return;
        }

        // Create YouTube embed URL
        const embedUrl = this.getYouTubeEmbedUrl(video.video_id, video.start_time);

        // Update iframe
        this.containerElement.innerHTML = `
            <iframe
                src="${embedUrl}"
                title="${video.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        `;

        // Update video info
        if (this.yearElement) {
            this.yearElement.textContent = video.year;
        }

        if (this.categoryElement) {
            this.categoryElement.textContent = video.category;
        }

        if (this.titleElement) {
            this.titleElement.textContent = video.title;
        }

        if (this.descriptionElement) {
            this.descriptionElement.textContent = video.description || '';
        }
    }

    /**
     * Generate YouTube embed URL with autoplay, mute, and hidden controls
     */
    getYouTubeEmbedUrl(videoId, startTime = 0) {
        const url = `https://www.youtube.com/embed/${videoId}`;

        const params = new URLSearchParams({
            autoplay: '1',              // Auto-play on load
            mute: '1',                  // Muted to allow autoplay
            controls: '0',              // Hide player controls
            showinfo: '0',              // Hide video info
            modestbranding: '1',        // Minimal YouTube branding
            rel: '0',                   // Don't show related videos
            loop: '1',                  // Enable looping
            playlist: videoId,          // Required for loop to work
            fs: '0',                    // Disable fullscreen button
            iv_load_policy: '3',        // Hide video annotations
            disablekb: '1',             // Disable keyboard controls
            start: (startTime || 0).toString()  // Start time
        });

        return `${url}?${params.toString()}`;
    }

    /**
     * Show error state
     */
    showError() {
        if (this.containerElement) {
            this.containerElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-muted);">Failed to load video</div>';
        }
    }

    /**
     * Reload with new random video
     */
    async reload() {
        await this.loadRandomWideVideo();
    }

    /**
     * Get current video data
     */
    getCurrentVideo() {
        return this.currentVideo;
    }
}

// Export for use in main.js
window.FeaturedVideo = FeaturedVideo;
