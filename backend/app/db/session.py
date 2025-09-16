
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os

connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):  # Only for SQLite
    connect_args = {"check_same_thread": False}
    # Ensure parent directory exists for SQLite file
    db_path = settings.DATABASE_URL.replace("sqlite+aiosqlite:///", "")
    db_dir = os.path.dirname(db_path)
    if db_dir and not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)

engine = create_async_engine(settings.DATABASE_URL, echo=True, connect_args=connect_args)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
