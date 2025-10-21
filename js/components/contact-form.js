// ==========================================
// Contact Form Component
// Handles form validation and submission to Supabase
// ==========================================

class ContactForm {
    constructor() {
        this.formElement = document.querySelector('.contact-form');
        this.submitButton = this.formElement?.querySelector('.submit-btn');
        this.formGroups = {};
        this.isSubmitting = false;
    }

    /**
     * Initialize contact form
     */
    init() {
        if (!this.formElement) {
            console.error('Contact form not found');
            return;
        }

        this.cacheFormElements();
        this.attachEventListeners();
    }

    /**
     * Cache form input elements
     */
    cacheFormElements() {
        const inputs = this.formElement.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const name = input.name;
            if (name) {
                this.formGroups[name] = {
                    input: input,
                    group: input.closest('.form-group'),
                    error: input.closest('.form-group')?.querySelector('.form-error')
                };
            }
        });
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Form submit
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation on blur
        Object.values(this.formGroups).forEach(({ input }) => {
            input.addEventListener('blur', () => {
                this.validateField(input.name);
            });

            // Clear error on input
            input.addEventListener('input', () => {
                this.clearFieldError(input.name);
            });
        });
    }

    /**
     * Handle form submission
     */
    async handleSubmit() {
        if (this.isSubmitting) return;

        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) {
            return;
        }

        // Collect form data
        const formData = this.getFormData();

        // Submit to Supabase
        this.isSubmitting = true;
        this.setSubmitButtonState(true);

        try {
            const { data, error } = await submitContactForm(formData);

            if (error) {
                console.error('Error submitting form:', error);
                this.showFormError('Failed to submit form. Please try again later.');
                return;
            }

            // Success
            this.showSuccess();
            this.resetForm();

        } catch (err) {
            console.error('Error submitting form:', err);
            this.showFormError('An unexpected error occurred. Please try again.');
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonState(false);
        }
    }

    /**
     * Validate entire form
     */
    validateForm() {
        let isValid = true;

        // Validate required fields
        const requiredFields = ['full_name', 'email', 'message'];

        requiredFields.forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate individual field
     */
    validateField(fieldName) {
        const field = this.formGroups[fieldName];
        if (!field) return true;

        const value = field.input.value.trim();

        // Required field validation
        if (fieldName === 'full_name' || fieldName === 'email' || fieldName === 'message') {
            if (!value) {
                this.showFieldError(fieldName, 'This field is required');
                return false;
            }
        }

        // Email validation
        if (fieldName === 'email' && value) {
            if (!this.isValidEmail(value)) {
                this.showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation (optional but must be valid if provided)
        if (fieldName === 'phone' && value) {
            if (!this.isValidPhone(value)) {
                this.showFieldError(fieldName, 'Please enter a valid phone number');
                return false;
            }
        }

        this.clearFieldError(fieldName);
        return true;
    }

    /**
     * Email validation
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone validation
     */
    isValidPhone(phone) {
        // Allow various phone formats
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    /**
     * Show field error
     */
    showFieldError(fieldName, message) {
        const field = this.formGroups[fieldName];
        if (!field) return;

        field.group?.classList.add('error');

        if (field.error) {
            field.error.textContent = message;
        } else {
            // Create error element if not exists
            const errorEl = document.createElement('div');
            errorEl.className = 'form-error';
            errorEl.textContent = message;
            field.group?.appendChild(errorEl);
            field.error = errorEl;
        }
    }

    /**
     * Clear field error
     */
    clearFieldError(fieldName) {
        const field = this.formGroups[fieldName];
        if (!field) return;

        field.group?.classList.remove('error');
        if (field.error) {
            field.error.textContent = '';
        }
    }

    /**
     * Show general form error
     */
    showFormError(message) {
        this.showPopup({
            type: 'error',
            title: 'Sending Failed',
            content: `We're sorry, but there was an error sending your message. Please try again or contact us directly:\n\nEmail: song41@stonfilm.com\nPhone: 010-3470-5437`
        });
    }

    /**
     * Show success message
     */
    showSuccess() {
        this.showPopup({
            type: 'success',
            title: 'Sent Successfully!',
            content: `Thank you for reaching out to us. Your message has been received and we'll get back to you as soon as possible.\n\nWe typically respond within 24-48 hours.`
        });
    }

    /**
     * Show popup modal
     */
    showPopup({ type, title, content }) {
        // Remove existing popup if any
        const existingPopup = document.querySelector('.popup-overlay');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        // Create popup modal
        const modal = document.createElement('div');
        modal.className = 'popup-modal';

        // Create popup header
        const header = document.createElement('div');
        header.className = 'popup-header';

        // Create icon
        const icon = document.createElement('div');
        icon.className = `popup-icon ${type}`;

        if (type === 'success') {
            icon.innerHTML = `
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            icon.innerHTML = `
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }

        // Create title
        const titleEl = document.createElement('h3');
        titleEl.className = 'popup-title';
        titleEl.textContent = title;

        header.appendChild(icon);
        header.appendChild(titleEl);

        // Create content
        const contentEl = document.createElement('p');
        contentEl.className = 'popup-content';
        contentEl.textContent = content;

        // Create actions
        const actions = document.createElement('div');
        actions.className = 'popup-actions';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup-btn';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        });

        actions.appendChild(closeBtn);

        // Assemble modal
        modal.appendChild(header);
        modal.appendChild(contentEl);
        modal.appendChild(actions);
        overlay.appendChild(modal);

        // Add to body
        document.body.appendChild(overlay);

        // Show popup with animation
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }


    /**
     * Get form data
     */
    getFormData() {
        return {
            company: this.formGroups.company?.input.value.trim() || null,
            full_name: this.formGroups.full_name?.input.value.trim(),
            email: this.formGroups.email?.input.value.trim(),
            phone: this.formGroups.phone?.input.value.trim() || null,
            message: this.formGroups.message?.input.value.trim()
        };
    }

    /**
     * Reset form
     */
    resetForm() {
        this.formElement.reset();
        Object.keys(this.formGroups).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
    }

    /**
     * Set submit button state
     */
    setSubmitButtonState(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add('loading');
            this.submitButton.textContent = 'Sending...';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove('loading');
            this.submitButton.textContent = 'Send Message';
        }
    }
}

// Export for use in main.js
window.ContactForm = ContactForm;
