from fastapi import APIRouter
from typing import List
from app.providers.demo_provider import DemoDataProvider
from app.schemas.schemas import AssetResponse

router = APIRouter()
provider = DemoDataProvider()

@router.get("/", response_model=List[AssetResponse])
def get_assets(property_id: str = "zephyr_marrakech"):
    return provider.get_assets(property_id)
