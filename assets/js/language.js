/* ==========================================
   LANGUAGE SWITCHING MODULE
   ========================================== */

const languageManager = {
    // Current language state
    currentLanguage: localStorage.getItem('portfolio-language') || 'en',
    
    // Translation dictionary
    translations: {
        en: {
            // Navigation
            'Home': 'Home',
            'About': 'About',
            'Skills': 'Skills',
            'Experience': 'Experience',
            'Projects': 'Projects',
            'Certificates': 'Certificates',
            'Education': 'Education',
            'Contact': 'Contact',
            
            // Hero Section
            'ROLA ALSULAMI': 'ROLA ALSULAMI',
            'Transforming data into insights': 'Transforming data into insights',
            'Download CV': 'Download CV',
            
            // About Section
            'About Me': 'About Me',
            'Data Science Paragraph': 'Data Science student passionate about transforming raw data into valuable insights through analytics, machine learning, and artificial intelligence.',
            'Experience Paragraph': 'Experienced in Python, SQL, Power BI, Machine Learning, Deep Learning, Computer Vision, Data Visualization, and Business Intelligence.',
            'Internship Paragraph': 'Currently completing a Data Science Internship at Dama Holding Company, contributing to real-world AI and analytics projects.',
            
            // Skills Section
            'Skills': 'Skills',
            'Programming': 'Programming',
            'Data Science': 'Data Science',
            'Visualization': 'Visualization',
            'Machine Learning': 'Machine Learning',
            'Deep Learning': 'Deep Learning',
            'Other': 'Other',
            
            // Experience Section
            'Experience': 'Experience',
            
            // Projects Section
            'Projects': 'Projects',
            'All': 'All',
            'Machine Learning': 'Machine Learning',
            'Data Analysis': 'Data Analysis',
            'Dashboard': 'Dashboard',
            'Database': 'Database',
            
            // Certificates Section
            'Certificates': 'Certificates',
            
            // Education Section
            'Education': 'Education',
            'Bachelor of Data Science': 'Bachelor of Data Science',
            'Umm Al-Qura University': 'Umm Al-Qura University',
            'Student ID': 'Student ID',
            'Specialization': 'Specialization',
            
            // Contact Section
            'Get In Touch': 'Get In Touch',
            'Let\'s Connect': 'Let\'s Connect',
            'Contact Description': 'Feel free to reach out for collaborations, opportunities, or just a friendly hello!',
            'Email': 'Email',
            'Phone': 'Phone',
            'Location': 'Location',
            'Makkah, Saudi Arabia': 'Makkah, Saudi Arabia',
            'Full Name': 'Full Name',
            'Subject': 'Subject',
            'Message': 'Message',
            'Send Message': 'Send Message',
            'Quick Links': 'Quick Links',
            'Connect': 'Connect',
            'Rola Alsulami. All rights reserved.': 'Rola Alsulami. All rights reserved.',
            
            // Loading
            'Loading...': 'Loading...'
        },
        
        ar: {
            // Navigation
            'Home': 'الرئيسية',
            'About': 'عني',
            'Skills': 'المهارات',
            'Experience': 'الخبرة',
            'Projects': 'المشاريع',
            'Certificates': 'الشهادات',
            'Education': 'التعليم',
            'Contact': 'اتصل',
            
            // Hero Section
            'ROLA ALSULAMI': 'رولا السليمي',
            'Transforming data into insights': 'تحويل البيانات إلى رؤى',
            'Download CV': 'تحميل السيرة الذاتية',
            
            // About Section
            'About Me': 'عني',
            'Data Science Paragraph': 'طالبة علم بيانات شغوفة بتحويل البيانات الخام إلى رؤى تساعد على اتخاذ القرار من خلال التحليلات والتعلم الآلي والذكاء الاصطناعي.',
            'Experience Paragraph': 'أمتلك خبرة في Python وSQL وPower BI والتعلم الآلي والتعلم العميق ورؤية الحاسب وتصور البيانات وذكاء الأعمال.',
            'Internship Paragraph': 'أكمل حاليًا تدريبي في شركة داما القابضة، حيث أشارك في تطوير مشاريع تحليل البيانات والذكاء الاصطناعي.',
            
            // Skills Section
            'Skills': 'المهارات',
            'Programming': 'البرمجة',
            'Data Science': 'علوم البيانات',
            'Visualization': 'التصور البياني',
            'Machine Learning': 'التعلم الآلي',
            'Deep Learning': 'التعلم العميق',
            'Other': 'أخرى',
            
            // Experience Section
            'Experience': 'الخبرة',
            
            // Projects Section
            'Projects': 'المشاريع',
            'All': 'الكل',
            'Machine Learning': 'التعلم الآلي',
            'Data Analysis': 'تحليل البيانات',
            'Dashboard': 'لوحة التحكم',
            'Database': 'قاعدة البيانات',
            
            // Certificates Section
            'Certificates': 'الشهادات',
            
            // Education Section
            'Education': 'التعليم',
            'Bachelor of Data Science': 'بكالوريوس علوم البيانات',
            'Umm Al-Qura University': 'جامعة أم القرى',
            'Student ID': 'معرف الطالب',
            'Specialization': 'التخصص',
            
            // Contact Section
            'Get In Touch': 'تواصل معي',
            'Let\'s Connect': 'دعنا نتواصل',
            'Contact Description': 'لا تتردد في التواصل للتعاون أو المشاريع أو حتى لقول مرحبًا!',
            'Email': 'البريد الإلكتروني',
            'Phone': 'الهاتف',
            'Location': 'الموقع',
            'Makkah, Saudi Arabia': 'مكة، المملكة العربية السعودية',
            'Full Name': 'الاسم الكامل',
            'Subject': 'الموضوع',
            'Message': 'الرسالة',
            'Send Message': 'إرسال الرسالة',
            'Quick Links': 'روابط سريعة',
            'Connect': 'تواصل',
            'Rola Alsulami. All rights reserved.': 'رولا السليمي. جميع الحقوق محفوظة.',
            
            // Loading
            'Loading...': 'جاري التحميل...'
        }
    },
    
    /**
     * Initialize language manager
     */
    init() {
        this.applyLanguage(this.currentLanguage);
        this.setupLanguageToggle();
    },
    
    /**
     * Setup language toggle button
     */
    setupLanguageToggle() {
        const langButton = document.getElementById('language-btn');
        const langText = document.getElementById('lang-text');
        
        if (!langButton) return;
        
        // Set initial button text
        this.updateLanguageButtonText();
        
        // Add click event
        langButton.addEventListener('click', () => {
            this.toggle();
        });
    },
    
    /**
     * Toggle between English and Arabic
     */
    toggle() {
        const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.applyLanguage(newLanguage);
    },
    
    /**
     * Apply selected language
     */
    applyLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('portfolio-language', language);
        
        // Update direction
        this.updateDirection(language);
        
        // Update language attribute
        document.documentElement.lang = language;
        
        // Update all text elements
        this.updatePageText(language);
        
        // Update language button
        this.updateLanguageButtonText();
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
    },
    
    /**
     * Update page direction (LTR/RTL)
     */
    updateDirection(language) {
        const html = document.documentElement;
        const body = document.body;
        
        if (language === 'ar') {
            html.style.direction = 'rtl';
            body.classList.remove('ltr');
            body.classList.add('rtl');
        } else {
            html.style.direction = 'ltr';
            body.classList.remove('rtl');
            body.classList.add('ltr');
        }
    },
    
    /**
     * Update all text on the page
     */
    updatePageText(language) {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For form elements, update placeholder
                if (language === 'ar') {
                    element.placeholder = element.getAttribute('data-ar') || element.placeholder;
                } else {
                    element.placeholder = element.getAttribute('data-en') || element.placeholder;
                }
            } else {
                // For other elements, update text content
                if (language === 'ar') {
                    element.textContent = element.getAttribute('data-ar') || element.textContent;
                } else {
                    element.textContent = element.getAttribute('data-en') || element.textContent;
                }
            }
        });
    },
    
    /**
     * Update language button text
     */
    updateLanguageButtonText() {
        const langText = document.getElementById('lang-text');
        if (langText) {
            langText.textContent = this.currentLanguage === 'en' ? 'AR' : 'EN';
        }
    },
    
    /**
     * Get translation for a key
     */
    translate(key, fallback = key) {
        const translations = this.translations[this.currentLanguage];
        return translations[key] || fallback;
    },
    
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    },
    
    /**
     * Check if current language is Arabic
     */
    isArabic() {
        return this.currentLanguage === 'ar';
    },
    
    /**
     * Check if current language is English
     */
    isEnglish() {
        return this.currentLanguage === 'en';
    }
};

/**
 * Initialize language manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
});

/**
 * Export for use in other modules
 */
window.languageManager = languageManager;
