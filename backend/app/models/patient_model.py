from typing import List, Optional
from datetime import datetime
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr 

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: Indexed(EmailStr, unique=True)
    date_of_birth: datetime
    gender: str
    phone_number: str
    address: Optional[str] = None
    medical_history: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    medications: Optional[List[str]] = []
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    insurance_provider: Optional[str] = None
    insurance_id: Optional[str] = None

class Patient(Document, PatientBase):
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Settings:
        name = "patients"
        
    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "date_of_birth": "1970-01-01",
                "gender": "male",
                "phone_number": "555-1234",
                "address": "123 Main St, Anytown, USA",
                "medical_history": ["hypertension", "diabetes"],
                "allergies": ["pollen", "dust"],
                "medications": ["aspirin", "insulin"],
                "emergency_contact_name": "Jane Doe",
                "emergency_contact_phone": "555-5678",
                "insurance_provider": "ABC Insurance",
                "insurance_id": "123456789"
            }
        }
