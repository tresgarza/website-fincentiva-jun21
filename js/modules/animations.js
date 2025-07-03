/**
 * Animations Module - Modern JavaScript Animation Utils
 * Using functional programming principles from Clean Code guidelines
 */

// Animation constants
const ANIMATION_DURATION = {
  FAST: 300,
  NORMAL: 500,
  SLOW: 800,
  COUNTER: 1500,
  TIMELINE: 5000
};

const EASING = {
  EASE_OUT_EXPO: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  EASE_IN_OUT_CUBIC: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

class AnimationsManager {
  constructor() {
    this.isInitialized = false;
    this.formatCurrency = this.createCurrencyFormatter();
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.setupAOS();
    this.initializeCounters();
    this.initializeProcessAnimation();
    
    this.isInitialized = true;
  }

  setupAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: ANIMATION_DURATION.NORMAL,
        once: true,
        offset: 50
      });
    }
  }

  createCurrencyFormatter() {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    });
  }

  initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      this.observeCounter(counter);
    });
  }

  observeCounter(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  }

  animateCounter(element) {
    const endValue = parseFloat(element.dataset.counter) || 0;
    const startValue = parseFloat(element.dataset.value) || 0;
    const isCurrency = element.dataset.currency === 'true';
    
    this.animateCountUp({
      element,
      startValue,
      endValue,
      duration: ANIMATION_DURATION.COUNTER,
      isCurrency
    });
  }

  animateCountUp({ element, startValue, endValue, duration, isCurrency = false }) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = EASING.EASE_OUT_EXPO(progress);
      
      const currentValue = startValue + (easedProgress * (endValue - startValue));
      
      if (isCurrency) {
        element.textContent = this.formatCurrency.format(currentValue);
      } else {
        element.textContent = Math.round(currentValue).toLocaleString('es-MX');
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.dataset.value = endValue;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  initializeProcessAnimation() {
    const processPath = document.querySelector('.process-connector path');
    if (!processPath) return;

    this.drawProcessPath(processPath);
    this.animateProcessPath(processPath);
  }

  drawProcessPath(path) {
    const steps = document.querySelectorAll('.process-step');
    if (steps.length === 0) return;

    const points = Array.from(steps).map(step => this.getElementCenter(step));
    const pathData = this.createSmoothPath(points);
    
    path.setAttribute('d', pathData);
    
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Redraw on window resize
    window.addEventListener('resize', () => {
      const newPoints = Array.from(steps).map(step => this.getElementCenter(step));
      const newPathData = this.createSmoothPath(newPoints);
      path.setAttribute('d', newPathData);
    });
  }

  getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY
    };
  }

  createSmoothPath(points) {
    if (points.length === 0) return '';
    
    return points.reduce((pathData, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      
      const previousPoint = points[index - 1];
      const midX = (previousPoint.x + point.x) / 2;
      
      return `${pathData} C ${midX} ${previousPoint.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
    }, '');
  }

  animateProcessPath(path) {
    const pathLength = path.getTotalLength();
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStrokeDash(path, pathLength);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const processSection = document.querySelector('.process');
    if (processSection) {
      observer.observe(processSection);
    }
  }

  animateStrokeDash(path, pathLength) {
    const startTime = performance.now();
    const duration = ANIMATION_DURATION.TIMELINE;
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = EASING.EASE_IN_OUT_CUBIC(progress);
      
      const offset = pathLength * (1 - easedProgress);
      path.style.strokeDashoffset = offset;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Public method to trigger animations programmatically
  triggerCounterAnimation(selector) {
    const element = document.querySelector(selector);
    if (element) {
      this.animateCounter(element);
    }
  }

  // Public method to refresh AOS
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
}

export default AnimationsManager; 