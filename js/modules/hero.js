/**
 * Hero Section Module - Advanced Interactions
 * Handles image management, parallax effects, and special animations
 */

class HeroManager {
  constructor() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) {
      console.log('❌ Hero section not found');
      return;
    }

    this.isVisible = false;
    this.animationsStarted = false;
    
    // Initialize immediately for better UX
    this.init();
    console.log('✅ HeroManager initialized');
  }

  init() {
    // Use Intersection Observer for lazy initialization
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1 }
    );
    
    this.observer.observe(this.hero);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      this.isVisible = entry.isIntersecting;
      
      if (this.isVisible && !this.animationsStarted) {
        this.animationsStarted = true;
        this.initTypingEffect();
        this.initMetrics();
        console.log('✅ Hero animations started');
        this.observer.disconnect(); // Stop observing once initialized
      }
    });
  }

  initTypingEffect() {
    const titleElement = this.hero.querySelector('.hero-text h1');
    if (!titleElement) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.showHeroContent();
      return;
    }

    const fullText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    const typeCharacter = () => {
      if (currentIndex < fullText.length) {
        titleElement.textContent = fullText.substring(0, currentIndex + 1);
        currentIndex++;
        setTimeout(() => requestAnimationFrame(typeCharacter), typingSpeed);
      } else {
        // Typing complete, show other content
        setTimeout(() => this.showHeroContent(), 500);
      }
    };
    
    // Start typing after a short delay
    setTimeout(() => requestAnimationFrame(typeCharacter), 300);
  }

  showHeroContent() {
    const paragraph = this.hero.querySelector('.hero-text p');
    const buttons = this.hero.querySelector('.hero-buttons');
    
    if (paragraph) {
      paragraph.classList.add('show');
    }
    
    if (buttons) {
      setTimeout(() => {
        buttons.classList.add('show');
      }, 200);
    }
  }

  initMetrics() {
    const metrics = this.hero.querySelectorAll('.metric-number[data-target]');
    console.log(`🎯 Found ${metrics.length} metrics to animate`);
    
    if (!metrics.length) return;

    metrics.forEach((metric, index) => {
      // Get target value from data attribute
      const target = parseInt(metric.getAttribute('data-target')) || 0;
      const label = metric.nextElementSibling?.textContent || '';
      
      console.log(`📊 Animating metric ${index + 1}: target=${target}, label="${label}"`);
      
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(easeOut * target);
        metric.textContent = this.formatNumber(current, label, target);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure final value is set
          metric.textContent = this.formatNumber(target, label, target);
          console.log(`✅ Metric animation completed: ${target}`);
        }
      };
      
      // Stagger animations
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 300);
    });
  }

  formatNumber(num, label, target) {
    // Special formatting based on the metric type and target
    if (label.includes('Millones') || target >= 100) {
      if (target >= 1000) {
        return '$' + (num / 1000).toFixed(0) + 'M';
      } else {
        return '$' + num + 'M';
      }
    } else if (label.includes('%') || label.includes('Satisfacción')) {
      return num + '%';
    } else if (label.includes('Años') || label.includes('Experiencia')) {
      return num + '+';
    } else if (label.includes('Créditos') || label.includes('Otorgados')) {
      if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
      }
      return num.toLocaleString('es-MX');
    }
    return num.toString();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.heroManager = new HeroManager();
  });
} else {
  window.heroManager = new HeroManager();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroManager;
} else if (typeof window !== 'undefined') {
  window.HeroManager = HeroManager;
}

export default HeroManager; 