from typing import List
from datetime import datetime
from beanie import Document
from pydantic import BaseModel

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    medical_history: List[str] = []

class Patient(Document, PatientBase):
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Settings:
        name = "patients"
        
    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 45,
                "gender": "male",
                "medical_history": ["hypertension", "diabetes"]
            }
        }
