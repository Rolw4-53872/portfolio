/* ==========================================
   PROJECTS MODULE - FILTERING & SEARCH
   ========================================== */

const projectsManager = {
    /**
     * Initialize projects module
     */
    init() {
        this.setupEventListeners();
    },
    
    /**
     * Setup event listeners for filtering and search
     */
    setupEventListeners() {
        this.setupFilterButtons();
        this.setupSearchBox();
    },
    
    /**
     * Setup filter button functionality
     */
    setupFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get filter value
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter);
            });
        });
    },
    
    /**
     * Setup search box functionality
     */
    setupSearchBox() {
        const searchInput = document.getElementById('project-search');
        if (!searchInput) return;
        
        // Debounce search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchProjects(e.target.value.toLowerCase());
            }, 300);
        });
    },
    
    /**
     * Filter projects by category
     */
    filterProjects(filter) {
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                this.showCard(card);
                visibleCount++;
            } else {
                this.hideCard(card);
            }
        });
        
        this.handleEmptyState(visibleCount);
    },
    
    /**
     * Search projects by title
     */
    searchProjects(query) {
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const title = card.getAttribute('data-title') || '';
            
            if (title.includes(query)) {
                this.showCard(card);
                visibleCount++;
            } else {
                this.hideCard(card);
            }
        });
        
        this.handleEmptyState(visibleCount);
    },
    
    /**
     * Show project card with animation
     */
    showCard(card) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.6s ease-out';
    },
    
    /**
     * Hide project card
     */
    hideCard(card) {
        card.classList.add('hidden');
    },
    
    /**
     * Handle empty state
     */
    handleEmptyState(visibleCount) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        
        let emptyMessage = grid.querySelector('.empty-state');
        
        if (visibleCount === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-state';
                emptyMessage.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
                        <i class="fas fa-search" style="font-size: 2rem; color: var(--text-gray); margin-bottom: 1rem; display: block;"></i>
                        <p style="color: var(--text-gray); font-size: 1.125rem;">No projects found</p>
                    </div>
                `;
                grid.appendChild(emptyMessage);
            }
        } else {
            if (emptyMessage) {
                emptyMessage.remove();
            }
        }
    },
    
    /**
     * Get all projects
     */
    getAllProjects() {
        return document.querySelectorAll('.project-card');
    },
    
    /**
     * Get visible projects
     */
    getVisibleProjects() {
        return Array.from(document.querySelectorAll('.project-card')).filter(
            card => !card.classList.contains('hidden')
        );
    },
    
    /**
     * Get filtered projects by category
     */
    getProjectsByCategory(category) {
        return Array.from(document.querySelectorAll('.project-card')).filter(
            card => card.getAttribute('data-category') === category
        );
    }
};

/**
 * Initialize projects manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    projectsManager.init();
});

/**
 * Export for use in other modules
 */
window.projectsManager = projectsManager;
