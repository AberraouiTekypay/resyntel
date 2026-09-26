from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import OpportunityDetail

router = APIRouter()
provider = DemoDataProvider()

@router.get("/")
def get_opportunities(
    resource: Optional[str] = Query(None, description="Filter by Energy, Water, or Other"),
    category: Optional[str] = Query(None, description="Filter by category (HVAC, Chiller, Hot Water, etc.)"),
    sort_by: Optional[str] = Query("savings", description="Sort by savings, payback, confidence, severity")
):
    opps = provider.get_opportunities("zephyr_marrakech")

    # Filter
    if resource and resource.lower() != "all":
        opps = [o for o in opps if o["resource_type"].lower() == resource.lower()]

    if category and category.lower() != "all":
        opps = [o for o in opps if category.lower() in o["category"].lower()]

    # Sort
    if sort_by == "savings":
        opps.sort(key=lambda x: x["annual_saving_mad"], reverse=True)
    elif sort_by == "payback":
        opps.sort(key=lambda x: x["payback_months"])
    elif sort_by == "confidence":
        conf_rank = {"High": 1, "Medium": 2, "Low": 3}
        opps.sort(key=lambda x: conf_rank.get(x["confidence"], 99))
    elif sort_by == "severity":
        sev_rank = {"Critical": 1, "High": 2, "Medium": 3, "Low": 4}
        opps.sort(key=lambda x: sev_rank.get(x["severity"], 99))

    return {
        "hero_total_annual_saving_mad": 65200.0,
        "count": len(opps),
        "currency": "MAD",
        "breakdown": {
            "energy_mad": 43800.0,
            "water_mad": 18700.0,
            "other_mad": 2700.0
        },
        "items": opps
    }

@router.get("/{opp_id}", response_model=OpportunityDetail)
def get_opportunity_detail(opp_id: int):
    opps = provider.get_opportunities("zephyr_marrakech")
    target = next((o for o in opps if o["id"] == opp_id), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Opportunity {opp_id} not found")
    return target
