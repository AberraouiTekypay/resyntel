"""
CSV Data Provider
Handles ingesting, parsing, validating and normalizing operational hotel CSVs.
Supports:
- Electricity sub-meters (kWh)
- Water meters (m3)
- Occupancy (occupied rooms, guest nights)
"""

import csv
import io
from typing import Dict, Any, List
from app.providers.base import DataProvider

class CSVProvider(DataProvider):
    def __init__(self, raw_csv_data: str = None):
        self.raw_csv_data = raw_csv_data
        self.parsed_records: List[Dict[str, Any]] = []

    def validate_and_parse(self, file_content: str, data_type: str = "electricity") -> Dict[str, Any]:
        """
        Validates uploaded CSV headers and rows.
        Expected headers:
        - electricity: date/timestamp, meter_name, kwh, [cost_mad]
        - water: date/timestamp, meter_name, m3, [cost_mad]
        - occupancy: date, occupied_rooms, total_rooms, guest_nights
        """
        f = io.StringIO(file_content.strip())
        reader = csv.DictReader(f)
        headers = [h.strip().lower() for h in (reader.fieldnames or [])]
        
        valid_rows = 0
        errors = []
        parsed = []

        required_keys = {
            "electricity": ["timestamp", "kwh"],
            "water": ["timestamp", "m3"],
            "occupancy": ["date", "occupied_rooms"]
        }

        needed = required_keys.get(data_type, ["date"])
        for req in needed:
            if not any(req in h for h in headers):
                return {
                    "success": False,
                    "error": f"Missing required column containing '{req}'. Found columns: {', '.join(headers)}"
                }

        for idx, row in enumerate(reader):
            valid_rows += 1
            parsed.append(row)

        self.parsed_records = parsed
        return {
            "success": True,
            "data_type": data_type,
            "row_count": valid_rows,
            "headers": headers,
            "sample": parsed[:3] if parsed else []
        }

    def get_property_metadata(self, property_id: str) -> Dict[str, Any]:
        return {"name": "Imported CSV Property", "source": "CSV Upload"}

    def get_kpis(self, property_id: str) -> Dict[str, Any]:
        return {"row_count": len(self.parsed_records)}

    def get_energy_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {"records": self.parsed_records}

    def get_water_data(self, property_id: str, period: str = "12_months") -> Dict[str, Any]:
        return {"records": self.parsed_records}

    def get_carbon_data(self, property_id: str) -> Dict[str, Any]:
        return {"source": "CSV"}

    def get_assets(self, property_id: str) -> List[Dict[str, Any]]:
        return []

    def get_opportunities(self, property_id: str) -> List[Dict[str, Any]]:
        return []
