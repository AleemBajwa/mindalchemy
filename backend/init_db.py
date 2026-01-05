"""
Initialize Database - Create all tables
"""
from app.database import engine, Base
from app.models import User, Session, MoodLog, JournalEntry, ThoughtRecord, Goal, SleepLog

def init_db():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()

