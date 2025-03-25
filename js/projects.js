/**
 * Projects Page JavaScript
 * Handles interactive functionality for the portfolio projects page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const grid = document.getElementById('bento-grid');
    const filterButtons = document.querySelectorAll('.filter__btn');
    const modeButtons = document.querySelectorAll('.mode-switch__btn');
    const projectToggle = document.querySelector('.project-toggle');
    const bentoItems = document.querySelectorAll('.bento-item');
    const projectHero = document.querySelector('.project-hero');
    const projectCta = document.querySelector('.project-cta');
    
    // Lightbox elements
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxClient = document.getElementById('lightbox-client');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Lightbox navigation data
    let currentProjectIndex = 0;
    let availableProjects = [];
    
    // Sample project data for demonstration
    // In a real implementation, this data would come from a CMS or API
    const projectData = {
        'project2': {
            title: 'Artisan Coffee Brand Identity',
            category: 'Branding',
            year: '2023',
            client: 'Bean & Brew Co.',
            description: 'A comprehensive brand identity for an artisan coffee roastery. The design combines modern minimalism with vintage coffee culture, using a warm color palette inspired by different coffee roasts. The project included logo design, packaging, stationery, signage, and digital assets.',
            image: 'assets/images/projects/project2/gallery-1.jpg',
            caption: 'Brand identity design for Bean & Brew artisan coffee roastery'
        },
        'project3': {
            title: 'Annual Report Design',
            category: 'Print',
            year: '2022',
            client: 'Global Finance Inc.',
            description: 'An annual report design for a financial services company that transforms complex data into visually engaging infographics and charts. The design maintains corporate professionalism while adding creative visual elements to improve readability and highlight key metrics.',
            image: 'assets/images/projects/project3/gallery-1.jpg',
            caption: 'Annual report design with financial data visualizations'
        },
        'project5': {
            title: 'Restaurant Branding Package',
            category: 'Branding / Print',
            year: '2022',
            client: 'Fusion Kitchen',
            description: 'A complete branding package for a modern fusion restaurant, including logo design, menu layouts, signage, business cards, and promotional materials. The design creates a cohesive brand experience across all customer touchpoints.',
            image: 'assets/images/projects/project5/gallery-1.jpg',
            caption: 'Complete branding package for Fusion Kitchen restaurant'
        }
    };
    
    // Set initial mode
    grid.setAttribute('data-mode', 'web');
    
    // Add animation to bento items with staggered delay
    filterItemsByMode('web');
    animateBentoItems();
    
    // Add sticky behavior to project toggle
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 300) {
            projectToggle.classList.add('sticky');
        } else {
            projectToggle.classList.remove('sticky');
        }
    });
    
    // Handle category mode switching (Web/Graphic)
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // If button is already active, don't do anything
            if (button.classList.contains('mode-switch__btn--active')) {
                return;
            }
            
            // Get mode value
            const mode = button.getAttribute('data-mode');
            const previousMode = grid.getAttribute('data-mode');
            
            // Create a visual transition effect
            createTransitionEffect(previousMode, mode);
            
            // Update button active state
            modeButtons.forEach(btn => btn.classList.remove('mode-switch__btn--active'));
            button.classList.add('mode-switch__btn--active');
            
            // Update grid mode
            grid.setAttribute('data-mode', mode);
            
            // Reset filter buttons
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('filter__btn--active');
                } else {
                    btn.classList.remove('filter__btn--active');
                }
            });
            
            // Apply mode filtering and animate
            filterItemsByMode(mode);
            animateBentoItems();
            
            // Setup project item event listeners for lightbox if in graphic mode
            if (mode === 'graphic') {
                setupLightboxEventListeners();
            }
        });
    });
    
    // Handle project filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update button active state
            filterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
            button.classList.add('filter__btn--active');
            
            // Get filter value and current mode
            const filter = button.getAttribute('data-filter');
            const currentMode = grid.getAttribute('data-mode');
            
            // Apply filtering
            applyFiltering(currentMode, filter);
            
            // Animate filtered items
            animateBentoItems();
            
            // Re-setup lightbox listeners for newly visible items
            if (currentMode === 'graphic') {
                setupLightboxEventListeners();
            }
        });
    });
    
    /**
     * Sets up event listeners for lightbox functionality on graphic design projects
     */
    function setupLightboxEventListeners() {
        // Get all visible graphic design items
        const visibleItems = Array.from(bentoItems).filter(item => {
            const style = window.getComputedStyle(item);
            return style.display !== 'none' && 
                   (item.classList.contains('branding') || item.classList.contains('print'));
        });
        
        // Reset available projects array
        availableProjects = [];
        
        // Add click handlers to each project
        visibleItems.forEach(item => {
            // Get the project ID from the item's link
            const itemLink = item.querySelector('.bento-item__link');
            // Make sure we're not affecting existing event listeners
            const newLink = itemLink.cloneNode(true);
            itemLink.parentNode.replaceChild(newLink, itemLink);
            
            // Extract project ID from the href
            const href = newLink.getAttribute('href');
            const projectId = href.split('/').pop().replace('.html', '');
            
            // Add project to available projects for navigation
            if (projectData[projectId]) {
                availableProjects.push(projectId);
            }
            
            // Add click event to open lightbox instead of navigating
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Check if we have data for this project
                if (projectData[projectId]) {
                    // Find index of this project in available projects
                    currentProjectIndex = availableProjects.indexOf(projectId);
                    openLightbox();
                } else {
                    // If no data, just navigate to the project page
                    window.location.href = href;
                }
            });
        });
        
        // Add lightbox navigation events
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxPrev.addEventListener('click', () => {
            navigateLightbox(-1);
        });
        
        lightboxNext.addEventListener('click', () => {
            navigateLightbox(1);
        });
        
        // Close on escape key and arrow navigation
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        });
        
        // Close when clicking outside the content
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    /**
     * Opens the lightbox for the current project
     */
    function openLightbox() {
        // Get the current project ID
        const projectId = availableProjects[currentProjectIndex];
        if (!projectId || !projectData[projectId]) return;
        
        // Get project details
        const project = projectData[projectId];
        
        // Populate project details in the lightbox
        lightboxTitle.textContent = project.title;
        lightboxCategory.textContent = project.category;
        lightboxYear.textContent = project.year;
        lightboxClient.textContent = project.client || 'Confidential';
        lightboxDescription.textContent = project.description;
        
        // Set the image and caption
        lightboxImage.classList.remove('loaded', 'slide-in-left', 'slide-in-right');
        lightboxImage.src = project.image;
        lightboxCaption.textContent = project.caption || '';
        
