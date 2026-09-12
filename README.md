# അമ്മാവൻ Calculation (Ammavan Calculation™) 👴🏾💸

> *"Because your relatives' expectations deserve a scientific answer."*

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Status: 100% Client-Side](https://img.shields.io/badge/Architecture-100%25%20Client--Side-emerald.svg)](#)
[![Built For](https://img.shields.io/badge/Built%20For-Useless%20by%20Uthara-purple.svg)](#)

**അമ്മാവൻ Calculation** is a viral, funny web application built for Malayalis worldwide. It converts unwanted relative interrogations (salary inquiries, Dubai cousin comparisons, marriage pressure, job hunting, and unsolicited advice) into an itemized thermal paper receipt card — the **"Ammavan Bill"** — calculating the total "Family Pressure Compensation" owed to you!

---

## 🌟 Key Features

- 🧾 **Digital Thermal Receipt Card ("Ammavan Bill")**
  - Realistic thermal paper slip design with serrated zig-zag bottom edges, decorative barcode, and certification stamp.
  - Displays **ISSUE DATE**, **DUE DATE: IMMEDIATELY 💸**, and a funny warning: *"Late payment = more family drama. 😂"*.
  - Fixed-length compact format designed specifically for clear social media sharing.

- 🧠 **Smart Keyword Matching Engine (`scoring.js`)**
  - Detects 6 distinct interrogation categories using regex ASCII word boundaries (`\b`) and Malayalam Unicode substring matching.
  - Supports English, Malayalam (മലയാളം), and common Manglish expressions.
  - Guarantees each category is billed only once per transaction.

- 🔥 **Visual FAMILY PRESSURE METER**
  - Smooth 1-second progress bar animation filling from 0 to 100 based on calculated pressure score.
  - Dynamic severity badges ranging from `Peaceful Family Visit 😌` to `RUN. MAXIMUM DAMAGE 💀`.

- 🔊 **Web Audio API Paper Printer & Tear Sound Effects**
  - 100% browser-native audio synthesizer.
  - Plays realistic mechanical typing motors, paper feed clicks, and paper-tearing crackles when generating the bill without external audio files.

- 🤖 **Bilingual AI Family Analysis Card**
  - Displays funny category-by-category commentary on the result screen below the bill.
  - Provides a randomized Malayalam verdict quote for maximum family WhatsApp group humor.

- 📤 **One-Click Download & Web Share API**
  - **DOWNLOAD BILL 🧾**: Converts the paper receipt slip into a high-res PNG image via `html2canvas`.
  - **SHARE BILL 📤**: Shares the generated bill image natively via the Web Share API (with automatic clipboard text fallback).

---

## 💰 Compensation Breakdown

All calculations start with a mandatory base trauma fee:

| Category | Description | Amount |
| :--- | :--- | :---: |
| **Base Trauma Compensation** | Standard entry fee for attending any family gathering | **₹500** |
| **Salary Interrogation** | *"Salary ethra? 💸"* — Package, CTC, or monthly earnings questions | **₹500** |
| **NRI / Cousin Comparison** | *"Dubai chettan comparison 🌴"* — Gulf/abroad cousin comparisons | **₹1,000** |
| **Marriage Pressure** | *"Kalyanam eppo? 💍"* — Marriage, proposal, or settling down pressure | **₹1,500** |
| **Job / Career Pressure** | *"Joli enthaayi? 💼"* — PSC coaching, government job, or promotion inquiries | **₹750** |
| **Comparison / Judgement** | *"Avane kandille? 👀"* — Judgements against neighbor's or relative's kids | **₹750** |
| **Unsolicited Advice** | *"Free advice thudangi 🙏"* — Unwanted house construction, car, or investment advice | **₹500** |

*Formula:* **`TOTAL KAINEETTAM DUE = ₹500 + Sum of Detected Category Amounts`**

---

## 📊 Family Pressure Score Map

| Categories Detected | Pressure Score | Severity Badge |
| :---: | :---: | :--- |
| **0** | **5 / 100** | Peaceful Family Visit 😌 |
| **1** | **20 / 100** | Ammavan Warming Up 👀 |
| **2** | **40 / 100** | Pressure Building 😰 |
| **3** | **60 / 100** | Escape Recommended 🚨 |
| **4** | **75 / 100** | Severe Ammavan Interrogation 💥 |
| **5–6** | **90–100 / 100** | RUN. MAXIMUM DAMAGE 💀 |

---

## 🛠️ Project Structure

```
ammavan-calculation/
├── index.html       # HTML5 single-page application structure & viewport screens
├── style.css        # Mobile-first CSS design system, glassmorphism, animations & thermal receipt styles
├── script.js       # Client-side router, Web Audio synthesizer, receipt population & share/download handlers
├── scoring.js      # Independent phrase matcher, scoring algorithm & severity mapping module
└── README.md        # Documentation & usage guide
```

---

## 🚀 Quick Start / Local Setup

Since **അമ്മാവൻ Calculation** is built with zero framework overhead, you don't need `npm` or Node.js to run it!

### Option 1: Using Python HTTP Server
```bash
# Navigate to project directory
cd path/to/ammavan-calculation

# Start Python 3 HTTP server
python -m http.server 8080
```
Open your browser and visit: `http://localhost:8080`

### Option 2: Using VS Code Live Server
1. Open the project folder in **VS Code**.
2. Right-click [`index.html`](file:///c:/Users/DELL/Desktop/ammavan-calculation/index.html) and select **"Open with Live Server"**.

---

## 🎨 Tech Stack & Dependencies

- **Structure**: HTML5
- **Styling**: Vanilla CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism, Keyframe Animations)
- **Logic**: Vanilla JavaScript (ES6+)
- **Typography**: Google Fonts (`Noto Sans Malayalam`, `Poppins`)
- **Image Generation**: `html2canvas@1.4.1` (via CDN)
- **Audio & Media**: Web Audio API & Web Share API

---

## 📜 Footer Credit & Branding

> *"Built for Useless by Uthara"*  
> © 2026 Ammavan Calculation™ • All rights reserved.
