"""
Demo Data Provider for Zephyr Marrakech
Supplies 12-month calibrated synthetic hotel data with reproducible analytics.
"""

from typing import Dict, Any, List
from app.providers.base import DataProvider

class DemoDataProvider(DataProvider):
    def get_property_metadata(self, property_id: str = "zephyr_marrakech") -> Dict[str, Any]:
        return {
            "id": 1,
            "code": "ZEPHYR-RAK-01",
            "name": "Zephyr Marrakech",
            "city": "Marrakech",
            "country": "Morocco",
            "rooms": 180,
            "guest_capacity": 360,
            "built_year": 2018,
            "climate_zone": "Hot Semi-Arid (Marrakech BSh)",
            "annual_guest_nights": 51200,
            "average_occupancy_rate": 68.4,
            "currency": "MAD",
            "electricity_tariff_mad_kwh": 1.35,
            "water_tariff_mad_m3": 14.50,
            "grid_operator": "ONEE (Office National de l'Electricité)",
            "water_utility": "RADEEMA (Régie Autonome de Distribution d'Eau et d'Electricité de Marrakech)"
        }

    def get_kpis(self, property_id: str = "zephyr_marrakech") -> Dict[str, Any]:
        return {
            "resource_efficiency_score": 78,
            "resource_efficiency_benchmark": 100,
            "annual_savings_opportunity_mad": 65200.0,
            "energy_variance_pct": 12.0,
            "water_variance_pct": 18.0,
            "carbon_variance_pct": 11.0,
            "identified_opportunities_count": 17,
            "savings_breakdown": {
                "energy_mad": 43800.0,
                "water_mad": 18700.0,
                "other_mad": 2700.0
            },
            "property_name": "Zephyr Marrakech",
            "location": "Marrakech · Morocco",
            "status_label": "DEMO DATA — LIVE HOTEL INTEGRATION PENDING",
            "currency": "MAD"
        }

    def get_energy_data(self, property_id: str = "zephyr_marrakech", period: str = "12_months") -> Dict[str, Any]:
        # 12-month calibrated trend for Zephyr Marrakech
        monthly_trend = [
            {"period": "Oct", "actual": 42100, "expected": 38200, "variance_pct": 10.2, "cost_mad": 56835},
            {"period": "Nov", "actual": 36800, "expected": 33900, "variance_pct": 8.6, "cost_mad": 49680},
            {"period": "Dec", "actual": 38400, "expected": 35200, "variance_pct": 9.1, "cost_mad": 51840},
            {"period": "Jan", "actual": 39200, "expected": 35800, "variance_pct": 9.5, "cost_mad": 52920},
            {"period": "Feb", "actual": 37100, "expected": 33600, "variance_pct": 10.4, "cost_mad": 50085},
            {"period": "Mar", "actual": 43500, "expected": 39100, "variance_pct": 11.3, "cost_mad": 58725},
            {"period": "Apr", "actual": 46200, "expected": 41200, "variance_pct": 12.1, "cost_mad": 62370},
            {"period": "May", "actual": 48900, "expected": 43500, "variance_pct": 12.4, "cost_mad": 66015},
            {"period": "Jun", "actual": 54200, "expected": 47600, "variance_pct": 13.9, "cost_mad": 73170},
            {"period": "Jul", "actual": 57400, "expected": 49800, "variance_pct": 15.3, "cost_mad": 77490},
            {"period": "Aug", "actual": 58600, "expected": 50900, "variance_pct": 15.1, "cost_mad": 79110},
            {"period": "Sep", "actual": 49500, "expected": 44800, "variance_pct": 10.5, "cost_mad": 66825}
        ]

        anomalies = [
            {
                "id": 1,
                "title": "HVAC Operating Inefficiency",
                "equipment": "Main Chiller Plant & AHU 1-8",
                "annual_saving_mad": 18400.0,
                "payback_months": 3.9,
                "confidence": "High",
                "severity": "Critical",
                "variance": "+22% in shoulder periods",
                "evidence": "Chiller and AHU variable frequency drives maintained 85% baseload capacity during shoulder occupancy (34%) without temperature reset regulation."
            },
            {
                "id": 3,
                "title": "Chiller Baseload Night Schedule Overrun",
                "equipment": "Trane RTHD 350TR Chiller #2",
                "annual_saving_mad": 11200.0,
                "payback_months": 1.8,
                "confidence": "High",
                "severity": "High",
                "variance": "+14% during 23:00 - 06:00",
                "evidence": "Dual chillers running concurrently overnight despite ambient outdoor temperatures dropping below 21°C."
            },
            {
                "id": 5,
                "title": "Kitchen Cold Storage Compressor Cycling",
                "equipment": "Foster Walk-In Cold Room #1 & #2",
                "annual_saving_mad": 5400.0,
                "payback_months": 2.1,
                "confidence": "High",
                "severity": "Medium",
                "variance": "+19% compressor run time",
                "evidence": "Gasket air seal degradation causing continuous compressor duty cycling at 92% run time."
            },
            {
                "id": 6,
                "title": "Swimming Pool Pump Continuous Run Overrun",
                "equipment": "Main Resort Pool Filtration Pumps",
                "annual_saving_mad": 4600.0,
                "payback_months": 1.2,
                "confidence": "High",
                "severity": "Medium",
                "variance": "+24% pump kWh",
                "evidence": "Primary pumps running at full 50Hz frequency 24h/day instead of cycling down to 30Hz eco-filtration off-hours."
            }
        ]

        return {
            "current_consumption_kwh": 542800.0,
            "expected_consumption_kwh": 484600.0,
            "variance_pct": 12.0,
            "cost_mad": 732780.0,
            "co2_tonnes": 358.2,
            "intensity_kwh_per_room": 32.8,
            "intensity_kwh_per_guest_night": 10.6,
            "breakdown_pct": {
                "HVAC": 42,
                "Kitchen": 16,
                "Laundry": 12,
                "Pool & Spa": 10,
                "Lighting": 8,
                "Common Areas": 7,
                "Baseload Technical": 5
            },
            "monthly_trend": monthly_trend,
            "anomalies": anomalies
        }

    def get_water_data(self, property_id: str = "zephyr_marrakech", period: str = "12_months") -> Dict[str, Any]:
        monthly_trend = [
            {"period": "Oct", "actual": 2720, "expected": 2350, "variance_pct": 15.7, "cost_mad": 39440},
            {"period": "Nov", "actual": 2410, "expected": 2080, "variance_pct": 15.9, "cost_mad": 34945},
            {"period": "Dec", "actual": 2490, "expected": 2150, "variance_pct": 15.8, "cost_mad": 36105},
            {"period": "Jan", "actual": 2520, "expected": 2180, "variance_pct": 15.6, "cost_mad": 36540},
            {"period": "Feb", "actual": 2380, "expected": 2040, "variance_pct": 16.7, "cost_mad": 34510},
            {"period": "Mar", "actual": 2810, "expected": 2390, "variance_pct": 17.6, "cost_mad": 40745},
            {"period": "Apr", "actual": 2980, "expected": 2510, "variance_pct": 18.7, "cost_mad": 43210},
            {"period": "May", "actual": 3150, "expected": 2640, "variance_pct": 19.3, "cost_mad": 45675},
            {"period": "Jun", "actual": 3320, "expected": 2790, "variance_pct": 19.0, "cost_mad": 48140},
            {"period": "Jul", "actual": 3480, "expected": 2910, "variance_pct": 19.6, "cost_mad": 50460},
            {"period": "Aug", "actual": 3540, "expected": 2960, "variance_pct": 19.6, "cost_mad": 51330},
            {"period": "Sep", "actual": 3120, "expected": 2680, "variance_pct": 16.4, "cost_mad": 45240}
        ]

        prominent_anomaly = {
            "title": "Water anomaly detected",
            "type": "Overnight Distribution Flow / Silent Leakage",
            "observed_overnight_flow": "5.9 m³ / hour",
            "expected_overnight_flow": "1.8 m³ / hour",
            "estimated_annual_excess_m3": 4500,
            "estimated_annual_cost_mad": 9800.0,
            "confidence": "High",
            "severity": "Critical",
            "recommendation": "Investigate persistent overnight flow and inspect the main distribution / irrigation / guest-room circuits.",
            "cta_action": "View opportunity",
            "opportunity_id": 2
        }

        return {
            "current_consumption_m3": 34120.0,
            "expected_consumption_m3": 28915.0,
            "variance_pct": 18.0,
            "cost_mad": 494740.0,
            "litres_per_guest_night": 485.0,
            "monthly_trend": monthly_trend,
            "prominent_anomaly": prominent_anomaly
        }

    def get_carbon_data(self, property_id: str = "zephyr_marrakech") -> Dict[str, Any]:
        return {
            "scope_1_tco2e": 74.2,
            "scope_2_tco2e": 358.2,
            "total_tco2e": 432.4,
            "expected_total_tco2e": 389.5,
            "variance_pct": 11.0,
            "co2e_per_guest_night_kg": 8.4,
            "potential_annual_reduction_tco2e": 48.6,
            "emission_factors": {
                "grid_electricity": "0.660 kg CO2e / kWh (ONEE Morocco Grid Factor)",
                "lpg_propane": "2.980 kg CO2e / kg (Kitchen & Hot Water Boilers)",
                "diesel_generator": "2.680 kg CO2e / L (Emergency Generators)"
            },
            "scope_breakdown": [
                {"source": "Scope 2: Grid Electricity (ONEE)", "emissions_tco2e": 358.2, "pct": 82.8},
                {"source": "Scope 1: LPG Boilers (Domestic Hot Water)", "emissions_tco2e": 58.4, "pct": 13.5},
                {"source": "Scope 1: Kitchen Gas Cooking", "emissions_tco2e": 12.1, "pct": 2.8},
                {"source": "Scope 1: Backup Generator Testing", "emissions_tco2e": 3.7, "pct": 0.9}
            ],
            "disclaimer": "Calculated from energy consumption and configured emission factors."
        }

    def get_assets(self, property_id: str = "zephyr_marrakech") -> List[Dict[str, Any]]:
        return [
            {
                "id": 1,
                "name": "Central Chiller Plant #1 & #2",
                "category": "HVAC",
                "status": "warning",
                "health_score": 71,
                "annual_consumption": 228000.0,
                "consumption_unit": "kWh",
                "efficiency_metric": "COP 3.1 (Rated 4.2)",
                "detected_anomalies_count": 2,
                "potential_savings_mad": 29600.0,
                "operating_hours": 8760.0
            },
            {
                "id": 2,
                "name": "Primary Air Handling Units (AHU 1-8)",
                "category": "HVAC",
                "status": "warning",
                "health_score": 74,
                "annual_consumption": 68400.0,
                "consumption_unit": "kWh",
                "efficiency_metric": "SFP 1.8 W/(l/s)",
                "detected_anomalies_count": 1,
                "potential_savings_mad": 18400.0,
                "operating_hours": 7200.0
            },
            {
                "id": 3,
                "name": "Domestic Hot Water Condensing Boilers",
                "category": "Boiler",
                "status": "optimal",
                "health_score": 92,
                "annual_consumption": 22400.0,
                "consumption_unit": "kg LPG",
                "efficiency_metric": "Efficiency 92.4%",
                "detected_anomalies_count": 0,
                "potential_savings_mad": 2100.0,
                "operating_hours": 6400.0
            },
            {
                "id": 4,
                "name": "Main Water Booster Pump System",
                "category": "Pump",
                "status": "warning",
                "health_score": 68,
                "annual_consumption": 34120.0,
                "consumption_unit": "m³",
                "efficiency_metric": "Night Flow 5.9 m³/h",
                "detected_anomalies_count": 1,
                "potential_savings_mad": 9800.0,
                "operating_hours": 8760.0
            },
            {
                "id": 5,
                "name": "Resort Main Pool & Spa Filtration",
                "category": "Pool",
                "status": "warning",
                "health_score": 77,
                "annual_consumption": 54200.0,
                "consumption_unit": "kWh",
                "efficiency_metric": "Turnover Rate 4.1h",
                "detected_anomalies_count": 1,
                "potential_savings_mad": 4600.0,
                "operating_hours": 8760.0
            },
            {
                "id": 6,
                "name": "Walk-In Kitchen Cold Storage (Chillers & Freezers)",
                "category": "Refrigeration",
                "status": "warning",
                "health_score": 75,
                "annual_consumption": 36800.0,
                "consumption_unit": "kWh",
                "efficiency_metric": "Duty Cycle 92%",
                "detected_anomalies_count": 1,
                "potential_savings_mad": 5400.0,
                "operating_hours": 8760.0
            }
        ]

    def get_opportunities(self, property_id: str = "zephyr_marrakech") -> List[Dict[str, Any]]:
        # Exactly 17 opportunities totaling 65,200 MAD
        # Energy: 43,800 MAD
        # Water: 18,700 MAD
        # Other: 2,700 MAD
        return [
            {
                "id": 1,
                "title": "HVAC Setback & Chiller Scheduling Optimization",
                "resource_type": "Energy",
                "category": "HVAC",
                "annual_saving_mad": 18400.0,
                "estimated_investment_mad": 6000.0,
                "payback_months": 3.9,
                "confidence": "High",
                "severity": "Critical",
                "status": "Identified",
                "problem_statement": "HVAC operating inefficiency during shoulder seasons and low-occupancy periods.",
                "analytical_evidence": "Sub-meter analysis indicates primary chiller plant and AHU variable speed drives maintaining 85% nominal cooling flow even when occupancy drops below 35%, causing 13.6 MWh of redundant cooling during mild ambient weather.",
                "recommended_actions": [
                    "Review HVAC setback scheduling to modulate zone temperatures based on PMS occupancy feed.",
                    "Review chiller supply chilled water temperature reset parameters (+2°C during ambient <25°C).",
                    "Investigate low-occupancy operation and isolate unoccupied guest floor wings."
                ],
                "energy_reduction_mwh": 13.6,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 9.0
            },
            {
                "id": 2,
                "title": "Main Water Distribution Overnight Flow Rectification",
                "resource_type": "Water",
                "category": "Water Distribution",
                "annual_saving_mad": 9800.0,
                "estimated_investment_mad": 400.0,
                "payback_months": 0.5,
                "confidence": "High",
                "severity": "Critical",
                "status": "Identified",
                "problem_statement": "Abnormal overnight water flow indicative of distribution pipe or fixture leak.",
                "analytical_evidence": "Smart meter telemetry captured persistent baseline flow of 5.9 m³/hour between 01:00 and 05:00, compared to expected baseline of 1.8 m³/hour. This represents 4,500 m³ of annual continuous loss.",
                "recommended_actions": [
                    "Investigate persistent overnight flow and inspect the main distribution / irrigation / guest-room circuits.",
                    "Isolate irrigation solenoid valves and verify shutoff seals.",
                    "Inspect secondary expansion valves on guest wing domestic hot water loops."
                ],
                "energy_reduction_mwh": 0.0,
                "water_reduction_m3": 4500.0,
                "carbon_reduction_tco2e": 0.8
            },
            {
                "id": 3,
                "title": "Chiller Baseload Night Lockout & Staging",
                "resource_type": "Energy",
                "category": "Chiller",
                "annual_saving_mad": 11200.0,
                "estimated_investment_mad": 1700.0,
                "payback_months": 1.8,
                "confidence": "High",
                "severity": "High",
                "status": "Identified",
                "problem_statement": "Dual chiller operation during nocturnal low-load hours.",
                "analytical_evidence": "Telemetry shows Chiller #2 maintaining standby circulation between 23:00 and 06:00 despite ambient temperatures falling under 21°C.",
                "recommended_actions": [
                    "Program automated BMS lockout to isolate Chiller #2 when total load falls under 180kW.",
                    "Calibrate differential pressure bypass to avoid false start triggers."
                ],
                "energy_reduction_mwh": 8.3,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 5.5
            },
            {
                "id": 4,
                "title": "Kitchen Cold Storage Door Gasket & Defrost Tuning",
                "resource_type": "Energy",
                "category": "Refrigeration",
                "annual_saving_mad": 5400.0,
                "estimated_investment_mad": 950.0,
                "payback_months": 2.1,
                "confidence": "High",
                "severity": "Medium",
                "status": "Identified",
                "problem_statement": "Walk-in cold room compressor running 92% of the day due to thermal bypass.",
                "analytical_evidence": "Temperature and power sub-metering on kitchen chiller rooms show temperature drifting 3.2°C above setpoint during peak prep hours due to worn silicone gaskets.",
                "recommended_actions": [
                    "Replace magnetic strip gaskets on cold rooms 1 and 2.",
                    "Implement demand defrost controller based on coil differential pressure."
                ],
                "energy_reduction_mwh": 4.0,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 2.6
            },
            {
                "id": 5,
                "title": "Domestic Hot Water Recirculation Balancing",
                "resource_type": "Water",
                "category": "Hot Water",
                "annual_saving_mad": 5300.0,
                "estimated_investment_mad": 1850.0,
                "payback_months": 4.2,
                "confidence": "Medium",
                "severity": "Medium",
                "status": "Identified",
                "problem_statement": "Unbalanced DHW return loops causing excessive purge times in guest wings.",
                "analytical_evidence": "Flow meters indicate guest rooms in Wing B experience 45-second hot water wait times, resulting in estimated 480 m³ of fresh potable water run down drains annually.",
                "recommended_actions": [
                    "Install dynamic balancing valves on DHW return risers.",
                    "Adjust secondary recirculation pump speed curve."
                ],
                "energy_reduction_mwh": 0.0,
                "water_reduction_m3": 365.0,
                "carbon_reduction_tco2e": 0.4
            },
            {
                "id": 6,
                "title": "Swimming Pool Circulation Pump VFD Eco-Mode",
                "resource_type": "Energy",
                "category": "Pool",
                "annual_saving_mad": 4600.0,
                "estimated_investment_mad": 450.0,
                "payback_months": 1.2,
                "confidence": "High",
                "severity": "Medium",
                "status": "Identified",
                "problem_statement": "Pool filtration pumps operating at 100% capacity continuously.",
                "analytical_evidence": "Filtration system consumes 148 kWh/day constantly, well above Moroccan luxury resort benchmark standards for night filtration.",
                "recommended_actions": [
                    "Configure night frequency reduction on existing VFD drives from 50Hz to 35Hz between 21:00 and 07:00."
                ],
                "energy_reduction_mwh": 3.4,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 2.2
            },
            {
                "id": 7,
                "title": "Landscape Drip Irrigation Smart Weather Cutoff",
                "resource_type": "Water",
                "category": "Water Distribution",
                "annual_saving_mad": 3600.0,
                "estimated_investment_mad": 1200.0,
                "payback_months": 4.0,
                "confidence": "High",
                "severity": "Medium",
                "status": "Identified",
                "problem_statement": "Irrigation cycles running following rainfall and high humidity periods.",
                "analytical_evidence": "Water meters show 12 m³/day applied to gardens regardless of ambient precipitation.",
                "recommended_actions": [
                    "Connect local rain and soil moisture sensor to irrigation control panel."
                ],
                "energy_reduction_mwh": 0.0,
                "water_reduction_m3": 250.0,
                "carbon_reduction_tco2e": 0.1
            },
            {
                "id": 8,
                "title": "Exterior & Pathway Lighting Photocell Sunset Sync",
                "resource_type": "Energy",
                "category": "Lighting",
                "annual_saving_mad": 2300.0,
                "estimated_investment_mad": 300.0,
                "payback_months": 1.6,
                "confidence": "High",
                "severity": "Low",
                "status": "Identified",
                "problem_statement": "Exterior perimeter lighting switches on 90 minutes before dusk.",
                "analytical_evidence": "Timer relay drift causes 18.5 kW lighting load to activate prematurely throughout the year.",
                "recommended_actions": [
                    "Replace mechanical timer with astronomical digital clock adjusted for Marrakech latitude (31.63° N)."
                ],
                "energy_reduction_mwh": 1.7,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 1.1
            },
            {
                "id": 9,
                "title": "Laundry Steam Condensate Return Optimization",
                "resource_type": "Energy",
                "category": "Baseload",
                "annual_saving_mad": 1900.0,
                "estimated_investment_mad": 800.0,
                "payback_months": 5.1,
                "confidence": "Medium",
                "severity": "Low",
                "status": "Identified",
                "problem_statement": "Laundry condensate trap blowing live steam into drain pit.",
                "analytical_evidence": "Thermal imaging and high boiler makeup water volumes show inverted steam trap failed open.",
                "recommended_actions": [
                    "Replace steam trap #3 on commercial ironer line.",
                    "Verify condensate tank flash return."
                ],
                "energy_reduction_mwh": 1.4,
                "water_reduction_m3": 0.0,
                "carbon_reduction_tco2e": 0.9
            },
            # Additional opportunities to complete the 17 opportunities totaling 65,200 MAD
            {"id": 10, "title": "Guest Room Aerator Flow Calibration (Wing A & B)", "resource_type": "Other", "category": "Water Distribution", "annual_saving_mad": 1400.0, "estimated_investment_mad": 450.0, "payback_months": 3.9, "confidence": "Medium", "severity": "Low", "status": "Identified", "problem_statement": "Showerhead flows exceeding 11 L/min.", "analytical_evidence": "Audits indicate flow restrictors missing in 34 guest bathrooms.", "recommended_actions": ["Fit 7.5 L/min pressure-compensating aerators."], "energy_reduction_mwh": 0.0, "water_reduction_m3": 95.0, "carbon_reduction_tco2e": 0.1},
            {"id": 11, "title": "Pool Thermal Night Blanket Deployment Protocol", "resource_type": "Other", "category": "Pool", "annual_saving_mad": 1300.0, "estimated_investment_mad": 500.0, "payback_months": 4.6, "confidence": "Medium", "severity": "Low", "status": "Identified", "problem_statement": "Thermal radiation loss from outdoor heated pool during cool Marrakech nights.", "analytical_evidence": "Boiler gas telemetry shows 32% spikes between 02:00 and 06:00.", "recommended_actions": ["Deploy automated thermal blanket every evening at closing."], "energy_reduction_mwh": 0.9, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.6},
            {"id": 12, "title": "Conference Room HVAC Standby Reset Protocol", "resource_type": "Other", "category": "HVAC", "annual_saving_mad": 800.0, "estimated_investment_mad": 200.0, "payback_months": 3.0, "confidence": "High", "severity": "Low", "status": "Identified", "problem_statement": "Meeting rooms conditioning running during empty weekdays.", "analytical_evidence": "Conference AHU consuming 24 kWh daily when rooms are unreserved.", "recommended_actions": ["Link meeting booking calendar to BMS schedule."], "energy_reduction_mwh": 0.6, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.4},
            {"id": 13, "title": "Fitness Center & Spa Air Exchange Setpoint Tuning", "resource_type": "Other", "category": "HVAC", "annual_saving_mad": 700.0, "estimated_investment_mad": 150.0, "payback_months": 2.6, "confidence": "High", "severity": "Low", "status": "Identified", "problem_statement": "Continuous high-volume outside air ventilation.", "analytical_evidence": "Exhaust fans running at 100% capacity regardless of indoor CO2 levels.", "recommended_actions": ["Install demand controlled ventilation with CO2 sensor."], "energy_reduction_mwh": 0.5, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.3},
            {"id": 14, "title": "Staff Cafeteria Cooling Setpoint Normalization", "resource_type": "Other", "category": "HVAC", "annual_saving_mad": 600.0, "estimated_investment_mad": 100.0, "payback_months": 2.0, "confidence": "High", "severity": "Low", "status": "Identified", "problem_statement": "Thermostat set to 19°C continuously.", "analytical_evidence": "Sub-meter logs show sub-cooling during shift changeovers.", "recommended_actions": ["Lock thermostat setpoint to 23°C."], "energy_reduction_mwh": 0.4, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.3},
            {"id": 15, "title": "Secondary Water Softener Backwash Frequency Tuning", "resource_type": "Other", "category": "Water Distribution", "annual_saving_mad": 500.0, "estimated_investment_mad": 200.0, "payback_months": 4.8, "confidence": "Medium", "severity": "Low", "status": "Identified", "problem_statement": "Timer-based backwash triggering too frequently.", "analytical_evidence": "Backwash occurs every 48 hours regardless of water hardness breakthrough.", "recommended_actions": ["Switch from calendar time to volumetric water meter triggering."], "energy_reduction_mwh": 0.0, "water_reduction_m3": 35.0, "carbon_reduction_tco2e": 0.0},
            {"id": 16, "title": "BOH Server Room AC Free-Cooling Ventilation", "resource_type": "Other", "category": "HVAC", "annual_saving_mad": 400.0, "estimated_investment_mad": 200.0, "payback_months": 6.0, "confidence": "Medium", "severity": "Low", "status": "Identified", "problem_statement": "Compressor AC runs during winter nights when outside air is 8°C.", "analytical_evidence": "Server room cooling consumes 1.2 kW continuous load year-round.", "recommended_actions": ["Add fresh air economizer damper with filtration."], "energy_reduction_mwh": 0.3, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.2},
            {"id": 17, "title": "Underground Parking Ventilation Carbon Monoxide Sensing", "resource_type": "Other", "category": "Baseload", "annual_saving_mad": 300.0, "estimated_investment_mad": 150.0, "payback_months": 6.0, "confidence": "High", "severity": "Low", "status": "Identified", "problem_statement": "Exhaust jet fans operating on fixed 12-hour duty cycles.", "analytical_evidence": "Jet fans drawing power while parking garage is empty.", "recommended_actions": ["Modulate fan speed via calibrated CO detection thresholds."], "energy_reduction_mwh": 0.2, "water_reduction_m3": 0.0, "carbon_reduction_tco2e": 0.1}
        ]

    def get_portfolio(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": 1,
                "name": "Zephyr Marrakech",
                "city": "Marrakech",
                "country": "Morocco",
                "rooms": 180,
                "score": 78,
                "annual_savings_mad": 65200.0,
                "status": "Review",
                "integration": "Live Demo Active",
                "last_sync": "Today, 10:45 AM"
            },
            {
                "id": 2,
                "name": "Zephyr Agadir",
                "city": "Agadir",
                "country": "Morocco",
                "rooms": 220,
                "score": 84,
                "annual_savings_mad": 48900.0,
                "status": "Pending Onboarding",
                "integration": "Pending Integration",
                "last_sync": "Scheduled Pilot"
            },
            {
                "id": 3,
                "name": "Zephyr Fès",
                "city": "Fès",
                "country": "Morocco",
                "rooms": 140,
                "score": 72,
                "annual_savings_mad": 54100.0,
                "status": "Pending Onboarding",
                "integration": "Pending Integration",
                "last_sync": "Scheduled Pilot"
            }
        ]
