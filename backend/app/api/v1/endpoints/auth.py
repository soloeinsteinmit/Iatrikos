from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services.auth_service import AuthService
from backend.app.schemas.auth_schema import (
    UserLogin, UserRegister, TokenResponse, 
    PasswordReset, NewPassword, VerifyEmail, 
    TwoFactorVerify
)

router = APIRouter()
auth_service = AuthService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified"
        )
    
    access_token = auth_service.create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=access_token)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    try:
        user = await auth_service.register_user(user_data.dict())
        return {"message": "Registration successful. Please check your email for verification."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/verify-email")
async def verify_email(data: VerifyEmail):
    if await auth_service.verify_email(data.code):
        return {"message": "Email verified successfully"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired verification code"
    )

@router.post("/forgot-password")
async def forgot_password(data: PasswordReset):
    if await auth_service.initiate_password_reset(data.email):
        return {"message": "Password reset instructions sent to your email"}
    return {"message": "If an account exists with this email, you will receive reset instructions"}

@router.post("/reset-password")
async def reset_password(data: NewPassword):
    if await auth_service.reset_password(data.token, data.new_password):
        return {"message": "Password reset successful"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired reset token"
    )

@router.post("/verify-2fa")
async def verify_2fa(data: TwoFactorVerify):
    # Implement 2FA verification logic
    pass
