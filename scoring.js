/**
 * scoring.js - Ammavan Pressure Detection & Scoring Engine
 * Independent scoring module for analyzing relative interactions.
 */

const AMMAVAN_CATEGORIES = [
    {
        id: 'salary',
        name: 'SALARY INTERROGATION',
        amount: 500,
        keywords: [
            'salary', 'income', 'package', 'ctc', 'earn', 'monthly salary',
            'ശമ്പളം', 'salary ethra', 'salary ethraya', 'മാസം എത്ര'
        ]
    },
    {
        id: 'nri_cousin',
        name: 'NRI / COUSIN COMPARISON',
        amount: 1000,
        keywords: [
            'dubai', 'uae', 'nri', 'abroad', 'gulf', 'cousin',
            'ദുബായ്', 'ഗൾഫ്', 'വിദേശം'
        ]
    },
    {
        id: 'marriage',
        name: 'MARRIAGE PRESSURE',
        amount: 1500,
        keywords: [
            'marriage', 'married', 'wedding', 'settle down',
            'കല്യാണം', 'കല്യാണം ആയില്ലേ', 'എപ്പോഴാ കല്യാണം'
        ]
    },
    {
        id: 'career',
        name: 'JOB / CAREER QUESTIONS',
        amount: 750,
        keywords: [
            'job', 'career', 'promotion', 'company', 'government job',
            'ജോലി', 'ഗവണ്മെന്റ് ജോലി', 'psc'
        ]
    },
    {
        id: 'comparison',
        name: 'COMPARISON / JUDGEMENT',
        amount: 750,
        keywords: [
            'compare', 'compared', 'when i was your age', 'look at him', 'look at her', 'your cousin',
            'നോക്ക് അവനെ', 'അവളെ കണ്ടോ'
        ]
    },
    {
        id: 'advice',
        name: 'UNSOLICITED LIFE ADVICE',
        amount: 500,
        keywords: [
            'you should', 'you need to', 'advice', 'buy a house', 'buy a car', 'save money',
            'ഞങ്ങളുടെ കാലത്ത്', 'വീട്', 'കാർ'
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
 * Get Severity Level Title based on score (0 - 100)
 */
function getSeverityLevel(score) {
    if (score <= 20) return "Suspiciously Peaceful 😌";
    if (score <= 40) return "Minor Ammavan Activity";
    if (score <= 60) return "Moderate Family Interrogation";
    if (score <= 80) return "Severe Ammavan Pressure";
    return "MAXIMUM AMMAVAN DAMAGE 🚨";
}

/**
 * Calculates total kaineettam, pressure score, and detected categories
 * @param {string} text - User input string describing the interaction
 * @returns {object} Calculated result object or error state
 */
function calculateAmmavanPressure(text) {
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
        const hasMatch = cat.keywords.some(kw => lowerInput.includes(kw.toLowerCase()));
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
    const severity = getSeverityLevel(pressureScore);

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
