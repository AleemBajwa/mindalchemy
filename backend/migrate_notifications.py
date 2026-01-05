"""
Database migration script to add notifications tables
"""
import sqlite3
import os
import sys

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DATABASE_URL = "sqlite:///./backend/ai_therapist.db"

def get_db_path():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, "ai_therapist.db")

def migrate_database():
    db_path = get_db_path()
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Check if tables already exist
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='notification_preferences'")
        if cursor.fetchone():
            print("notification_preferences table already exists.")
        else:
            print("Creating notification_preferences table...")
            cursor.execute("""
                CREATE TABLE notification_preferences (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL UNIQUE,
                    daily_checkin_enabled VARCHAR DEFAULT 'true',
                    daily_checkin_time VARCHAR DEFAULT '09:00',
                    mood_reminder_enabled VARCHAR DEFAULT 'true',
                    mood_reminder_time VARCHAR DEFAULT '20:00',
                    meditation_reminder_enabled VARCHAR DEFAULT 'true',
                    meditation_reminder_time VARCHAR DEFAULT '19:00',
                    goal_reminder_enabled VARCHAR DEFAULT 'true',
                    goal_reminder_frequency VARCHAR DEFAULT 'weekly',
                    motivational_messages_enabled VARCHAR DEFAULT 'true',
                    motivational_frequency VARCHAR DEFAULT 'daily',
                    crisis_checkin_enabled VARCHAR DEFAULT 'true',
                    push_notifications_enabled VARCHAR DEFAULT 'true',
                    email_notifications_enabled VARCHAR DEFAULT 'false',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                )
            """)
            cursor.execute("CREATE INDEX idx_notification_prefs_user_id ON notification_preferences(user_id)")
            print("Successfully created notification_preferences table!")

        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='notifications'")
        if cursor.fetchone():
            print("notifications table already exists.")
        else:
            print("Creating notifications table...")
            cursor.execute("""
                CREATE TABLE notifications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    type VARCHAR NOT NULL,
                    title VARCHAR NOT NULL,
                    message TEXT NOT NULL,
                    read VARCHAR DEFAULT 'false',
                    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    read_at DATETIME,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                )
            """)
            cursor.execute("CREATE INDEX idx_notifications_user_id ON notifications(user_id)")
            cursor.execute("CREATE INDEX idx_notifications_read ON notifications(read)")
            cursor.execute("CREATE INDEX idx_notifications_sent_at ON notifications(sent_at)")
            print("Successfully created notifications table!")

        conn.commit()
        print("\nMigration completed successfully!")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    migrate_database()

