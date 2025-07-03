/**
 * InteractiveProcessManager
 * Handles the animations for the interactive "How it Works" timeline section.
 * It highlights timeline dots, fills the progress line, and toggles visibility
 * of step content as the user scrolls.
 */
class InteractiveProcessManager {
    constructor() {
        this.wrapper = document.querySelector('.process-wrapper');
        if (!this.wrapper) return;

        this.stepsContent = Array.from(document.querySelectorAll('.process-step-content'));
        this.timelineSteps = Array.from(document.querySelectorAll('.timeline-step'));
        const line = document.querySelector('.timeline-line');
        if (!line) return;

        // Create the fill element once so we can manipulate its height easily.
        this.fill = document.createElement('div');
        this.fill.className = 'timeline-line-fill';
        line.appendChild(this.fill);

        // If mobile, activate all and bail – the timeline is hidden there.
        if (window.matchMedia('(max-width: 768px)').matches) {
            this.stepsContent.forEach(el => el.classList.add('is-active'));
            return;
        }

        this.highestVisited = 0; // Track the furthest step the user has reached
        this.observeSteps();
    }

    observeSteps() {
        const options = {
            root: null,
            // Trigger when ~35% of a card is visible and until 50% leaves the viewport
            rootMargin: '-35% 0px -50% 0px',
            threshold: 0,
        };

        let highestVisibleStep = 0; // Track the furthest step the user has reached

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const stepNum = parseInt(entry.target.id.split('-')[1], 10);
                const dot = document.querySelector(`.timeline-step[data-step="${stepNum}"]`);

                if (entry.isIntersecting) {
                    // Mark current step content & dot as active
                    entry.target.classList.add('is-active');
                    if (dot) dot.classList.add('active');

                    // Persist the highest step reached so far
                    highestVisibleStep = Math.max(highestVisibleStep, stepNum);
                } else {
                    // Fade out content when it leaves but keep dot active for past steps
                    entry.target.classList.remove('is-active');
                    if (dot) {
                        if (stepNum <= highestVisibleStep) {
                            dot.classList.add('active'); // Keep completed steps highlighted
                        } else {
                            dot.classList.remove('active');
                        }
                    }
                }
            });

            // After handling entries, update the progress fill
            this.updateFill(highestVisibleStep);
        }, options);

        // Observe each step content card
        this.stepsContent.forEach(step => io.observe(step));
    }

    updateFill(currentStep = 0) {
        const totalSteps = this.timelineSteps.length;
        if (!this.fill || totalSteps <= 1) return;

        // Calculate progress percentage based on the furthest step reached
        const progressPercent = currentStep > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
        this.fill.style.height = `${progressPercent}%`;
    }
}

export default InteractiveProcessManager; 