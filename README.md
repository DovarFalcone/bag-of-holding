# Bag of Holding: DnD Inventory Management App

## Overview
Bag of Holding is a modern, full-stack inventory management solution for Dungeons & Dragons (DnD) campaigns. It helps Dungeon Masters and players track items, containers, coins, and character assignments with a clear audit trail and a user-friendly, accessible interface.

- **Backend:** FastAPI (Python), SQLite, SQLAlchemy (async), Alembic
- **Frontend:** React, TypeScript, Material UI, Vite, Tailwind CSS
- **Deployment:** Docker (single image), Nginx, Supervisor

## Features
- Manage items, containers, coins, and characters
- Assign/unassign items and containers to characters and players
- Full changelog/audit trail for all actions
- Responsive, accessible dark mode UI
- Admin panel with bulk delete
- Production-ready Docker deployment

## Running Locally

### Prerequisites
- Python 3.11+
- Node.js 18+
- [Poetry](https://python-poetry.org/) (for backend dependencies)

### Backend (FastAPI)
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   poetry install
   ```
3. Run database migrations:
   ```sh
   poetry run alembic upgrade head
   ```
4. Start the backend server:
   ```sh
   poetry run uvicorn app.main:app --reload
   ```

### Frontend (React)
1. Open a new terminal and navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm start
   ```
4. Access the app at [http://localhost:5173](http://localhost:5173)

## Running with Docker

### Prerequisites
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Steps
1. From the project root, build and start the app:
   ```sh
   docker-compose up --build
   ```
2. The app will be available at [http://localhost:8080](http://localhost:8080)

- The backend runs at `http://localhost:8000` (internal)
- The SQLite database is persisted in a Docker volume

## Project Structure
```
backend/    # FastAPI app, database, migrations
frontend/   # React app (Vite, MUI, Tailwind)
Dockerfile  # Unified build for backend & frontend
nginx/      # Nginx config for static frontend & API proxy
```

## Future Enhancements
- User authentication and roles (DM vs Player)
- Real-time updates (WebSockets)
- Export/import campaign data
- Advanced search and filtering
- Mobile app (PWA or native)
- Integration with DnD 5e APIs
- Customizable item types and currencies
- Automated backup/restore

---

**Bag of Holding** is open source and designed to be extended for your campaign's needs. Contributions and suggestions are welcome!
