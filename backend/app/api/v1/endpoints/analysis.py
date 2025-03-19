from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime

from app.models.analysis_model import (
    ClinicalAnalysis, DiagnosisAnalysis, KeyFinding,
    SafetyCheck, RiskFactor, RecommendedAction,
    DifferentialDiagnosis, VitalSign, Medication, LabResult
)
from app.schemas.analysis_schema import (
    ClinicalAnalysisRequestSchema,
    ClinicalAnalysisResponseSchema
)
from app.services.ml.gemini_services import GeminiService

router = APIRouter()
gemini_service = GeminiService()

@router.post("/{case_id}", response_model=ClinicalAnalysisResponseSchema)
async def create_analysis(case_id: str):
    """Create a new analysis for a clinical case"""
    try:
        # Create new analysis document
        analysis = ClinicalAnalysis(
            case_id=case_id,
            progress=0.0,
            time_remaining="estimating...",
            diagnoses=[],
            key_findings=[],
            safety_checks=[],
            risk_factors=[],
            recommended_actions=[],
            differential_diagnoses=[],
            vital_signs=[],
            medications=[],
            lab_results=[],
            recommendations=[],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        await analysis.save()
        return analysis
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{case_id}", response_model=ClinicalAnalysisResponseSchema)
async def get_analysis(case_id: str):
    """Get analysis for a specific case"""
    analysis = await ClinicalAnalysis.find_one({"case_id": case_id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@router.put("/{case_id}", response_model=ClinicalAnalysisResponseSchema)
async def update_analysis(case_id: str, analysis_data: ClinicalAnalysisRequestSchema):
    """Update analysis for a specific case"""
    analysis = await ClinicalAnalysis.find_one({"case_id": case_id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    analysis.updated_at = datetime.now()
    # Update other fields as needed
    await analysis.save()
    return analysis

@router.delete("/{case_id}")
async def delete_analysis(case_id: str):
    """Delete analysis for a specific case"""
    analysis = await ClinicalAnalysis.find_one({"case_id": case_id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    await analysis.delete()
    return {"message": "Analysis deleted successfully"} 