# backend/app/models/audit.py
from backend.app.models.base_model import BaseDocument

class AuditLog(BaseDocument):
    action: str
    collection: str
    document_id: str
    user_id: str
    changes: dict
    
    class Settings:
        name = "audit_logs"