from fastapi import APIRouter
from .players import router as players_router
from .characters import router as characters_router
from .containers import router as containers_router
from .items import router as items_router
from .coins import router as coins_router
from .action_logs import router as action_logs_router

api_router = APIRouter()
api_router.include_router(players_router)
api_router.include_router(characters_router)
api_router.include_router(containers_router)
api_router.include_router(items_router)
api_router.include_router(coins_router)
api_router.include_router(action_logs_router)