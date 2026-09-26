from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import WaterIntelligenceResponse

router = APIRouter()
provider = DemoDataProvider()

@router.get("/", response_model=WaterIntelligenceResponse)
def get_water_intelligence(property_id: str = "zephyr_marrakech", period: str = "12_months"):
    return provider.get_water_data(property_id, period)
