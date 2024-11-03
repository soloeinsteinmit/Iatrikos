from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ClinicalCaseBase(BaseModel):
    patient_id: str
    symptoms: List[str]
    diagnosis: Optional[List[str]] = []
    recommendations: Optional[List[str]] = []

class ClinicalCaseCreate(ClinicalCaseBase):
    pass

class ClinicalCaseUpdate(ClinicalCaseBase):
    pass

class ClinicalCaseInDB(ClinicalCaseBase):
    id: str
    created_at: datetime
    updated_at: datetime
