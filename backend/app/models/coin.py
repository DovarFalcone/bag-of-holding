from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Numeric
import uuid
from sqlalchemy.sql import func
import uuid
from .base import Base

class Coin(Base):
    __tablename__ = "coins"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    character_id = Column(String(36), ForeignKey("characters.id"), nullable=False)
    coin_type = Column(String(10), nullable=False)  # Cp, Sp, Ep, Gp, Pp
    amount = Column(Integer, default=0)
    source = Column(String(50), nullable=True)  # New field for coin source
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    @property
    def gp_value(self):
        # Conversion rates to GP
        rates = {"Cp": 0.01, "Sp": 0.1, "Ep": 0.5, "Gp": 1, "Pp": 10}
        return self.amount * rates.get(self.coin_type, 0)
