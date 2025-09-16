from pydantic import BaseModel
import uuid

class PlayerBase(BaseModel):
    name: str

class PlayerCreate(PlayerBase):
    pass

class PlayerRead(PlayerBase):
    id: uuid.UUID
    class Config:
        orm_mode = True
