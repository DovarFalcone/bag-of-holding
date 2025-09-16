from pydantic import BaseModel
import uuid
from decimal import Decimal

class ItemBase(BaseModel):
    name: str
    description: str | None = None
    quantity: int = 1
    value: Decimal = 0
    container_id: str

class ItemCreate(ItemBase):
    pass

from datetime import datetime

class ItemRead(ItemBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime | None = None
    class Config:
        orm_mode = True
