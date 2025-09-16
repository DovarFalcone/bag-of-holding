from sqlalchemy import Column, String, DateTime, ForeignKey
import uuid
from sqlalchemy.sql import func
import uuid
from .base import Base

class Character(Base):
    __tablename__ = "characters"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    player_id = Column(String(36), ForeignKey("players.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
