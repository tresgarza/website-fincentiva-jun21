/**
 * Main Application Entry Point
 * Modern ES6 Module Architecture following Airbnb Style Guide
 */

import HeaderManager from './modules/header.js';
import FAQManager from './modules/faq.js';
import AnimationsManager from './modules/animations.js';
import HeroManager from './modules/hero.js';
import ValuePropositionManager from './modules/value-proposition.js?v=2025';
import SimpleProcessManager from './modules/simple-process.js';

// Application Configuration
const APP_CONFIG = {
  debug: false,
  modules: {
    header: true,
    faq: true,
    animations: true,
    hero: true,
    valueProposition: true,
    simpleProcess: true
  }
};

class FinanceiraIncentiva {
  constructor(config = APP_CONFIG) {
    this.config = { ...APP_CONFIG, ...config };
    this.modules = new Map();
    this.isInitialized = false;
    
    this.init();
  }

  async init() {
    if (this.isInitialized) return;

    try {
      await this.waitForDOM();
      this.initializeModules();
      this.setupGlobalEventListeners();
      this.isInitialized = true;
      
      if (this.config.debug) {
        console.log('✅ Financiera Incentiva app initialized successfully');
        console.log('📦 Loaded modules:', Array.from(this.modules.keys()));
      }
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  initializeModules() {
    const moduleMap = {
      header: () => new HeaderManager(),
      hero: () => new HeroManager(),
      valueProposition: () => new ValuePropositionManager(),
      simpleProcess: () => new SimpleProcessManager(),
      faq: () => new FAQManager(),
      animations: () => new AnimationsManager()
    };

    Object.entries(moduleMap).forEach(([moduleName, moduleFactory]) => {
      if (this.config.modules[moduleName]) {
        try {
          const moduleInstance = moduleFactory();
          this.modules.set(moduleName, moduleInstance);
          
          if (this.config.debug) {
            console.log(`✅ Module '${moduleName}' loaded successfully`);
          }
        } catch (error) {
          console.error(`❌ Failed to load module '${moduleName}':`, error);
        }
      }
    });
  }

  setupGlobalEventListeners() {
    // Handle smooth scrolling for anchor links
    this.setupSmoothScrolling();
    
    // Handle WhatsApp integration
    this.setupWhatsAppIntegration();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  setupSmoothScrolling() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#') return;

      event.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  setupWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.openWhatsApp(button.dataset.whatsapp);
      });
    });
  }

  openWhatsApp(message = '') {
    const phoneNumber = '5215555555555'; // Replace with actual phone number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  }

  setupPerformanceMonitoring() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          
          if (this.config.debug && navigation) {
            console.log('🔍 Performance Metrics:');
            console.log(`⏱️ DOM Content Loaded: ${Math.round(navigation.domContentLoadedEventEnd)}ms`);
            console.log(`🎨 Load Complete: ${Math.round(navigation.loadEventEnd)}ms`);
          }
        }, 1000);
      });
    }
  }

  // Public API methods
  getModule(moduleName) {
    return this.modules.get(moduleName);
  }

  getAllModules() {
    return Array.from(this.modules.keys());
  }

  isModuleLoaded(moduleName) {
    return this.modules.has(moduleName);
  }

  // Refresh animations (useful for dynamic content)
  refreshAnimations() {
    const animationsModule = this.getModule('animations');
    if (animationsModule) {
      animationsModule.refreshAOS();
    }
  }

  // Global error handler
  handleError(error, context = 'Unknown') {
    console.error(`🚨 Error in ${context}:`, error);
    
    // In production, you might want to send this to an error tracking service
    if (this.config.debug) {
      console.trace();
    }
  }
}

// Initialize the application
const app = new FinanceiraIncentiva({
  debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
});

// Make app globally accessible for debugging
if (app.config.debug) {
  window.FinanceiraApp = app;
}

// Export for potential use in other scripts
export default app; 