"""
User API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.database import get_db
from app.models import User, Session as ChatSession, MoodLog, JournalEntry, ThoughtRecord, Goal, SleepLog, Notification, CrisisAlert
from app.schemas import DashboardResponse
from app.api.auth import get_current_user
import json

router = APIRouter()

@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard data for current user"""
    
    # Total sessions
    total_sessions = db.query(func.count(ChatSession.id)).filter(
        ChatSession.user_id == current_user.id
    ).scalar() or 0
    
    # Total mood logs
    total_mood_logs = db.query(func.count(MoodLog.id)).filter(
        MoodLog.user_id == current_user.id
    ).scalar() or 0
    
    # Total journal entries
    total_journal_entries = db.query(func.count(JournalEntry.id)).filter(
        JournalEntry.user_id == current_user.id
    ).scalar() or 0
    
    # Current streak (simplified - days with at least one activity)
    # This can be enhanced with more sophisticated streak calculation
    current_streak = 0
    
    # Recent mood
    recent_mood = db.query(MoodLog).filter(
        MoodLog.user_id == current_user.id
    ).order_by(MoodLog.created_at.desc()).first()
    recent_mood_type = recent_mood.mood_type if recent_mood else None
    
    # Recent activity (last 5 activities)
    recent_activity = []
    
    # Get recent sessions
    recent_sessions = db.query(ChatSession).filter(
        ChatSession.user_id == current_user.id
    ).order_by(ChatSession.updated_at.desc()).limit(3).all()
    
    for session in recent_sessions:
        recent_activity.append({
            "type": "chat",
            "title": "Chat Session",
            "timestamp": session.updated_at.isoformat() if session.updated_at else session.created_at.isoformat()
        })
    
    # Get recent journal entries
    recent_journals = db.query(JournalEntry).filter(
        JournalEntry.user_id == current_user.id
    ).order_by(JournalEntry.updated_at.desc()).limit(2).all()
    
    for journal in recent_journals:
        recent_activity.append({
            "type": "journal",
            "title": journal.title or "Journal Entry",
            "timestamp": journal.updated_at.isoformat() if journal.updated_at else journal.created_at.isoformat()
        })
    
    # Sort by timestamp
    recent_activity.sort(key=lambda x: x["timestamp"], reverse=True)
    recent_activity = recent_activity[:5]
    
    return DashboardResponse(
        total_sessions=total_sessions,
        total_mood_logs=total_mood_logs,
        total_journal_entries=total_journal_entries,
        current_streak=current_streak,
        recent_mood=recent_mood_type,
        recent_activity=recent_activity
    )

