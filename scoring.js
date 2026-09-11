/**
 * scoring.js - Ammavan Pressure Detection & Scoring Engine
 * Independent, explainable scoring module with word-boundary matching and Manglish/Malayalam support.
 */

const AMMAVAN_CATEGORIES = [
    {
        id: 'salary',
        name: 'Salary Interrogation',
        amount: 500,
        keywords: [
            'salary', 'income', 'package', 'ctc', 'earn', 'earning', 'earnings', 'monthly salary', 'paycheck',
            'ശമ്പളം', 'salary ethra', 'salary ethraya', 'മാസം എത്ര', 'എത്ര കിട്ടും', 'എത്രയാ ശമ്പളം', 'sambalam'
        ]
    },
    {
        id: 'nri_cousin',
        name: 'NRI / Cousin Comparison',
        amount: 1000,
        keywords: [
            'dubai', 'uae', 'nri', 'abroad', 'gulf', 'cousin', 'cousins',
            'ദുബായ്', 'ഗൾഫ്', 'വിദേശം', 'ഗൾഫിൽ', 'dubaiyil', 'gulfil'
        ]
    },
    {
        id: 'marriage',
        name: 'Marriage Pressure',
        amount: 1500,
        keywords: [
            'marriage', 'married', 'wedding', 'settle down', 'getting married', 'proposal',
            'കല്യാണം', 'കല്യാണം ആയില്ലേ', 'എപ്പോഴാ കല്യാണം', 'കല്യാണം എന്ന്', 'kalyanam', 'kalyanamayi'
        ]
    },
    {
        id: 'career',
        name: 'Job / Career Pressure',
        amount: 750,
        keywords: [
            'job', 'career', 'promotion', 'company', 'government job', 'psc', 'ias', 'upsc',
            'ജോലി', 'ഗവണ്മെന്റ് ജോലി', 'ജോലി എവിടെ', 'joli', 'joly'
        ]
    },
    {
        id: 'comparison',
        name: 'Comparison / Judgement',
        amount: 750,
        keywords: [
            'compare', 'compared', 'when i was your age', 'look at him', 'look at her', 'your cousin',
            'നോക്ക് അവനെ', 'അവളെ കണ്ടോ', 'കണ്ടോ അവനെ', 'nooku'
        ]
    },
    {
        id: 'advice',
        name: 'Unsolicited Advice',
        amount: 500,
        keywords: [
            'you should', 'you need to', 'advice', 'buy a house', 'buy a car', 'save money', 'invest',
            'ഞങ്ങളുടെ കാലത്ത്', 'വീട്', 'കാർ', 'വീട് പണി', 'veedu', 'car'
        ]
    }
];

const BASE_KAINEETTAM = 500;

const SCORE_MAP = {
    0: 5,
    1: 20,
    2: 40,
    3: 60,
    4: 75,
    5: 90,
    6: 100
};

/**
 * Robust Keyword Matcher
 * Uses word boundaries \b for ASCII words to prevent partial matching false positives
 * Uses substring search for Malayalam / non-ASCII unicode strings
 */
function isKeywordInText(lowerInput, keyword) {
    const kw = keyword.toLowerCase().trim();
    if (!kw) return false;

    // Check if keyword consists strictly of ASCII letters/numbers/spaces
    const isPureAscii = /^[\x00-\x7F]+$/.test(kw);

    if (isPureAscii) {
        // Escape special regex characters in keyword
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Word boundary match
        const regex = new RegExp(`(?:^|\\s|[^a-zA-Z0-9])${escaped}(?:$|\\s|[^a-zA-Z0-9])`, 'i');
        return regex.test(lowerInput);
    } else {
        // Non-ASCII / Malayalam substring match
        return lowerInput.includes(kw);
    }
}

/**
 * Get Severity Title based on pressure score (0 - 100)
 */
function getSeverityTitle(score) {
    if (score <= 20) return "Suspiciously Peaceful 😌";
    if (score <= 40) return "Minor Ammavan Activity";
    if (score <= 60) return "Moderate Family Interrogation";
    if (score <= 80) return "Severe Ammavan Pressure";
    return "MAXIMUM AMMAVAN DAMAGE 🚨";
}

/**
 * Primary Ammavan Pressure Calculation Function
 * @param {string} text - User input string describing the interaction
 * @returns {object} Calculated result object containing totalAmount, pressureScore, severity, detectedCategories, baseAmount
 */
function calculateAmmavanPressure(text) {
    // Empty input validation rule
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return {
            error: true,
            message: "Please provide at least one traumatic family interaction. 😭"
        };
    }

    const lowerInput = text.toLowerCase();
    const detectedCategories = [];
    let detectedAmountSum = 0;

    AMMAVAN_CATEGORIES.forEach(cat => {
        // Check if any keyword in this category matches the input text
        const hasMatch = cat.keywords.some(kw => isKeywordInText(lowerInput, kw));
        if (hasMatch) {
            detectedCategories.push({
                id: cat.id,
                name: cat.name,
                amount: cat.amount
            });
            detectedAmountSum += cat.amount;
        }
    });

    const matchCount = detectedCategories.length;
    const pressureScore = SCORE_MAP[matchCount] !== undefined ? SCORE_MAP[matchCount] : 100;
    const totalAmount = BASE_KAINEETTAM + detectedAmountSum;
    const severity = getSeverityTitle(pressureScore);

    return {
        error: false,
        totalAmount: totalAmount,
        baseAmount: BASE_KAINEETTAM,
        pressureScore: pressureScore,
        severity: severity,
        detectedCategories: detectedCategories,
        originalInput: text.trim()
    };
}

// Export for global browser window usage
if (typeof window !== 'undefined') {
    window.calculateAmmavanPressure = calculateAmmavanPressure;
}
