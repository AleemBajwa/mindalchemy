"""
MindAlchemy - FastAPI Main Application
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MindAlchemy API",
    description="Backend API for MindAlchemy - Transform your mind, discover your gold",
    version="1.0.0"
)

# CORS Configuration
from app.config import settings

# Parse CORS origins from environment variable or use defaults
cors_origins = settings.cors_origins.split(",") if settings.cors_origins else [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from app.api import auth, chat, mood, journal, user, cbt, goals, sleep, crisis, notifications, insights

# Register routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(mood.router, prefix="/api/mood", tags=["Mood"])
app.include_router(journal.router, prefix="/api/journal", tags=["Journal"])
app.include_router(user.router, prefix="/api/user", tags=["User"])
app.include_router(cbt.router, prefix="/api/cbt", tags=["CBT Tools"])
app.include_router(goals.router, prefix="/api/goals", tags=["Goals"])
app.include_router(sleep.router, prefix="/api/sleep", tags=["Sleep"])
app.include_router(crisis.router, prefix="/api/crisis", tags=["Crisis Resources"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(insights.router, prefix="/api/insights", tags=["AI Insights"])

@app.get("/")
async def root():
    return {
        "message": "MindAlchemy API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

