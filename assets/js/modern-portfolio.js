// Modern Portfolio JavaScript - Enhanced Functionality

// Theme Management - Enhanced for better dark mode
const initTheme = () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Apply theme without transition on initial load
  document.documentElement.style.transition = 'none';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Re-enable transitions after a brief delay
  setTimeout(() => {
    document.documentElement.style.transition = '';
  }, 100);
  
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Announce theme change for screen readers
      announceThemeChange(newTheme);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
};

const updateThemeIcon = (theme) => {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
};

// Announce theme change for accessibility
const announceThemeChange = (theme) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = `Theme changed to ${theme} mode`;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
};

// Smooth Scrolling for Navigation Links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Navbar Scroll Effect
const initNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking on a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
};

// Typing Animation
const initTypingAnimation = () => {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const roles = ['AI Engineer', 'ML Developer', 'Problem Solver', 'Tech Enthusiast'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  const type = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  };
  
  type();
};

// Intersection Observer for Animations
const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
};

// Project Filter (if needed) - DISABLED DUE TO LAYOUT ISSUES
/*
const initProjectFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'flex'; // Changed from 'block' to 'flex'
          project.classList.remove('fade-out');
          project.classList.add('fade-in');
        } else {
          project.classList.add('fade-out');
          setTimeout(() => {
            project.style.display = 'none';
          }, 300); // Wait for fade animation
        }
      });
    });
  });
};
*/

// Form Validation and Submission
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Submit form using fetch
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        form.reset();
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.style.opacity = '1';
          
          setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 500);
          }, 5000);
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      showNotification('Oops! There was a problem sending your message.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
};

// Notification System
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Parallax Effect for Hero Section
const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
};

// Skills Progress Animation - Removed since we're not using progress bars
/*
const initSkillsAnimation = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length === 0) return;
  
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-fill');
        const percentage = progressBar?.getAttribute('data-percentage');
        if (progressBar && percentage) {
          progressBar.style.width = percentage + '%';
        }
        observer.unobserve(entry.target);
      }
    });
  };
  
  const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => skillsObserver.observe(bar));
};
*/

// Image Lazy Loading
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length === 0) return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px'
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Loading Screen - Fixed version
const hideLoader = () => {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
};

// Achievement Carousel Navigation
const initCarouselNavigation = () => {
  const carousel = document.querySelector('.achievement-carousel');
  const prevBtn = document.querySelector('.carousel-nav-prev');
  const nextBtn = document.querySelector('.carousel-nav-next');
  
  if (!carousel || !prevBtn || !nextBtn) return;
  
  const cardWidth = 350; // Width of each card
  const gap = 32; // Gap between cards (2rem = 32px)
  const scrollAmount = cardWidth + gap;
  
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Update button visibility based on scroll position
  const updateButtonVisibility = () => {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    prevBtn.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = scrollLeft >= maxScroll - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = scrollLeft >= maxScroll - 1 ? 'none' : 'auto';
  };
  
  carousel.addEventListener('scroll', updateButtonVisibility);
  updateButtonVisibility(); // Initial check
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader first
  hideLoader();
  
  // Initialize all features
  initTheme();
  initSmoothScroll();
  initNavbarScroll();
  initMobileMenu();
  initTypingAnimation();
  initScrollAnimations();
  // initProjectFilter(); // DISABLED DUE TO LAYOUT ISSUES
  initContactForm();
  initParallax();
  // initSkillsAnimation(); // Removed - no longer using progress bars
  initLazyLoading();
  initCarouselNavigation();
});

// Also hide loader on window load as fallback
window.addEventListener('load', () => {
  hideLoader();
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('animations-paused');
  } else {
    document.body.classList.remove('animations-paused');
  }
}); 