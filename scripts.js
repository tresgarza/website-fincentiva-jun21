// FinWise Bank Clone - Main JavaScript

(function() {
    'use strict';

    function initHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.intersectionRatio < 1) {
                    header.classList.remove('transparent');
                } else {
                    header.classList.add('transparent');
                }
            },
            { threshold: [1] }
        );

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        } else {
            header.classList.remove('transparent');
        }
    }

    function initFaq() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        const faqTabs = document.querySelectorAll('.faq-tab');
        const faqPanels = document.querySelectorAll('.faq-panel');
        faqTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;

                faqTabs.forEach(t => t.classList.remove('active'));
                faqPanels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    function initProcessAnimation() {
        const path = document.querySelector('.process-connector path');
        if (!path) return;

        const steps = document.querySelectorAll('.process-step');
        let points = [];

        function getCenter(el) {
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 + window.scrollX,
                y: rect.top + rect.height / 2 + window.scrollY,
            };
        }

        function drawPath() {
            points = [];
            steps.forEach(step => {
                points.push(getCenter(step));
            });

            const pathData = points.reduce((acc, point, i) => {
                if (i === 0) return `M ${point.x} ${point.y}`;
                const prevPoint = points[i - 1];
                const midX = (prevPoint.x + point.x) / 2;
                return `${acc} C ${midX} ${prevPoint.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
            }, '');

            path.setAttribute('d', pathData);
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        }
        
        drawPath();
        window.addEventListener('resize', drawPath);

        anime({
            targets: '.process-connector path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 5000,
            delay: 500,
            scrollTrigger: {
                trigger: '.process',
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
        });
    }

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNavPanel = document.getElementById('mobile-nav-panel');

        if (mobileMenuBtn && mobileNavPanel) {
            mobileMenuBtn.addEventListener('click', () => {
                document.body.classList.toggle('no-scroll');
                mobileNavPanel.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('no-scroll');
                mobileNavPanel.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    function initROICalculator() {
        const employeeSlider = document.getElementById('employee-slider');
        const productivitySlider = document.getElementById('productivity-slider');
        const employeeValue = document.getElementById('employee-value');
        const productivityValue = document.getElementById('productivity-value');
        const roiValue = document.getElementById('roi-value');

        function calculateROI() {
            if (!employeeSlider || !productivitySlider) return;

            const employees = parseInt(employeeSlider.value);
            const productivity = parseInt(productivitySlider.value);
            const baseSalaryFactor = 15000;
            const estimatedROI = employees * (productivity / 100) * baseSalaryFactor;

            if(employeeValue) employeeValue.textContent = employees.toLocaleString('es-MX');
            if(productivityValue) productivityValue.textContent = `${productivity}`;
            if(roiValue) roiValue.textContent = `$${estimatedROI.toLocaleString('es-MX')} MXN`;
        }

        if (employeeSlider && productivitySlider) {
            employeeSlider.addEventListener('input', calculateROI);
            productivitySlider.addEventListener('input', calculateROI);
            calculateROI();
        }
    }

    function initProcessTabs() {
        const tabContainer = document.querySelector('.process-tabs-container');
        if (!tabContainer) return;

        const tabLinks = tabContainer.querySelectorAll('.tab-link');
        const tabContents = tabContainer.querySelectorAll('.tab-content');
        let currentTabIndex = 0;
        let tabInterval;

        function showTab(index) {
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tabLinks[index].classList.add('active');
            tabContents[index].classList.add('active');
            currentTabIndex = index;
        }

        function startTabLoop() {
            clearInterval(tabInterval); 
            tabInterval = setInterval(() => {
                let nextIndex = (currentTabIndex + 1) % tabLinks.length;
                showTab(nextIndex);
            }, 8500);
        }
        
        function stopTabLoop() {
            clearInterval(tabInterval);
        }

        tabLinks.forEach((link, index) => {
            link.addEventListener('click', () => {
                showTab(index);
                stopTabLoop();
                // Optional: Restart loop after a period of inactivity
                // setTimeout(startTabLoop, 15000); 
            });
        });
        
        showTab(0); // Show first tab initially
        startTabLoop(); // Start the loop
    }

    // Main execution
    document.addEventListener('DOMContentLoaded', () => {
        initHeader();
        initFaq();
        initProcessAnimation();
        initMobileMenu();
        initROICalculator();
        initProcessTabs();
    });

})();
