// Carousel functionality
let currentSlide = 0;
let carouselInterval;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carousel = document.querySelector('.carousel');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrap-around
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

// Event listeners for carousel controls
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopCarousel();
        startCarousel();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopCarousel();
        startCarousel();
    });
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopCarousel();
        startCarousel();
    });
});

// Pause carousel on hover
if (carousel) {
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
}

// Start the carousel
startCarousel();

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('.invitation').scrollIntoView({ behavior: 'smooth' });
    });
}

// Modal functionality
// Replace the previous DOMContentLoaded wrapper with an init that runs
// immediately if the document is ready, or on DOMContentLoaded if not.
function initRSVPInline() {
  const rsvpBtn = document.getElementById('rsvpBtn');
  const rsvpInline = document.getElementById('rsvpInline');
  const closeBtn = rsvpInline && rsvpInline.querySelector('.rsvp-inline-close');

  if (!rsvpBtn || !rsvpInline) return;

  function openInline() {
    rsvpInline.hidden = false;
    rsvpInline.setAttribute('aria-hidden', 'false');
    rsvpBtn.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {
      rsvpInline.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const iframe = rsvpInline.querySelector('iframe');
      if (iframe) iframe.focus({ preventScroll: true });
    });
  }

  function closeInline() {
    rsvpInline.hidden = true;
    rsvpInline.setAttribute('aria-hidden', 'true');
    rsvpBtn.setAttribute('aria-expanded', 'false');
    rsvpBtn.focus({ preventScroll: true });
  }

  rsvpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (rsvpInline.hidden || rsvpInline.getAttribute('aria-hidden') === 'true') openInline();
    else closeInline();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeInline();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && rsvpInline && !rsvpInline.hidden) {
      closeInline();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRSVPInline);
} else {
  initRSVPInline();
}

// Fade-in animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// Smooth scroll for anchor links (if any are added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});