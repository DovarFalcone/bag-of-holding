from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActionLogBase(BaseModel):
    entity_type: str
    entity_id: str
    action_type: str
    description: str
    user: Optional[str] = None

class ActionLogCreate(ActionLogBase):
    pass

class ActionLogRead(ActionLogBase):
    id: str
    timestamp: datetime
    class Config:
        orm_mode = True
