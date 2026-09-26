from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, date

class PropertyBase(BaseModel):
    name: str
    code: str
    city: str
    country: str
    rooms: int
    built_year: int
    climate_zone: str
    efficiency_score: int
    annual_savings_mad: float

class PropertyResponse(PropertyBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class HeroKPIsResponse(BaseModel):
    resource_efficiency_score: int = 78
    resource_efficiency_benchmark: int = 100
    annual_savings_opportunity_mad: float = 65200.0
    energy_variance_pct: float = 12.0
    water_variance_pct: float = 18.0
    carbon_variance_pct: float = 11.0
    identified_opportunities_count: int = 17
    savings_breakdown: dict = {
        "energy_mad": 43800.0,
        "water_mad": 18700.0,
        "other_mad": 2700.0
    }
    property_name: str = "Zephyr Marrakech"
    location: str = "Marrakech · Morocco"
    status_label: str = "DEMO DATA — LIVE HOTEL INTEGRATION PENDING"
    currency: str = "MAD"

class ConsumptionPoint(BaseModel):
    period: str
    actual: float
    expected: float
    variance_pct: float
    cost_mad: float

class ResourcePerformanceResponse(BaseModel):
    energy: List[ConsumptionPoint]
    water: List[ConsumptionPoint]

class PriorityOpportunity(BaseModel):
    id: int
    problem: str
    resource: str
    annual_opportunity_mad: float
    payback_months: float
    confidence: str
    severity: str
    category: str

class OpportunityDetail(BaseModel):
    id: int
    title: str
    resource_type: str
    category: str
    annual_saving_mad: float
    estimated_investment_mad: float
    payback_months: float
    confidence: str
    severity: str
    status: str
    problem_statement: str
    analytical_evidence: str
    recommended_actions: List[str]
    energy_reduction_mwh: Optional[float] = None
    water_reduction_m3: Optional[float] = None
    carbon_reduction_tco2e: Optional[float] = None

class EnergyIntelligenceResponse(BaseModel):
    current_consumption_kwh: float
    expected_consumption_kwh: float
    variance_pct: float
    cost_mad: float
    co2_tonnes: float
    intensity_kwh_per_room: float
    intensity_kwh_per_guest_night: float
    breakdown_pct: dict
    monthly_trend: List[ConsumptionPoint]
    anomalies: List[dict]

class WaterIntelligenceResponse(BaseModel):
    current_consumption_m3: float
    expected_consumption_m3: float
    variance_pct: float
    cost_mad: float
    litres_per_guest_night: float
    monthly_trend: List[ConsumptionPoint]
    prominent_anomaly: dict

class CarbonIntelligenceResponse(BaseModel):
    scope_1_tco2e: float
    scope_2_tco2e: float
    total_tco2e: float
    variance_pct: float
    co2e_per_guest_night_kg: float
    potential_annual_reduction_tco2e: float
    emission_factors: dict
    disclaimer: str = "Calculated from energy consumption and configured emission factors."

class AssetResponse(BaseModel):
    id: int
    name: str
    category: str
    status: str
    health_score: int
    annual_consumption: float
    consumption_unit: str
    efficiency_metric: str
    detected_anomalies_count: int
    potential_savings_mad: float
    operating_hours: float

class AskQuestionRequest(BaseModel):
    question: str

class AskQuestionResponse(BaseModel):
    question: str
    answer: str
    grounded_data: dict
    confidence: str
    suggested_followups: List[str]
    mode: str = "deterministic_grounded"
