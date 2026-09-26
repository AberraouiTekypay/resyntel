from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider

router = APIRouter()
provider = DemoDataProvider()

@router.get("/")
def get_portfolio():
    return {
        "group_name": "Zephyr Hotels Group (Morocco)",
        "total_properties": 3,
        "active_pilot_properties": 1,
        "total_rooms": 540,
        "currency": "MAD",
        "portfolio_savings_opportunity_mad": 168200.0,
        "properties": provider.get_portfolio()
    }
