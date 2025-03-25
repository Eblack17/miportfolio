/**
 * About Page JavaScript
 * Handles animations, scrolling effects, and interactivity for the about page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize journey tabs
  initJourneyTabs();
});

/**
 * Initialize scroll animations for elements with animate-on-scroll class
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Animate elements that are already in view on page load
  animateElementsInView(animatedElements);
  
  // Set up scroll event to animate elements as they come into view
  window.addEventListener('scroll', function() {
    animateElementsInView(animatedElements);
  });
}

/**
 * Checks which elements are in the viewport and adds the 'animated' class to them
 * @param {NodeList} elements - The elements to animate when they enter the viewport
 */
function animateElementsInView(elements) {
  const windowHeight = window.innerHeight;
  const offset = 150; // Offset in pixels to trigger animation before element is fully in view
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    
    // Check if element is in viewport (with offset)
    if (elementPosition < windowHeight - offset) {
      element.classList.add('animated');
    }
  });
}

/**
 * Initialize the journey tabs for switching between experience and education
 */
function initJourneyTabs() {
  const tabs = document.querySelectorAll('.journey-tab');
  const experienceTimeline = document.getElementById('experience-timeline');
  const educationTimeline = document.getElementById('education-timeline');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('journey-tab--active'));
      
      // Add active class to clicked tab
      this.classList.add('journey-tab--active');
      
      // Show the selected timeline
      const tabType = this.getAttribute('data-tab');
      
      if (tabType === 'experience') {
        experienceTimeline.style.display = 'block';
        educationTimeline.style.display = 'none';
      } else if (tabType === 'education') {
        experienceTimeline.style.display = 'none';
        educationTimeline.style.display = 'block';
      }
      
      // Re-trigger animations for the newly visible timeline
      const visibleTimeline = tabType === 'experience' ? experienceTimeline : educationTimeline;
      const animatedElements = visibleTimeline.querySelectorAll('.animate-on-scroll');
      
      // Reset animations
      animatedElements.forEach(element => {
        element.classList.remove('animated');
      });
      
      // Trigger animations with a slight delay
      setTimeout(() => {
        animateElementsInView(animatedElements);
      }, 100);
    });
  });
}