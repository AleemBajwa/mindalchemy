"""
Database migration script to add crisis_alerts table
"""
import sqlite3
import os
import sys

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DATABASE_URL = "sqlite:///./backend/ai_therapist.db"

def get_db_path():
    # Extract path from DATABASE_URL
    path = DATABASE_URL.replace("sqlite:///./", "")
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Join with the path (which should be backend/ai_therapist.db)
    return os.path.join(script_dir, "ai_therapist.db")

def migrate_database():
    db_path = get_db_path()
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Check if table already exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='crisis_alerts'")
        if cursor.fetchone():
            print("crisis_alerts table already exists. No migration needed.")
            return

        print("Creating crisis_alerts table...")
        
        # Create crisis_alerts table
        cursor.execute("""
            CREATE TABLE crisis_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                risk_level VARCHAR NOT NULL,
                user_message TEXT,
                location_lat REAL,
                location_lng REAL,
                country VARCHAR,
                emergency_number VARCHAR,
                notified_authorities TEXT,
                status VARCHAR DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)
        
        # Create index on user_id for faster queries
        cursor.execute("CREATE INDEX idx_crisis_alerts_user_id ON crisis_alerts(user_id)")
        cursor.execute("CREATE INDEX idx_crisis_alerts_created_at ON crisis_alerts(created_at)")
        
        conn.commit()
        print("Successfully created crisis_alerts table!")

        # Verify table creation
        cursor.execute("PRAGMA table_info(crisis_alerts)")
        columns = cursor.fetchall()
        print(f"Table created with {len(columns)} columns:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    migrate_database()

