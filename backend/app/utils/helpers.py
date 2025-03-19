from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import Optional
from backend.app.core.config import get_settings
from backend.app.models.patient_model import Patient
from backend.app.models.case_model import ClinicalCase
from backend.app.models.audit_model import AuditLog
from backend.app.models.analysis_model import ClinicalAnalysis
import asyncio

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    def get_db(self):
        settings = get_settings()
        return self.client[settings.MONGODB_DB_NAME]

db = Database()

async def connect_to_mongodb():
    settings = get_settings()
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)

async def close_mongodb_connection():
    if db.client:
        db.client.close()

async def init_mongodb():
    """Initialize MongoDB connection and setup ODM models"""
    settings = get_settings()
    
    try:
        # Create Motor client with explicit connection string and options
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
            maxPoolSize=10,
            retryWrites=True,
            w="majority"
        )
        
        # Initialize Beanie with all document models
        await init_beanie(
            database=client[settings.MONGODB_DB_NAME],
            document_models=[
                Patient,
                ClinicalCase,
                AuditLog,
                ClinicalAnalysis
            ]
        )
        print("🛜🛜🛜 Successfully connected to MongoDB Atlas 🛜🛜🛜")
    except Exception as e:
        print(f"⚠️⚠️⚠️ Failed to connect to MongoDB: {str(e)}")
        # Add a small delay before retrying
        await asyncio.sleep(1)
        raise