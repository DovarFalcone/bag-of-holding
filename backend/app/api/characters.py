from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.character import Character
from app.models.action_log import ActionLog
from app.models.player import Player
from app.schemas.character import CharacterCreate, CharacterRead

router = APIRouter(prefix="/characters", tags=["Characters"])

@router.get("/", response_model=list[CharacterRead])
async def list_characters(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Character))
    return result.scalars().all()

@router.post("/", response_model=CharacterRead)
async def create_character(character: CharacterCreate, db: AsyncSession = Depends(get_db)):
    obj = Character(**character.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    # Log assignment of character to player, including player name
    player_name = None
    if character.player_id:
        result = await db.execute(select(Player).where(Player.id == character.player_id))
        player = result.scalar_one_or_none()
        player_name = player.name if player else None
    log = ActionLog(
        entity_type="player",
        entity_id=character.player_id,
        action_type="assign_character",
        description=f"Character '{obj.name}' assigned to player '{player_name}'" if player_name else f"Character '{obj.name}' assigned to player.",
    )
    db.add(log)
    await db.commit()
    return obj

@router.put("/{character_id}", response_model=CharacterRead)
async def update_character(character_id: str, character: CharacterCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Character).where(Character.id == character_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Character not found")
    old_player_id = obj.player_id
    for k, v in character.dict().items():
        setattr(obj, k, v)
    await db.commit()
    await db.refresh(obj)
    # Log reassignment or unassignment if player_id changed
    if old_player_id != character.player_id:
        if old_player_id and character.player_id:
            # Moving from one player to another: log unassigned for old, assigned for new
            # Get old player name
            old_player_name = None
            result = await db.execute(select(Player).where(Player.id == old_player_id))
            old_player = result.scalar_one_or_none()
            if old_player:
                old_player_name = old_player.name
            # Get new player name
            new_player_name = None
            result = await db.execute(select(Player).where(Player.id == character.player_id))
            new_player = result.scalar_one_or_none()
            if new_player:
                new_player_name = new_player.name
            log1 = ActionLog(
                entity_type="player",
                entity_id=old_player_id,
                action_type="unassign_character",
                description=f"Character '{obj.name}' unassigned from player '{old_player_name}'" if old_player_name else f"Character '{obj.name}' unassigned from player.",
            )
            log2 = ActionLog(
                entity_type="player",
                entity_id=character.player_id,
                action_type="assign_character",
                description=f"Character '{obj.name}' assigned to player '{new_player_name}'" if new_player_name else f"Character '{obj.name}' assigned to player.",
            )
            db.add(log1)
            db.add(log2)
            await db.commit()
        elif old_player_id and not character.player_id:
            # Unassigned from player only
            old_player_name = None
            result = await db.execute(select(Player).where(Player.id == old_player_id))
            old_player = result.scalar_one_or_none()
            if old_player:
                old_player_name = old_player.name
            log = ActionLog(
                entity_type="player",
                entity_id=old_player_id,
                action_type="unassign_character",
                description=f"Character '{obj.name}' unassigned from player '{old_player_name}'" if old_player_name else f"Character '{obj.name}' unassigned from player.",
            )
            db.add(log)
            await db.commit()
        elif character.player_id:
            # Assigned to player from unassigned
            new_player_name = None
            result = await db.execute(select(Player).where(Player.id == character.player_id))
            new_player = result.scalar_one_or_none()
            if new_player:
                new_player_name = new_player.name
            log = ActionLog(
                entity_type="player",
                entity_id=character.player_id,
                action_type="assign_character",
                description=f"Character '{obj.name}' assigned to player '{new_player_name}'" if new_player_name else f"Character '{obj.name}' assigned to player.",
            )
            db.add(log)
            await db.commit()
    return obj

@router.delete("/{character_id}")
async def delete_character(character_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Character).where(Character.id == character_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Character not found")
    player_id = obj.player_id
    char_name = obj.name
    await db.delete(obj)
    await db.commit()
    # Log deletion for last player if any
    if player_id:
        log = ActionLog(
            entity_type="player",
            entity_id=player_id,
            action_type="deleted_character",
            description=f"Character '{char_name}' was deleted.",
        )
        db.add(log)
        await db.commit()
    return {"ok": True}
