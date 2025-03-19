from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
from bson import ObjectId

class LabResult(BaseModel):
    name: str
    value: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    interpretation: Optional[str] = None
    
    # model_config = ConfigDict(from_attributes=True)

class Medication(BaseModel):
    name: str
    dosage: str
    unit: str
    frequency: str
    route: str
    duration: str
    
    # model_config = ConfigDict(from_attributes=True)

class VitalSigns(BaseModel):
    blood_pressure: str
    heart_rate: int
    temperature: float
    oxygen_saturation: int
    respiratory_rate: int
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    measurements: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    
    # model_config = ConfigDict(from_attributes=True)

class ClinicalCaseCreate(BaseModel):
    patient_id: Optional[str] = None
    chief_complaint: str
    symptoms: List[str]
    symptoms_description: Optional[str] = None
    vital_signs: VitalSigns
    current_medications: List[Medication]
    allergies: List[str]
    physical_examination: Optional[str] = None
    lab_results: List[LabResult]
    family_history: Optional[str] = None
    social_history: Optional[str] = None
    
    # model_config = ConfigDict(from_attributes=True)
    
    

    
class ClinicalCaseUpdate(BaseModel):
    """Update schema for clinical cases"""
    patient_id: Optional[str] = None
    chief_complaint: Optional[str] = None
    symptoms: Optional[List[str]] = None
    symptoms_description: Optional[str] = None
    vital_signs: Optional[VitalSigns] = None
    current_medications: Optional[List[Medication]] = None
    allergies: Optional[List[str]] = None
    physical_examination: Optional[str] = None
    lab_results: Optional[List[LabResult]] = None
    family_history: Optional[str] = None
    social_history: Optional[str] = None
    
    # Analysis fields
    analysis_progress: Optional[float] = None
    analysis_time_remaining: Optional[str] = None
    diagnoses: Optional[List[Dict[str, Any]]] = None
    differential_diagnoses: Optional[List[Dict[str, Any]]] = None
    key_findings: Optional[List[str]] = None
    risk_factors: Optional[List[str]] = None
    safety_checks: Optional[List[Dict[str, Any]]] = None
    recommended_actions: Optional[List[Dict[str, Any]]] = None
    recommendations: Optional[List[str]] = None
    
    # model_config = ConfigDict(from_attributes=True)

class ClinicalCaseInDB(ClinicalCaseCreate):
    id: str
    created_at: datetime
    updated_at: datetime

class ClinicalCaseResponse(ClinicalCaseInDB):
    """Response schema for clinical cases"""
    analysis: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    analysis_progress: float = Field(default=0.0)
    analysis_time_remaining: str = Field(default="pending")
    diagnoses: List[Dict[str, Any]] = Field(default_factory=list)
    differential_diagnoses: List[Dict[str, Any]] = Field(default_factory=list)
    key_findings: List[str] = Field(default_factory=list)
    risk_factors: List[str] = Field(default_factory=list)
    safety_checks: List[Dict[str, Any]] = Field(default_factory=list)
    recommended_actions: List[Dict[str, Any]] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    
    class Config:
        json_encoders = {
            ObjectId: str
        }
    
# model_config = ConfigDict(from_attributes=True)