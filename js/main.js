// Berlin Storage Network - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    const body = document.body;

    // Open mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMobileMenu();
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
        });
    }

    // Close menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Close menu when clicking on menu links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMobileMenu();
        }
    });

    // Helper functions
    function openMobileMenu() {
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
        
        // Add focus trap
        if (mobileMenuClose) {
            mobileMenuClose.focus();
        }
    }

    function closeMobileMenu() {
        body.classList.remove('menu-open');
        body.style.overflow = '';
        
        // Return focus to menu button
        if (menuBtn) {
            menuBtn.focus();
        }
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (menu) {
                menu.classList.remove('menu-open');
            }
        });
    });

    // Scroll animations - Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Animated counters for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Progress bars animation for market comparison
    const progressBars = document.querySelectorAll('.market__bar');
    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        barsObserver.observe(bar);
    });


    // Dynamic typing effect for hero title
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Interactive hover effects for cards
    const cards = document.querySelectorAll('.imbalance__card, .competitor, .property, .tech-feature, .service, .story');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline__item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });


    // Button click effects
    const buttons = document.querySelectorAll('.hero__cta-btn, .cta__btn, .menu__contacts');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #54FF8F, #42E87A);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgress();

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(37, 54, 56, ${opacity})`;
        });
    }

    // Copy to clipboard functionality for contact info
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success message
                const originalText = button.textContent;
                button.textContent = 'Скопійовано!';
                button.style.background = '#54FF8F';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            });
        });
    });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form is valid, submitting...');
            }
        });
    });

    // Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Activate Easter egg
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Performance optimization - debounce scroll events
    let scrollTimeout;
    const debounceScroll = (func, wait) => {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    };

    // Add CSS for animations and effects
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .error {
            border-color: #FF5454 !important;
            background-color: rgba(255, 84, 84, 0.1) !important;
        }
        
        .lazy {
            filter: blur(5px);
            transition: filter 0.3s;
        }
        
        img {
            transition: filter 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);

    console.log('Berlin Storage Network website loaded successfully! 🏢💰');
});

// Additional utility functions
const utils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Calculate ROI
    calculateROI: (investment, returns) => {
        return ((returns - investment) / investment * 100).toFixed(1);
    },
    
    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Make utils available globally
window.BerlinStorageUtils = utils;