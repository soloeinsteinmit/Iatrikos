from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional

class Settings(BaseSettings):
    # Base
    PROJECT_NAME: str = "Iatrikos"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB
    MONGODB_URL: str
    MONGODB_DB_NAME: str
    
    # Gemini
    GOOGLE_API_KEY: str
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"  # In production, use a secure secret key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
