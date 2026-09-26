import pytest
from app.analytics.baseline import BaselineModel
from app.analytics.anomaly_detector import AnomalyDetector
from app.analytics.savings_calculator import SavingsCalculator
from app.analytics.carbon_calculator import CarbonCalculator

def test_baseline_energy_calculation():
    model = BaselineModel()
    expected = model.calculate_expected_energy(
        occupied_rooms=120,
        cdd=8.5,
        hdd=0.0,
        days_in_period=30
    )
    assert expected > 0
    assert isinstance(expected, float)

def test_baseline_water_calculation():
    model = BaselineModel()
    expected = model.calculate_expected_water(
        guest_nights=4200,
        days_in_period=30
    )
    assert expected > 0
    assert isinstance(expected, float)

def test_variance_calculation():
    model = BaselineModel()
    res = model.calculate_variance(actual=112.0, expected=100.0)
    assert res["delta"] == 12.0
    assert res["variance_pct"] == 12.0
    assert res["is_inefficient"] is True

def test_water_leak_anomaly_detection():
    detector = AnomalyDetector()
    readings = [5.8, 6.0, 5.9, 5.9]
    res = detector.detect_overnight_water_leak(readings, expected_nightly_flow_m3_per_hour=1.8)
    assert res["is_anomaly"] is True
    assert res["estimated_annual_cost_mad"] == 9800.0
    assert res["estimated_annual_excess_m3"] == 4500
    assert res["confidence"] == "High"

def test_hvac_inefficiency_detection():
    detector = AnomalyDetector()
    res = detector.detect_hvac_inefficiency(
        occupancy_rate=34.0,
        ambient_temp_c=22.0,
        hvac_kwh_actual=48500.0,
        hvac_kwh_expected=39800.0
    )
    assert res["annual_opportunity_mad"] == 18400.0
    assert res["payback_months"] == 3.9
    assert res["confidence"] == "High"

def test_savings_summary():
    calc = SavingsCalculator()
    summary = calc.generate_savings_portfolio_summary()
    assert summary["total_annual_saving_mad"] == 65200.0
    assert summary["opportunities_count"] == 17
    assert summary["breakdown"]["energy_mad"] == 43800.0
    assert summary["breakdown"]["water_mad"] == 18700.0
    assert summary["breakdown"]["other_mad"] == 2700.0
    assert summary["currency"] == "MAD"

def test_carbon_calculation():
    calc = CarbonCalculator()
    res = calc.calculate_total_carbon(
        electricity_kwh=542800.0,
        expected_electricity_kwh=484600.0,
        guest_nights=51200
    )
    assert res["variance_pct"] == 11.0
    assert res["scope_2_tco2e"] > 300.0
    assert "0.660" in res["emission_factors"]["grid_electricity"]
