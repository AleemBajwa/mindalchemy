"""
Mood Tracking API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.database import get_db
from app.models import User, MoodLog
from app.schemas import MoodLogCreate, MoodLogResponse, MoodStatsResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=MoodLogResponse, status_code=201)
async def log_mood(
    mood_data: MoodLogCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Log a mood entry"""
    mood_log = MoodLog(
        user_id=current_user.id,
        mood_type=mood_data.mood_type,
        mood_value=mood_data.mood_value,
        intensity=mood_data.intensity,
        trigger=mood_data.trigger,
        notes=mood_data.notes
    )
    
    db.add(mood_log)
    db.commit()
    db.refresh(mood_log)
    
    return mood_log

@router.get("/", response_model=List[MoodLogResponse])
async def get_mood_logs(
    limit: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get mood logs for current user"""
    mood_logs = db.query(MoodLog).filter(
        MoodLog.user_id == current_user.id
    ).order_by(MoodLog.created_at.desc()).limit(limit).all()
    
    return mood_logs

@router.get("/stats", response_model=MoodStatsResponse)
async def get_mood_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get mood statistics for current user"""
    # Total logs
    total_logs = db.query(func.count(MoodLog.id)).filter(
        MoodLog.user_id == current_user.id
    ).scalar() or 0
    
    # Average mood value
    avg_mood = db.query(func.avg(MoodLog.mood_value)).filter(
        MoodLog.user_id == current_user.id
    ).scalar() or 0.0
    
    # Mood distribution
    mood_dist = db.query(
        MoodLog.mood_type,
        func.count(MoodLog.id)
    ).filter(
        MoodLog.user_id == current_user.id
    ).group_by(MoodLog.mood_type).all()
    
    mood_distribution = {mood_type: count for mood_type, count in mood_dist}
    
    # Recent trend (simplified - compare last 7 days vs previous 7 days)
    # This is a simplified version - can be enhanced
    recent_trend = "stable"
    
    return MoodStatsResponse(
        total_logs=total_logs,
        average_mood=round(float(avg_mood), 2),
        mood_distribution=mood_distribution,
        recent_trend=recent_trend
    )

@router.get("/{mood_id}", response_model=MoodLogResponse)
async def get_mood_log(
    mood_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific mood log"""
    mood_log = db.query(MoodLog).filter(
        MoodLog.id == mood_id,
        MoodLog.user_id == current_user.id
    ).first()
    
    if not mood_log:
        raise HTTPException(status_code=404, detail="Mood log not found")
    
    return mood_log

