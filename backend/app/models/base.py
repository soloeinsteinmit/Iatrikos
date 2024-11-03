from datetime import datetime
from beanie import Document

class BaseDocument(Document):
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    is_active: bool = True

    class Settings:
        use_revision = True  # Enable document versioning

    async def save_document(self):
        self.updated_at = datetime.now()
        await self.save()