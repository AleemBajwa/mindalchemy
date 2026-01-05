"""
Sleep Tracking API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.database import get_db
from app.models import User, SleepLog
from app.schemas import SleepLogCreate, SleepLogResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=SleepLogResponse, status_code=201)
async def log_sleep(
    sleep_data: SleepLogCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Log a sleep entry"""
    sleep_log = SleepLog(
        user_id=current_user.id,
        sleep_hours=sleep_data.sleep_hours,
        sleep_quality=sleep_data.sleep_quality,
        bedtime=sleep_data.bedtime,
        wake_time=sleep_data.wake_time,
        notes=sleep_data.notes
    )
    
    db.add(sleep_log)
    db.commit()
    db.refresh(sleep_log)
    
    return sleep_log

@router.get("/", response_model=List[SleepLogResponse])
async def get_sleep_logs(
    limit: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get sleep logs for current user"""
    sleep_logs = db.query(SleepLog).filter(
        SleepLog.user_id == current_user.id
    ).order_by(SleepLog.created_at.desc()).limit(limit).all()
    
    return sleep_logs

@router.get("/stats")
async def get_sleep_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get sleep statistics for current user"""
    # Total logs
    total_logs = db.query(func.count(SleepLog.id)).filter(
        SleepLog.user_id == current_user.id
    ).scalar() or 0
    
    # Average sleep hours
    avg_hours = db.query(func.avg(SleepLog.sleep_hours)).filter(
        SleepLog.user_id == current_user.id
    ).scalar() or 0.0
    
    # Average sleep quality
    avg_quality = db.query(func.avg(SleepLog.sleep_quality)).filter(
        SleepLog.user_id == current_user.id
    ).scalar() or 0.0
    
    return {
        "total_logs": total_logs,
        "average_hours": round(float(avg_hours), 2),
        "average_quality": round(float(avg_quality), 2)
    }

@router.get("/{log_id}", response_model=SleepLogResponse)
async def get_sleep_log(
    log_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific sleep log"""
    sleep_log = db.query(SleepLog).filter(
        SleepLog.id == log_id,
        SleepLog.user_id == current_user.id
    ).first()
    
    if not sleep_log:
        raise HTTPException(status_code=404, detail="Sleep log not found")
    
    return sleep_log

