from beanie import Document, Indexed
from typing import Optional, List
from datetime import datetime
from beanie import Document, Indexed


class ClinicalCase(Document):
    
    patient_id: Indexed # Reference to Patient
    symptoms: List[str]
    diagnosis: Optional[List[str]] = []
    recommendations: Optional[List[str]] = []
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Settings:
        name = "clinical_cases"