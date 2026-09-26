import datetime
from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(20), unique=True, index=True)
    city = Column(String(50), default="Marrakech")
    country = Column(String(50), default="Morocco")
    rooms = Column(Integer, default=180)
    built_year = Column(Integer, default=2018)
    climate_zone = Column(String(50), default="Hot Semi-Arid (BSh)")
    efficiency_score = Column(Integer, default=78)
    annual_savings_mad = Column(Float, default=65200.0)

    meters = relationship("Meter", back_populates="property", cascade="all, delete-orphan")
    assets = relationship("Asset", back_populates="property", cascade="all, delete-orphan")
    opportunities = relationship("Opportunity", back_populates="property", cascade="all, delete-orphan")
    occupancy_records = relationship("Occupancy", back_populates="property", cascade="all, delete-orphan")
    weather_records = relationship("Weather", back_populates="property", cascade="all, delete-orphan")

class Meter(Base):
    __tablename__ = "meters"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    name = Column(String(100), nullable=False)
    meter_type = Column(String(50), nullable=False)  # electricity, water, lpg, diesel
    unit = Column(String(20), nullable=False)        # kWh, m3, kg, L
    location = Column(String(100), default="Main Technical Room")
    is_main = Column(Boolean, default=False)
    parent_meter_id = Column(Integer, nullable=True)

    property = relationship("Property", back_populates="meters")
    measurements = relationship("Measurement", back_populates="meter", cascade="all, delete-orphan")

class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)
    meter_id = Column(Integer, ForeignKey("meters.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False, index=True)
    value = Column(Float, nullable=False)
    expected_value = Column(Float, nullable=True)
    variance = Column(Float, nullable=True)
    cost_mad = Column(Float, nullable=True)
    co2_kg = Column(Float, nullable=True)

    meter = relationship("Meter", back_populates="measurements")

class Occupancy(Base):
    __tablename__ = "occupancy"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    occupied_rooms = Column(Integer, nullable=False)
    total_rooms = Column(Integer, default=180)
    guest_nights = Column(Integer, nullable=False)
    occupancy_rate = Column(Float, nullable=False)

    property = relationship("Property", back_populates="occupancy_records")

class Weather(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    avg_temp_c = Column(Float, nullable=False)
    max_temp_c = Column(Float, nullable=False)
    min_temp_c = Column(Float, nullable=False)
    cooling_degree_days = Column(Float, default=0.0)
    heating_degree_days = Column(Float, default=0.0)
    humidity_pct = Column(Float, default=45.0)

    property = relationship("Property", back_populates="weather_records")

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # HVAC, Chiller, Boiler, Pump, Pool, Refrigeration
    status = Column(String(30), default="optimal") # optimal, warning, critical
    health_score = Column(Integer, default=85)
    annual_consumption = Column(Float, default=0.0)
    consumption_unit = Column(String(20), default="kWh")
    efficiency_metric = Column(String(50), default="COP 3.2")
    detected_anomalies_count = Column(Integer, default=0)
    potential_savings_mad = Column(Float, default=0.0)
    operating_hours = Column(Float, default=24.0)

    property = relationship("Property", back_populates="assets")

class Tariff(Base):
    __tablename__ = "tariffs"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    utility_type = Column(String(50), nullable=False) # electricity, water, gas
    tariff_name = Column(String(100), nullable=False)
    rate_per_unit_mad = Column(Float, nullable=False)
    peak_rate_mad = Column(Float, default=0.0)
    off_peak_rate_mad = Column(Float, default=0.0)
    effective_from = Column(Date, default=datetime.date.today)

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    title = Column(String(200), nullable=False)
    resource_type = Column(String(50), nullable=False) # Energy, Water, Other
    category = Column(String(50), nullable=False)      # HVAC, Chiller, Hot Water, Pool, Refrigeration, Baseload, Water Distribution
    annual_saving_mad = Column(Float, nullable=False)
    estimated_investment_mad = Column(Float, default=0.0)
    payback_months = Column(Float, default=0.0)
    confidence = Column(String(20), default="High")    # High, Medium, Low
    severity = Column(String(20), default="Medium")    # Critical, High, Medium, Low
    status = Column(String(30), default="Identified")  # Identified, In Review, Approved, Implemented
    problem_statement = Column(Text, nullable=True)
    analytical_evidence = Column(Text, nullable=True)
    recommended_actions = Column(Text, nullable=True)
    energy_reduction_mwh = Column(Float, default=0.0)
    water_reduction_m3 = Column(Float, default=0.0)
    carbon_reduction_tco2e = Column(Float, default=0.0)

    property = relationship("Property", back_populates="opportunities")

class Benchmark(Base):
    __tablename__ = "benchmarks"

    id = Column(Integer, primary_key=True, index=True)
    property_type = Column(String(50), default="4-star Resort")
    region = Column(String(50), default="Marrakech-Safi")
    kwh_per_room_low = Column(Float, default=24.0)
    kwh_per_room_median = Column(Float, default=32.0)
    kwh_per_room_high = Column(Float, default=45.0)
    litres_per_guest_median = Column(Float, default=410.0)

class EmissionFactor(Base):
    __tablename__ = "emission_factors"

    id = Column(Integer, primary_key=True, index=True)
    fuel_type = Column(String(50), unique=True, nullable=False)
    kg_co2e_per_unit = Column(Float, nullable=False)
    source = Column(String(100), default="ONEE / Ministry of Energy Transition Morocco")
    notes = Column(String(255), nullable=True)
