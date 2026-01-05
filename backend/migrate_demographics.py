"""
Database Migration Script - Add Demographic Fields
This script adds demographic columns to the existing users table without losing data.
"""
import sqlite3
import os
from pathlib import Path

def migrate_database():
    """Add demographic fields to users table"""
    db_path = Path(__file__).parent / "ai_therapist.db"
    
    if not db_path.exists():
        print("Database not found. Please run init_db.py first.")
        return
    
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()
    
    try:
        # Check if columns already exist
        cursor.execute("PRAGMA table_info(users)")
        columns = [row[1] for row in cursor.fetchall()]
        
        migrations = []
        
        if 'country' not in columns:
            migrations.append("ALTER TABLE users ADD COLUMN country TEXT;")
        if 'age' not in columns:
            migrations.append("ALTER TABLE users ADD COLUMN age INTEGER;")
        if 'gender' not in columns:
            migrations.append("ALTER TABLE users ADD COLUMN gender TEXT;")
        if 'timezone' not in columns:
            migrations.append("ALTER TABLE users ADD COLUMN timezone TEXT;")
        if 'language' not in columns:
            migrations.append("ALTER TABLE users ADD COLUMN language TEXT DEFAULT 'en';")
        
        if migrations:
            print("Adding demographic fields to users table...")
            for migration in migrations:
                print(f"  Executing: {migration}")
                cursor.execute(migration)
            
            conn.commit()
            print(f"Successfully added {len(migrations)} column(s)!")
        else:
            print("All demographic fields already exist. No migration needed.")
        
        # Verify migration
        cursor.execute("PRAGMA table_info(users)")
        columns = [row[1] for row in cursor.fetchall()]
        print(f"\nCurrent columns in users table: {', '.join(columns)}")
        
    except sqlite3.Error as e:
        print(f"❌ Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_database()

