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

/**
 * Add parallax effect to certain elements
 * This enhances the visual appeal by creating depth through motion
 */
const parallaxElements = document.querySelectorAll('.about-hero__pattern, .journey-section__bg');

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  
  parallaxElements.forEach(element => {
    const topPosition = element.offsetTop;
    const parallaxFactor = element.dataset.parallaxFactor || 0.3;
    const distance = (scrollPosition - topPosition) * parallaxFactor;
    
    element.style.transform = `translateY(${distance}px)`;
  });
});

/**
 * Add hover interaction to skill cards
 * Creates a subtle animation when hovering over skill cards
 */
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.skill-card__icon');
    
    // Animate icon
    icon.style.transform = 'scale(1.2)';
    icon.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.skill-card__icon');
    
    // Reset icon
    icon.style.transform = 'scale(1)';
  });
});

/**
 * Add photo hover effect
 * Enhances the interaction with the profile photo
 */
const photoWrapper = document.querySelector('.about-hero__photo-wrapper');
const photo = document.querySelector('.about-hero__photo');

if (photoWrapper && photo) {
  photoWrapper.addEventListener('mouseenter', function() {
    photo.style.transform = 'translate(10px, 10px)';
    this.classList.add('hover');
  });
  
  photoWrapper.addEventListener('mouseleave', function() {
    photo.style.transform = 'translate(0, 0)';
    this.classList.remove('hover');
  });
}

/**
 * Initialize counter animation for stats
 * Animates the count up effect for the stats in the hero section
 */
function initCounters() {
  const statNumbers = document.querySelectorAll('.about-hero__number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000; // Animation duration in milliseconds
    const stepTime = 50; // Time between steps in milliseconds
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        stat.textContent = Math.ceil(current);
        setTimeout(updateCounter, stepTime);
      } else {
        stat.textContent = target;
      }
    };
    
    // Start counter animation when the stat comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(updateCounter, 500);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(stat);
  });
}

// Initialize counters when document is loaded
document.addEventListener('DOMContentLoaded', initCounters); 