from beanie import Document, Indexed
from pydantic import EmailStr
from typing import Optional
from datetime import datetime

class User(Document):
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    first_name: str
    last_name: str
    phone_number: str
    specialty: str
    is_active: bool = False
    is_verified: bool = False
    two_factor_enabled: bool = False
    two_factor_secret: Optional[str] = None
    verification_code: Optional[str] = None
    verification_code_expires: Optional[datetime] = None
    reset_password_token: Optional[str] = None
    reset_token_expires: Optional[datetime] = None
    last_login: Optional[datetime] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "users" 