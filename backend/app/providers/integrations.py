"""
Enterprise Integrations: Metrikus, BMS, and IoT Providers (Stubs for V3 Architecture)
"""

from typing import Dict, Any, List
from app.providers.base import DataProvider

class MetrikusProvider(DataProvider):
    """
    Adapter for Metrikus API normalized building telemetry.
    Planned for V3 rollout.
    """
    def __init__(self, api_key: str = None, space_id: str = None):
        self.api_key = api_key
        self.space_id = space_id

    def get_property_metadata(self, property_id: str) -> Dict[str, Any]:
        return {"integration": "Metrikus API", "status": "Ready for V3 connector"}

    def get_kpis(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_energy_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_water_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_carbon_data(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_assets(self, property_id: str) -> List[Dict[str, Any]]:
        return []

    def get_opportunities(self, property_id: str) -> List[Dict[str, Any]]:
        return []


class BMSProvider(DataProvider):
    """
    BACnet / Modbus IP connector for hotel Central Building Management Systems.
    Planned for V3 rollout.
    """
    def __init__(self, host: str = None, port: int = 47808):
        self.host = host
        self.port = port

    def get_property_metadata(self, property_id: str) -> Dict[str, Any]:
        return {"integration": "BACnet/Modbus IP", "status": "Ready for V3 connector"}

    def get_kpis(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_energy_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_water_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_carbon_data(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_assets(self, property_id: str) -> List[Dict[str, Any]]:
        return []

    def get_opportunities(self, property_id: str) -> List[Dict[str, Any]]:
        return []


class IoTProvider(DataProvider):
    """
    MQTT / LoRaWAN IoT smart sensor provider for sub-meters, pulses, and flow sensors.
    """
    def __init__(self, broker_url: str = None):
        self.broker_url = broker_url

    def get_property_metadata(self, property_id: str) -> Dict[str, Any]:
        return {"integration": "LoRaWAN / MQTT", "status": "Ready for V3 connector"}

    def get_kpis(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_energy_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_water_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {}

    def get_carbon_data(self, property_id: str) -> Dict[str, Any]:
        return {}

    def get_assets(self, property_id: str) -> List[Dict[str, Any]]:
        return []

    def get_opportunities(self, property_id: str) -> List[Dict[str, Any]]:
        return []
