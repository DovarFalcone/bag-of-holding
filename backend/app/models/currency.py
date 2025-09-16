from sqlalchemy import Column, DateTime, ForeignKey, Integer
import uuid
from sqlalchemy import String
from sqlalchemy.sql import func
import uuid
from .base import Base

class Currency(Base):
    __tablename__ = "currency"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String(36), ForeignKey("players.id"), nullable=True)
    container_id = Column(String(36), ForeignKey("containers.id"), nullable=True)
    copper = Column(Integer, default=0)
    silver = Column(Integer, default=0)
    electrum = Column(Integer, default=0)
    gold = Column(Integer, default=0)
    platinum = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
