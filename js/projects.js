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
        });
    });
}