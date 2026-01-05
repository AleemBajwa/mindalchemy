import sqlite3
import os
import sys

DATABASE_URL = "sqlite:///./backend/ai_therapist.db"

def get_db_path():
    path = DATABASE_URL.replace("sqlite:///./", "")
    return os.path.join(os.path.dirname(__file__), path)

def migrate_database():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    db_path = get_db_path()
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Check existing columns
        cursor.execute("PRAGMA table_info(journal_entries)")
        existing_columns = [col[1] for col in cursor.fetchall()]

        if 'journal_type' not in existing_columns:
            print("Adding journal_type column to journal_entries table...")
            cursor.execute("ALTER TABLE journal_entries ADD COLUMN journal_type TEXT DEFAULT 'general';")
            conn.commit()
            print("✅ Successfully added journal_type column!")
        else:
            print("ℹ️ journal_type column already exists. No migration needed.")

        # Verify columns
        cursor.execute("PRAGMA table_info(journal_entries)")
        current_columns = [col[1] for col in cursor.fetchall()]
        print(f"Current columns in journal_entries table: {', '.join(current_columns)}")

    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    migrate_database()

