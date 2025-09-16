from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, Numeric
import uuid
from sqlalchemy.sql import func
import uuid
from .base import Base

class Item(Base):
    __tablename__ = "items"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    description = Column(Text)
    quantity = Column(Integer, default=1)
    value = Column(Numeric(10,2), default=0)
    container_id = Column(String(36), ForeignKey("containers.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
