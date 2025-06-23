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
        console.log("Initializing Auto Loan Calculator v2 with correct business logic...");
        const form = document.getElementById('auto-loan-form-v2');
        const monthlyPaymentResultEl = document.getElementById('monthly-payment-result');
        const amountFinancedResultEl = document.getElementById('amount-financed-result');
        const quoteCarValueEl = document.getElementById('quote-car-value');
        const quoteDownPaymentEl = document.getElementById('quote-down-payment');
        const quoteTermEl = document.getElementById('quote-term');
        const initiateWhatsAppBtn = document.getElementById('initiate-whatsapp-btn');

        if (!form || !monthlyPaymentResultEl || !amountFinancedResultEl) return;

        // --- Financial Constants from Webflow ---
        const IVA = 0.16;
        const GPS_RENT = 400;
        const COMMISSION_RATE = 0.03; // 3%
        const ANNUAL_INTEREST_RATE = 0.45 * (1 + IVA); // This equals 0.522 or 52.2%
        const MONTHLY_INTEREST_RATE = ANNUAL_INTEREST_RATE / 12;

        // --- DOM Elements ---
        const calculatorCard = document.querySelector('.calculator-card');
        const carValueSlider = document.getElementById('car-value-slider-v2');
        const carValueDisplay = document.getElementById('car-value-display-v2');
        const downPaymentInput = document.getElementById('down-payment-v2');
        const termButtons = document.querySelectorAll('.term-buttons-v2 .term-button');
        
        const check1 = document.getElementById('check-step-1');
        const check2 = document.getElementById('check-step-2');
        const check3 = document.getElementById('check-step-3');

        const flipBackButton = document.getElementById('flip-back-btn');

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
        };

        const animateCountUp = (element, endValue) => {
            let startValue = parseFloat(element.dataset.value) || 0;
            const duration = 1500;
            const startTime = performance.now();
            const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

            const frame = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutExpo(progress);
                
                const currentValue = startValue + (easedProgress * (endValue - startValue));
                element.textContent = formatCurrency(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                     element.textContent = formatCurrency(endValue);
                     element.dataset.value = endValue;
                }
            };
            requestAnimationFrame(frame);
        };
        
        const updateSliderBackground = () => {
            const min = carValueSlider.min;
            const max = carValueSlider.max;
            const val = carValueSlider.value;
            const percentage = ((val - min) / (max - min)) * 100;
            carValueSlider.style.background = `linear-gradient(90deg, #00bfae ${percentage}%, #e0f7fa ${percentage}%)`;
        };

        const updateDisplay = () => {
            const value = parseFloat(carValueSlider.value);
            carValueDisplay.textContent = formatCurrency(value).replace('.00', '');

            const minDownPayment = value * 0.30;
            downPaymentInput.placeholder = `Mín: ${formatCurrency(minDownPayment).replace('.00','')}`;
            downPaymentInput.min = minDownPayment;

            updateSliderBackground();
            check1.classList.add('visible');
        };

        carValueSlider.addEventListener('input', updateDisplay);

        downPaymentInput.addEventListener('input', () => {
            if(downPaymentInput.value) {
                check2.classList.add('visible');
            } else {
                check2.classList.remove('visible');
            }
        });

        termButtons.forEach(button => {
            button.addEventListener('click', () => {
                termButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                check3.classList.add('visible');
            });
        });

        carValueDisplay.addEventListener('click', () => {
            const currentValue = parseFloat(carValueSlider.value);
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'value-display';
            input.value = currentValue;
            
            carValueDisplay.replaceWith(input);
            input.focus();

            const handleInputBlur = () => {
                let newValue = parseFloat(input.value);
                if (isNaN(newValue) || newValue < carValueSlider.min) newValue = carValueSlider.min;
                if (newValue > carValueSlider.max) newValue = carValueSlider.max;
                
                carValueSlider.value = newValue;
                input.replaceWith(carValueDisplay);
                updateDisplay();
            };

            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const carValue = parseFloat(carValueSlider.value);
            const downPayment = parseFloat(downPaymentInput.value);
            const term = parseInt(document.querySelector('.term-buttons-v2 .term-button.active').dataset.term);
            
            const minDownPayment = carValue * 0.30;
            if (isNaN(downPayment) || downPayment < minDownPayment) {
                alert(`El enganche debe ser de al menos el 30% (${formatCurrency(minDownPayment)}).`);
                return;
            }

            const loanAmount = carValue - downPayment;
            const creditWithCommission = loanAmount / (1 - COMMISSION_RATE);
            
            const pmt = (creditWithCommission * MONTHLY_INTEREST_RATE) / (1 - Math.pow(1 + MONTHLY_INTEREST_RATE, -term));
            const monthlyPayment = pmt + GPS_RENT;

            if(isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
                alert("Por favor, verifica los datos ingresados. No se pudo calcular la mensualidad.");
                return;
            }

            calculatorCard.classList.add('is-flipped');
            
            amountFinancedResultEl.textContent = formatCurrency(creditWithCommission);
            amountFinancedResultEl.dataset.value = creditWithCommission;

            quoteCarValueEl.textContent = formatCurrency(carValue);
            quoteDownPaymentEl.textContent = formatCurrency(downPayment);
            quoteTermEl.textContent = `${term} meses`;

            animateCountUp(monthlyPaymentResultEl, monthlyPayment);
        });

        flipBackButton.addEventListener('click', () => {
            calculatorCard.classList.remove('is-flipped');
        });
        
        // Event listener for the new WhatsApp button
        if(initiateWhatsAppBtn) {
            initiateWhatsAppBtn.addEventListener('click', () => {
                const carValueText = quoteCarValueEl.textContent;
                const downPaymentText = quoteDownPaymentEl.textContent;
                const termText = quoteTermEl.textContent;
                const monthlyPaymentText = monthlyPaymentResultEl.textContent;
                const amountFinancedText = amountFinancedResultEl.textContent;

                const message = `Hola, me gustaría iniciar mi solicitud de crédito automotriz con los siguientes datos de mi simulación:
- Valor del Auto: ${carValueText}
- Enganche Inicial: ${downPaymentText}
- Monto a Financiar: ${amountFinancedText}
- Plazo: ${termText}
- Pago Mensual Estimado: ${monthlyPaymentText}
Gracias.`;
                
                const whatsappNumber = "528123212045";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                window.open(whatsappUrl, '_blank');
            });
        }

        // Manual input toggle logic
        const toggleInput = (span, input, onSave) => {
            // ... existing code ...
        };

        // Initial setup
        updateDisplay();
    }

    function initCarAnimation() {
        const container = document.getElementById('car-svg-container');
        if (!container) return;

        // SVG path for a modern-looking car.
        const svgContent = `
        <svg viewBox="0 0 500 200">
            <path d="M10,150 Q20,100 70,100 L150,100 Q160,80 180,80 L320,80 Q340,80 350,100 L430,100 Q480,100 490,150 L10,150 Z"></path>
            <path d="M150,100 L180,80"></path>
            <path d="M320,80 L350,100"></path>
            <path d="M70,100 Q60,130 70,150"></path>
            <path d="M430,100 Q440,130 430,150"></path>
            <circle cx="100" cy="150" r="20"></circle>
            <circle cx="400" cy="150" r="20"></circle>
        </svg>`;
        container.innerHTML = svgContent;

        anime({
            targets: '#car-svg-container svg path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2500,
            delay: function(el, i) { return i * 250 },
            direction: 'forward'
        });
    }

    // Main execution
    document.addEventListener('DOMContentLoaded', () => {
        initHeader();
        initFaq();
        initProcessAnimation();
        initMobileMenu();
        initROICalculator();
        initProcessTabs();
        if (document.getElementById('auto-loan-form-v2')) {
            initAutoLoanCalculator();
        } else {
            // Fallback for old form if it exists, otherwise do nothing
            const oldForm = document.getElementById('auto-loan-form');
            if(oldForm) {
                oldForm.style.display = 'none'; // Hide old form to prevent conflicts
            }
        }
        initCarAnimation();
    });

})();
