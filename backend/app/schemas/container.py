from pydantic import BaseModel
import uuid


class ContainerBase(BaseModel):
    name: str
    description: str | None = None
    character_id: str

class ContainerCreate(ContainerBase):
    pass

class ContainerRead(ContainerBase):
    id: uuid.UUID
    class Config:
        orm_mode = True
