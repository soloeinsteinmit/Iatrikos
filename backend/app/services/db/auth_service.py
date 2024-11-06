from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from backend.app.models.user_model import User
from app.core.config import get_settings
from app.utils.email import send_verification_email, send_reset_password_email
import pyotp
import secrets

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self):
        self.secret_key = settings.SECRET_KEY
        self.algorithm = "HS256"
        self.access_token_expire_minutes = 30

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = await User.find_one({"email": email})
        if not user or not self.verify_password(password, user.hashed_password):
            return None
        return user

    def create_access_token(self, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)

    async def register_user(self, user_data: dict) -> User:
        user = User(
            email=user_data["email"],
            hashed_password=self.get_password_hash(user_data["password"]),
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            phone_number=user_data["phone_number"],
            specialty=user_data["specialty"],
            verification_code=secrets.token_hex(3),
            verification_code_expires=datetime.utcnow() + timedelta(hours=24)
        )
        await user.insert()
        await send_verification_email(user.email, user.verification_code)
        return user

    async def verify_email(self, code: str) -> bool:
        user = await User.find_one({
            "verification_code": code,
            "verification_code_expires": {"$gt": datetime.utcnow()}
        })
        if not user:
            return False
        user.is_verified = True
        user.is_active = True
        user.verification_code = None
        user.verification_code_expires = None
        await user.save()
        return True

    async def initiate_password_reset(self, email: str) -> bool:
        user = await User.find_one({"email": email})
        if not user:
            return False
        token = secrets.token_urlsafe(32)
        user.reset_password_token = token
        user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        await user.save()
        await send_reset_password_email(email, token)
        return True

    async def reset_password(self, token: str, new_password: str) -> bool:
        user = await User.find_one({
            "reset_password_token": token,
            "reset_token_expires": {"$gt": datetime.utcnow()}
        })
        if not user:
            return False
        user.hashed_password = self.get_password_hash(new_password)
        user.reset_password_token = None
        user.reset_token_expires = None
        await user.save()
        return True

    def generate_2fa_secret(self) -> str:
        return pyotp.random_base32()

    def verify_2fa_code(self, secret: str, code: str) -> bool:
        totp = pyotp.TOTP(secret)
        return totp.verify(code) 