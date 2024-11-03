from app.models.case import ClinicalCase
from .base_service import BaseDbService

class CaseService(BaseDbService[ClinicalCase]):
    def __init__(self):
        super().__init__(ClinicalCase)   
    
    async def get_cases_by_patient(self, patient_id: str):
        return await ClinicalCase.find(
            {"patient_id": patient_id}
        ).to_list()
    
    async def get_case_with_patient(self, case_id: str):
        pipeline = [
            {"$match": {"_id": case_id}},
            {"$lookup": {
                "from": "patients",
                "localField": "patient_id",
                "foreignField": "_id",
                "as": "patient"
            }},
            {"$unwind": "$patient"}
        ]
        return await ClinicalCase.aggregate(pipeline).to_list()
