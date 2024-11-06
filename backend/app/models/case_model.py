from beanie import Document, Indexed, Link
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from backend.app.models.analysis_model import ClinicalAnalysis

class VitalSigns(BaseModel): 
    """Database model for storing vital signs measurements."""
    blood_pressure: str
    heart_rate: int
    temperature: float
    spo2: int
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    respiratory_rate: Optional[int] = None

class ClinicalCase(Document):
    """
    MongoDB document model for clinical cases.
    Stores comprehensive medical consultation data including patient information,
    symptoms, vital signs, and AI-generated analysis.
    """
    patient_id: Indexed(str)  # Reference to Patient
    chief_complaint: str
    symptoms: List[str]
    symptoms_description: str
    vital_signs: VitalSigns
    current_medications: str
    allergies: str
    physical_examination: Optional[str] = None
    lab_results: Optional[str] = None
    family_history: Optional[str] = None
    social_history: Optional[str] = None
    
    analysis: List[ClinicalAnalysis]
    
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Settings:
        name = "clinical_cases"