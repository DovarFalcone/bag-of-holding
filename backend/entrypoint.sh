#!/bin/sh
# Entrypoint script to run Alembic and Uvicorn as root (for Docker volume compatibility)

# Ensure /data exists
mkdir -p /data

# Ensure the DB file exists
if [ ! -f /data/app.db ]; then
	touch /data/app.db
fi

# Run Alembic migrations and start Uvicorn as root
cd /app/backend
alembic upgrade head
exec uvicorn app.main:app --host 0.0.0.0 --port 8000