/**
 * Professional Value Proposition Module
 * Handles animations and interactions for the redesigned value proposition section
 */

class ValuePropositionManager {
    constructor() {
        this.valueSection = document.querySelector('.value-proposition');
        if (!this.valueSection) {
            console.log('❌ Value proposition section not found');
            return;
        }

        this.counters = document.querySelectorAll('.metric-value, .percentage');
        this.valueCards = document.querySelectorAll('.value-card');
        this.eyebrow = document.querySelector('.section-eyebrow');
        this.ctaButton = document.querySelector('.value-cta .btn');
        this.indicators = document.querySelectorAll('.indicator-dot');
        
        this.isAnimated = false;
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
        console.log('✅ Professional ValuePropositionManager initialized');
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCardInteractions();
        this.setupEyebrowInteraction();
        this.setupIndicatorAnimations();
        this.setupCTAInteraction();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateCounters();
                    this.triggerCardSequence();
                    this.startIndicatorPulse();
                    this.isAnimated = true;
                    console.log('✅ Value proposition animations started');
                }
            });
        }, this.observerOptions);

        observer.observe(this.valueSection);
    }

    setupCardInteractions() {
        this.valueCards.forEach((card, index) => {
            // Professional hover interactions
            card.addEventListener('mouseenter', () => {
                this.triggerCardHover(card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });

            // Accessibility support
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            
            card.addEventListener('focus', () => {
                this.triggerCardHover(card);
            });
            
            card.addEventListener('blur', () => {
                this.resetCardHover(card);
            });

            // Add professional entrance animation delay
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    setupEyebrowInteraction() {
        if (!this.eyebrow) return;

        this.eyebrow.addEventListener('mouseenter', () => {
            this.eyebrow.style.transform = 'translateY(-2px) scale(1.02)';
            this.eyebrow.style.boxShadow = '0 8px 20px rgba(71, 85, 105, 0.15)';
        });

        this.eyebrow.addEventListener('mouseleave', () => {
            this.eyebrow.style.transform = 'translateY(-1px) scale(1)';
            this.eyebrow.style.boxShadow = '0 4px 12px rgba(71, 85, 105, 0.1)';
        });
    }

    setupIndicatorAnimations() {
        this.indicators.forEach(indicator => {
            indicator.style.animationDelay = Math.random() * 2 + 's';
        });
    }

    setupCTAInteraction() {
        if (!this.ctaButton) return;

        this.ctaButton.addEventListener('mouseenter', () => {
            const arrow = this.ctaButton.querySelector('svg');
            if (arrow) {
                arrow.style.transform = 'translateX(4px)';
            }
        });

        this.ctaButton.addEventListener('mouseleave', () => {
            const arrow = this.ctaButton.querySelector('svg');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
        });
    }

    animateCounters() {
        // Get all metric values and animate them
        const metrics = document.querySelectorAll('.value-proposition .metric-value');
        console.log(`🎯 Found ${metrics.length} value proposition metrics to animate`);
        
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                this.animateMetricValue(metric);
            }, index * 300);
        });
    }

    animateMetricValue(element) {
        const text = element.textContent.trim();
        let target = 0;
        let prefix = '';
        let suffix = '';
        
        // Parse different metric formats
        if (text.includes('$') && text.includes('M')) {
            // $54M format
            target = parseInt(text.replace(/[$M]/g, ''));
            prefix = '$';
            suffix = 'M';
        } else if (text.includes('%')) {
            // 57% format
            target = parseInt(text.replace('%', ''));
            suffix = '%';
        } else if (text.includes('/')) {
            // 9/10 format - don't animate, just show
            return;
        } else if (text.includes('h')) {
            // < 24h format
            target = parseInt(text.replace(/[<h\s]/g, ''));
            prefix = '< ';
            suffix = 'h';
        }
        
        if (target === 0) return;
        
        console.log(`📊 Animating metric: "${text}" -> target: ${target}`);
        
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
                this.addMetricCompletionEffect(element);
            }
            
            // Update the display
            element.textContent = prefix + Math.floor(current) + suffix;
        }, stepDuration);
    }

    addMetricCompletionEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.color = 'var(--color-primary-600)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
            element.style.transition = 'all 0.3s ease';
        }, 300);
    }

    triggerCardSequence() {
        this.valueCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add subtle entrance effect
                this.addCardEntranceEffect(card);
            }, index * 200);
        });
    }

    addCardEntranceEffect(card) {
        const originalTransform = card.style.transform;
        card.style.transform = 'translateY(0) scale(1.02)';
        
        setTimeout(() => {
            card.style.transform = originalTransform;
        }, 200);
    }

    triggerCardHover(card) {
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.08) rotate(2deg)';
            icon.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        }

        // Add subtle glow to the card border
        card.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        card.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }

    resetCardHover(card) {
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = '';
        }

        card.style.borderColor = '';
        card.style.backgroundColor = '';
    }

    startIndicatorPulse() {
        this.indicators.forEach((indicator, index) => {
            setTimeout(() => {
                indicator.style.animation = 'pulse-dot 2s ease-in-out infinite';
            }, index * 500);
        });
    }

    // Public methods for external control
    refreshAnimations() {
        this.isAnimated = false;
        
        // Reset all animations
        this.valueCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            metric.style.transform = 'scale(1)';
            metric.style.color = '';
        });

        // Restart observer
        this.setupIntersectionObserver();
    }

    triggerManualAnimation() {
        if (!this.isAnimated) {
            this.animateCounters();
            this.triggerCardSequence();
            this.startIndicatorPulse();
            this.isAnimated = true;
        }
    }

    // Status and debugging
    getStatus() {
        return {
            initialized: !!this.valueSection,
            animated: this.isAnimated,
            cardsCount: this.valueCards.length,
            countersCount: this.counters.length,
            indicatorsCount: this.indicators.length
        };
    }

    // Professional entrance animations
    animateInSequence() {
        const elements = [
            this.eyebrow,
            document.querySelector('.section-title'),
            document.querySelector('.section-description'),
            ...this.valueCards,
            document.querySelector('.value-cta')
        ].filter(Boolean);

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.valuePropositionManager = new ValuePropositionManager();
    });
} else {
    window.valuePropositionManager = new ValuePropositionManager();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValuePropositionManager;
} else if (typeof window !== 'undefined') {
    window.ValuePropositionManager = ValuePropositionManager;
}

export default ValuePropositionManager; 