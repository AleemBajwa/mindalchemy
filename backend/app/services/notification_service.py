"""
Notification Service - Handles scheduling and sending notifications
"""
import logging
from datetime import datetime, time as dt_time
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import User, NotificationPreferences, Notification, MoodLog, Goal
from app.database import get_db

logger = logging.getLogger(__name__)

class NotificationService:
    """Service for creating and managing notifications"""
    
    @staticmethod
    def create_notification(
        db: Session,
        user_id: int,
        notification_type: str,
        title: str,
        message: str
    ) -> Notification:
        """Create a new notification"""
        notification = Notification(
            user_id=user_id,
            type=notification_type,
            title=title,
            message=message,
            read='false'
        )
        db.add(notification)
        db.commit()
        db.refresh(notification)
        return notification
    
    @staticmethod
    def should_send_daily_checkin(db: Session, user: User) -> bool:
        """Check if daily check-in notification should be sent"""
        prefs = db.query(NotificationPreferences).filter(
            NotificationPreferences.user_id == user.id
        ).first()
        
        if not prefs or prefs.daily_checkin_enabled != 'true':
            return False
        
        # Check if user already logged mood today
        today = datetime.utcnow().date()
        today_mood = db.query(MoodLog).filter(
            MoodLog.user_id == user.id,
            db.func.date(MoodLog.created_at) == today
        ).first()
        
        # Only send if no mood logged today
        return today_mood is None
    
    @staticmethod
    def should_send_mood_reminder(db: Session, user: User) -> bool:
        """Check if mood reminder should be sent"""
        prefs = db.query(NotificationPreferences).filter(
            NotificationPreferences.user_id == user.id
        ).first()
        
        if not prefs or prefs.mood_reminder_enabled != 'true':
            return False
        
        # Check if user already logged mood today
        today = datetime.utcnow().date()
        today_mood = db.query(MoodLog).filter(
            MoodLog.user_id == user.id,
            db.func.date(MoodLog.created_at) == today
        ).first()
        
        return today_mood is None
    
    @staticmethod
    def should_send_goal_reminder(db: Session, user: User) -> bool:
        """Check if goal reminder should be sent"""
        prefs = db.query(NotificationPreferences).filter(
            NotificationPreferences.user_id == user.id
        ).first()
        
        if not prefs or prefs.goal_reminder_enabled != 'true':
            return False
        
        # Check if user has active goals
        active_goals = db.query(Goal).filter(
            Goal.user_id == user.id,
            Goal.status == 'active'
        ).count()
        
        return active_goals > 0
    
    @staticmethod
    def get_motivational_message() -> tuple[str, str]:
        """Get a random motivational message"""
        messages = [
            ("You're doing great! 🌟", "Take a moment to appreciate how far you've come. Every step forward matters."),
            ("Keep going! 💪", "Progress isn't always linear, but you're moving in the right direction."),
            ("You've got this! ✨", "Remember: small steps lead to big changes. You're stronger than you think."),
            ("Be kind to yourself today 💙", "Self-compassion is a superpower. You deserve your own kindness."),
            ("Celebrate your wins! 🎉", "No matter how small, every achievement is worth celebrating."),
            ("You're not alone 🤗", "Remember that seeking help and support is a sign of strength."),
            ("Take it one day at a time 🌱", "Growth happens gradually. Trust the process."),
            ("Your feelings are valid 💜", "Whatever you're experiencing right now is okay. You're doing your best."),
        ]
        
        import random
        return random.choice(messages)
    
    @staticmethod
    def check_and_send_notifications(db: Session):
        """Check all users and send notifications based on their preferences"""
        users = db.query(User).all()
        notifications_sent = 0
        
        for user in users:
            try:
                prefs = db.query(NotificationPreferences).filter(
                    NotificationPreferences.user_id == user.id
                ).first()
                
                if not prefs:
                    continue
                
                current_time = datetime.utcnow().time()
                current_hour = current_time.hour
                current_minute = current_time.minute
                
                # Daily check-in (morning)
                if prefs.daily_checkin_enabled == 'true':
                    checkin_time = datetime.strptime(prefs.daily_checkin_time, '%H:%M').time()
                    if (current_hour == checkin_time.hour and 
                        current_minute == checkin_time.minute and
                        NotificationService.should_send_daily_checkin(db, user)):
                        NotificationService.create_notification(
                            db, user.id, 'daily_checkin',
                            "Good morning! ☀️",
                            "How are you feeling today? Take a moment to check in with yourself."
                        )
                        notifications_sent += 1
                
                # Mood reminder (evening)
                if prefs.mood_reminder_enabled == 'true':
                    mood_time = datetime.strptime(prefs.mood_reminder_time, '%H:%M').time()
                    if (current_hour == mood_time.hour and 
                        current_minute == mood_time.minute and
                        NotificationService.should_send_mood_reminder(db, user)):
                        NotificationService.create_notification(
                            db, user.id, 'mood_reminder',
                            "Time to log your mood 📊",
                            "How was your day? Logging your mood helps track patterns and progress."
                        )
                        notifications_sent += 1
                
                # Meditation reminder
                if prefs.meditation_reminder_enabled == 'true':
                    meditation_time = datetime.strptime(prefs.meditation_reminder_time, '%H:%M').time()
                    if (current_hour == meditation_time.hour and 
                        current_minute == meditation_time.minute):
                        NotificationService.create_notification(
                            db, user.id, 'meditation',
                            "Time for mindfulness 🧘",
                            "Take a few minutes for yourself. A short meditation can make a big difference."
                        )
                        notifications_sent += 1
                
                # Goal reminder (weekly check)
                if prefs.goal_reminder_enabled == 'true' and NotificationService.should_send_goal_reminder(db, user):
                    # Check if it's the right day for goal reminder (weekly = Monday)
                    if datetime.utcnow().weekday() == 0:  # Monday
                        active_goals = db.query(Goal).filter(
                            Goal.user_id == user.id,
                            Goal.status == 'active'
                        ).count()
                        NotificationService.create_notification(
                            db, user.id, 'goal',
                            f"You have {active_goals} active goal(s) 🎯",
                            "Check in on your goals this week. Progress, no matter how small, is still progress!"
                        )
                        notifications_sent += 1
                
                # Motivational messages (daily)
                if prefs.motivational_messages_enabled == 'true':
                    # Send once per day at 10:00 AM
                    if current_hour == 10 and current_minute == 0:
                        title, message = NotificationService.get_motivational_message()
                        NotificationService.create_notification(
                            db, user.id, 'motivational',
                            title, message
                        )
                        notifications_sent += 1
                        
            except Exception as e:
                logger.error(f"Error sending notification to user {user.id}: {e}", exc_info=True)
                continue
        
        logger.info(f"Sent {notifications_sent} notifications")
        return notifications_sent

# Create singleton instance
notification_service = NotificationService()

