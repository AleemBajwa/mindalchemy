"""Test database connection"""
from app.database import SessionLocal
from app.models import User

db = SessionLocal()
try:
    count = db.query(User).count()
    print(f"Database connection works! Users in DB: {count}")
except Exception as e:
    print(f"Database error: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()

