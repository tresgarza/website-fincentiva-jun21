// FinWise Bank Clone - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initTestimonials();
    initFAQ();
    initSmoothScrolling();
    initMobileMenu();
    initContactForm();
    initLazyLoading();
    initProcessAnimation();
});

function initializeHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.remove('transparent');
        } else {
            header.classList.add('transparent');
        }
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

function initializeScrollEffects() {
    // Smooth scrolling for navigation links
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
}

// Financiera Incentiva - Complete JavaScript

// Header functionality
function initHeader() {
    const header = document.getElementById('header');
    const nav = document.getElementById('main-nav');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.remove('transparent');
        } else {
            header.classList.add('transparent');
        }
    });
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Toggle search modal or redirect to search page
            console.log('Search clicked');
        });
    }
}

// Testimonials slider
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;

    // Set initial state for all testimonials
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.opacity = 0;
            testimonial.style.position = 'absolute';
            testimonial.classList.remove('active');
        } else {
            testimonial.classList.add('active');
        }
    });
    
    function showTestimonial(nextIndex) {
        const currentItem = testimonials[currentTestimonial];
        const nextItem = testimonials[nextIndex];

        anime.timeline({
            easing: 'easeInSine',
            duration: 500
        })
        .add({
            targets: currentItem,
            opacity: 0,
            complete: () => {
                currentItem.classList.remove('active');
                currentItem.style.position = 'absolute';
            }
        })
        .add({
            targets: nextItem,
            opacity: 1,
            begin: () => {
                nextItem.style.position = 'relative';
                nextItem.classList.add('active');
            }
        });

        currentTestimonial = nextIndex;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 7000); // Increased interval for a better user experience
}

// FAQ functionality
function initFAQ() {
    // Tab switching
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqPanels = document.querySelectorAll('.faq-panel');
    
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            faqPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === targetTab);
            });
        });
    });
    
    // FAQ item expansion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherIcon) otherIcon.textContent = '+';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.textContent = '-';
            } else {
                if (icon) icon.textContent = '+';
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu toggle if it doesn't exist
    if (window.innerWidth <= 768) {
        createMobileMenuToggle();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenuToggle();
        } else {
            removeMobileMenuToggle();
        }
    });
}

function createMobileMenuToggle() {
    const headerContainer = document.querySelector('.header-container');
    let mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!mobileToggle) {
        mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Add CSS for mobile toggle
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                gap: 4px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
            }
            
            .mobile-menu-toggle span {
                width: 25px;
                height: 3px;
                background: var(--primary-green);
                transition: var(--transition);
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: flex;
                }
                
                .nav {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--white);
                    flex-direction: column;
                    padding: 2rem;
                    box-shadow: var(--shadow);
                }
                
                .nav.active {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(style);
        
        headerContainer.appendChild(mobileToggle);
        
        // Add click handler
        mobileToggle.addEventListener('click', function() {
            const nav = document.querySelector('.nav');
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

function removeMobileMenuToggle() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.remove();
    }
}

// Contact form functionality
function initContactForm() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('¡Mensaje enviado exitosamente!', 'success');
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: var(--border-radius);
            color: var(--white);
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: var(--transition);
        }
        
        .notification-success {
            background: var(--primary-green);
        }
        
        .notification-error {
            background: #dc3545;
        }
        
        .notification-info {
            background: #17a2b8;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-green);
        color: var(--white);
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
initScrollToTop();

// Performance optimization
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Credit calculator functionality
function initCreditCalculator() {
    const calculatorForm = document.getElementById('credit-calculator');
    if (!calculatorForm) return;
    
    const amountInput = document.getElementById('loan-amount');
    const termInput = document.getElementById('loan-term');
    const resultDiv = document.getElementById('calculator-result');
    
    function calculateLoan() {
        const amount = parseFloat(amountInput.value) || 0;
        const term = parseInt(termInput.value) || 12;
        const rate = 0.60; // 60% annual rate
        
        // Simple calculation for demonstration
        const monthlyRate = rate / 12;
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                              (Math.pow(1 + monthlyRate, term) - 1);
        
        if (resultDiv && amount > 0) {
            resultDiv.innerHTML = `
                <div class="calculator-result">
                    <h4>Resultado de tu Simulación</h4>
                    <p><strong>Monto solicitado:</strong> $${amount.toLocaleString('es-MX')} MXN</p>
                    <p><strong>Plazo:</strong> ${term} pagos</p>
                    <p><strong>Pago semanal:</strong> $${monthlyPayment.toLocaleString('es-MX', {maximumFractionDigits: 2})} MXN</p>
                    <a href="https://credito.fincentiva.com.mx" class="btn btn-primary">Solicitar Ahora</a>
                </div>
            `;
        }
    }
    
    amountInput.addEventListener('input', calculateLoan);
    termInput.addEventListener('change', calculateLoan);
}

// Initialize credit calculator
initCreditCalculator();

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking service
    console.log('Event tracked:', { category, action, label });
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    if (e.target.classList.contains('btn-login')) {
        trackEvent('Button', 'Click', 'Login');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
