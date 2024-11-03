from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.case import ClinicalCase
from app.schemas.case import ClinicalCaseCreate, ClinicalCaseUpdate
from app.services.db.case_service import CaseService
from app.services.ml.gemini_services import GeminiService

router = APIRouter()
case_service = CaseService()
gemini_service = GeminiService() 

@router.post("/", response_model=ClinicalCase)
async def create_case(case: ClinicalCaseCreate):
    created_case = await case_service.create(case)
    
    try:
        # AI analysis
        analysis = await gemini_service.analyze_medical_case({
            "symptoms": case.symptoms,
            "patient_id": str(case.patient_id)
        })
        
        # Update case with AI analysis
        created_case.diagnosis = analysis.get("diagnosis", [])
        created_case.recommendations = analysis.get("recommendations", [])
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
