# RESYNTEL
## Resource Intelligence for Hospitality
**An EM300.co Company** · [resyntel.com](https://resyntel.com)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Currency](https://img.shields.io/badge/Currency-MAD%20(Morocco)-2E7D5B?style=flat)](https://resyntel.com)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20FR-087E8B?style=flat)](https://resyntel.com)

> **Measure resource consumption. Detect inefficiencies. Quantify savings. Act.**

Resyntel is an enterprise-grade hospitality resource-efficiency intelligence platform designed for hotel CEOs, CFOs, General Managers, and Engineering Directors. It aggregates electricity, water, weather, occupancy, and asset telemetry, converting operational data into prioritized financial savings.

Localized for Morocco with initial demonstration property **Zephyr Marrakech** (Marrakech, Morocco) using Moroccan utility structures (**ONEE** electricity tariffs and **RADEEMA** water tariffs).

---

## Key Highlights

- **Bilingual Interface (English & Français)**: Instant language switching across all dashboards, charts, anomalies, AI copilot responses, and engineering recommendations.
- **Strict Moroccan Localization (MAD)**: Every single financial metric is displayed in **Moroccan Dirham (MAD)** via a centralized presentation formatter (`formatMAD`).
- **Grounded AI Copilot (Ask Resyntel / Interroger Resyntel)**: Zero hallucinations. All executive answers derive directly from backend telemetry regressions and verified utility tariffs.
- **Reproducible Analytics Engine**:
  - **Baseline Regression**: Normalized for Marrakech Cooling Degree Days (CDD 18°C base) and guest-night occupancy.
  - **Anomaly Detection**: Statistical residual analysis and persistent nocturnal baseload detection.
  - **Quantified Savings**: `Excess Consumption × Utility Tariff` mapped to payback period in months.
  - **Carbon Intelligence**: Operational Scope 1 & Scope 2 greenhouse gas emissions using Moroccan ONEE grid emission factors (`0.660 kg CO₂e / kWh`).

---

## Executive Demo Targets (Zephyr Marrakech)

- **Resyntel Efficiency Score**: **78 / 100**
- **Annual Savings Opportunity**: **65,200 MAD / year** across 17 verified opportunities (Average Payback: 2.1 Months)
  - **Energy**: **43,800 MAD / year** (67.2% of total)
  - **Water**: **18,700 MAD / year** (28.7% of total)
  - **Other Operational**: **2,700 MAD / year** (4.1% of total)
- **Top Priority Opportunities**:
  1. *Overnight Water Distribution Leak*: **9,800 MAD / year** | 400 MAD investment | **0.5 months (15 days) payback** (Stops 4,500 m³ continuous annual water loss).
  2. *Swimming Pool VFD Eco-Mode*: **4,600 MAD / year** | 450 MAD investment | **1.2 months payback**.
  3. *HVAC Scheduling & Temperature Reset*: **18,400 MAD / year** | 6,000 MAD investment | **3.9 months payback** (Eliminates 13.6 MWh redundant cooling).

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
├── frontend/                      # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/                   # Routes: /, /dashboard, /energy, /water, /carbon, /assets, /opportunities, /ask, /portfolio, /connect
│   │   ├── components/
│   │   │   ├── brand/             # Resyntel vector LogoMark, LogoFull, LogoCompact
│   │   │   ├── layout/            # Sidebar, Header, BrandFooter, AppShell
│   │   │   ├── charts/            # ActualVsExpectedChart, BreakdownBarChart (Recharts)
│   │   │   ├── ui/                # KPICard, OpportunityDrawer, StatusBadges
│   │   ├── context/               # LanguageContext (EN | FR internationalization)
│   │   ├── lib/                   # formatMAD, i18n dictionary, data-service, api-client
│   │   └── types/                 # TypeScript interfaces
│   ├── package.json
│   └── tailwind.config.ts
├── .env.example
├── .gitignore
└── README.md
```

### Modular Data Provider Architecture

```text
DataProvider
├── DemoDataProvider        # Active: 12-month calibrated Zephyr Marrakech dataset
├── CSVProvider             # Active: Operational CSV upload, validation & normalization
├── MetrikusProvider        # V3 Stub: Cloud normalized sensor feeds
├── BMSProvider             # V3 Stub: BACnet / Modbus IP connector
└── IoTProvider             # V3 Stub: LoRaWAN / MQTT pulse sub-meters
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git

### 1. Clone & Configure

```bash
git clone https://github.com/AberraouiTekypay/resintel.git
cd resintel
cp .env.example .env
```

### 2. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

To verify a production build:
```bash
npm run build
npm run start
```

### 3. Backend Setup (Python FastAPI)

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
$env:PYTHONPATH='.' ; pytest -v
```

All 16 unit and integration tests verify baseline calculations, anomaly thresholds, tariff math, carbon factors, and API endpoints.

---

## Live CEO Demo Walkthrough (10-Step Script)

1. **Open Landing Page** (`/`): Introduce **RESYNTEL** (*Resource Intelligence for Hospitality · An EM300.co Company*). Switch language between English and French.
2. **Launch Resyntel Overview** (`/dashboard`): CEO sees **78 / 100** Resyntel Efficiency Score and **65,200 MAD / year** annual savings opportunity.
3. **Inspect Energy Intelligence** (`/energy`): Show actual vs expected consumption curves, intensity per room, and the **18,400 MAD** HVAC operational waste.
4. **Inspect Water Intelligence** (`/water`): Point out the critical **5.9 m³/hr** overnight leak (expected 1.8 m³/hr) generating **9,800 MAD / year** in waste.
5. **Inspect Carbon Intelligence** (`/carbon`): Review Scope 1 & 2 emissions and the **48.6 tCO₂e** annual reduction potential.
6. **Inspect Asset Intelligence** (`/assets`): Review health index across Central Chillers, Boilers, Pumps, Pools, and Cold Rooms.
7. **Inspect Savings Opportunities** (`/opportunities`): Sort all 17 opportunities by **Payback**. Click **HVAC Optimization** to review analytical evidence and the 3.9-month payback.
8. **Engage Ask Resyntel** (`/ask`): Ask *"What should we fix first?"* (or in French: *"Que devons-nous corriger en priorité ?"*) and receive an instant, grounded executive response.
9. **Inspect Portfolio View** (`/portfolio`): Show multi-property scaling across Zephyr Marrakech, Agadir, and Fès.
10. **Conclude with Pilot Intake** (`/connect`): Download sample CSV templates and submit a property pilot audit request.

---

## Brand Positioning & Credits

**RESYNTEL**
*Resource Intelligence for Hospitality*

**An EM300.co Company**
Copyright © 2026 Resyntel. All rights reserved. Localized in Moroccan Dirham (MAD).
