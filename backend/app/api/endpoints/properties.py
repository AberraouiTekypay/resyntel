from fastapi import APIRouter
from app.providers.demo_provider import DemoDataProvider

router = APIRouter()
provider = DemoDataProvider()

@router.get("/")
def get_properties():
    return [provider.get_property_metadata()]

@router.get("/{property_id}")
def get_property(property_id: str):
    return provider.get_property_metadata(property_id)
