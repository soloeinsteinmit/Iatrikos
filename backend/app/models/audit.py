# backend/app/models/audit.py
from app.models.base import BaseDocument

class AuditLog(BaseDocument):
    action: str
    collection: str
    document_id: str
    user_id: str
    changes: dict
    
    class Settings:
        name = "audit_logs"