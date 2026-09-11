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

    // Specific Rotating Funny Loading Quotes
    const LOADING_QUOTES = [
        "Printing your emotional damage... 🧾😂",
        "Detecting Ammavan interference...",
        "Calculating emotional damage...",
        "Comparing you with Dubai cousins...",
        "Estimating unsolicited advice...",
        "Counting your suffering..."
    ];

    // AI Family Analysis Category Messages Map
    const AI_ANALYSIS_MESSAGES = {
        salary: "ശമ്പളം ചോദ്യം ചെയ്യൽ detected. Your salary has officially become public property. 💸",
        nri_cousin: "Dubai cousin comparison detected. ദുബായിലെ ചേട്ടൻ/ചേച്ചി വീണ്ടും ജയിച്ചു. 😂",
        marriage: "കല്യാണം pressure detected. Apparently your marital status is a family emergency. 💍",
        career: "ജോലി അന്വേഷണമെത്തി. Your career has been reviewed by people who don't work there. 😭",
        comparison: "താരതമ്യം തുടങ്ങി. ആരുടെയോ മകൻ വീണ്ടും നിങ്ങളെക്കാൾ മുന്നിലാണ്. 😂",
        advice: "ഉപദേശം detected. You received advice you never asked for. 🙏"
    };

    // Bilingual Final Verdict Quotes Array
    const AI_VERDICTS = [
        "വിധി: Ammavan owes you emotional compensation. 😂",
        "വിധി: നിങ്ങൾ രക്ഷപ്പെട്ടു. കഷ്ടിച്ച്. 😭",
        "Verdict: കൈനീട്ടം വാങ്ങാതെ ഇനി വീട്ടിൽ പോകരുത്. 💸",
        "വിധി: ഈ കുടുംബയോഗത്തിന് compensation ആവശ്യമാണ്. 😂",
        "Verdict: Emotional damage confirmed. 😌"
    ];

    // DOM Elements
    const landingHero = document.getElementById('landingHero');
    const inputScreen = document.getElementById('inputScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const resultScreen = document.getElementById('resultScreen');

    const btnBack = document.getElementById('btnBack');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnDownloadBill = document.getElementById('btnDownloadBill');
    const btnShareBill = document.getElementById('btnShareBill');
    const btnCalculateAgain = document.getElementById('btnCalculateAgain');
    const interrogationText = document.getElementById('interrogationText');
    const loadingMsg = document.getElementById('loadingMsg');

    // Receipt DOM Elements
    const receiptDate = document.getElementById('receiptDate');
    const receiptViolationsList = document.getElementById('receiptViolationsList');
    const receiptScoreVal = document.getElementById('receiptScoreVal');
    const receiptMeterLabel = document.getElementById('receiptMeterLabel');
    const receiptMeterFill = document.getElementById('receiptMeterFill');
    const receiptSeverityTag = document.getElementById('receiptSeverityTag');
    const receiptTotalAmount = document.getElementById('receiptTotalAmount');
    const receiptAiAnalysisList = document.getElementById('receiptAiAnalysisList');
    const receiptAiVerdict = document.getElementById('receiptAiVerdict');
    const receiptRoastText = document.getElementById('receiptRoastText');

    let toastTimeout = null;
    let loadingInterval = null;
    let currentScreen = 'landing'; // 'landing' | 'input' | 'loading' | 'result'
    let lastCalculatedResult = null;

    // Meter Label Mapping Helper
    function getMeterLabel(score) {
        if (score <= 20) return "Peaceful Family Visit 😌";
        if (score <= 40) return "Ammavan Warming Up 👀";
        if (score <= 60) return "Pressure Building 😰";
        if (score <= 80) return "Escape Recommended 🚨";
        return "RUN. MAXIMUM DAMAGE 💀";
    }

    // =================================================== */
    // WEB AUDIO API PAPER-BILL PRINTER & TEAR SYNTHESIZER */
    // =================================================== */
    function playReceiptPrinterSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            // Resume audio context if suspended
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const now = ctx.currentTime;

            // Master Gain (Subtle & clear volume)
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.25, now);
            masterGain.connect(ctx.destination);

            // Phase 1: Mechanical Typing / Motor Pulses (0.0s - 0.8s)
            const pulseCount = 10;
            for (let i = 0; i < pulseCount; i++) {
                const time = now + (i * 0.075);
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = i % 2 === 0 ? 'square' : 'triangle';
                osc.frequency.setValueAtTime(160 + (i % 3) * 50, time);

                gain.gain.setValueAtTime(0.18, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

                osc.connect(gain);
                gain.connect(masterGain);

                osc.start(time);
                osc.stop(time + 0.045);
            }

            // Phase 2: Paper-Printing Motor Feed Clicks (0.8s - 1.5s)
            const noiseBufferSize = Math.floor(ctx.sampleRate * 0.7);
            const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseBufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const motorFilter = ctx.createBiquadFilter();
            motorFilter.type = 'bandpass';
            motorFilter.frequency.setValueAtTime(1100, now + 0.8);
            motorFilter.Q.setValueAtTime(3.5, now + 0.8);

            const motorGain = ctx.createGain();
            motorGain.gain.setValueAtTime(0, now + 0.8);

            const feedCount = 14;
            for (let i = 0; i < feedCount; i++) {
                const time = now + 0.8 + (i * 0.048);
                motorGain.gain.setValueAtTime(0.22, time);
                motorGain.gain.exponentialRampToValueAtTime(0.005, time + 0.03);
            }

            const noiseNode = ctx.createBufferSource();
            noiseNode.buffer = noiseBuffer;
            noiseNode.connect(motorFilter);
            motorFilter.connect(motorGain);
            motorGain.connect(masterGain);

            noiseNode.start(now + 0.8);
            noiseNode.stop(now + 1.5);

            // Phase 3: Paper Tear / Rip Crackle Sound at End (1.5s - 1.95s)
            const ripBufferSize = Math.floor(ctx.sampleRate * 0.45);
            const ripBuffer = ctx.createBuffer(1, ripBufferSize, ctx.sampleRate);
            const ripOutput = ripBuffer.getChannelData(0);
            for (let i = 0; i < ripBufferSize; i++) {
                const crackle = Math.random() > 0.25 ? (Math.random() * 2 - 1) : 0;
                ripOutput[i] = crackle;
            }

            const ripFilter = ctx.createBiquadFilter();
            ripFilter.type = 'highpass';
            ripFilter.frequency.setValueAtTime(1800, now + 1.5);
            ripFilter.frequency.exponentialRampToValueAtTime(700, now + 1.95);

            const ripGain = ctx.createGain();
            ripGain.gain.setValueAtTime(0.3, now + 1.5);
            ripGain.gain.exponentialRampToValueAtTime(0.001, now + 1.95);

            const ripSource = ctx.createBufferSource();
            ripSource.buffer = ripBuffer;
            ripSource.connect(ripFilter);
            ripFilter.connect(ripGain);
            ripGain.connect(masterGain);

            ripSource.start(now + 1.5);
            ripSource.stop(now + 1.95);

        } catch (e) {
            console.warn("Web Audio API unavailable:", e);
        }
    }

    // Multi-screen view transition helper (Clean display flow)
    function navigateToScreen(targetScreenId) {
        const screens = [
            { id: 'landing', element: landingHero },
            { id: 'input', element: inputScreen },
            { id: 'loading', element: loadingScreen },
            { id: 'result', element: resultScreen }
        ];

        const target = screens.find(s => s.id === targetScreenId);
        if (!target) return;

        screens.forEach(s => {
            if (s.element) {
                s.element.classList.remove('active-screen');
                s.element.setAttribute('aria-hidden', 'true');
            }
        });

        if (target.element) {
            target.element.classList.add('active-screen');
            target.element.setAttribute('aria-hidden', 'false');
        }

        currentScreen = targetScreenId;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetScreenId === 'input' && interrogationText) {
            interrogationText.focus();
        }
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

    // Calculate Button Handler (with Sound & Loading Screen Transition)
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

            lastCalculatedResult = result;
            startLoadingSequence(result);
        });
    }

    function startLoadingSequence(result) {
        navigateToScreen('loading');

        // Play Web Audio API receipt printer & tear sound
        playReceiptPrinterSound();

        let quoteIndex = 0;
        if (loadingMsg) {
            loadingMsg.textContent = "Printing your emotional damage... 🧾😂";
        }

        if (loadingInterval) clearInterval(loadingInterval);

        // Cycle through loading messages every 350ms
        loadingInterval = setInterval(() => {
            quoteIndex = (quoteIndex + 1) % LOADING_QUOTES.length;
            if (loadingMsg) {
                loadingMsg.textContent = LOADING_QUOTES[quoteIndex];
            }
        }, 350);

        // After 1.8 seconds delay, reveal the receipt card
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

    // Short Funny Category Labels for Receipt Bill
    const CATEGORY_SHORT_LABELS = {
        salary: "Salary ethra? 💸",
        nri_cousin: "Dubai chettan comparison 🌴",
        marriage: "Kalyanam eppo? 💍",
        career: "Joli enthaayi? 💼",
        comparison: "Avane kandille? 👀",
        advice: "Free advice thudangi 🙏"
    };

    // Populate Digital Receipt DOM
    function populateReceipt(result) {
        if (receiptDate) {
            receiptDate.textContent = formatReceiptDate();
        }

        // Violations list
        if (receiptViolationsList) {
            receiptViolationsList.innerHTML = '';

            const baseRow = document.createElement('div');
            baseRow.className = 'receipt-item-row';
            baseRow.innerHTML = `
                <span class="receipt-item-name">Base Trauma Compensation</span>
                <span class="receipt-item-dots"></span>
                <span class="receipt-item-amount">₹${result.baseAmount}</span>
            `;
            receiptViolationsList.appendChild(baseRow);

            if (result.detectedCategories && result.detectedCategories.length > 0) {
                result.detectedCategories.forEach(cat => {
                    const row = document.createElement('div');
                    row.className = 'receipt-item-row';
                    const shortLabel = CATEGORY_SHORT_LABELS[cat.id] || cat.name;
                    row.innerHTML = `
                        <span class="receipt-item-name">${escapeHtml(shortLabel)}</span>
                        <span class="receipt-item-dots"></span>
                        <span class="receipt-item-amount">₹${cat.amount}</span>
                    `;
                    receiptViolationsList.appendChild(row);
                });
            }
        }

        if (receiptScoreVal) {
            receiptScoreVal.textContent = `${result.pressureScore} / 100`;
        }

        if (receiptMeterLabel) {
            receiptMeterLabel.textContent = getMeterLabel(result.pressureScore);
        }

        if (receiptMeterFill) {
            receiptMeterFill.style.width = '0%';
            setTimeout(() => {
                receiptMeterFill.style.width = `${Math.max(5, result.pressureScore)}%`;
            }, 100);
        }

        if (receiptSeverityTag) {
            receiptSeverityTag.textContent = result.severity;
        }

        if (receiptTotalAmount) {
            receiptTotalAmount.textContent = `₹${result.totalAmount.toLocaleString('en-IN')}`;
        }

        // Populate AI Family Analysis Section
        if (receiptAiAnalysisList) {
            receiptAiAnalysisList.innerHTML = '';

            if (result.detectedCategories && result.detectedCategories.length > 0) {
                result.detectedCategories.forEach(cat => {
                    const msg = AI_ANALYSIS_MESSAGES[cat.id];
                    if (msg) {
                        const div = document.createElement('div');
                        div.className = 'ai-analysis-item';
                        div.textContent = msg;
                        receiptAiAnalysisList.appendChild(div);
                    }
                });
            } else {
                const defaultDiv = document.createElement('div');
                defaultDiv.className = 'ai-analysis-item';
                defaultDiv.textContent = "ശാന്തമായ സംഭാഷണം detected. Minimal relative interference found. 😌";
                receiptAiAnalysisList.appendChild(defaultDiv);
            }
        }

        // Populate Random AI Verdict
        if (receiptAiVerdict) {
            const randomVerdict = AI_VERDICTS[Math.floor(Math.random() * AI_VERDICTS.length)];
            receiptAiVerdict.textContent = randomVerdict;
        }

        // Populate Random Roast
        if (receiptRoastText) {
            const randomRoast = ROAST_LINES[Math.floor(Math.random() * ROAST_LINES.length)];
            receiptRoastText.textContent = `"${randomRoast}"`;
        }
    }

    // Download Bill Handler
    if (btnDownloadBill) {
        btnDownloadBill.addEventListener('click', async (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);
            showToast("Printing your emotional damage bill... 🧾✨");

            const receiptElement = document.getElementById('ammavanReceipt');
            if (!receiptElement || typeof html2canvas === 'undefined') {
                showToast("Unable to generate receipt image. Please try again.");
                return;
            }

            try {
                const canvas = await html2canvas(receiptElement, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#faf8f5',
                    logging: false
                });

                const dataUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = dataUrl;
                downloadLink.download = 'ammavan-calculation-bill.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } catch (error) {
                console.error("Download Error:", error);
                showToast("Download failed. Please take a screenshot!");
            }
        });
    }

    // Share Bill Handler
    if (btnShareBill) {
        btnShareBill.addEventListener('click', async (e) => {
            e.stopPropagation();
            createRipple(e.clientX, e.clientY);
            showToast("Sending your emotional damage... 📤😂");

            const receiptElement = document.getElementById('ammavanReceipt');
            const totalStr = lastCalculatedResult ? lastCalculatedResult.totalAmount.toLocaleString('en-IN') : '5,000';
            const shareText = `My Ammavan Calculation says you owe me ₹${totalStr}. 😂`;

            if (!receiptElement || typeof html2canvas === 'undefined') {
                fallbackShareText(shareText);
                return;
            }

            try {
                const canvas = await html2canvas(receiptElement, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#faf8f5',
                    logging: false
                });

                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        fallbackShareText(shareText);
                        return;
                    }

                    const file = new File([blob], 'ammavan-calculation-bill.png', { type: 'image/png' });
                    const shareData = {
                        title: 'Ammavan Calculation Bill',
                        text: shareText,
                        files: [file]
                    };

                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        try {
                            await navigator.share(shareData);
                        } catch (err) {
                            if (err.name !== 'AbortError') {
                                fallbackShareText(shareText);
                            }
                        }
                    } else if (navigator.share) {
                        try {
                            await navigator.share({
                                title: 'Ammavan Calculation Bill',
                                text: shareText
                            });
                        } catch (err) {
                            if (err.name !== 'AbortError') {
                                fallbackShareText(shareText);
                            }
                        }
                    } else {
                        fallbackShareText(shareText);
                    }
                }, 'image/png');
            } catch (error) {
                console.error("Share Image Generation Error:", error);
                fallbackShareText(shareText);
            }
        });
    }

    // Fallback share text / clipboard copy
    function fallbackShareText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast("Bill text copied to clipboard! Share it in your family WhatsApp group! 📋✨");
            }).catch(() => {
                showToast(text);
            });
        } else {
            showToast(text);
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
        }, 2800);
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
