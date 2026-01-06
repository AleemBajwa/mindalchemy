"""
Initialize Database on Vercel Postgres
Run this once after deploying to Vercel
"""
import os
import sys

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from app.database import engine, Base
from app.models import (
    User, Session, MoodLog, JournalEntry, ThoughtRecord, 
    Goal, SleepLog, CrisisAlert, NotificationPreferences, Notification
)

def init_db():
    """Create all database tables"""
    print("Creating database tables on Vercel Postgres...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database initialized successfully!")
        print("\nTables created:")
        for table in Base.metadata.tables:
            print(f"  - {table}")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    init_db()

