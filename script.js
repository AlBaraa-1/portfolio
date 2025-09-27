// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const cyclingText = document.getElementById('cycling-text');

// Navigation functionality
class Navigation {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // Mobile menu toggle
        navToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Navbar scroll effect
        window.addEventListener('scroll', throttle(() => this.handleNavbarScroll(), 10));
    }

    toggleMobileMenu() {
        this.isOpen = !this.isOpen;
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        if (this.isOpen) {
            this.isOpen = false;
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
}

// Hero section animations
class HeroAnimations {
    constructor() {
        this.texts = ['Problem Solver', 'Developer', 'Researcher', 'AI Enthusiast', 'Innovator'];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (cyclingText) {
            this.startTextCycling();
        }
    }

    startTextCycling() {
        const cycleDuration = 3000; // 3 seconds per text
        const fadeOutDuration = 500;
        
        setInterval(() => {
            // Fade out current text
            cyclingText.style.opacity = '0';
            
            setTimeout(() => {
                // Change text and fade in
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
                cyclingText.textContent = this.texts[this.currentIndex];
                cyclingText.style.opacity = '1';
            }, fadeOutDuration);
        }, cycleDuration);
    }
}

// Scroll animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            }
        );

        // Observe elements for animations
        this.observeElements();
        
        // Skill progress bars
        this.initSkillBars();
    }

    observeElements() {
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .about-content > *,
            .skill-card,
            .project-card,
            .timeline-item,
            .contact-card,
            .resume-preview
        `);

        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }

    initSkillBars() {
        const skillObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const level = progressBar?.getAttribute('data-level');
                        if (progressBar && level) {
                            setTimeout(() => {
                                progressBar.style.width = `${level}%`;
                            }, 300);
                        }
                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.skill-card').forEach(card => {
            skillObserver.observe(card);
        });
    }
}

// Project filtering system
class ProjectFilter {
    constructor() {
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilterClick(btn, projectCards));
        });
    }

    handleFilterClick(button, cards) {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects with animation
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    requestAnimationFrame(() => {
                        card.style.transition = 'all 0.3s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Subject is required';
                } else if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters';
                }
                break;
                
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        this.showError(field, errorElement, errorMessage, !isValid);
        return isValid;
    }

    showError(field, errorElement, message, hasError) {
        if (hasError) {
            field.style.borderColor = 'var(--danger)';
            errorElement.textContent = message;
            errorElement.classList.add('show');
        } else {
            field.style.borderColor = 'var(--accent-blue)';
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    clearError(field) {
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        field.style.borderColor = '';
        errorElement.classList.remove('show');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const fields = ['name', 'email', 'subject', 'message'];
        let isFormValid = true;

        // Validate all fields
        fields.forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Show loading state
        const submitBtn = contactForm.querySelector('.form-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        // Simulate form submission (replace with actual API call)
        try {
            await this.simulateSubmission(formData);
            this.showSuccessMessage();
            contactForm.reset();
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    simulateSubmission(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage() {
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showErrorMessage() {
        this.showNotification('Failed to send message. Please try again.', 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease-out',
            backgroundColor: type === 'success' ? 'var(--success)' : 'var(--danger)'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Back to top functionality
class BackToTop {
    constructor() {
        this.init();
    }

    init() {
        if (backToTop) {
            window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
            backToTop.addEventListener('click', () => this.scrollToTop());
        }
    }

    handleScroll() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    preloadResources() {
        // Preload hero background images or critical assets
        const criticalImages = [
            // Add any critical image URLs here
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Error handling and analytics
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
    }

    handleError(event) {
        console.error('Global error:', event.error);
        // In production, send to analytics service
        this.logError('JavaScript Error', event.error.message, event.error.stack);
    }

    handlePromiseRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // In production, send to analytics service
        this.logError('Promise Rejection', event.reason);
    }

    logError(type, message, stack = '') {
        // Replace with actual analytics/logging service
        console.log('Logging error:', { type, message, stack, timestamp: new Date().toISOString() });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initialized');
    
    // Initialize all modules
    new Navigation();
    new HeroAnimations();
    new ScrollAnimations();
    new ProjectFilter();
    new ContactForm();
    new BackToTop();
    new PerformanceOptimizer();
    new ErrorHandler();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Page became visible');
        // Resume animations or refresh data if needed
    } else {
        console.log('Page became hidden');
        // Pause animations to save resources
    }
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for testing purposes
window.PortfolioApp = {
    Navigation,
    HeroAnimations,
    ScrollAnimations,
    ProjectFilter,
    ContactForm,
    BackToTop,
    PerformanceOptimizer,
    ErrorHandler
};