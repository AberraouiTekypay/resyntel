# RESYNTEL
## Resource Intelligence for Hospitality
**An EM300.co Company** · [resyntel.com](https://resyntel.com) · [Live Production App](https://resyntel.vercel.app)

[![Live Production](https://img.shields.io/badge/Production-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel)](https://resyntel.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AberraouiTekypay/resyntel)
[![Currency](https://img.shields.io/badge/Currency-MAD%20(Morocco)-2E7D5B?style=for-the-badge)](https://resyntel.com)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20FR-087E8B?style=for-the-badge)](https://resyntel.com)
[![Tests](https://img.shields.io/badge/Tests-16%2F16%20Passing-success?style=for-the-badge)](https://github.com/AberraouiTekypay/resyntel)

> **"Measure resource consumption. Detect inefficiencies. Quantify savings. Act."**
>
> *An intelligence layer connecting hotel operations, resource consumption, and financial performance.*

---

## 🌐 Live Production Links

- **Production Marketing & Platform:** [https://resyntel.vercel.app](https://resyntel.vercel.app)
- **Direct Vercel Deployment:** [https://resyntel-naahn92x4-amines-projects-9495f9a0.vercel.app](https://resyntel-naahn92x4-amines-projects-9495f9a0.vercel.app)
- **GitHub Repository:** [https://github.com/AberraouiTekypay/resyntel](https://github.com/AberraouiTekypay/resyntel)

---

## Overview

**Resyntel** is an enterprise-grade hospitality resource-efficiency intelligence platform designed for hotel CEOs, CFOs, General Managers, and Engineering Directors. It operates as a non-invasive intelligence layer above existing hotel systems (PMS, BMS, smart meters, and utility invoices), turning operational telemetry into prioritized financial savings.

The platform is strictly localized for Morocco using **Zephyr Marrakech** (180 keys, Marrakech, Morocco) as the calibrated pilot demonstration property, incorporating Moroccan utility tariffs (**ONEE** electricity and **RADEEMA** water) and local climate degree days.

---

## Key Highlights

1. **Venture-Grade Marketing Experience**:
   - Editorial architectural hotel photography combined with industrial intelligence instrumentation.
   - Spatial asset mapping overlaying real-time telemetry annotations directly on physical hotel infrastructure.
   - High-contrast financial impact section quantifying waste in **Moroccan Dirham (MAD)**.
   - Interactive enterprise product showcase simulating real platform workflows.
   - Hardware-agnostic architecture demonstrating non-invasive integration above existing PMS/BMS systems.

2. **Full Bilingual Localization (English & Français)**:
   - Zero-latency language switcher (`EN | FR`) in the header and landing page.
   - 100% dictionary coverage across all 9 internal screens, navigation items, metrics, and explanatory text.

3. **Strict Moroccan Localization (MAD)**:
   - Centralized formatting via `formatMAD()` across the entire stack.
   - Zero instances of `$`, `€`, `EUR`, `USD`, or `GBP`.
   - Utility rates: **1.40 MAD / kWh** (ONEE Time-of-Use structure: Peak 1.80, Standard 1.30, Off-Peak 0.95 MAD/kWh), **12.50 MAD / m³** (RADEEMA commercial water tariff).
   - Carbon grid emission factor: **0.660 kg CO₂e / kWh** (ONEE generation mix).

4. **Grounded Executive AI Copilot (`Ask Resyntel`)**:
   - Zero hallucinations. All executive answers derive deterministically from backend telemetry regressions, weather balance points, and utility tariffs.

5. **Reproducible Analytics Engine**:
   - **Baseline Regression**: Normalized for Marrakech Cooling Degree Days (CDD base 18°C) and guest-night room occupancy ($R^2 > 0.91$).
   - **Anomaly Detection**: Statistical residual analysis isolating persistent nocturnal baseloads.
   - **Savings Quantification**: Direct translation of excess resource draw into annual avoidable cost (MAD) and ROI payback period in months.
   - **Carbon Intelligence**: Scope 1 (direct fuels) and Scope 2 (ONEE grid) greenhouse gas accounting.

---

## Executive Demo Calibration (Zephyr Marrakech)

| Metric | Target / Benchmark | Operational Status | Annual Financial Impact |
| :--- | :--- | :--- | :--- |
| **Resyntel Efficiency Score** | **78 / 100** | Active Benchmark | Baseline operational index |
| **Total Savings Opportunity** | **65,200 MAD / yr** | 17 Opportunities | Quantified across all vectors |
| **Electricity Variance** | **+12.0%** vs expected | Operational Inefficiency | **43,800 MAD / yr** potential savings |
| **Water Variance** | **+18.0%** vs expected | Active Leak Anomaly | **18,700 MAD / yr** potential savings |
| **Carbon Variance** | **+11.0%** vs expected | Scope 1 + Scope 2 | **41.4 tCO₂e / yr** reduction potential |
| **Flagship Water Leak** | **5.9 m³/hr** vs 1.8 baseline | Active (02:00–05:00) | **4,500 m³ / yr** · **9,800 MAD / yr** |
| **HVAC Chiller Optimization** | **3.9 months payback** | High Priority | **18,400 MAD / yr** (6,000 MAD capex) |

> **Compliance Note**: All demo screens clearly indicate:  
> `DEMO DATA — LIVE HOTEL INTEGRATION PENDING` / `Zephyr Marrakech — Demo`

---

## Architecture

```text
C:\resintel
├── backend/                       # Python FastAPI Analytics Engine
│   ├── app/
│   │   ├── analytics/             # Baseline model, anomaly detector, savings, carbon, AI engine
│   │   ├── api/endpoints/         # REST API endpoints (/kpis, /energy, /water, /opportunities, /ask, ...)
│   │   ├── core/                  # Database, settings, security
│   │   ├── models/                # SQLAlchemy models (Property, Meter, Asset, Opportunity, ...)
│   │   ├── providers/             # DataProvider architecture (DemoDataProvider, CSVProvider, Metrikus, BMS, IoT)
│   │   └── schemas/               # Pydantic V2 schemas
│   ├── tests/                     # Pytest suite (16 passing tests)
│   ├── requirements.txt
│   └── main.py
├── frontend/                      # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                   # Routes: /, /dashboard, /energy, /water, /carbon, /assets, /opportunities, /ask, /portfolio, /connect
│   │   ├── components/
│   │   │   ├── brand/             # Resyntel vector LogoMark, LogoFull, LogoCompact
│   │   │   ├── marketing/         # Venture-grade landing page components:
│   │   │   │   ├── MarketingNav.tsx             # Translucent backdrop-blur header
│   │   │   │   ├── Hero.tsx                     # Architectural hotel photo + telemetry
│   │   │   │   ├── HeroIntelligencePanel.tsx    # Floating telemetry instrument
│   │   │   │   ├── ProblemSection.tsx           # Split architectural view & principles
│   │   │   │   ├── IntelligenceFlow.tsx         # 7-stage closed-loop pipeline
│   │   │   │   ├── HotelIntelligenceVisual.tsx  # Spatial physical plant annotations
│   │   │   │   ├── FinancialImpact.tsx          # High-contrast MAD financial numbers
│   │   │   │   ├── ProductShowcase.tsx          # Real software preview container
│   │   │   │   ├── AskResyntelSection.tsx       # Grounded conversational AI dialogue
│   │   │   │   ├── HospitalitySystems.tsx       # 10 physical operational domains
│   │   │   │   ├── DataArchitecture.tsx        # Hardware-agnostic ingestion diagram
│   │   │   │   ├── FinalCTA.tsx                 # Full-width twilight architectural CTA
│   │   │   │   └── MarketingFooter.tsx          # Corporate credentials & compliance
│   │   │   ├── layout/            # Sidebar, Header, BrandFooter, AppShell
│   │   │   ├── charts/            # ActualVsExpectedChart, BreakdownBarChart (Recharts)
│   │   │   ├── ui/                # KPICard, OpportunityDrawer, StatusBadges
│   │   ├── context/               # LanguageContext (EN | FR internationalization)
│   │   ├── lib/                   # formatMAD, i18n dictionary, data-service, api-client
│   │   └── types/                 # TypeScript interfaces
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.ts
├── docs/                          # Detailed Architecture & Operations Documentation
│   ├── ARCHITECTURE.md            # Deep dive into analytics & regressions
│   ├── LOCALIZATION_MOROCCO.md    # Tariffs, ONEE/RADEEMA math & regulatory compliance
│   └── EXECUTIVE_DEMO_SCRIPT.md   # 10-step CEO walkthrough script
├── .env.example
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js 18+** & npm
- **Python 3.11+**
- **Git**

### 1. Clone & Configure

```bash
git clone https://github.com/AberraouiTekypay/resyntel.git
cd resyntel
cp .env.example .env
```

### 2. Frontend Setup (Next.js 16)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

To verify a production build:
```bash
npm run build
npm run start
```

### 3. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv

# On Windows:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 4. Running Backend Tests

```bash
cd backend
$env:PYTHONPATH="." ; python -m pytest -v
```

All 16 unit and integration tests verify baseline regressions, anomaly thresholds, tariff calculations, carbon factors, and API endpoints.

---

## Live CEO Demo Walkthrough (10-Step Script)

1. **Public Marketing Experience (`/`)**:
   - Present **RESYNTEL** (*Resource Intelligence for Hospitality · An EM300.co Company*).
   - Demonstrate the editorial architectural photography and the floating intelligence instrument (**65,200 MAD** avoidable cost, **5.4 m³/h** overnight leak).
   - Toggle language between English and Français to show zero-compromise bilingual delivery.
2. **Executive 30-Second Dashboard (`/dashboard`)**:
   - CEO immediately sees the **78 / 100** Resyntel Efficiency Score and **65,200 MAD / year** annual savings opportunity.
3. **Energy Intelligence (`/energy`)**:
   - Show actual vs expected consumption curves, intensity per room, and the **18,400 MAD** HVAC operational waste.
4. **Water Intelligence (`/water`)**:
   - Highlight the critical **5.9 m³/hr** overnight leak (expected 1.8 m³/hr) generating **18,700 MAD / year** in excess utility billing.
5. **Carbon Intelligence (`/carbon`)**:
   - Review Scope 1 & Scope 2 ONEE emissions and the **41.4 tCO₂e** annual reduction potential.
6. **Asset Intelligence (`/assets`)**:
   - Review health indices across Central Chillers, Boilers, Booster Pumps, Pools, and Cold Rooms.
7. **Savings Opportunities (`/opportunities`)**:
   - Filter and sort 17 opportunities by **Payback**. Click **HVAC Setpoint Optimization** to review analytical evidence and the 3.9-month payback.
8. **Engage Ask Resyntel (`/ask`)**:
   - Ask *"What should we fix first?"* (or in French: *"Que devrions-nous corriger en priorité ?"*) and receive an instant, deterministically grounded executive response.
9. **Portfolio Governance (`/portfolio`)**:
   - Show multi-property scaling across Zephyr Marrakech, Zephyr Casablanca, and Zephyr Taghazout.
10. **Conclude with Pilot Intake (`/connect`)**:
    - Showcase drag-and-drop CSV onboarding and hardware-agnostic connectivity.

---

## Brand Positioning & Credits

**RESYNTEL**  
*Resource Intelligence for Hospitality*  

**An EM300.co Company**  
Domain: [resyntel.com](https://resyntel.com) · Production Deployment: [resyntel.vercel.app](https://resyntel.vercel.app)  
Copyright © 2026 Resyntel. All rights reserved. Localized in Moroccan Dirham (MAD).
