from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.item import Item
from app.models.container import Container
from app.models.action_log import ActionLog
from app.schemas.item import ItemCreate, ItemRead

router = APIRouter(prefix="/items", tags=["Items"])

@router.get("/", response_model=list[ItemRead])
async def list_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item))
    return result.scalars().all()

@router.post("/", response_model=ItemRead)
async def create_item(item: ItemCreate, db: AsyncSession = Depends(get_db)):
    obj = Item(**item.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    # Log assignment to character, container, and item
    container = await db.get(Container, item.container_id)
    if container:
        log_char = ActionLog(
            entity_type="character",
            entity_id=container.character_id,
            action_type="assign_item",
            description=f"Item '{obj.name}' assigned to character via container.",
        )
        log_cont = ActionLog(
            entity_type="container",
            entity_id=container.id,
            action_type="assign_item",
            description=f"Item '{obj.name}' assigned to container.",
        )
        log_item = ActionLog(
            entity_type="item",
            entity_id=obj.id,
            action_type="created",
            description=f"Item '{obj.name}' was created and assigned to container '{container.name}'.",
        )
        db.add(log_char)
        db.add(log_cont)
        db.add(log_item)
        await db.commit()
    return obj

@router.put("/{item_id}", response_model=ItemRead)
async def update_item(item_id: str, item: ItemCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item).where(Item.id == item_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Item not found")
    old_container_id = obj.container_id
    for k, v in item.dict().items():
        setattr(obj, k, v)
    await db.commit()
    await db.refresh(obj)
    # Log assignment/unassignment if container_id changed
    if old_container_id != item.container_id:
        old_container = await db.get(Container, old_container_id)
        new_container = await db.get(Container, item.container_id)
        if old_container:
            log1_char = ActionLog(
                entity_type="character",
                entity_id=old_container.character_id,
                action_type="unassign_item",
                description=f"Item '{obj.name}' unassigned from character via container.",
            )
            log1_cont = ActionLog(
                entity_type="container",
                entity_id=old_container.id,
                action_type="unassign_item",
                description=f"Item '{obj.name}' unassigned from container.",
            )
            log1_item = ActionLog(
                entity_type="item",
                entity_id=obj.id,
                action_type="unassigned",
                description=f"Item '{obj.name}' unassigned from container '{old_container.name}'.",
            )
            db.add(log1_char)
            db.add(log1_cont)
            db.add(log1_item)
        if new_container:
            log2_char = ActionLog(
                entity_type="character",
                entity_id=new_container.character_id,
                action_type="assign_item",
                description=f"Item '{obj.name}' assigned to character via container.",
            )
            log2_cont = ActionLog(
                entity_type="container",
                entity_id=new_container.id,
                action_type="assign_item",
                description=f"Item '{obj.name}' assigned to container.",
            )
            log2_item = ActionLog(
                entity_type="item",
                entity_id=obj.id,
                action_type="assigned",
                description=f"Item '{obj.name}' assigned to container '{new_container.name}'.",
            )
            db.add(log2_char)
            db.add(log2_cont)
            db.add(log2_item)
        await db.commit()
    return obj

@router.delete("/{item_id}")
async def delete_item(item_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item).where(Item.id == item_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Item not found")
    container = await db.get(Container, obj.container_id)
    char_id = container.character_id if container else None
    name = obj.name
    await db.delete(obj)
    await db.commit()
    # Log deletion for last character, container, and item if any
    if char_id and container:
        log_char = ActionLog(
            entity_type="character",
            entity_id=char_id,
            action_type="deleted_item",
            description=f"Item '{name}' was deleted.",
        )
        log_cont = ActionLog(
            entity_type="container",
            entity_id=container.id,
            action_type="deleted_item",
            description=f"Item '{name}' was deleted from container.",
        )
        log_item = ActionLog(
            entity_type="item",
            entity_id=item_id,
            action_type="deleted",
            description=f"Item '{name}' was deleted from container '{container.name}'.",
        )
        db.add(log_char)
        db.add(log_cont)
        db.add(log_item)
        await db.commit()
    return {"ok": True}
