from pydantic import BaseModel

class CharacterBase(BaseModel):
    name: str
    player_id: str

class CharacterCreate(CharacterBase):
    pass

class CharacterRead(CharacterBase):
    id: str
    model_config = {"from_attributes": True}
