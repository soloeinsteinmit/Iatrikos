from app.models.patient import Patient
from .base_service import BaseDbService

class PatientService(BaseDbService[Patient]):
    def __init__(self):
        super().__init__(Patient)
    
    async def search_patients(self, query: str):
        return await Patient.find(
            {"$text": {"$search": query}}
        ).to_list()
    
    async def get_patient_history(self, patient_id: str):
        # Implement patient history aggregation
        pipeline = [
            {"$match": {"patient_id": patient_id}},
            {"$lookup": {
                "from": "clinical_cases",
                "localField": "_id",
                "foreignField": "patient_id",
                "as": "cases"
            }}
        ]
        return await Patient.aggregate(pipeline).to_list()