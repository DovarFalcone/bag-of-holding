from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.container import Container
from app.models.action_log import ActionLog
from app.models.character import Character
from app.schemas.container import ContainerCreate, ContainerRead

router = APIRouter(prefix="/containers", tags=["Containers"])

@router.get("/", response_model=list[ContainerRead])
async def list_containers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Container))
    return result.scalars().all()

@router.post("/", response_model=ContainerRead)
async def create_container(container: ContainerCreate, db: AsyncSession = Depends(get_db)):
    obj = Container(**container.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    # Log container added to character, include character name
    character_name = None
    if container.character_id:
        result = await db.execute(select(Character).where(Character.id == container.character_id))
        character = result.scalar_one_or_none()
        character_name = character.name if character else None
    log = ActionLog(
        entity_type="character",
        entity_id=container.character_id,
        action_type="add_container",
        description=f"Container '{obj.name}' added to character '{character_name}'" if character_name else f"Container '{obj.name}' added to character.",
    )
    db.add(log)
    await db.commit()
    return obj

@router.put("/{container_id}", response_model=ContainerRead)
async def update_container(container_id: str, container: ContainerCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Container).where(Container.id == container_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Container not found")
    old_character_id = obj.character_id
    for k, v in container.dict().items():
        setattr(obj, k, v)
    await db.commit()
    await db.refresh(obj)
    # Log assignment/unassignment/reassignment
    if old_character_id != container.character_id:
        if old_character_id and container.character_id:
            # Moved from one character to another
            # Get old character name
            old_character_name = None
            result = await db.execute(select(Character).where(Character.id == old_character_id))
            old_character = result.scalar_one_or_none()
            if old_character:
                old_character_name = old_character.name
            # Get new character name
            new_character_name = None
            result = await db.execute(select(Character).where(Character.id == container.character_id))
            new_character = result.scalar_one_or_none()
            if new_character:
                new_character_name = new_character.name
            log1 = ActionLog(
                entity_type="character",
                entity_id=old_character_id,
                action_type="unassign_container",
                description=f"Container '{obj.name}' unassigned from character '{old_character_name}'" if old_character_name else f"Container '{obj.name}' unassigned from character.",
            )
            log2 = ActionLog(
                entity_type="character",
                entity_id=container.character_id,
                action_type="assign_container",
                description=f"Container '{obj.name}' assigned to character '{new_character_name}'" if new_character_name else f"Container '{obj.name}' assigned to character.",
            )
            db.add(log1)
            db.add(log2)
            await db.commit()
        elif old_character_id and not container.character_id:
            # Unassigned from character
            old_character_name = None
            result = await db.execute(select(Character).where(Character.id == old_character_id))
            old_character = result.scalar_one_or_none()
            if old_character:
                old_character_name = old_character.name
            log = ActionLog(
                entity_type="character",
                entity_id=old_character_id,
                action_type="unassign_container",
                description=f"Container '{obj.name}' unassigned from character '{old_character_name}'" if old_character_name else f"Container '{obj.name}' unassigned from character.",
            )
            db.add(log)
            await db.commit()
        elif container.character_id:
            # Assigned to character from unassigned
            new_character_name = None
            result = await db.execute(select(Character).where(Character.id == container.character_id))
            new_character = result.scalar_one_or_none()
            if new_character:
                new_character_name = new_character.name
            log = ActionLog(
                entity_type="character",
                entity_id=container.character_id,
                action_type="assign_container",
                description=f"Container '{obj.name}' assigned to character '{new_character_name}'" if new_character_name else f"Container '{obj.name}' assigned to character.",
            )
            db.add(log)
            await db.commit()
    return obj

@router.delete("/{container_id}")
async def delete_container(container_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Container).where(Container.id == container_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Container not found")
    char_id = obj.character_id
    name = obj.name
    await db.delete(obj)
    await db.commit()
    # Log deletion for last character if any
    if char_id:
        log = ActionLog(
            entity_type="character",
            entity_id=char_id,
            action_type="deleted_container",
            description=f"Container '{name}' was deleted.",
        )
        db.add(log)
        await db.commit()
    return {"ok": True}
