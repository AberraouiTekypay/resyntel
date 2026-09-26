import os
from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    PROJECT_NAME: str = "Resyntel"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./resintel.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "zephyr-marrakech-enterprise-secret-key-2026")
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "https://*.vercel.app",
        "*"
    ]
    DEMO_MODE: bool = True
    CURRENCY_CODE: str = "MAD"
    CURRENCY_NAME: str = "Moroccan Dirham"
    PROPERTY_DEFAULT: str = "Zephyr Marrakech"
    LOCATION_DEFAULT: str = "Marrakech, Morocco"
    
    # Emission Factors (Morocco ONEE Grid & Fuel Assumptions)
    GRID_EMISSION_FACTOR_KG_KWH: float = 0.660  # kg CO2e / kWh
    DIESEL_EMISSION_FACTOR_KG_L: float = 2.68    # kg CO2e / litre
    LPG_EMISSION_FACTOR_KG_KG: float = 2.98      # kg CO2e / kg

    # Moroccan Utility Tariffs
    ELECTRICITY_TARIFF_MAD_KWH: float = 1.35     # Base average MT tariff
    PEAK_ELECTRICITY_TARIFF_MAD_KWH: float = 1.65 # Peak hours tariff
    WATER_TARIFF_MAD_M3: float = 14.50           # RADEEMA commercial tariff

settings = Settings()
