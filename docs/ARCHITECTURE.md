# Resyntel Technical & Analytical Architecture

## 1. High-Level System Architecture

Resyntel is built as an enterprise intelligence layer that decouples physical telemetry ingestion from executive decision-making.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA INGESTION LAYER                            │
│  (PMS / BMS Modbus / Smart Meters / RADEEMA Pulses / Weather APIs)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PROVIDER ADAPTERS                          │
│  - DemoDataProvider (Calibrated Zephyr Marrakech 12-month synthetic)   │
│  - CSVProvider (Drag-and-drop normalization & schema mapper)           │
│  - BMSProvider / IoTProvider (BACnet IP / LoRaWAN connectors)          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       ANALYTICS & REGRESSION ENGINE                    │
│  - BaselineModel (Multivariate CDD & Occupancy Regression)             │
│  - AnomalyDetector (Residual deviation & Nocturnal flow isolation)     │
│  - SavingsCalculator (MAD Tariff mapping & Payback ROI ranking)        │
│  - CarbonCalculator (Scope 1 & Scope 2 ONEE emission factor 0.660)    │
│  - AIEngine (Deterministic grounded executive co-pilot)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                             │
│  - Next.js 16 App Router (Turbopack, Serverless API Fallback)          │
│  - Recharts Data Visualizations                                        │
│  - Bilingual i18n Context (EN / FR)                                    │
│  - Centralized MAD Currency Formatter (`formatMAD`)                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Analytical & Statistical Models

### 2.1 Thermodynamic Baseline Regression
Hotels cannot simply compare current month kilowatt-hours to the prior year because weather and guest occupancy fluctuate significantly.

Resyntel computes an expected consumption model:

$$E_{\text{expected}}(t) = \beta_0 + \beta_{\text{occ}} \cdot \text{Occupancy}(t) + \beta_{\text{CDD}} \cdot \text{CDD}(t) + \beta_{\text{HDD}} \cdot \text{HDD}(t)$$

Where:
- $\beta_0$: Physical baseload of the building (kitchens, pumps, ventilation, standby power).
- $\text{CDD}(t) = \max(0, T_{\text{mean}}(t) - 18.0^\circ\text{C})$: Cooling Degree Days in Marrakech.
- $\text{HDD}(t) = \max(0, 18.0^\circ\text{C} - T_{\text{mean}}(t))$: Heating Degree Days.
- $\text{Occupancy}(t)$: Guest-night room occupancy percentage.

### 2.2 Anomaly Residual Detection
An anomaly is triggered when actual consumption exceeds the 95th percentile confidence interval of the normalized regression:

$$\text{Residual}(t) = E_{\text{actual}}(t) - E_{\text{expected}}(t)$$
$$\text{Anomaly} \iff \text{Residual}(t) > k \cdot \sigma_{\text{baseline}}$$

### 2.3 Nocturnal Baseload Isolation
Between 02:00 and 05:00 UTC, hotel operational activity is minimal. An elevated flow rate indicates physical leakage or unscheduled equipment operation.
- **Water Baseline Threshold**: $1.8 \text{ m}^3/\text{h}$
- **Observed Night Flow**: $5.4\text{--}5.9 \text{ m}^3/\text{h}$
- **Excess Flow**: $\Delta Q = 4.1 \text{ m}^3/\text{h} \times 3 \text{ h/night} \times 365 = 4,489.5 \text{ m}^3/\text{year}$
- **Avoidable Cost**: $4,489.5 \text{ m}^3 \times 12.50 \text{ MAD/m}^3 \approx 56,118 \text{ MAD}$ (attributed across domestic and secondary distribution risers).

---

## 3. Data Providers

The platform implements a pluggable `DataProvider` interface (`backend/app/providers/base.py`):

1. **`DemoDataProvider`**:
   Provides 12 months of high-fidelity synthetic telemetry for Zephyr Marrakech calibrated against real Moroccan weather patterns and ONEE/RADEEMA utility tariffs.
2. **`CSVProvider`**:
   Accepts user-uploaded operational spreadsheets, automatically maps headers (`timestamp`, `kwh`, `m3`, `occupancy`, `temp_c`), and runs identical regression algorithms.
3. **`Integrations` (Metrikus, BMS, IoT)**:
   Future-proof connectors for hardware-agnostic telemetry ingestion.

---

## 4. API Endpoints Reference

All endpoints return strongly-typed JSON responses conformant with Pydantic V2 schemas:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/kpis` | `GET` | Resyntel score (78), total savings (65,200 MAD), resource variances |
| `/api/energy` | `GET` | 12-month actual vs expected electricity, breakdown by end-use |
| `/api/water` | `GET` | 12-month water telemetry, nocturnal leak diagnosis |
| `/api/carbon` | `GET` | Scope 1 & Scope 2 footprint, ONEE factor (0.660 kg CO₂e/kWh) |
| `/api/assets` | `GET` | Health index across chillers, boilers, booster pumps, cold rooms |
| `/api/opportunities` | `GET` | 17 ranked actionable operational work orders with payback in months |
| `/api/opportunities/{id}` | `GET` | Detailed diagnostic drawer data, root cause, and action plan |
| `/api/ask` | `POST` | Deterministically grounded AI copilot response |
| `/api/portfolio` | `GET` | Multi-property group benchmarking (Marrakech, Casablanca, Taghazout) |
| `/api/upload` | `POST` | Multi-part CSV file upload and normalization |
