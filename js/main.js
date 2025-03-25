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

/**
 * Project Filtering
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter__btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (!filterButtons.length || !projectItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
      button.classList.add('filter__btn--active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = '';
          // Add animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Add initial styles for animation
  projectItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

/**
 * Contact Form Validation
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.querySelector('.form-status');
  const formSubmitLoader = document.querySelector('.form-submit__loader');
  
  // Validate on submit
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    
    // Clear previous error messages
    clearErrors();
    
    // Validate fields
    let isValid = true;
    
    if (!validateField(nameInput, 'Please enter your name')) {
      isValid = false;
    }
    
    if (!validateField(emailInput, 'Please enter your email')) {
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }
    
    if (!validateField(subjectInput, 'Please enter a subject')) {
      isValid = false;
    }
    
    if (!validateField(messageInput, 'Please enter your message')) {
      isValid = false;
    }
    
    // If valid, submit form
    if (isValid) {
      submitForm(contactForm);
    }
  });
  
  // Validate field
  function validateField(input, errorMessage) {
    if (!input) return true;
    
    if (input.value.trim() === '') {
      showError(input, errorMessage);
      return false;
    }
    return true;
  }
  
  // Show error message
  function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
    input.classList.add('error');
  }
  
  // Clear all errors
  function clearErrors() {
    const errorElements = contactForm.querySelectorAll('.error-message');
    const inputElements = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    errorElements.forEach(element => {
      element.textContent = '';
    });
    
    inputElements.forEach(input => {
      input.classList.remove('error');
    });
  }