import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["product"] == "Resyntel"
    assert data["currency"] == "MAD"
    assert "EM300" in data["brand"]

def test_kpis_endpoint():
    response = client.get("/api/kpis/")
    assert response.status_code == 200
    data = response.json()
    assert data["resource_efficiency_score"] == 78
    assert data["annual_savings_opportunity_mad"] == 65200.0
    assert data["energy_variance_pct"] == 12.0
    assert data["water_variance_pct"] == 18.0
    assert data["carbon_variance_pct"] == 11.0
    assert data["identified_opportunities_count"] == 17
    assert data["savings_breakdown"]["energy_mad"] == 43800.0
    assert data["savings_breakdown"]["water_mad"] == 18700.0
    assert data["savings_breakdown"]["other_mad"] == 2700.0

def test_energy_endpoint():
    response = client.get("/api/energy/")
    assert response.status_code == 200
    data = response.json()
    assert data["variance_pct"] == 12.0
    assert len(data["monthly_trend"]) == 12
    assert "HVAC" in data["breakdown_pct"]
    assert len(data["anomalies"]) > 0

def test_water_endpoint():
    response = client.get("/api/water/")
    assert response.status_code == 200
    data = response.json()
    assert data["variance_pct"] == 18.0
    anomaly = data["prominent_anomaly"]
    assert anomaly["observed_overnight_flow"] == "5.9 m³ / hour"
    assert anomaly["expected_overnight_flow"] == "1.8 m³ / hour"
    assert anomaly["estimated_annual_cost_mad"] == 9800.0
    assert anomaly["confidence"] == "High"

def test_carbon_endpoint():
    response = client.get("/api/carbon/")
    assert response.status_code == 200
    data = response.json()
    assert data["variance_pct"] == 11.0
    assert "disclaimer" in data

def test_opportunities_endpoint():
    response = client.get("/api/opportunities/")
    assert response.status_code == 200
    data = response.json()
    assert data["hero_total_annual_saving_mad"] == 65200.0
    assert data["count"] == 17
    assert data["currency"] == "MAD"

def test_opportunity_detail_hvac():
    response = client.get("/api/opportunities/1")
    assert response.status_code == 200
    data = response.json()
    assert data["annual_saving_mad"] == 18400.0
    assert data["estimated_investment_mad"] == 6000.0
    assert data["payback_months"] == 3.9
    assert data["confidence"] == "High"
    assert len(data["recommended_actions"]) >= 3

def test_ask_ai_endpoint():
    response = client.post("/api/ask/", json={"question": "What should we fix first?"})
    assert response.status_code == 200
    data = response.json()
    assert "Water Leak" in data["answer"] or "HVAC" in data["answer"]
    assert data["confidence"] is not None

def test_portfolio_endpoint():
    response = client.get("/api/portfolio/")
    assert response.status_code == 200
    data = response.json()
    assert len(data["properties"]) >= 1
    assert data["properties"][0]["name"] == "Zephyr Marrakech"
