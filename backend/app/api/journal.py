"""
Journal API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, JournalEntry
from app.schemas import JournalEntryCreate, JournalEntryUpdate, JournalEntryResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=JournalEntryResponse, status_code=201)
async def create_journal_entry(
    entry_data: JournalEntryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new journal entry"""
    journal_entry = JournalEntry(
        user_id=current_user.id,
        title=entry_data.title,
        content=entry_data.content,
        tags=entry_data.tags or []
    )
    
    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    
    return journal_entry

@router.get("/", response_model=List[JournalEntryResponse])
async def get_journal_entries(
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all journal entries for current user"""
    entries = db.query(JournalEntry).filter(
        JournalEntry.user_id == current_user.id
    ).order_by(JournalEntry.created_at.desc()).limit(limit).all()
    
    return entries

@router.get("/{entry_id}", response_model=JournalEntryResponse)
async def get_journal_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific journal entry"""
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    return entry

@router.put("/{entry_id}", response_model=JournalEntryResponse)
async def update_journal_entry(
    entry_id: int,
    entry_data: JournalEntryUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a journal entry"""
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    if entry_data.title is not None:
        entry.title = entry_data.title
    if entry_data.content is not None:
        entry.content = entry_data.content
    if entry_data.tags is not None:
        entry.tags = entry_data.tags
    
    db.commit()
    db.refresh(entry)
    
    return entry

@router.delete("/{entry_id}")
async def delete_journal_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a journal entry"""
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    db.delete(entry)
    db.commit()
    
    return {"message": "Journal entry deleted successfully"}