@router.get("/export")
async def export_user_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Export all user data in JSON format"""
    try:
        # Collect all user data
        user_data = {
            "user": {
                "id": current_user.id,
                "email": current_user.email,
                "full_name": current_user.full_name,
                "country": current_user.country,
                "age": current_user.age,
                "gender": current_user.gender,
                "timezone": current_user.timezone,
                "language": current_user.language,
                "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
                "updated_at": current_user.updated_at.isoformat() if current_user.updated_at else None
            },
            "sessions": [],
            "mood_logs": [],
            "journal_entries": [],
            "thought_records": [],
            "goals": [],
            "sleep_logs": [],
            "notifications": [],
            "crisis_alerts": [],
            "export_date": datetime.utcnow().isoformat()
        }
        
        # Sessions
        sessions = db.query(ChatSession).filter(ChatSession.user_id == current_user.id).all()
        for session in sessions:
            user_data["sessions"].append({
                "id": session.id,
                "messages": session.messages,
                "sentiment": session.sentiment,
                "created_at": session.created_at.isoformat() if session.created_at else None,
                "updated_at": session.updated_at.isoformat() if session.updated_at else None
            })
        
        # Mood logs
        mood_logs = db.query(MoodLog).filter(MoodLog.user_id == current_user.id).all()
        for log in mood_logs:
            user_data["mood_logs"].append({
                "id": log.id,
                "mood_type": log.mood_type,
                "intensity": log.intensity,
                "notes": log.notes,
                "created_at": log.created_at.isoformat() if log.created_at else None
            })
        
        # Journal entries
        journal_entries = db.query(JournalEntry).filter(JournalEntry.user_id == current_user.id).all()
        for entry in journal_entries:
            user_data["journal_entries"].append({
                "id": entry.id,
                "title": entry.title,
                "content": entry.content,
                "mood": entry.mood,
                "tags": entry.tags,
                "created_at": entry.created_at.isoformat() if entry.created_at else None,
                "updated_at": entry.updated_at.isoformat() if entry.updated_at else None
            })
        
        # Thought records
        thought_records = db.query(ThoughtRecord).filter(ThoughtRecord.user_id == current_user.id).all()
        for record in thought_records:
            user_data["thought_records"].append({
                "id": record.id,
                "situation": record.situation,
                "automatic_thought": record.automatic_thought,
                "emotion": record.emotion,
                "intensity": record.intensity,
                "evidence_for": record.evidence_for,
                "evidence_against": record.evidence_against,
                "alternative_thought": record.alternative_thought,
                "outcome": record.outcome,
                "created_at": record.created_at.isoformat() if record.created_at else None
            })
        
        # Goals
        goals = db.query(Goal).filter(Goal.user_id == current_user.id).all()
        for goal in goals:
            user_data["goals"].append({
                "id": goal.id,
                "title": goal.title,
                "description": goal.description,
                "category": goal.category,
                "target_date": goal.target_date.isoformat() if goal.target_date else None,
                "status": goal.status,
                "progress": goal.progress,
                "created_at": goal.created_at.isoformat() if goal.created_at else None,
                "updated_at": goal.updated_at.isoformat() if goal.updated_at else None
            })
        
        # Sleep logs
        sleep_logs = db.query(SleepLog).filter(SleepLog.user_id == current_user.id).all()
        for log in sleep_logs:
            user_data["sleep_logs"].append({
                "id": log.id,
                "sleep_time": log.sleep_time.isoformat() if log.sleep_time else None,
                "wake_time": log.wake_time.isoformat() if log.wake_time else None,
                "duration_hours": log.duration_hours,
                "quality": log.quality,
                "notes": log.notes,
                "created_at": log.created_at.isoformat() if log.created_at else None
            })
        
        # Notifications
        notifications = db.query(Notification).filter(Notification.user_id == current_user.id).all()
        for notif in notifications:
            user_data["notifications"].append({
                "id": notif.id,
                "type": notif.type,
                "title": notif.title,
                "message": notif.message,
                "read": notif.read,
                "sent_at": notif.sent_at.isoformat() if notif.sent_at else None,
                "read_at": notif.read_at.isoformat() if notif.read_at else None
            })
        
        # Crisis alerts
        crisis_alerts = db.query(CrisisAlert).filter(CrisisAlert.user_id == current_user.id).all()
        for alert in crisis_alerts:
            user_data["crisis_alerts"].append({
                "id": alert.id,
                "risk_level": alert.risk_level,
                "user_message": alert.user_message,
                "location_lat": alert.location_lat,
                "location_lng": alert.location_lng,
                "country": alert.country,
                "emergency_number": alert.emergency_number,
                "status": alert.status,
                "created_at": alert.created_at.isoformat() if alert.created_at else None
            })
        
        return user_data
        
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error exporting user data: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to export data: {str(e)}")

@router.delete("/account")
async def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete user account and all associated data.
    This is a permanent action and cannot be undone.
    """
    try:
        user_id = current_user.id
        
        # Delete all user data (cascade should handle most, but being explicit)
        # The cascade relationships should handle deletion, but we'll be explicit for safety
        
        # Delete user (this will cascade delete all related records)
        db.delete(current_user)
        db.commit()
        
        return {
            "message": "Account and all associated data have been permanently deleted",
            "deleted_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        db.rollback()
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error deleting account: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to delete account: {str(e)}")
