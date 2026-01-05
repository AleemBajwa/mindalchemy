"""
Application Configuration
"""
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Groq API
    groq_api_key: str = "your_groq_api_key_here"
    groq_model: str = "llama-3.1-8b-instant"  # Updated: llama-3.1-70b-versatile was decommissioned
    
    # Database
    database_url: str = "sqlite:///./ai_therapist.db"
    
    # JWT
    secret_key: str = "your_secret_key_change_in_production_12345678901234567890"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    
    # App
    environment: str = "development"
    debug: bool = True
    
    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

