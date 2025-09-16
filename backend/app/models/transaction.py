from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
import uuid
from sqlalchemy.sql import func
import uuid
from .base import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    item_id = Column(String(36), ForeignKey("items.id"), nullable=True)
    currency_id = Column(String(36), ForeignKey("currency.id"), nullable=True)
    transaction_type = Column(String(50), nullable=False)
    from_owner_id = Column(String(36), ForeignKey("players.id"), nullable=True)
    to_owner_id = Column(String(36), ForeignKey("players.id"), nullable=True)
    from_container_id = Column(String(36), ForeignKey("containers.id"), nullable=True)
    to_container_id = Column(String(36), ForeignKey("containers.id"), nullable=True)
    quantity_changed = Column(Integer, nullable=True)
    copper_changed = Column(Integer, nullable=True)
    silver_changed = Column(Integer, nullable=True)
    electrum_changed = Column(Integer, nullable=True)
    gold_changed = Column(Integer, nullable=True)
    platinum_changed = Column(Integer, nullable=True)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
