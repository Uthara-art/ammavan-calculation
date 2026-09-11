document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Funny Roast Lines Array
    const ROAST_LINES = [
        "Your salary was discussed more than your happiness.",
        "Dubai cousin detected. Financial damage confirmed.",
        "Emotional damage successfully converted into money.",
        "According to highly questionable science, they owe you money.",
        "Ammavan status: 100% nosey, 0% helpful.",
        "PSC coaching recommendations pending...",
        "Unsolicited life advice processed and billed."
    ];

    // Funny Loading Quotes Array
    const LOADING_QUOTES = [
        "Consulting Gulf Ammavans... ✈️",
        "Evaluating cousin's Dubai salary... 💰",
        "Checking PSC exam cutoffs... 📚",
        "Analyzing unsolicited life advice... 🗣️",
        "Converting emotional damage into Rupees... 💸",
        "Scanning for marriage pressure levels... 💍",
        "Cross-checking house & car ownership... 🏡"
    ];

    // DOM Elements
    const landingHero = document.getElementById('landingHero');
    const inputScreen = document.getElementById('inputScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const resultScreen = document.getElementById('resultScreen');

    const btnBack = document.getElementById('btnBack');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnCalculateAgain = document.getElementById('btnCalculateAgain');
    const interrogationText = document.getElementById('interrogationText');
    const loadingMsg = document.getElementById('loadingMsg');

    // Receipt DOM Elements
    const receiptDate = document.getElementById('receiptDate');
    const receiptViolationsList = document.getElementById('receiptViolationsList');
    const receiptScoreVal = document.getElementById('receiptScoreVal');
    const receiptSeverityTag = document.getElementById('receiptSeverityTag');
    const receiptTotalAmount = document.getElementById('receiptTotalAmount');
    const receiptRoastText = document.getElementById('receiptRoastText');

    let toastTimeout = null;
    let loadingInterval = null;
    let currentScreen = 'landing'; // 'landing' | 'input' | 'loading' | 'result'

    // Multi-screen view transition helper
    function navigateToScreen(targetScreenId) {
        const screens = [
            { id: 'landing', element: landingHero },
            { id: 'input', element: inputScreen },
            { id: 'loading', element: loadingScreen },
            { id: 'result', element: resultScreen }
        ];

        const target = screens.find(s => s.id === targetScreenId);
        if (!target || target.id === currentScreen) return;

        screens.forEach(s => {
            if (s.id === currentScreen && s.element) {
                s.element.classList.remove('active-screen');
                s.element.classList.add('exit-screen');
                s.element.setAttribute('aria-hidden', 'true');
            }
        });

        setTimeout(() => {
            screens.forEach(s => {
                if (s.element) {
                    s.element.classList.remove('exit-screen');
                }
            });

            if (target.element) {
                target.element.classList.add('active-screen');
                target.element.setAttribute('aria-hidden', 'false');
            }

            currentScreen = targetScreenId;

            if (targetScreenId === 'input' && interrogationText) {
                interrogationText.focus();
            }
        }, 180);
    }

    // Landing Screen Tap / Click Event
    if (landingHero) {
        landingHero.addEventListener('click', (e) => {
            createRipple(e.clientX, e.clientY);
            navigateToScreen('input');
        });
    }

    // Back Button from Input to Landing
    if (btnBack) {
        btnBack.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateToScreen('landing');
        });
    }

    // CALCULATE AGAIN Button Handler
    if (btnCalculateAgain) {
        btnCalculateAgain.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);
            navigateToScreen('input');
        });
    }

    // Calculate Button Handler (with Loading Screen Transition)
    if (btnCalculate) {
        btnCalculate.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);

            const inputText = interrogationText ? interrogationText.value : '';
            const result = window.calculateAmmavanPressure(inputText);

            if (result.error) {
                showToast(result.message);
                if (interrogationText) interrogationText.focus();
                return;
            }

            // Start Loading Sequence
            startLoadingSequence(result);
        });
    }

    function startLoadingSequence(result) {
        navigateToScreen('loading');

        let quoteIndex = 0;
        if (loadingMsg) {
            loadingMsg.textContent = LOADING_QUOTES[0];
        }

        if (loadingInterval) clearInterval(loadingInterval);

        loadingInterval = setInterval(() => {
            quoteIndex = (quoteIndex + 1) % LOADING_QUOTES.length;
            if (loadingMsg) {
                loadingMsg.textContent = LOADING_QUOTES[quoteIndex];
            }
        }, 450);

        // After 1.8 seconds delay, transition to Receipt
        setTimeout(() => {
            if (loadingInterval) clearInterval(loadingInterval);
            populateReceipt(result);
            navigateToScreen('result');
        }, 1800);
    }

    // Format Date for Receipt
    function formatReceiptDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
    }

    // Populate Digital Receipt DOM
    function populateReceipt(result) {
        // Date stamp
        if (receiptDate) {
            receiptDate.textContent = formatReceiptDate();
        }

        // Violations list
        if (receiptViolationsList) {
            receiptViolationsList.innerHTML = '';

            // Base Trauma Compensation
            const baseRow = document.createElement('div');
            baseRow.className = 'receipt-item-row';
            baseRow.innerHTML = `
                <span class="receipt-item-name">Base Trauma Compensation</span>
                <span class="receipt-item-dots"></span>
                <span class="receipt-item-amount">₹${result.baseAmount}</span>
            `;
            receiptViolationsList.appendChild(baseRow);

            // Detected Violation Categories
            if (result.detectedCategories && result.detectedCategories.length > 0) {
                result.detectedCategories.forEach(cat => {
                    const row = document.createElement('div');
                    row.className = 'receipt-item-row';
                    row.innerHTML = `
                        <span class="receipt-item-name">${escapeHtml(cat.name)}</span>
                        <span class="receipt-item-dots"></span>
                        <span class="receipt-item-amount">₹${cat.amount}</span>
                    `;
                    receiptViolationsList.appendChild(row);
                });
            }
        }

        // Score & Severity
        if (receiptScoreVal) {
            receiptScoreVal.textContent = `${result.pressureScore} / 100`;
        }

        if (receiptSeverityTag) {
            receiptSeverityTag.textContent = result.severity;
        }

        // Total Amount
        if (receiptTotalAmount) {
            receiptTotalAmount.textContent = `₹${result.totalAmount.toLocaleString('en-IN')}`;
        }

        // Funny Roast Line
        if (receiptRoastText) {
            const randomRoast = ROAST_LINES[Math.floor(Math.random() * ROAST_LINES.length)];
            receiptRoastText.textContent = `"${randomRoast}"`;
        }
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function(m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

    // Global Click Ripple
    function createRipple(x, y) {
        if (!x || !y) return;
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = `${x - 40}px`;
        ripple.style.top = `${y - 40}px`;
        ripple.style.width = '80px';
        ripple.style.height = '80px';

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 700);
    }

    // Toast Message Display
    function showToast(message) {
        let toast = document.querySelector('.tap-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.classList.add('tap-toast');
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Parallax motion effect for floating badges on desktop
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;

        const badges = document.querySelectorAll('.quote-badge');
        badges.forEach((badge, index) => {
            const factor = (index % 3 + 1) * 0.6;
            badge.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });
});
