# Moroccan Localization & Utility Structure

## 1. Currency Requirement: MAD Exclusively

Resyntel is strictly localized for the Moroccan hospitality market.

- **Presentation Rule**: Every monetary value is presented exclusively in **Moroccan Dirham (MAD)**.
- **Centralized Formatter**: Handled uniformly through `formatMAD(val: number): string` in `src/lib/formatters.ts`.
- **Formatting Standards**:
  - Regular amounts: `65,200 MAD`
  - Unit rates: `1.40 MAD / kWh`
  - Time-denominated: `18,400 MAD / year`
  - Compact notation: `1.42M MAD` (for amounts $\ge 1,000,000 \text{ MAD}$)
- **Strict Prohibitions**: Symbols and identifiers such as `$`, `€`, `EUR`, `USD`, and `GBP` are strictly barred across all UI components, API payloads, and diagnostic explanations.

---

## 2. Moroccan Utility Tariffs

### 2.1 Electricity — ONEE (Office National de l'Électricité et de l'Eau Potable)
Hotels operating in Morocco are typically billed under Medium Voltage (MT) Time-of-Use tariffs:

- **Blended Commercial Benchmark**: **1.40 MAD / kWh**
- **Time-of-Use Rate Structure**:
  - **Plein (Peak Hours, 18:00–22:00)**: **1.80 MAD / kWh** — High operational penalty window where chiller discharge setback and load-shifting generate high ROI.
  - **Jour (Standard Daytime Hours, 07:00–18:00)**: **1.30 MAD / kWh**
  - **Creuses (Off-Peak Nocturnal Hours, 23:00–07:00)**: **0.95 MAD / kWh** — Optimal window for pool filtration and thermal pre-cooling.

### 2.2 Water & Sanitation — RADEEMA (Régie Autonome de Distribution d'Eau et d'Électricité de Marrakech)
Commercial hotel water in Marrakech is billed on a progressive volumetric scale including sanitation treatment:

- **Commercial Hospitality Average**: **12.50 MAD / m³**
- **Sanitation Surcharge**: Included in operational cost regressions.

---

## 3. Carbon Emissions Factor

Morocco's national grid mix combines thermal generation (coal and gas) with an expanding share of solar and wind (Noor Ouarzazate, Midelt, Tarfaya).

- **Grid Emission Factor**: **0.660 kg CO₂e / kWh** (reflecting ONEE published grid intensity).
- **Scope 1 Fuel Factor (Diesel / Fuel Oil)**: **2.68 kg CO₂e / L**.
- **Scope 1 LPG / Propane**: **1.61 kg CO₂e / kg**.
- **Intensity Metric**: Expressed per guest-night (`kg CO₂e / guest-night`).

---

## 4. Bilingual Localization Architecture (EN | FR)

All application interfaces and diagnostic narratives are available with parity in English and French:

- Implemented in `src/lib/i18n.ts` using a structured TypeScript dictionary.
- Managed reactively via `LanguageContext` (`src/context/LanguageContext.tsx`).
- Instant runtime switching without page reload.
- Zero untranslated keys across all 9 views and marketing sections.

---

## 5. Regulatory Compliance & Data Privacy

- **Moroccan Law 09-08 (CNDP)**: Compliance with the National Commission for Personal Data Protection regarding hotel operational data and guest occupancy logs.
- **Data Governance**: Hotel telemetry and financial billing audits remain under strict enterprise non-disclosure agreements (NDA).
