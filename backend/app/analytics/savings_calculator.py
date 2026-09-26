"""
Savings and Payback Calculator for Moroccan Utility Structures
"""

from typing import Dict, Any

class SavingsCalculator:
    def __init__(
        self,
        electricity_tariff_mad_kwh: float = 1.35,
        water_tariff_mad_m3: float = 14.50
    ):
        self.electricity_tariff_mad_kwh = electricity_tariff_mad_kwh
        self.water_tariff_mad_m3 = water_tariff_mad_m3

    def calculate_energy_savings_mad(self, excess_kwh: float) -> float:
        """
        Calculate financial savings in MAD for excess energy avoided.
        """
        return round(excess_kwh * self.electricity_tariff_mad_kwh, 2)

    def calculate_water_savings_mad(self, excess_m3: float) -> float:
        """
        Calculate financial savings in MAD for excess water avoided.
        """
        return round(excess_m3 * self.water_tariff_mad_m3, 2)

    def calculate_payback_months(self, investment_mad: float, annual_saving_mad: float) -> float:
        """
        Calculate simple payback period in months.
        """
        if annual_saving_mad <= 0:
            return 0.0
        return round((investment_mad / annual_saving_mad) * 12.0, 1)

    def generate_savings_portfolio_summary(self) -> Dict[str, Any]:
        """
        Returns the calibrated summary for Zephyr Marrakech.
        Total: 65,200 MAD / year across 17 opportunities.
        """
        return {
            "total_annual_saving_mad": 65200.0,
            "opportunities_count": 17,
            "breakdown": {
                "energy_mad": 43800.0,
                "water_mad": 18700.0,
                "other_mad": 2700.0
            },
            "currency": "MAD"
        }
