"""
Database Models
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    # Demographic fields
    country = Column(String, nullable=True)  # Country code (e.g., 'US', 'PK', 'IN')
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)  # 'male', 'female', 'other', 'prefer_not_to_say'
    timezone = Column(String, nullable=True)  # User's timezone
    language = Column(String, nullable=True, default='en')  # Preferred language
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    mood_logs = relationship("MoodLog", back_populates="user", cascade="all, delete-orphan")
    journal_entries = relationship("JournalEntry", back_populates="user", cascade="all, delete-orphan")
    thought_records = relationship("ThoughtRecord", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    sleep_logs = relationship("SleepLog", back_populates="user", cascade="all, delete-orphan")
    crisis_alerts = relationship("CrisisAlert", back_populates="user", cascade="all, delete-orphan")
    notification_preferences = relationship("NotificationPreferences", back_populates="user", uselist=False, cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    messages = Column(JSON, default=list)  # Store conversation messages
    sentiment = Column(String, nullable=True)  # Overall sentiment
    summary = Column(Text, nullable=True)  # AI-generated session summary
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="sessions")

class CrisisAlert(Base):
    __tablename__ = "crisis_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    risk_level = Column(String, nullable=False)  # 'high', 'medium'
    user_message = Column(Text, nullable=True)  # The message that triggered the crisis
    location_lat = Column(Float, nullable=True)  # User's latitude if available
    location_lng = Column(Float, nullable=True)  # User's longitude if available
    country = Column(String, nullable=True)  # User's country
    emergency_number = Column(String, nullable=True)  # Emergency number for their country
    notified_authorities = Column(String, nullable=True)  # JSON string of notified services
    status = Column(String, default='pending')  # 'pending', 'notified', 'resolved'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="crisis_alerts")

class MoodLog(Base):
    __tablename__ = "mood_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    mood_type = Column(String, nullable=False)  # 'happy', 'sad', 'anxious', etc.
    intensity = Column(Integer, nullable=True)  # 1-10 scale
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="mood_logs")

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    mood = Column(String, nullable=True)
    tags = Column(JSON, default=list)
    journal_type = Column(String, default='general')  # 'general', 'gratitude', 'dream'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="journal_entries")

class ThoughtRecord(Base):
    __tablename__ = "thought_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    situation = Column(Text, nullable=True)
    automatic_thought = Column(Text, nullable=True)
    emotion = Column(String, nullable=True)
    intensity = Column(Integer, nullable=True)
    evidence_for = Column(Text, nullable=True)
    evidence_against = Column(Text, nullable=True)
    alternative_thought = Column(Text, nullable=True)
    outcome = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="thought_records")

class Goal(Base):
    __tablename__ = "goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    target_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(String, default='active')  # 'active', 'completed', 'archived'
    progress = Column(Integer, default=0)  # 0-100
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="goals")

class SleepLog(Base):
    __tablename__ = "sleep_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sleep_time = Column(DateTime(timezone=True), nullable=False)
    wake_time = Column(DateTime(timezone=True), nullable=True)
    duration_hours = Column(Float, nullable=True)
    quality = Column(Integer, nullable=True)  # 1-10 scale
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="sleep_logs")

class NotificationPreferences(Base):
    __tablename__ = "notification_preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Notification types (all boolean, default True)
    daily_checkin_enabled = Column(String, default='true')  # 'true', 'false'
    daily_checkin_time = Column(String, default='09:00')  # HH:MM format
    
    mood_reminder_enabled = Column(String, default='true')
    mood_reminder_time = Column(String, default='20:00')
    
    meditation_reminder_enabled = Column(String, default='true')
    meditation_reminder_time = Column(String, default='19:00')
    
    goal_reminder_enabled = Column(String, default='true')
    goal_reminder_frequency = Column(String, default='weekly')  # 'daily', 'weekly', 'monthly'
    
    motivational_messages_enabled = Column(String, default='true')
    motivational_frequency = Column(String, default='daily')  # 'daily', 'weekly'
    
    crisis_checkin_enabled = Column(String, default='true')  # Follow-up after crisis
    
    push_notifications_enabled = Column(String, default='true')
    email_notifications_enabled = Column(String, default='false')
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="notification_preferences")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)  # 'daily_checkin', 'mood_reminder', 'meditation', 'goal', 'motivational', 'crisis_checkin'
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    read = Column(String, default='false')  # 'true', 'false'
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
    read_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="notifications")
