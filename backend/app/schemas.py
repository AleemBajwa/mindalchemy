"""
Pydantic Schemas for Request/Response Validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    country: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    timezone: Optional[str] = None
    language: Optional[str] = 'en'

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    country: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    timezone: Optional[str] = None
    language: Optional[str] = None

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Chat Schemas
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[datetime] = None

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[int] = None
    location: Optional[Dict[str, float]] = None  # {lat: float, lng: float}

class ChatResponse(BaseModel):
    response: str
    session_id: int
    is_crisis: bool
    risk_level: Optional[str] = None
    sentiment: Optional[str] = None
    emergency_number: Optional[str] = None  # Emergency number for auto-dial
    crisis_alert_id: Optional[int] = None  # ID of the crisis alert created
    quick_replies: Optional[List[str]] = None  # Quick reply suggestions

class SessionResponse(BaseModel):
    id: int
    user_id: int
    messages: List[Dict]
    sentiment: Optional[str]
    summary: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class SessionSummaryRequest(BaseModel):
    session_id: int

class SessionSummaryResponse(BaseModel):
    session_id: int
    summary: str

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Mood Schemas
class MoodLogCreate(BaseModel):
    mood_type: str
    mood_value: int
    intensity: Optional[float] = None
    trigger: Optional[str] = None
    notes: Optional[str] = None

class MoodLogResponse(BaseModel):
    id: int
    user_id: int
    mood_type: str
    mood_value: int
    intensity: Optional[float]
    trigger: Optional[str]
    notes: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class MoodStatsResponse(BaseModel):
    total_logs: int
    average_mood: float
    mood_distribution: Dict[str, int]
    recent_trend: str  # "improving", "declining", "stable"

# Journal Schemas
class JournalEntryCreate(BaseModel):
    title: Optional[str] = None
    content: str
    tags: Optional[List[str]] = []

class JournalEntryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class JournalEntryResponse(BaseModel):
    id: int
    user_id: int
    title: Optional[str]
    content: str
    tags: List[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Dashboard Schemas
class DashboardResponse(BaseModel):
    total_sessions: int
    total_mood_logs: int
    total_journal_entries: int
    current_streak: int
    recent_mood: Optional[str]
    recent_activity: List[Dict]

# Thought Record Schemas
class ThoughtRecordCreate(BaseModel):
    situation: Optional[str] = None
    automatic_thoughts: Optional[str] = None
    emotions: Optional[str] = None
    emotion_intensity: Optional[int] = None
    evidence_for: Optional[str] = None
    evidence_against: Optional[str] = None
    alternative_thoughts: Optional[str] = None
    outcome_rating: Optional[int] = None

class ThoughtRecordUpdate(BaseModel):
    situation: Optional[str] = None
    automatic_thoughts: Optional[str] = None
    emotions: Optional[str] = None
    emotion_intensity: Optional[int] = None
    evidence_for: Optional[str] = None
    evidence_against: Optional[str] = None
    alternative_thoughts: Optional[str] = None
    outcome_rating: Optional[int] = None

class ThoughtRecordResponse(BaseModel):
    id: int
    user_id: int
    situation: Optional[str]
    automatic_thoughts: Optional[str]
    emotions: Optional[str]
    emotion_intensity: Optional[int]
    evidence_for: Optional[str]
    evidence_against: Optional[str]
    alternative_thoughts: Optional[str]
    outcome_rating: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Goal Schemas
class GoalCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    target_date: Optional[datetime] = None

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_date: Optional[datetime] = None
    progress: Optional[int] = None
    status: Optional[str] = None

class GoalResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: Optional[str]
    category: Optional[str]
    target_date: Optional[datetime]
    progress: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Sleep Schemas
class SleepLogCreate(BaseModel):
    sleep_hours: float
    sleep_quality: int
    bedtime: Optional[datetime] = None
    wake_time: Optional[datetime] = None
    notes: Optional[str] = None

class SleepLogResponse(BaseModel):
    id: int
    user_id: int
    sleep_hours: float
    sleep_quality: int
    bedtime: Optional[datetime]
    wake_time: Optional[datetime]
    notes: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationPreferencesUpdate(BaseModel):
    daily_checkin_enabled: Optional[str] = None
    daily_checkin_time: Optional[str] = None
    mood_reminder_enabled: Optional[str] = None
    mood_reminder_time: Optional[str] = None
    meditation_reminder_enabled: Optional[str] = None
    meditation_reminder_time: Optional[str] = None
    goal_reminder_enabled: Optional[str] = None
    goal_reminder_frequency: Optional[str] = None
    motivational_messages_enabled: Optional[str] = None
    motivational_frequency: Optional[str] = None
    crisis_checkin_enabled: Optional[str] = None
    push_notifications_enabled: Optional[str] = None
    email_notifications_enabled: Optional[str] = None

class NotificationPreferencesResponse(BaseModel):
    id: int
    user_id: int
    daily_checkin_enabled: str
    daily_checkin_time: str
    mood_reminder_enabled: str
    mood_reminder_time: str
    meditation_reminder_enabled: str
    meditation_reminder_time: str
    goal_reminder_enabled: str
    goal_reminder_frequency: str
    motivational_messages_enabled: str
    motivational_frequency: str
    crisis_checkin_enabled: str
    push_notifications_enabled: str
    email_notifications_enabled: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    message: str
    read: str
    sent_at: datetime
    read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

