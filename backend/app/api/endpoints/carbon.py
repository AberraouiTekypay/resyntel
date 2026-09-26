from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import CarbonIntelligenceResponse

router = APIRouter()
provider = DemoDataProvider()

@router.get("/", response_model=CarbonIntelligenceResponse)
def get_carbon_intelligence(property_id: str = "zephyr_marrakech"):
    return provider.get_carbon_data(property_id)
