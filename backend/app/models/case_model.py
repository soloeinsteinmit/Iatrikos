from beanie import Document, Indexed
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

from backend.app.models.analysis_model import ClinicalAnalysis

class VitalSigns(BaseModel):
    """Database model for storing vital signs measurements."""
    blood_pressure: str = Field(
        ...,  # ... means required
        description="Blood pressure in format 'systolic/diastolic' (e.g., '120/80')",
        pattern=r'^\d{2,3}/\d{2,3}$'  # Validates format like "120/80"
    )
    heart_rate: int = Field(
        ...,
        description="Heart rate in beats per minute",
        ge=0,  # greater than or equal to 0
        le=300  # less than or equal to 300
    )
    temperature: float = Field(
        ...,
        description="Body temperature in Celsius",
        ge=25.0,
        le=45.0
    )
    oxygen_saturation: int = Field(
        ...,
        description="Oxygen saturation percentage (SpO2)",
        ge=0,
        le=100
    )
    respiratory_rate: int = Field(
        ...,
        description="Breaths per minute",
        ge=0,
        le=100
    )
    weight: Optional[float] = Field(
        None,
        description="Weight in kilograms",
        ge=0,
        le=700
    )
    height: Optional[float] = Field(
        None,
        description="Height in centimeters",
        ge=0,
        le=300
    )
    bmi: Optional[float] = Field(
        None,
        description="Body Mass Index",
        ge=0,
        le=100
    )
    measurements: Optional[List[Dict[str, Any]]] = Field(
        default_factory=list,
        description="Additional measurements in key-value pairs"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "blood_pressure": "120/80",
                "heart_rate": 75,
                "temperature": 37.0,
                "oxygen_saturation": 98,
                "respiratory_rate": 16,
                "weight": 70.5,
                "height": 170.0,
                "bmi": 24.4,
                "measurements": [
                    {"name": "glucose", "value": 95, "unit": "mg/dL"}
                ]
            }
        }
    )

class ClinicalCase(Document):
    """MongoDB document model for clinical cases."""
    patient_id: Optional[str] = None
    chief_complaint: str
    symptoms: List[str]
    symptoms_description: Optional[str] = None
    vital_signs: VitalSigns
    current_medications: List[Dict[str, Any]] = Field(default_factory=list)
    allergies: List[str]
    physical_examination: Optional[str] = None
    lab_results: List[Dict[str, Any]] = Field(default_factory=list)
    family_history: Optional[str] = None
    social_history: Optional[str] = None
    
    analysis: Optional[List[ClinicalAnalysis]] = Field(default_factory=list)
    
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    analysis_progress: float = Field(default=0.0)
    analysis_time_remaining: str = Field(default="pending")
    diagnoses: List[Dict[str, Any]] = Field(default_factory=list)
    differential_diagnoses: List[Dict[str, Any]] = Field(default_factory=list)
    key_findings: List[str] = Field(default_factory=list)
    risk_factors: List[str] = Field(default_factory=list)
    safety_checks: List[Dict[str, Any]] = Field(default_factory=list)
    recommended_actions: List[Dict[str, Any]] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    
    class Settings:
        name = "clinical_cases"