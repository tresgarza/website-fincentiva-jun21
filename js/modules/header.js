/**
 * Header Module - Modern ES6 Implementation
 * Following Airbnb JavaScript Style Guide and Clean Code principles
 */

class HeaderManager {
  constructor() {
    this.header = document.getElementById('header');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileNavPanel = document.getElementById('mobile-nav-panel');
    this.searchBtn = document.getElementById('search-btn');
    
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.setupHeaderTransparency();
    this.setupMobileMenu();
    this.setupSearchButton();
    
    this.isInitialized = true;
  }

  setupHeaderTransparency() {
    if (!this.header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 1) {
          this.header.classList.remove('transparent');
        } else {
          this.header.classList.add('transparent');
        }
      },
      { threshold: [1] }
    );

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      observer.observe(heroSection);
    } else {
      this.header.classList.remove('transparent');
    }
  }

  setupMobileMenu() {
    if (!this.mobileMenuBtn || !this.mobileNavPanel) return;

    this.mobileMenuBtn.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!this.mobileNavPanel.contains(event.target) && 
          !this.mobileMenuBtn.contains(event.target) &&
          this.mobileNavPanel.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  setupSearchButton() {
    if (!this.searchBtn) return;

    this.searchBtn.addEventListener('click', () => {
      this.handleSearch();
    });
  }

  toggleMobileMenu() {
    const isActive = this.mobileNavPanel.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    document.body.classList.add('no-scroll');
    this.mobileNavPanel.classList.add('active');
    this.mobileMenuBtn.classList.add('active');
  }

  closeMobileMenu() {
    document.body.classList.remove('no-scroll');
    this.mobileNavPanel.classList.remove('active');
    this.mobileMenuBtn.classList.remove('active');
  }

  handleSearch() {
    // TODO: Implement search functionality
    // This could open a search modal or redirect to a search page
    console.log('Search functionality to be implemented');
  }

  // Public method to update header state
  updateHeaderState(isTransparent) {
    if (!this.header) return;

    if (isTransparent) {
      this.header.classList.add('transparent');
    } else {
      this.header.classList.remove('transparent');
    }
  }
}

export default HeaderManager; 