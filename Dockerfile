# Unified Dockerfile for Bag of Holding (backend + frontend)
FROM node:20-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM python:3.10-slim as backend-build
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential libsqlite3-dev nginx supervisor && rm -rf /var/lib/apt/lists/*
# Install Poetry
RUN pip install poetry
COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --only main --no-root
COPY backend/app ./app

# Final image
FROM python:3.10-slim
WORKDIR /app
RUN apt-get update && apt-get install -y nginx supervisor libsqlite3-dev && rm -rf /var/lib/apt/lists/*
# Install Poetry
RUN pip install poetry
# Copy backend dependency files and install dependencies
COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --only main --no-root
# Copy backend app code
COPY backend/app ./app
# Copy frontend build to nginx html
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
# Copy nginx config
COPY frontend/nginx.conf /etc/nginx/nginx.conf
# Copy supervisor config
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Expose ports
EXPOSE 80 8000
# Entrypoint
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
