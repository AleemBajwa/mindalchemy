"""
Notifications API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.database import get_db
from app.models import User, NotificationPreferences, Notification
from app.schemas import NotificationPreferencesUpdate, NotificationPreferencesResponse, NotificationResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/preferences", response_model=NotificationPreferencesResponse)
async def get_notification_preferences(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's notification preferences"""
    prefs = db.query(NotificationPreferences).filter(
        NotificationPreferences.user_id == current_user.id
    ).first()
    
    if not prefs:
        # Create default preferences
        prefs = NotificationPreferences(
            user_id=current_user.id,
            daily_checkin_enabled='true',
            daily_checkin_time='09:00',
            mood_reminder_enabled='true',
            mood_reminder_time='20:00',
            meditation_reminder_enabled='true',
            meditation_reminder_time='19:00',
            goal_reminder_enabled='true',
            goal_reminder_frequency='weekly',
            motivational_messages_enabled='true',
            motivational_frequency='daily',
            crisis_checkin_enabled='true',
            push_notifications_enabled='true',
            email_notifications_enabled='false'
        )
        db.add(prefs)
        db.commit()
        db.refresh(prefs)
    
    return prefs

@router.put("/preferences", response_model=NotificationPreferencesResponse)
async def update_notification_preferences(
    preferences: NotificationPreferencesUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user's notification preferences"""
    prefs = db.query(NotificationPreferences).filter(
        NotificationPreferences.user_id == current_user.id
    ).first()
    
    if not prefs:
        # Create if doesn't exist
        prefs = NotificationPreferences(user_id=current_user.id)
        db.add(prefs)
    
    # Update only provided fields
    update_data = preferences.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(prefs, field, value)
    
    prefs.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(prefs)
    
    return prefs

@router.get("/", response_model=List[NotificationResponse])
async def get_notifications(
    limit: int = 50,
    unread_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's notifications"""
    query = db.query(Notification).filter(
        Notification.user_id == current_user.id
    )
    
    if unread_only:
        query = query.filter(Notification.read == 'false')
    
    notifications = query.order_by(Notification.sent_at.desc()).limit(limit).all()
    return notifications

@router.put("/{notification_id}/read")
async def mark_notification_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark a notification as read"""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.read = 'true'
    notification.read_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Notification marked as read"}

@router.put("/read-all")
async def mark_all_notifications_read(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark all notifications as read"""
    db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.read == 'false'
    ).update({
        'read': 'true',
        'read_at': datetime.utcnow()
    })
    db.commit()
    
    return {"message": "All notifications marked as read"}

@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a notification"""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db.delete(notification)
    db.commit()
    
    return {"message": "Notification deleted"}

@router.get("/unread-count")
async def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get count of unread notifications"""
    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.read == 'false'
    ).count()
    
    return {"count": count}

@router.post("/check-and-send")
async def check_and_send_notifications(
    db: Session = Depends(get_db)
):
    """
    Check all users and send notifications based on their preferences.
    This endpoint should be called periodically (e.g., via cron job or scheduler).
    """
    from app.services.notification_service import notification_service
    
    try:
        count = notification_service.check_and_send_notifications(db)
        return {
            "status": "success",
            "notifications_sent": count,
            "message": f"Sent {count} notifications"
        }
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error checking notifications: {e}", exc_info=True)
        return {
            "status": "error",
            "error": str(e)
        }

