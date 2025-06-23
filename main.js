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
        if (!tabContainer) {
            return;
        }

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

    function initAutoLoanCalculator() {
        const form = document.getElementById('auto-loan-form');
        if (!form) return;

        console.log('Initializing Auto Loan Calculator...');

        // --- DOM Elements ---
        const carValueSlider = document.getElementById('car-value-slider');
        const carValueDisplay = document.getElementById('car-value-display');
        const termButtons = document.querySelectorAll('.term-button');
        const downPaymentInput = document.getElementById('down-payment');
        const quoteResultsContainer = document.querySelector('.quote-results');
        const infoContentContainer = document.querySelector('.info-content');
        const submitButton = form.querySelector('button[type="submit"]');

        // --- Financial Constants ---
        const IVA = 0.16;
        const GPS_RENT = 400;
        const COMMISSION_RATE = 0.03;
        const ANNUAL_INTEREST_RATE = 0.45 * (1 + IVA);
        const MONTHLY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 12;

        let termMonths = 6; // Default term

        // --- Helper Functions ---
        const formatCurrency = (value) => {
            return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        const calculateMonthlyPayment = (creditAmount, term) => {
            if (term <= 0) return 0;
            const monthlyPayment = (creditAmount * MONTHLY_INTEREST_RATE) / (1 - Math.pow(1 + MONTHLY_INTEREST_RATE, -term));
            return monthlyPayment + GPS_RENT;
        };
        
        const updateSliderGradient = () => {
            const min = parseFloat(carValueSlider.min);
            const max = parseFloat(carValueSlider.max);
            const value = parseFloat(carValueSlider.value);
            const percentage = ((value - min) / (max - min)) * 100;
            carValueSlider.style.backgroundSize = `${percentage}% 100%`;
        };
        
        // --- Main Update Function ---
        const updateCalculation = () => {
            const carPrice = parseFloat(carValueSlider.value);
            const minDownPayment = carPrice * 0.3;

            carValueDisplay.textContent = formatCurrency(carPrice).split('.')[0] + ' MXN';
            downPaymentInput.placeholder = `Mín: ${formatCurrency(minDownPayment).split('.')[0]}`;
            downPaymentInput.min = minDownPayment;
            downPaymentInput.max = carPrice;
            
            updateSliderGradient();
        };
        
        // --- Event Listeners ---
        carValueSlider.addEventListener('input', updateCalculation);

        termButtons.forEach(button => {
            button.addEventListener('click', () => {
                termButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                termMonths = parseInt(button.dataset.term);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');

            const carPrice = parseFloat(carValueSlider.value);
            const downPayment = parseFloat(downPaymentInput.value) || (carPrice * 0.3);
            const loanAmount = carPrice - downPayment;
            const creditWithCommission = loanAmount / (1 - COMMISSION_RATE);
            const monthlyPayment = calculateMonthlyPayment(creditWithCommission, termMonths);

            // Create and display quote
            quoteResultsContainer.innerHTML = `
                <h2>¡Tu cotización está lista! 🎉</h2>
                <div class="quote-item">
                    <span class="quote-item-label">Valor del auto:</span>
                    <span class="quote-item-value">${formatCurrency(carPrice)}</span>
                </div>
                <div class="quote-item">
                    <span class="quote-item-label">Enganche inicial:</span>
                    <span class="quote-item-value">${formatCurrency(downPayment)}</span>
                </div>
                <div class="quote-item">
                    <span class="quote-item-label">Monto financiado:</span>
                    <span class="quote-item-value">${formatCurrency(loanAmount)}</span>
                </div>
                <div class="quote-item">
                    <span class="quote-item-label">Plazo del crédito:</span>
                    <span class="quote-item-value">${termMonths} meses</span>
                </div>
                <div class="quote-total">
                    <span class="quote-item-label">Pago mensual total:</span>
                    <span class="quote-item-value">${formatCurrency(monthlyPayment)}</span>
                </div>
                 <p style="font-size: 0.8rem; text-align: center; margin-top: 15px;">Un asesor se pondrá en contacto contigo para brindarte toda la información sobre tu crédito.</p>
            `;
            
            infoContentContainer.style.display = 'none';
            quoteResultsContainer.style.display = 'block';

            submitButton.textContent = 'Actualizar Cotización';
            submitButton.classList.add('secondary');
        });

        // --- Initial Run ---
        updateCalculation();
    }

    // Main execution
    document.addEventListener('DOMContentLoaded', () => {
        initHeader();
        initFaq();
        initProcessAnimation();
        initMobileMenu();
        initROICalculator();
        initProcessTabs();
        initAutoLoanCalculator();
    });

})();
