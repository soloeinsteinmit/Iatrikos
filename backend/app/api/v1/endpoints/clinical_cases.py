from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.case import ClinicalCase
from app.schemas.case import ClinicalCaseCreate, ClinicalCaseUpdate
from app.services.db.case_service import CaseService
from app.services.ml.gemini_services import GeminiService
from app.schemas.analysis import ClinicalAnalysis

router = APIRouter()
case_service = CaseService()
gemini_service = GeminiService() 

@router.post("/", response_model=ClinicalCase)
async def create_case(case: ClinicalCaseCreate):
    """
    Create a new clinical case with AI-powered analysis.
    
    The endpoint performs the following steps:
    1. Creates the initial case record
    2. Performs AI analysis using Gemini
    3. Updates the case with AI-generated insights
    
    Args:
        case (ClinicalCaseCreate): The clinical case data from the frontend
        
    Returns:
        ClinicalCase: The created case with AI analysis results
    """
    created_case = await case_service.create(case)
    
    try:
        # AI analysis with comprehensive response
        analysis = await gemini_service.analyze_medical_case({
            "symptoms": case.symptoms,
            "symptoms_description": case.symptoms_description,
            "vital_signs": case.vital_signs.model_dump(),
            "chief_complaint": case.chief_complaint,
            "current_medications": case.current_medications,
            "allergies": case.allergies,
            "physical_examination": case.physical_examination,
            "lab_results": case.lab_results,
            "family_history": case.family_history,
            "social_history": case.social_history,
            "patient_id": str(case.patient_id)
        })
        
        # Update the case with analysis results
        created_case.analysis_progress = analysis.progress
        created_case.analysis_time_remaining = analysis.time_remaining
        created_case.diagnoses = analysis.diagnoses
        created_case.key_findings = analysis.key_findings
        created_case.safety_checks = analysis.safety_checks
        created_case.risk_factors = analysis.risk_factors
        created_case.analysis_recommendations = analysis.recommendations
        
        await created_case.save()
        
    except Exception as e:
        print(f"Error in AI analysis: {str(e)}")
    
    return created_case

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

@router.get("/{case_id}/analysis", response_model=ClinicalAnalysis)
async def get_case_analysis(case_id: str):
    case = await case_service.get_by_id(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Clinical case not found")
        
    # Construct analysis response from case fields
    analysis = ClinicalAnalysis(
        progress=case.analysis_progress,
        time_remaining=case.analysis_time_remaining,
        diagnoses=case.diagnoses,
        key_findings=case.key_findings,
        safety_checks=case.safety_checks,
        risk_factors=case.risk_factors,
        recommendations=case.analysis_recommendations
    )
    return analysis
