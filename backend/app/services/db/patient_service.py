from typing import List, Optional
from app.models.patient import Patient
from datetime import datetime

class PatientService:
    @staticmethod
    async def create_patient(patient_data: dict) -> Patient:
        patient = Patient(**patient_data)
        await patient.insert()
        return patient

    @staticmethod
    async def get_patient(patient_id: str) -> Optional[Patient]:
        return await Patient.get(patient_id)

    @staticmethod
    async def get_patients(skip: int = 0, limit: int = 10) -> List[Patient]:
        patients = await Patient.find_all().skip(skip).limit(limit).to_list()
        return patients

    @staticmethod
    async def update_patient(patient_id: str, patient_data: dict) -> Optional[Patient]:
        patient = await Patient.get(patient_id)
        if not patient:
            return None
        
        for key, value in patient_data.items():
            setattr(patient, key, value)
        
        patient.updated_at = datetime.utcnow()
        await patient.save()
        return patient

    @staticmethod
    async def delete_patient(patient_id: str) -> bool:
        patient = await Patient.get(patient_id)
        if not patient:
            return False
        await patient.delete()
        return True

    @staticmethod
    async def search_patients(query: str, skip: int = 0, limit: int = 10) -> List[Patient]:
        # Basic search implementation - you might want to enhance this
        filter_query = {
            "$or": [
                {"first_name": {"$regex": query, "$options": "i"}},
                {"last_name": {"$regex": query, "$options": "i"}},
                {"email": {"$regex": query, "$options": "i"}}
            ]
        }
        patients = await Patient.find(filter_query).skip(skip).limit(limit).to_list()
        return patients