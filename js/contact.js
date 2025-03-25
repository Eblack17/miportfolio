/*
 * Contact Page JavaScript
 * Handles animations, form validation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all page functionality
  initFaqAccordion();
  initFormValidation();
  initAnimations();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (!accordionItems.length) return;
  
  // Animate in the accordion items sequentially
  accordionItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = `fadeInUp 0.5s forwards`;
      item.style.opacity = '1';
    }, 300 + (index * 100));
  });
  
  // Add click event listeners to accordion buttons
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
      const contentInner = accordionItem.querySelector('.accordion-content-inner');
      
      // Toggle active class
      const isActive = accordionItem.classList.contains('is-active');
      
      // Close all accordions first
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('is-active');
        const otherContent = item.querySelector('.accordion-content');
        if (otherContent) {
          otherContent.style.maxHeight = '0px';
        }
      });
      
      // If the clicked accordion wasn't active, open it
      if (!isActive) {
        accordionItem.classList.add('is-active');
        content.style.maxHeight = `${contentInner.offsetHeight}px`;
      }
    });
  });
  
  // Open the first accordion by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const content = firstItem.querySelector('.accordion-content');
    const contentInner = firstItem.querySelector('.accordion-content-inner');
    
    firstItem.classList.add('is-active');
    if (content && contentInner) {
      content.style.maxHeight = `${contentInner.offsetHeight}px`;
    }
  }
}

/**
 * Initialize form validation and submission
 */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  // Input fields with validation requirements
  const fields = [
    { id: 'name', validate: value => value.trim().length >= 2, error: 'Please enter your name (at least 2 characters)' },
    { id: 'email', validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: 'Please enter a valid email address' },
    { id: 'subject', validate: value => value.trim().length >= 3, error: 'Please enter a subject (at least 3 characters)' },
    { id: 'message', validate: value => value.trim().length >= 10, error: 'Please enter your message (at least 10 characters)' }
  ];
  
  // Add floating label behavior
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    if (!input) return;
    
    // Add placeholder attribute for floating label behavior
    input.setAttribute('placeholder', ' ');
    
    // Validate on blur
    input.addEventListener('blur', () => validateField(field));
    
    // Clear error on focus
    input.addEventListener('focus', () => {
      const errorElement = document.getElementById(`${field.id}-error`);
      if (errorElement) {
        errorElement.textContent = '';
      }
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      simulateFormSubmission();
    }
  });
  
  // Helper function to validate individual field
  function validateField(field) {
    const input = document.getElementById(field.id);
    const errorElement = document.getElementById(`${field.id}-error`);
    
    if (!input || !errorElement) return true;
    
    const isValid = field.validate(input.value);
    
    if (!isValid) {
      errorElement.textContent = field.error;
      input.classList.add('is-invalid');
    } else {
      errorElement.textContent = '';
      input.classList.remove('is-invalid');
    }
    
    return isValid;
  }
  
  // Simulate form submission (would be replaced with actual AJAX submission)
  function simulateFormSubmission() {
    const statusElement = document.querySelector('.form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const loader = document.querySelector('.form-submit__loader');
    
    // Show loading state
    submitButton.disabled = true;
    loader.style.display = 'block';
    
    // Simulate server delay
    setTimeout(() => {
      // Hide loader
      loader.style.display = 'none';
      
      // Show success message
      statusElement.textContent = 'Thank you! Your message has been sent successfully.';
      statusElement.classList.add('form-status--success');
      statusElement.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Re-enable button after delay
      setTimeout(() => {
        submitButton.disabled = false;
      }, 2000);
    }, 1500);
  }
}

/**
 * Initialize general animations for the page
 */
function initAnimations() {
  // Add scroll animation to the CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
      ctaButton.style.transform = 'scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      ctaButton.style.transform = 'scale(1)';
    });
  }
  
  // Animate contact-info hover effect
  const contactItems = document.querySelectorAll('.contact-list__item');
  if (contactItems.length) {
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
      });
    });
  }
  
  // Animate social link hover effects
  const socialLinks = document.querySelectorAll('.social-list__link');
  if (socialLinks.length) {
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Add entrance animations to elements when they become visible
  const animateOnScroll = document.querySelectorAll('.contact-form-wrapper, .contact-info-wrapper');
  if (animateOnScroll.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateOnScroll.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Parallax effect for the map background
  const infoWrapper = document.querySelector('.contact-info-wrapper');
  if (infoWrapper) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      infoWrapper.style.backgroundPositionX = `${50 + (mouseX - 0.5) * 5}%`;
      infoWrapper.style.backgroundPositionY = `${50 + (mouseY - 0.5) * 5}%`;
    });
  }
}