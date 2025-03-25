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