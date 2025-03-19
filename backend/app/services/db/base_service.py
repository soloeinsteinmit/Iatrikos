from typing import TypeVar, Generic, List
from beanie import Document
from pydantic import BaseModel

T = TypeVar('T', bound=Document)

class BaseDbService(Generic[T]):
    def __init__(self, model: T):
        self.model = model
    
    async def create(self, data: BaseModel) -> T:
        document = self.model(**data.dict())
        await document.save()
        return document
    
    async def get_by_id(self, id: str) -> T:
        return await self.model.get(id)
    
    async def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        return await self.model.find_all().skip(skip).limit(limit).to_list()
    
    async def update(self, id: str, data: BaseModel) -> T:
        document = await self.get_by_id(id)
        if document:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(document, key, value)
            await document.save()
        return document
    
    async def delete(self, id: str) -> bool:
        document = await self.get_by_id(id)
        if document:
            await document.delete()
            return True
        return False