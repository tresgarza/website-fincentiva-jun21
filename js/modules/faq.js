/**
 * FAQ Module - Interactive Accordion Implementation
 * Following Clean Code JavaScript principles
 */

class FAQManager {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.faqTabs = document.querySelectorAll('.faq-tab');
    this.faqPanels = document.querySelectorAll('.faq-panel');
    
    this.init();
  }

  init() {
    this.setupFAQItems();
    this.setupFAQTabs();
  }

  setupFAQItems() {
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        this.handleFAQItemClick(item);
      });
    });
  }

  setupFAQTabs() {
    this.faqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.handleTabClick(tab);
      });
    });
  }

  handleFAQItemClick(clickedItem) {
    const isActive = clickedItem.classList.contains('active');
    
    // Close all FAQ items
    this.closeAllFAQItems();
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      this.openFAQItem(clickedItem);
    }
  }

  handleTabClick(clickedTab) {
    const tabId = clickedTab.dataset.tab;
    if (!tabId) return;

    this.setActiveTab(clickedTab);
    this.showPanel(tabId);
  }

  closeAllFAQItems() {
    this.faqItems.forEach(item => {
      item.classList.remove('active');
    });
  }

  openFAQItem(item) {
    item.classList.add('active');
  }

  setActiveTab(activeTab) {
    this.faqTabs.forEach(tab => {
      tab.classList.remove('active');
    });
    activeTab.classList.add('active');
  }

  showPanel(panelId) {
    // Hide all panels
    this.faqPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // Show target panel
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  // Public method to programmatically open an FAQ item
  openFAQByIndex(index) {
    if (index >= 0 && index < this.faqItems.length) {
      this.handleFAQItemClick(this.faqItems[index]);
    }
  }

  // Public method to switch to a specific tab
  switchToTab(tabId) {
    const targetTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (targetTab) {
      this.handleTabClick(targetTab);
    }
  }
}

export default FAQManager; 