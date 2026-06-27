/* ==========================================
   FORM VALIDATION MODULE
   ========================================== */

const formValidation = {
    /**
     * Validation rules for different input types
     */
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s\u0600-\u06FF]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        subject: {
            required: true,
            minLength: 3,
            maxLength: 100
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    },
    
    /**
     * Error messages
     */
    messages: {
        en: {
            required: 'This field is required',
            minLength: 'Must be at least {0} characters',
            maxLength: 'Must not exceed {0} characters',
            email: 'Please enter a valid email address',
            name: 'Name should contain only letters',
            number: 'Please enter a valid number',
            phone: 'Please enter a valid phone number'
        },
        ar: {
            required: 'هذا الحقل مطلوب',
            minLength: 'يجب أن يكون على الأقل {0} أحرف',
            maxLength: 'لا يجب أن يتجاوز {0} أحرف',
            email: 'يرجى إدخال بريد إلكتروني صحيح',
            name: 'يجب أن يحتوي الاسم على أحرف فقط',
            number: 'يرجى إدخال رقم صحيح',
            phone: 'يرجى إدخال رقم هاتف صحيح'
        }
    },
    
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return window.languageManager?.getCurrentLanguage() || 'en';
    },
    
    /**
     * Validate all form fields
     */
    validateForm(formElement) {
        if (!formElement) return false;
        
        const fields = formElement.querySelectorAll('[name]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    /**
     * Validate single field
     */
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = this.rules[fieldName];
        
        // Clear previous error
        this.clearFieldError(field);
        
        if (!rules) {
            return true;
        }
        
        // Check required
        if (rules.required && !fieldValue) {
            this.showFieldError(field, 'required');
            return false;
        }
        
        // Check min length
        if (rules.minLength && fieldValue && fieldValue.length < rules.minLength) {
            this.showFieldError(field, 'minLength', rules.minLength);
            return false;
        }
        
        // Check max length
        if (rules.maxLength && fieldValue && fieldValue.length > rules.maxLength) {
            this.showFieldError(field, 'maxLength', rules.maxLength);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && fieldValue && !rules.pattern.test(fieldValue)) {
            this.showFieldError(field, fieldName);
            return false;
        }
        
        return true;
    },
    
    /**
     * Show field error
     */
    showFieldError(field, errorType, value = null) {
        field.classList.add('error');
        
        const errorContainer = field.parentElement.querySelector('.error-message');
        if (!errorContainer) return;
        
        const language = this.getCurrentLanguage();
        let message = this.messages[language][errorType] || this.messages.en[errorType];
        
        if (value) {
            message = message.replace('{0}', value);
        }
        
        errorContainer.textContent = message;
        errorContainer.classList.add('show');
    },
    
    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorContainer = field.parentElement.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.textContent = '';
            errorContainer.classList.remove('show');
        }
    },
    
    /**
     * Validate email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate phone number
     */
    validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },
    
    /**
     * Validate URL
     */
    validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    /**
     * Add real-time validation to form
     */
    enableRealTimeValidation(formElement) {
        if (!formElement) return;
        
        const fields = formElement.querySelectorAll('[name]');
        
        fields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            // Clear error on input
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.clearFieldError(field);
                }
            });
        });
    },
    
    /**
     * Get form data as object
     */
    getFormData(formElement) {
        if (!formElement) return null;
        
        const formData = new FormData(formElement);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    },
    
    /**
     * Sanitize input to prevent XSS
     */
    sanitizeInput(input) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = input;
        return tempDiv.innerHTML;
    },
    
    /**
     * Reset form and clear errors
     */
    resetForm(formElement) {
        if (!formElement) return;
        
        formElement.reset();
        
        const fields = formElement.querySelectorAll('[name]');
        fields.forEach(field => {
            this.clearFieldError(field);
        });
    }
};

/**
 * Auto-initialize form validation when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        formValidation.enableRealTimeValidation(contactForm);
    }
});

/**
 * Export for use in other modules
 */
window.formValidation = formValidation;
