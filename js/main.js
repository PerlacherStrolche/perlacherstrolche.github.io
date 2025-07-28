/**
 * Perlacher Strolche e.V. Main JavaScript
 * Handles interactive elements like menu toggle, modals, and scroll effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initModals();
  initBackToTop();
  initSmoothScrolling();
  initCarousel();
});


/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');
  
  if (!menuToggle || !mainNav) return;
  
  menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });
  
  // Close menu when clicking on a link (for mobile)
  const menuLinks = mainNav.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Modal Popups
 */
function initModals() {
  // Impressum Modal
  setupModal('impressum-modal', 'a[href="#impressum"]');
  
  // Datenschutz Modal
  setupModal('datenschutz-modal', 'a[href="#datenschutz"]');
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal[style*="display: block"]');
      openModals.forEach(modal => {
        closeModal(modal);
      });
    }
  });
}

function setupModal(modalId, triggerSelector) {
  const modal = document.getElementById(modalId);
  const triggers = document.querySelectorAll(triggerSelector);
  const closeBtn = modal.querySelector('.close-modal');
  
  if (!modal || !triggers.length || !closeBtn) return;
  
  // Open modal when clicking trigger
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(modal);
    });
  });
  
  // Close modal when clicking close button
  closeBtn.addEventListener('click', function() {
    closeModal(modal);
  });
}

function openModal(modal) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  
  // Set focus to the modal for accessibility
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length) {
    focusableElements[0].focus();
  }
}

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicking the button
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Skip if it's a modal trigger
      if (link.getAttribute('href') === '#impressum' || link.getAttribute('href') === '#datenschutz') {
        return;
      }
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;
      
      // Calculate header height for offset
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Image Carousel
 */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  const carouselTrack = carousel.querySelector('.carousel-track');
  const slides = Array.from(carouselTrack.children);
  const nextButton = carousel.querySelector('.carousel-button-right');
  const prevButton = carousel.querySelector('.carousel-button-left');
  const dotsNav = carousel.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);
  
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  // Arrange slides next to each other
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });
  
  // Function to move to a specific slide
  const moveToSlide = (currentSlide, targetSlide) => {
    carouselTrack.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };
  
  // Update dots
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };
  
  // Hide/show arrows
  // const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  //   if (targetIndex === 0) {
  //     prevButton.classList.add('is-hidden');
  //     nextButton.classList.remove('is-hidden');
  //   } else if (targetIndex === slides.length - 1) {
  //     prevButton.classList.remove('is-hidden');
  //     nextButton.classList.add('is-hidden');
  //   } else {
  //     prevButton.classList.remove('is-hidden');
  //     nextButton.classList.remove('is-hidden');
  //   }
  // };
  
  // Next button click
  nextButton.addEventListener('click', () => {
    const currentSlide = carouselTrack.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
  });
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    const currentSlide = carouselTrack.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
  });
  
  // Dot navigation
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;
    
    const currentSlide = carouselTrack.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
  });
  
  // Auto-advance carousel
  let carouselInterval;
  
  function startCarousel() {
    carouselInterval = setInterval(() => {
      const currentSlide = carouselTrack.querySelector('.current-slide');
      let nextSlide = currentSlide.nextElementSibling;
      
      // If at the end, loop back to first slide
      if (!nextSlide) {
        nextSlide = slides[0];
      }
      
      const currentDot = dotsNav.querySelector('.current-slide');
      const nextIndex = slides.findIndex(slide => slide === nextSlide);
      const nextDot = dots[nextIndex];
      
      moveToSlide(currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrows(slides, prevButton, nextButton, nextIndex);
    }, 5000); // Change slide every 5 seconds
  }
  
  function stopCarousel() {
    clearInterval(carouselInterval);
  }
  
  // Start carousel automatically
  startCarousel();
  
  // Pause carousel on hover
  carousel.addEventListener('mouseenter', stopCarousel);
  carousel.addEventListener('mouseleave', startCarousel);
}