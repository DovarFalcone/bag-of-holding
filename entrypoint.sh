#!/bin/sh
# Ensure /data/db exists and is writable before migrations
mkdir -p /data/db
chmod 777 /data/db
cd /app
alembic upgrade head
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
