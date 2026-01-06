"""
Database Configuration and Session Management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings
import os

# Support both SQLite (local) and PostgreSQL (Vercel)
database_url = settings.database_url

# If DATABASE_URL is not set, try Vercel Postgres environment variable
if not database_url or database_url == "sqlite:///./ai_therapist.db":
    # Check for Vercel Postgres connection string
    postgres_url = os.getenv("POSTGRES_URL") or os.getenv("POSTGRES_PRISMA_URL") or os.getenv("POSTGRES_URL_NON_POOLING")
    if postgres_url:
        database_url = postgres_url
        # Convert Vercel Postgres URL format if needed
        if postgres_url.startswith("postgres://"):
            database_url = postgres_url.replace("postgres://", "postgresql://", 1)

# Create database engine
if "sqlite" in database_url:
    # SQLite for local development
    engine = create_engine(
        database_url,
        connect_args={"check_same_thread": False}
    )
else:
    # PostgreSQL for production (Vercel)
    engine = create_engine(
        database_url,
        pool_pre_ping=True,  # Verify connections before using
        pool_recycle=300,    # Recycle connections after 5 minutes
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

