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
        // Remove existing error/success messages
        this.clearFormMessages();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.textAlign = 'center';
        errorDiv.style.marginTop = 'var(--sp-3)';
        this.formElement.appendChild(errorDiv);
    }

    /**
     * Show success message
     */
    showSuccess() {
        // Remove existing error/success messages
        this.clearFormMessages();

        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = 'Thank you for your message! We will get back to you soon.';
        this.formElement.appendChild(successDiv);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    /**
     * Clear all form messages
     */
    clearFormMessages() {
        this.formElement.querySelectorAll('.form-success, .form-error:not(.form-group .form-error)').forEach(el => el.remove());
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
