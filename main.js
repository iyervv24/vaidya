// ===== MAIN JAVASCRIPT FILE =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== SCROLL PROGRESS INDICATOR =====
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = Math.max(0, Math.min(100, scrollProgress)) + '%';
        });
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .overview-card, .insight-card, .article-card, .expertise-category,
        .industry-item, .perspective-item, .faq-item, .stat-item
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success modal
                showSuccessModal();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // In a real implementation, you would send the data to your server
                console.log('Form data:', formObject);
            }, 2000);
        });
    }

    // ===== NEWSLETTER FORM HANDLING =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.email-input');
            const subscribeBtn = this.querySelector('.subscribe-btn');
            
            if (emailInput.value && isValidEmail(emailInput.value)) {
                // Show loading state
                const originalText = subscribeBtn.textContent;
                subscribeBtn.textContent = 'Subscribing...';
                subscribeBtn.disabled = true;
                
                // Simulate subscription (replace with actual handling)
                setTimeout(() => {
                    alert('Thank you for subscribing! You\'ll receive updates on new insights and articles.');
                    emailInput.value = '';
                    subscribeBtn.textContent = originalText;
                    subscribeBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(25px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // ===== INTERACTIVE PARTICLES =====
    let particleCount = 0;
    const maxParticles = 15;
    
    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        particleCount++;
        
        // Animate particle
        const animation = particle.animate([
            { 
                opacity: 0, 
                transform: `translateY(0px) scale(0)` 
            },
            { 
                opacity: 1, 
                transform: `translateY(-${Math.random() * 200 + 100}px) scale(1)` 
            },
            { 
                opacity: 0, 
                transform: `translateY(-${Math.random() * 400 + 200}px) scale(0)` 
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
            particleCount--;
        };
    }

    // Create particles periodically
    setInterval(createParticle, 4000);
    
    // Create initial particles
    for (let i = 0; i < 3; i++) {
        setTimeout(createParticle, i * 1000);
    }

    // ===== DYNAMIC TYPING EFFECT (for hero sections) =====
    function typeWriter(element, text, speed = 50) {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Debounce resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize
    const handleResize = debounce(() => {
        // Recalculate any dynamic elements if needed
        console.log('Window resized');
    }, 250);

    window.addEventListener('resize', handleResize);

    // ===== MOUSE TRACKING FOR SUBTLE EFFECTS =====
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Subtle parallax effect on hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const rect = heroContent.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const deltaX = (mouseX - centerX) / centerX;
                const deltaY = (mouseY - centerY) / centerY;
                
                heroContent.style.transform = `translate(${deltaX * 10}px, ${deltaY * 5}px)`;
            }
        }
    }, 16));

    // ===== LOADING STATES FOR INTERACTIVE ELEMENTS =====
    function addLoadingState(button, originalText, loadingText = 'Loading...') {
        button.textContent = loadingText;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        return function removeLoadingState() {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        };
    }

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Add focus management for modal
    const modal = document.getElementById('successModal');
    if (modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0ms');
        
        // Remove animation classes
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ===== INITIALIZATION COMPLETE =====
    console.log('Website initialized successfully');
});

// ===== UTILITY FUNCTIONS =====

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on the close button
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            setTimeout(() => closeButton.focus(), 100);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Log performance metrics
    setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        console.log(`Page load time: ${loadTime}ms`);
    }, 0);
});

// ===== SERVICE WORKER REGISTRATION (for PWA capabilities) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}