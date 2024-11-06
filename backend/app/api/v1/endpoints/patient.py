from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from backend.app.schemas.patient_schema import PatientCreate, PatientUpdate, PatientResponse
from app.services.db.patient_service import PatientService
from app.api.deps import get_current_user

router = APIRouter()
patient_service = PatientService()

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(patient_data: PatientCreate, current_user = Depends(get_current_user)):
    try:
        patient = await patient_service.create_patient(patient_data.dict())
        return patient
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: str, current_user = Depends(get_current_user)):
    patient = await patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.get("/", response_model=List[PatientResponse])
async def get_patients(
    skip: int = 0, 
    limit: int = 10,
    current_user = Depends(get_current_user)
):
    patients = await patient_service.get_patients(skip, limit)
    return patients

@router.put("/{patient_id}", response_model=PatientResponse)
async def update_patient(
    patient_id: str,
    patient_data: PatientUpdate,
    current_user = Depends(get_current_user)
):
    patient = await patient_service.update_patient(patient_id, patient_data.dict(exclude_unset=True))
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.delete("/{patient_id}")
async def delete_patient(patient_id: str, current_user = Depends(get_current_user)):
    success = await patient_service.delete_patient(patient_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return {"message": "Patient deleted successfully"}

@router.get("/search/{query}", response_model=List[PatientResponse])
async def search_patients(
    query: str,
    skip: int = 0,
    limit: int = 10,
    current_user = Depends(get_current_user)
):
    patients = await patient_service.search_patients(query, skip, limit)
    return patients
