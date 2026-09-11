document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // DOM Elements
    const landingHero = document.getElementById('landingHero');
    const inputScreen = document.getElementById('inputScreen');
    const resultScreen = document.getElementById('resultScreen');

    const btnBack = document.getElementById('btnBack');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnResultBack = document.getElementById('btnResultBack');
    const btnRecalculate = document.getElementById('btnRecalculate');
    const interrogationText = document.getElementById('interrogationText');

    // Result DOM Elements
    const resTotalAmount = document.getElementById('resTotalAmount');
    const resScoreText = document.getElementById('resScoreText');
    const resScoreFill = document.getElementById('resScoreFill');
    const resSeverity = document.getElementById('resSeverity');
    const resCategoryList = document.getElementById('resCategoryList');

    let toastTimeout = null;
    let currentScreen = 'landing'; // 'landing' | 'input' | 'result'

    // Multi-screen view transition helper
    function navigateToScreen(targetScreenId) {
        const screens = [
            { id: 'landing', element: landingHero },
            { id: 'input', element: inputScreen },
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

    // Back / Recalculate Buttons from Result to Input
    if (btnResultBack) {
        btnResultBack.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateToScreen('input');
        });
    }

    if (btnRecalculate) {
        btnRecalculate.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);
            navigateToScreen('input');
        });
    }

    // Calculate Button Handler
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

            // Populate Result Screen Data
            populateResultCard(result);

            // Transition to Result Screen
            navigateToScreen('result');
        });
    }

    // Populate Result Card DOM
    function populateResultCard(result) {
        if (resTotalAmount) {
            resTotalAmount.textContent = result.totalAmount.toLocaleString('en-IN');
        }

        if (resScoreText) {
            resScoreText.textContent = `${result.pressureScore}/100`;
        }

        if (resScoreFill) {
            resScoreFill.style.width = `${Math.max(5, result.pressureScore)}%`;
        }

        if (resSeverity) {
            resSeverity.textContent = result.severity;
        }

        if (resCategoryList) {
            resCategoryList.innerHTML = '';

            // Always show Base Compensation first
            const baseLi = document.createElement('li');
            baseLi.className = 'category-item base-item';
            baseLi.innerHTML = `
                <span class="cat-name">Base Trauma Compensation</span>
                <span class="cat-amount">+₹${result.baseAmount}</span>
            `;
            resCategoryList.appendChild(baseLi);

            // Show detected categories
            if (result.detectedCategories.length > 0) {
                result.detectedCategories.forEach(cat => {
                    const li = document.createElement('li');
                    li.className = 'category-item';
                    li.innerHTML = `
                        <span class="cat-name">${escapeHtml(cat.name)}</span>
                        <span class="cat-amount">+₹${cat.amount}</span>
                    `;
                    resCategoryList.appendChild(li);
                });
            } else {
                const noMatchLi = document.createElement('li');
                noMatchLi.className = 'category-item base-item';
                noMatchLi.innerHTML = `
                    <span class="cat-name">No major toxic keywords detected</span>
                    <span class="cat-amount">+₹0</span>
                `;
                resCategoryList.appendChild(noMatchLi);
            }
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
