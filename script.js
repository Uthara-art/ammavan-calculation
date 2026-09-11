document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const landingHero = document.getElementById('landingHero');
    const inputScreen = document.getElementById('inputScreen');
    const btnBack = document.getElementById('btnBack');
    const btnCalculate = document.getElementById('btnCalculate');
    const interrogationText = document.getElementById('interrogationText');

    let toastTimeout = null;
    let currentScreen = 'landing'; // 'landing' | 'input'

    // Transition from Landing to Input Screen
    function showInputScreen() {
        if (currentScreen === 'input') return;
        currentScreen = 'input';

        landingHero.classList.remove('active-screen');
        landingHero.classList.add('exit-screen');
        landingHero.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            inputScreen.classList.remove('exit-screen');
            inputScreen.classList.add('active-screen');
            inputScreen.setAttribute('aria-hidden', 'false');
            
            // Focus textarea after transition
            if (interrogationText) {
                interrogationText.focus();
            }
        }, 150);
    }

    // Transition back to Landing Screen
    function showLandingScreen() {
        if (currentScreen === 'landing') return;
        currentScreen = 'landing';

        inputScreen.classList.remove('active-screen');
        inputScreen.classList.add('exit-screen');
        inputScreen.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            landingHero.classList.remove('exit-screen');
            landingHero.classList.add('active-screen');
            landingHero.setAttribute('aria-hidden', 'false');
        }, 150);
    }

    // Landing Screen Tap / Click Event
    if (landingHero) {
        landingHero.addEventListener('click', (e) => {
            createRipple(e.clientX, e.clientY);
            showInputScreen();
        });
    }

    // Back Button Click Event
    if (btnBack) {
        btnBack.addEventListener('click', (e) => {
            e.stopPropagation();
            showLandingScreen();
        });
    }

    // Calculate Button Click Event
    if (btnCalculate) {
        btnCalculate.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);
            showToast("Calculation engine coming soon... 👀");
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
