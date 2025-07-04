/**
 * FAQ Module - Interactive Accordion Implementation
 * Following Clean Code JavaScript principles
 */

/**
 * FAQManager
 * Gestiona la interactividad de la sección de Preguntas Frecuentes,
 * incluyendo el cambio de pestañas y el comportamiento del acordeón.
 */
class FAQManager {
  constructor() {
    this.faqContainer = document.querySelector('.faq-container');
    if (!this.faqContainer) return;

    this.tabs = this.faqContainer.querySelectorAll('.faq-tab');
    this.panels = this.faqContainer.querySelectorAll('.faq-panel');
    this.questions = this.faqContainer.querySelectorAll('.faq-question');

    this.assignAccessibilityAttributes();
    this.initTabs();
    this.initAccordion();
  }

  /* -------------------------- Tabs logic -------------------------- */
  initTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.activateTab(tab));
    });
  }

  activateTab(clickedTab) {
    // Deactivate all
    this.tabs.forEach((tab) => tab.classList.remove('active'));
    this.panels.forEach((panel) => panel.classList.remove('active'));

    // Activate selected
    clickedTab.classList.add('active');
    const targetPanel = this.faqContainer.querySelector(`#${clickedTab.dataset.tab}`);
    if (targetPanel) targetPanel.classList.add('active');
  }

  /* ----------------------- Accordion logic ----------------------- */
  initAccordion() {
    this.questions.forEach((question) => {
      question.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const item = btn.parentElement;
        const answer = btn.nextElementSibling;

        if (!answer) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          this.closeItem(item, btn, answer);
        } else {
          // Close any other open item in this panel first
          this.closeAllItems(item.parentElement);
          this.openItem(item, btn, answer);
        }
      });
    });
  }

  openItem(item, btn, answer) {
    item.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    answer.removeAttribute('hidden');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }

  closeItem(item, btn, answer) {
    item.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    answer.setAttribute('hidden', '');
    answer.style.maxHeight = null;
  }

  closeAllItems(panel) {
    const items = panel.querySelectorAll('.faq-item.active');
    items.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (btn && answer) this.closeItem(item, btn, answer);
    });
  }

  /* -------------- Accessibility attribute assignment ------------- */
  assignAccessibilityAttributes() {
    this.questions.forEach((btn, index) => {
      const answer = btn.nextElementSibling;
      if (!answer) return;

      // Unique IDs for association
      const btnId = `faq-question-${index + 1}`;
      const answerId = `faq-answer-${index + 1}`;

      btn.setAttribute('id', btnId);
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', answerId);

      answer.setAttribute('id', answerId);
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', btnId);
      answer.setAttribute('hidden', '');
    });
  }
}

export default FAQManager; 