/* ==========================================
   DARK MODE MODULE
   ========================================== */

const darkModeManager = {
    // Dark mode state
    isDarkMode: localStorage.getItem('portfolio-dark-mode') === 'true' ||
               (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    
    /**
     * Initialize dark mode
     */
    init() {
        this.applyTheme(this.isDarkMode);
        this.setupToggle();
        this.listenToSystemPreference();
    },
    
    /**
     * Setup dark mode toggle button
     */
    setupToggle() {
        const darkModeBtn = document.getElementById('dark-mode-btn');
        
        if (!darkModeBtn) return;
        
        darkModeBtn.addEventListener('click', () => {
            this.toggle();
        });
        
        // Update button icon based on current mode
        this.updateButtonIcon();
    },
    
    /**
     * Toggle dark mode
     */
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme(this.isDarkMode);
        localStorage.setItem('portfolio-dark-mode', this.isDarkMode);
    },
    
    /**
     * Apply theme (dark or light)
     */
    applyTheme(isDark) {
        const html = document.documentElement;
        const body = document.body;
        
        if (isDark) {
            body.classList.add('dark-mode');
            html.style.colorScheme = 'dark';
        } else {
            body.classList.remove('dark-mode');
            html.style.colorScheme = 'light';
        }
        
        this.updateButtonIcon();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('darkModeChanged', { 
            detail: { isDarkMode: isDark } 
        }));
    },
    
    /**
     * Update button icon
     */
    updateButtonIcon() {
        const darkModeBtn = document.getElementById('dark-mode-btn');
        if (!darkModeBtn) return;
        
        const icon = darkModeBtn.querySelector('i');
        if (!icon) return;
        
        if (this.isDarkMode) {
            icon.className = 'fas fa-sun';
            darkModeBtn.title = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            darkModeBtn.title = 'Dark Mode';
        }
    },
    
    /**
     * Listen to system preference changes
     */
    listenToSystemPreference() {
        if (!window.matchMedia) return;
        
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Modern browsers
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('portfolio-dark-mode')) {
                    this.applyTheme(e.matches);
                }
            });
        }
    },
    
    /**
     * Get current theme
     */
    getTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    },
    
    /**
     * Check if dark mode is enabled
     */
    isDark() {
        return this.isDarkMode;
    },
    
    /**
     * Check if light mode is enabled
     */
    isLight() {
        return !this.isDarkMode;
    },
    
    /**
     * Force dark mode
     */
    enableDarkMode() {
        if (!this.isDarkMode) {
            this.toggle();
        }
    },
    
    /**
     * Force light mode
     */
    enableLightMode() {
        if (this.isDarkMode) {
            this.toggle();
        }
    }
};

/**
 * Initialize dark mode when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    darkModeManager.init();
});

/**
 * Export for use in other modules
 */
window.darkModeManager = darkModeManager;
