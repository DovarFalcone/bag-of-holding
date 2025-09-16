
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "DnD Inventory Management API"}
