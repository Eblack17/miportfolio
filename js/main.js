/**
 * Main JavaScript File
 * Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initMobileMenu();
  initProjectFilter();
  initContactForm();
  initScrollAnimations();
  initLightbox();
  initServices();
  initFeaturedCarousel();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.menu');
  
  if (!menuToggle || !mainMenu) return;
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainMenu.classList.toggle('is-active');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });
  
  // Close menu when clicking on a link
  const menuLinks = mainMenu.querySelectorAll('.menu__link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mainMenu.classList.contains('is-active') && 
        !mainMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainMenu.classList.contains('is-active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  });
  
  // Add scroll event to change navbar background opacity
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}