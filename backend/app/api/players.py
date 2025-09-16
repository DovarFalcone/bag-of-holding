
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.player import Player
from app.schemas.player import PlayerCreate, PlayerRead
from sqlalchemy.future import select

router = APIRouter(prefix="/players", tags=["Players"])


@router.get("/", response_model=list[PlayerRead])
async def list_players(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Player))
    return result.scalars().all()

@router.post("/", response_model=PlayerRead)
async def create_player(player: PlayerCreate, db: AsyncSession = Depends(get_db)):
    obj = Player(**player.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


@router.delete("/{player_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_player(player_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Player).where(Player.id == player_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Player not found")
    await db.delete(obj)
    await db.commit()
    return None
