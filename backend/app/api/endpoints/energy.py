from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import EnergyIntelligenceResponse

router = APIRouter()
provider = DemoDataProvider()

@router.get("/", response_model=EnergyIntelligenceResponse)
def get_energy_intelligence(property_id: str = "zephyr_marrakech", period: str = "12_months"):
    return provider.get_energy_data(property_id, period)
