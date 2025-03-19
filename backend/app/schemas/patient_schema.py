from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
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

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    phone_number: Optional[str] = None

class PatientResponse(PatientBase):
    _id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 
