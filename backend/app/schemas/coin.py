from pydantic import BaseModel
import uuid


class CoinBase(BaseModel):
    character_id: str
    coin_type: str  # Cp, Sp, Ep, Gp, Pp
    amount: int
    source: str | None = None


class CoinCreate(CoinBase):
    pass


from datetime import datetime

class CoinRead(CoinBase):
    id: uuid.UUID
    gp_value: float
    created_at: datetime
    updated_at: datetime | None = None
    class Config:
        orm_mode = True
