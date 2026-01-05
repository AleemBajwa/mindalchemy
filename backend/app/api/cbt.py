"""
CBT Tools API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, ThoughtRecord
from app.schemas import ThoughtRecordCreate, ThoughtRecordUpdate, ThoughtRecordResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/thought-records", response_model=ThoughtRecordResponse, status_code=201)
async def create_thought_record(
    record_data: ThoughtRecordCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new thought record"""
    thought_record = ThoughtRecord(
        user_id=current_user.id,
        situation=record_data.situation,
        automatic_thoughts=record_data.automatic_thoughts,
        emotions=record_data.emotions,
        emotion_intensity=record_data.emotion_intensity,
        evidence_for=record_data.evidence_for,
        evidence_against=record_data.evidence_against,
        alternative_thoughts=record_data.alternative_thoughts,
        outcome_rating=record_data.outcome_rating
    )
    
    db.add(thought_record)
    db.commit()
    db.refresh(thought_record)
    
    return thought_record

@router.get("/thought-records", response_model=List[ThoughtRecordResponse])
async def get_thought_records(
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all thought records for current user"""
    records = db.query(ThoughtRecord).filter(
        ThoughtRecord.user_id == current_user.id
    ).order_by(ThoughtRecord.created_at.desc()).limit(limit).all()
    
    return records

@router.get("/thought-records/{record_id}", response_model=ThoughtRecordResponse)
async def get_thought_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific thought record"""
    record = db.query(ThoughtRecord).filter(
        ThoughtRecord.id == record_id,
        ThoughtRecord.user_id == current_user.id
    ).first()
    
    if not record:
        raise HTTPException(status_code=404, detail="Thought record not found")
    
    return record

@router.put("/thought-records/{record_id}", response_model=ThoughtRecordResponse)
async def update_thought_record(
    record_id: int,
    record_data: ThoughtRecordUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a thought record"""
    record = db.query(ThoughtRecord).filter(
        ThoughtRecord.id == record_id,
        ThoughtRecord.user_id == current_user.id
    ).first()
    
    if not record:
        raise HTTPException(status_code=404, detail="Thought record not found")
    
    if record_data.situation is not None:
        record.situation = record_data.situation
    if record_data.automatic_thoughts is not None:
        record.automatic_thoughts = record_data.automatic_thoughts
    if record_data.emotions is not None:
        record.emotions = record_data.emotions
    if record_data.emotion_intensity is not None:
        record.emotion_intensity = record_data.emotion_intensity
    if record_data.evidence_for is not None:
        record.evidence_for = record_data.evidence_for
    if record_data.evidence_against is not None:
        record.evidence_against = record_data.evidence_against
    if record_data.alternative_thoughts is not None:
        record.alternative_thoughts = record_data.alternative_thoughts
    if record_data.outcome_rating is not None:
        record.outcome_rating = record_data.outcome_rating
    
    db.commit()
    db.refresh(record)
    
    return record

@router.delete("/thought-records/{record_id}")
async def delete_thought_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a thought record"""
    record = db.query(ThoughtRecord).filter(
        ThoughtRecord.id == record_id,
        ThoughtRecord.user_id == current_user.id
    ).first()
    
    if not record:
        raise HTTPException(status_code=404, detail="Thought record not found")
    
    db.delete(record)
    db.commit()
    
    return {"message": "Thought record deleted successfully"}

