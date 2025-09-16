from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.action_log import ActionLog
from app.schemas.action_log import ActionLogCreate, ActionLogRead

router = APIRouter(prefix="/action-logs", tags=["ActionLogs"])

@router.get("/", response_model=list[ActionLogRead])
async def list_action_logs(entity_type: str = None, entity_id: str = None, db: AsyncSession = Depends(get_db)):
    query = select(ActionLog)
    if entity_type:
        query = query.where(ActionLog.entity_type == entity_type)
    if entity_id:
        query = query.where(ActionLog.entity_id == entity_id)
    result = await db.execute(query.order_by(ActionLog.timestamp.desc()))
    return result.scalars().all()

@router.post("/", response_model=ActionLogRead)
async def create_action_log(log: ActionLogCreate, db: AsyncSession = Depends(get_db)):
    obj = ActionLog(**log.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
