from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.models.analysis import ClinicalAnalysis

class VitalSigns(BaseModel):
    """Base model for vital signs measurements."""
    blood_pressure: str
    heart_rate: int
    temperature: float
    spo2: int
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    respiratory_rate: Optional[int] = None

class ClinicalCaseBase(BaseModel):
    """
    Base model for a clinical case, representing a medical consultation.
    Contains all essential medical information about a patient's visit.
    """
    patient_id: str
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
    
    # analysis: List[ClinicalAnalysis]
    

class ClinicalCaseCreate(ClinicalCaseBase):
    """
    Create model for a clinical case.
    """
    pass

class ClinicalCaseUpdate(ClinicalCaseBase):
    """
    Update model for a clinical case.
    """
    pass

class ClinicalCaseInDB(ClinicalCaseBase):
    id: str
    created_at: datetime
    updated_at: datetime
