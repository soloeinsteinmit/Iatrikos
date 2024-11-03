from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.patient import Patient, PatientBase
from app.services.db.patient_service import PatientService

router = APIRouter()
patient_service = PatientService()

@router.post("/", response_model=Patient)
async def create_patient(patient: PatientBase):
    return await patient_service.create(patient)

@router.get("/{patient_id}", response_model=Patient)
async def get_patient(patient_id: str):
    patient = await patient_service.get_by_id(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/", response_model=List[Patient])
async def get_patients(skip: int = 0, limit: int = 10):
    return await patient_service.get_all(skip=skip, limit=limit)
