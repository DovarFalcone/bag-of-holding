from sqlalchemy import Column, String, DateTime, ForeignKey, Text
import uuid
from sqlalchemy.sql import func
import uuid
from .base import Base

class Container(Base):
    __tablename__ = "containers"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    description = Column(Text)
    character_id = Column(String(36), ForeignKey("characters.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
