"""
Goals API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database import get_db
from app.models import User, Goal
from app.schemas import GoalCreate, GoalUpdate, GoalResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=GoalResponse, status_code=201)
async def create_goal(
    goal_data: GoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new goal"""
    goal = Goal(
        user_id=current_user.id,
        title=goal_data.title,
        description=goal_data.description,
        category=goal_data.category,
        target_date=goal_data.target_date,
        progress=0,
        status="active"
    )
    
    db.add(goal)
    db.commit()
    db.refresh(goal)
    
    return goal

@router.get("/", response_model=List[GoalResponse])
async def get_goals(
    status: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all goals for current user"""
    query = db.query(Goal).filter(Goal.user_id == current_user.id)
    
    if status:
        query = query.filter(Goal.status == status)
    
    goals = query.order_by(Goal.created_at.desc()).all()
    return goals

@router.get("/{goal_id}", response_model=GoalResponse)
async def get_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific goal"""
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return goal

@router.put("/{goal_id}", response_model=GoalResponse)
async def update_goal(
    goal_id: int,
    goal_data: GoalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a goal"""
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal_data.title is not None:
        goal.title = goal_data.title
    if goal_data.description is not None:
        goal.description = goal_data.description
    if goal_data.category is not None:
        goal.category = goal_data.category
    if goal_data.target_date is not None:
        goal.target_date = goal_data.target_date
    if goal_data.progress is not None:
        goal.progress = max(0, min(100, goal_data.progress))  # Clamp between 0-100
    if goal_data.status is not None:
        goal.status = goal_data.status
    
    db.commit()
    db.refresh(goal)
    
    return goal

@router.delete("/{goal_id}")
async def delete_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a goal"""
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(goal)
    db.commit()
    
    return {"message": "Goal deleted successfully"}

