from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import HeroKPIsResponse

router = APIRouter()
provider = DemoDataProvider()

@router.get("/", response_model=HeroKPIsResponse)
def get_kpis(property_id: str = "zephyr_marrakech"):
    return provider.get_kpis(property_id)
