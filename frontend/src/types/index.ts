export interface HeroKPIs {
  resource_efficiency_score: number;
  resource_efficiency_benchmark: number;
  annual_savings_opportunity_mad: number;
  energy_variance_pct: number;
  water_variance_pct: number;
  carbon_variance_pct: number;
  identified_opportunities_count: number;
  savings_breakdown: {
    energy_mad: number;
    water_mad: number;
    other_mad: number;
  };
  property_name: string;
  location: string;
  status_label: string;
  currency: string;
}

export interface ConsumptionPoint {
  period: string;
  actual: number;
  expected: number;
  variance_pct: number;
  cost_mad: number;
}

export interface EnergyAnomaly {
  id: number;
  title: string;
  equipment: string;
  annual_saving_mad: number;
  payback_months: number;
  confidence: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  variance: string;
  evidence: string;
}

export interface EnergyData {
  current_consumption_kwh: number;
  expected_consumption_kwh: number;
  variance_pct: number;
  cost_mad: number;
  co2_tonnes: number;
  intensity_kwh_per_room: number;
  intensity_kwh_per_guest_night: number;
  breakdown_pct: Record<string, number>;
  monthly_trend: ConsumptionPoint[];
  anomalies: EnergyAnomaly[];
}

export interface WaterAnomaly {
  title: string;
  type: string;
  observed_overnight_flow: string;
  expected_overnight_flow: string;
  estimated_annual_excess_m3: number;
  estimated_annual_cost_mad: number;
  confidence: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  recommendation: string;
  cta_action: string;
  opportunity_id: number;
}

export interface WaterData {
  current_consumption_m3: number;
  expected_consumption_m3: number;
  variance_pct: number;
  cost_mad: number;
  litres_per_guest_night: number;
  monthly_trend: ConsumptionPoint[];
  prominent_anomaly: WaterAnomaly;
}

export interface ScopeBreakdown {
  source: string;
  emissions_tco2e: number;
  pct: number;
}

export interface CarbonData {
  scope_1_tco2e: number;
  scope_2_tco2e: number;
  total_tco2e: number;
  expected_total_tco2e: number;
  variance_pct: number;
  co2e_per_guest_night_kg: number;
  potential_annual_reduction_tco2e: number;
  emission_factors: Record<string, string>;
  scope_breakdown: ScopeBreakdown[];
  disclaimer: string;
}

export interface Asset {
  id: number;
  name: string;
  category: 'HVAC' | 'Boiler' | 'Pump' | 'Pool' | 'Refrigeration';
  status: 'optimal' | 'warning' | 'critical';
  health_score: number;
  annual_consumption: number;
  consumption_unit: string;
  efficiency_metric: string;
  detected_anomalies_count: number;
  potential_savings_mad: number;
  operating_hours: number;
}

export interface Opportunity {
  id: number;
  title: string;
  resource_type: 'Energy' | 'Water' | 'Other';
  category: string;
  annual_saving_mad: number;
  estimated_investment_mad: number;
  payback_months: number;
  confidence: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Identified' | 'In Review' | 'Approved' | 'Implemented';
  problem_statement: string;
  analytical_evidence: string;
  recommended_actions: string[];
  energy_reduction_mwh?: number;
  water_reduction_m3?: number;
  carbon_reduction_tco2e?: number;
}

export interface PortfolioProperty {
  id: number;
  name: string;
  city: string;
  country: string;
  rooms: number;
  score: number;
  annual_savings_mad: number;
  status: string;
  integration: string;
  last_sync: string;
}

export interface AIResponse {
  question: string;
  answer: string;
  grounded_data: Record<string, any>;
  confidence: string;
  suggested_followups: string[];
  mode: string;
}
