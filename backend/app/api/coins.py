from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.coin import Coin
from app.models.action_log import ActionLog
from app.schemas.coin import CoinCreate, CoinRead

router = APIRouter(prefix="/coins", tags=["Coins"])

@router.get("/", response_model=list[CoinRead])
async def list_coins(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Coin))
    coins = result.scalars().all()
    return coins

@router.post("/", response_model=CoinRead)
async def create_coin(coin: CoinCreate, db: AsyncSession = Depends(get_db)):
    obj = Coin(**coin.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    # Log coin received by character
    log = ActionLog(
        entity_type="character",
        entity_id=coin.character_id,
        action_type="receive_coin",
        description=f"Character received {coin.amount} {coin.coin_type} coin(s).",
    )
    db.add(log)
    await db.commit()
    return obj

@router.put("/{coin_id}", response_model=CoinRead)
async def update_coin(coin_id: str, coin: CoinCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Coin).where(Coin.id == coin_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Coin not found")
    for k, v in coin.dict().items():
        setattr(obj, k, v)
    await db.commit()
    await db.refresh(obj)
    return obj

@router.delete("/{coin_id}")
async def delete_coin(coin_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Coin).where(Coin.id == coin_id))
    obj = result.scalar_one_or_none()
    if not obj:
        raise HTTPException(status_code=404, detail="Coin not found")
    character_id = obj.character_id
    coin_type = obj.coin_type
    amount = obj.amount
    await db.delete(obj)
    await db.commit()
    # Log coin lost by character
    log = ActionLog(
        entity_type="character",
        entity_id=character_id,
        action_type="lose_coin",
        description=f"Character lost {amount} {coin_type} coin(s).",
    )
    db.add(log)
    await db.commit()
    return {"ok": True}
