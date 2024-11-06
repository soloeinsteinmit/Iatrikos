from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone_number: str
    specialty: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
class PasswordReset(BaseModel):
    email: EmailStr

class NewPassword(BaseModel):
    token: str
    new_password: str

class VerifyEmail(BaseModel):
    code: str

class TwoFactorVerify(BaseModel):
    code: str
    token: str 