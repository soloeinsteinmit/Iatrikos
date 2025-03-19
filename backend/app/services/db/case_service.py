from backend.app.models.case_model import ClinicalCase
from .base_service import BaseDbService
from typing import List, Optional

class CaseService(BaseDbService[ClinicalCase]):
    """
    Service class for handling clinical case operations in the database.
    Provides methods for CRUD operations and specialized queries.
    """
    
    def __init__(self):
        """Initialize the service with the ClinicalCase model."""
        super().__init__(ClinicalCase)   
    
    async def get_cases_by_patient(self, patient_id: str) -> List[ClinicalCase]:
        """
        Retrieve all clinical cases for a specific patient.
        
        Args:
            patient_id (str): The unique identifier of the patient
            
        Returns:
            List[ClinicalCase]: List of clinical cases associated with the patient
        """
        return await ClinicalCase.find(
            {"patient_id": patient_id}
        ).to_list()
    
    async def get_case_with_patient(self, case_id: str) -> Optional[dict]:
        """
        Retrieve a clinical case with associated patient information.
        
        Args:
            case_id (str): The unique identifier of the clinical case
            
        Returns:
            Optional[dict]: Case data with embedded patient information, or None if not found
        """
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
        results = await ClinicalCase.aggregate(pipeline).to_list()
        return results[0] if results else None
