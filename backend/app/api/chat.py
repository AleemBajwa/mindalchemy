"""
Chat API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models import User, Session as ChatSession, CrisisAlert
from app.schemas import ChatRequest, ChatResponse, SessionResponse, SessionSummaryRequest, SessionSummaryResponse
from app.api.auth import get_current_user
from app.services.groq_service import groq_service
from app.services.emergency_service import EmergencyService
from app.services.crisis_resources import get_crisis_resources
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(
    chat_request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Send a message to MindAlchemy AI guide and get response"""
    
    # Get or create session
    if chat_request.session_id:
        session = db.query(ChatSession).filter(
            ChatSession.id == chat_request.session_id,
            ChatSession.user_id == current_user.id
        ).first()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        # Create new session
        session = ChatSession(
            user_id=current_user.id,
            messages=[]
        )
        db.add(session)
        db.commit()
        db.refresh(session)
    
    # Get conversation history
    messages = session.messages or []
    
    # Get AI response from Groq with user context including country
    # Refresh user to ensure we have latest country data
    db.refresh(current_user)
    user_country = current_user.country
    
    # Log for debugging
    import logging
    logger = logging.getLogger(__name__)
    logger.info(f"User ID: {current_user.id}, Country: {user_country}")
    
    user_context = {
        "country": user_country,
        "location": chat_request.location  # Pass location to groq service
    }
    
    result = await groq_service.chat(
        messages=messages,
        user_message=chat_request.message,
        user_context=user_context
    )
    
    # CRISIS DETECTED - Automatically notify authorities
    crisis_alert_id = None
    emergency_number = None
    
    if result.get("is_crisis", False):
        risk_level = result.get("risk_level", "medium")
        
        # Get emergency number for user's country
        resources = get_crisis_resources(user_country or 'US')
        emergency_number = resources.get('emergency', '911')
        
        # Get user location if provided
        location = None
        if chat_request.location:
            location = (chat_request.location.get('lat'), chat_request.location.get('lng'))
        
        # Create crisis alert record
        crisis_alert = CrisisAlert(
            user_id=current_user.id,
            risk_level=risk_level,
            user_message=chat_request.message,
            location_lat=location[0] if location else None,
            location_lng=location[1] if location else None,
            country=user_country,
            emergency_number=emergency_number,
            status='pending'
        )
        db.add(crisis_alert)
        db.commit()
        db.refresh(crisis_alert)
        crisis_alert_id = crisis_alert.id
        
        # AUTOMATICALLY NOTIFY AUTHORITIES (non-blocking)
        try:
            notification_result = await EmergencyService.notify_authorities(
                user_id=current_user.id,
                user_email=current_user.email,
                user_name=current_user.full_name,
                country=user_country or 'US',
                risk_level=risk_level,
                user_message=chat_request.message,
                location=location
            )
            
            # Update alert with notification status
            crisis_alert.notified_authorities = str(notification_result.get('notified_services', []))
            crisis_alert.status = 'notified'
            db.commit()
            
            logger.critical(
                f"✅ Authorities notified for crisis alert {crisis_alert_id}. "
                f"Status: {notification_result.get('status')}"
            )
        except Exception as e:
            logger.error(f"Failed to notify authorities for alert {crisis_alert_id}: {e}", exc_info=True)
            # Don't fail the request - user still gets response
    
    # Add messages to session
    messages.append({
        "role": "user",
        "content": chat_request.message,
        "timestamp": datetime.utcnow().isoformat()
    })
    messages.append({
        "role": "assistant",
        "content": result["response"],
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # Update session
    session.messages = messages
    session.sentiment = result.get("sentiment")
    session.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(session)
    
    return ChatResponse(
        response=result["response"],
        session_id=session.id,
        is_crisis=result.get("is_crisis", False),
        risk_level=result.get("risk_level"),
        sentiment=result.get("sentiment"),
        emergency_number=emergency_number,
        crisis_alert_id=crisis_alert_id,
        quick_replies=result.get("quick_replies", [])
    )

@router.get("/sessions", response_model=list[SessionResponse])
async def get_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all chat sessions for current user"""
    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == current_user.id
    ).order_by(ChatSession.updated_at.desc()).all()
    
    return sessions

@router.get("/sessions/{session_id}", response_model=SessionResponse)
async def get_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific chat session"""
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return session

@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a chat session"""
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(session)
    db.commit()
    
    return {"message": "Session deleted successfully"}

@router.post("/sessions/{session_id}/summary", response_model=SessionSummaryResponse)
async def generate_session_summary(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate AI summary for a chat session"""
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Generate summary if not already exists
    if not session.summary:
        summary = await groq_service.generate_session_summary(session.messages or [])
        session.summary = summary
        db.commit()
        db.refresh(session)
    else:
        summary = session.summary
    
    return SessionSummaryResponse(session_id=session_id, summary=summary)

@router.get("/sessions/search")
async def search_sessions(
    query: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Search chat sessions by message content"""
    if not query or len(query.strip()) < 2:
        raise HTTPException(status_code=400, detail="Search query must be at least 2 characters")
    
    query_lower = query.lower().strip()
    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == current_user.id
    ).all()
    
    matching_sessions = []
    for session in sessions:
        messages = session.messages or []
        # Search in all messages
        for msg in messages:
            content = msg.get('content', '').lower()
            if query_lower in content:
                matching_sessions.append(session)
                break  # Only add session once
    
    # Sort by most recent
    matching_sessions.sort(key=lambda s: s.updated_at or s.created_at, reverse=True)
    
    return matching_sessions

