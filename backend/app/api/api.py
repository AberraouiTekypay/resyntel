from fastapi import APIRouter
from app.api.endpoints import (
    properties,
    kpis,
    energy,
    water,
    carbon,
    assets,
    opportunities,
    ask,
    portfolio,
    upload
)

api_router = APIRouter()
api_router.include_router(properties.router, prefix="/properties", tags=["properties"])
api_router.include_router(kpis.router, prefix="/kpis", tags=["kpis"])
api_router.include_router(energy.router, prefix="/energy", tags=["energy"])
api_router.include_router(water.router, prefix="/water", tags=["water"])
api_router.include_router(carbon.router, prefix="/carbon", tags=["carbon"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["opportunities"])
api_router.include_router(ask.router, prefix="/ask", tags=["ask"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
