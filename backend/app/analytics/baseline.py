"""
Moroccan Hospitality Baseline Analytical Model
Estimates expected electricity and water consumption based on:
- Room occupancy and guest-nights
- Marrakech climate degree days (CDD / HDD)
- Hotel operational baseloads
"""

from typing import Dict, Any

class BaselineModel:
    def __init__(
        self,
        base_electricity_kwh_day: float = 650.0,      # Standby, kitchens, lighting, server rooms
        kwh_per_occupied_room: float = 14.5,          # In-room lighting, plugs, guest amenities
        kwh_per_cdd: float = 48.0,                    # Cooling load sensitivity (Marrakech heat)
        kwh_per_hdd: float = 22.0,                    # Heating load sensitivity (winter nights)
        base_water_m3_day: float = 35.0,              # Kitchens, landscaping, pools, evaporation
        litres_per_guest_night: float = 310.0         # Showers, faucets, laundry per guest
    ):
        self.base_electricity_kwh_day = base_electricity_kwh_day
        self.kwh_per_occupied_room = kwh_per_occupied_room
        self.kwh_per_cdd = kwh_per_cdd
        self.kwh_per_hdd = kwh_per_hdd
        self.base_water_m3_day = base_water_m3_day
        self.litres_per_guest_night = litres_per_guest_night

    def calculate_expected_energy(
        self,
        occupied_rooms: int,
        cdd: float,
        hdd: float,
        days_in_period: int = 30
    ) -> float:
        """
        Calculate expected energy consumption in kWh for a given period.
        """
        daily_expected = (
            self.base_electricity_kwh_day +
            (occupied_rooms * self.kwh_per_occupied_room) +
            (cdd * self.kwh_per_cdd) +
            (hdd * self.kwh_per_hdd)
        )
        return round(daily_expected * days_in_period, 1)

    def calculate_expected_water(
        self,
        guest_nights: int,
        irrigation_days: int = 30,
        days_in_period: int = 30
    ) -> float:
        """
        Calculate expected water consumption in m3 for a given period.
        """
        daily_guest_water_m3 = (guest_nights * (self.litres_per_guest_night / 1000.0)) / days_in_period
        daily_total_m3 = self.base_water_m3_day + daily_guest_water_m3
        return round(daily_total_m3 * days_in_period, 1)

    def calculate_variance(self, actual: float, expected: float) -> Dict[str, Any]:
        """
        Calculate deviation percentage and absolute delta.
        """
        delta = actual - expected
        pct = (delta / expected * 100.0) if expected > 0 else 0.0
        return {
            "actual": actual,
            "expected": expected,
            "delta": round(delta, 2),
            "variance_pct": round(pct, 1),
            "is_inefficient": pct > 5.0
        }
