from sqlalchemy import Column, DateTime, String, ForeignKey
from sqlalchemy.sql import func
from .base import Base
import uuid

class ActionLog(Base):
    __tablename__ = "action_logs"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    entity_type = Column(String(32), nullable=False)  # e.g. 'player', 'character', 'container', 'item', 'coin'
    entity_id = Column(String(36), nullable=False)
    action_type = Column(String(64), nullable=False)  # e.g. 'assign_character', 'add_coin', etc.
    description = Column(String(256), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    user = Column(String(64), nullable=True)  # Optional: who performed the action
