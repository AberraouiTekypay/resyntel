"""
Base DataProvider Interface
Defines the contract for all telemetry and operational data providers.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List

class DataProvider(ABC):
    @abstractmethod
    def get_property_metadata(self, property_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_kpis(self, property_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_energy_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_water_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_carbon_data(self, property_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_assets(self, property_id: str) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_opportunities(self, property_id: str) -> List[Dict[str, Any]]:
        pass
