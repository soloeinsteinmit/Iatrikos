from fastapi import APIRouter, HTTPException, Depends
from typing import List
from backend.app.models.case_model import ClinicalCase
from backend.app.schemas.case_schema import ClinicalCaseCreate, ClinicalCaseUpdate, ClinicalCaseResponse
from app.services.db.case_service import CaseService
from app.core.agents.autogen_medical_system import AutoGenMedicalSystem
from backend.app.schemas.analysis_schema import ClinicalAnalysisResponseSchema
from pydantic import ValidationError
from typing import Dict, Any
from datetime import datetime
import json
from backend.app.schemas.analysis_schema import (
    VitalStatus, PriorityLevel, ActionType, 
    ActionPriority, ActionStatus, TrendDirection
)
from backend.app.models.analysis_model import ClinicalAnalysis

router = APIRouter()
case_service = CaseService()
autogen_system = AutoGenMedicalSystem()

@router.post("/", response_model=ClinicalCaseResponse)
async def create_case(case: ClinicalCaseCreate):
    """
    Create a new clinical case with AI-powered analysis.
    """
    try:
        # Transform the case data into the correct format for database storage
        case_data = case.model_dump()
        
        # Create vital signs structure
        vital_signs = case_data["vital_signs"]
        vital_signs_measurements = transform_vital_signs(vital_signs)
        case_data["vital_signs"] = {
            "blood_pressure": vital_signs.blood_pressure,
            "heart_rate": vital_signs.heart_rate,
            "temperature": vital_signs.temperature,
            "oxygen_saturation": vital_signs.oxygen_saturation,
            "respiratory_rate": vital_signs.respiratory_rate,
            "measurements": vital_signs_measurements
        }
        
        # Transform medications and lab results
        case_data["current_medications"] = [
            med.model_dump() for med in case.current_medications
        ]
        case_data["lab_results"] = [
            lab.model_dump() for lab in case.lab_results
        ]
        
        # Initialize analysis fields
        case_data.update({
            "analysis": [],
            "analysis_progress": 0.0,
            "analysis_time_remaining": "pending",
            "diagnoses": [],
            "differential_diagnoses": [],
            "key_findings": [],
            "risk_factors": [],
            "safety_checks": [],
            "recommended_actions": [],
            "recommendations": []
        })
        
        # Create the case
        created_case = await ClinicalCase(**case_data).save()
        
        # Run analysis
        # analysis_data = prepare_analysis_data(created_case)
        analysis_result = await autogen_system.analyze_case(created_case)
        
        # Update case with analysis results
        update_data = {
            "analysis_progress": 100.0,
            "analysis_time_remaining": "0",
            "diagnoses": analysis_result.diagnoses,
            "differential_diagnoses": analysis_result.differential_diagnoses,
            "key_findings": analysis_result.key_findings,
            "risk_factors": analysis_result.risk_factors,
            "safety_checks": analysis_result.safety_checks,
            "recommended_actions": analysis_result.recommended_actions,
            "recommendations": analysis_result.recommendations
        }
        
        await created_case.update({"$set": update_data})
        await created_case.save()
        
        # Fetch updated case
        updated_case = await ClinicalCase.get(created_case.id)
        return updated_case
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_unit_for_vital(vital_name: str) -> str:
    """Return the appropriate unit for each vital sign"""
    units = {
        "blood_pressure": "mmHg",
        "heart_rate": "bpm",
        "temperature": "°C",
        "oxygen_saturation": "%",
        "respiratory_rate": "breaths/min",
        "weight": "kg",
        "height": "cm",
        "bmi": "kg/m²"
    }
    return units.get(vital_name, "")

def transform_vital_signs(vital_signs_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Transform vital signs into the expected list format"""
    measurements = []
    for name, value in vital_signs_data.items():
        if value is not None:
            measurement = {
                "name": name,
                "value": str(value),
                "unit": get_unit_for_vital(name),
                "timestamp": datetime.now().isoformat(),
                "status": "normal"  # You might want to add logic to determine status
            }
            measurements.append(measurement)
    return measurements

@router.get("/{case_id}", response_model=ClinicalCase)
async def get_case(case_id: str):
    case = await case_service.get_by_id(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Clinical case not found")
    return case

@router.get("/patient/{patient_id}", response_model=List[ClinicalCase])
async def get_patient_cases(patient_id: str):
    return await case_service.get_cases_by_patient(patient_id)

@router.get("/", response_model=List[ClinicalCase])
async def get_cases(skip: int = 0, limit: int = 10):
    return await case_service.get_all(skip=skip, limit=limit)

@router.put("/{case_id}", response_model=ClinicalCase)
async def update_case(case_id: str, case_update: ClinicalCaseUpdate):
    updated_case = await case_service.update(case_id, case_update)
    if not updated_case:
        raise HTTPException(status_code=404, detail="Clinical case not found")
    return updated_case

@router.delete("/{case_id}")
async def delete_case(case_id: str):
    success = await case_service.delete(case_id)
    if not success:
        raise HTTPException(status_code=404, detail="Clinical case not found")
    return {"message": "Case deleted successfully"}

@router.get("/{case_id}/analysis", response_model=ClinicalAnalysisResponseSchema)
async def get_case_analysis(case_id: str):
    case = await case_service.get_by_id(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Clinical case not found")
        
    # Construct analysis response from case fields
    analysis = ClinicalAnalysisResponseSchema(
        progress=case.analysis_progress,
        time_remaining=case.analysis_time_remaining,
        diagnoses=case.diagnoses,
        key_findings=case.key_findings,
        safety_checks=case.safety_checks,
        risk_factors=case.risk_factors,
        recommended_actions=case.recommended_actions,
        differential_diagnoses=case.differential_diagnoses,
        vital_signs=case.vital_signs,
        medications=case.medications,
        lab_results=case.lab_results,
        recommendations=case.recommendations
    )
    return analysis
