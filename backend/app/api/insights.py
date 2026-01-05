"""
AI Insights API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, MoodLog, JournalEntry, Session as ChatSession
from app.api.auth import get_current_user
from app.services.groq_service import groq_service
from datetime import datetime, timedelta
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/patterns")
async def get_ai_insights(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate AI-powered insights about user patterns"""
    
    try:
        # Get user data from last 30 days
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        
        # Fetch mood logs
        mood_logs = db.query(MoodLog).filter(
            MoodLog.user_id == current_user.id,
            MoodLog.created_at >= thirty_days_ago
        ).order_by(MoodLog.created_at.desc()).all()
        
        # Fetch journal entries
        journal_entries = db.query(JournalEntry).filter(
            JournalEntry.user_id == current_user.id,
            JournalEntry.created_at >= thirty_days_ago
        ).order_by(JournalEntry.created_at.desc()).all()
        
        # Fetch chat sessions
        sessions = db.query(ChatSession).filter(
            ChatSession.user_id == current_user.id,
            ChatSession.created_at >= thirty_days_ago
        ).order_by(ChatSession.created_at.desc()).all()
        
        # Prepare data summary for AI
        mood_summary = []
        for log in mood_logs[:20]:  # Limit to recent 20
            mood_summary.append({
                "date": log.created_at.isoformat() if log.created_at else None,
                "mood": log.mood_type,
                "intensity": log.intensity,
                "notes": log.notes[:100] if log.notes else ""  # First 100 chars
            })
        
        journal_summary = []
        for entry in journal_entries[:10]:  # Limit to recent 10
            # Strip HTML tags for summary
            content = entry.content.replace('<p>', '').replace('</p>', '').replace('<br>', ' ')
            content = content[:200]  # First 200 chars
            journal_summary.append({
                "date": entry.created_at.isoformat() if entry.created_at else None,
                "type": entry.journal_type or "general",
                "content_preview": content
            })
        
        # Create prompt for AI analysis
        analysis_prompt = f"""Analyze this user's mental health data and provide insights about patterns, trends, and recommendations.

MOOD DATA (last 30 days, {len(mood_logs)} entries):
{str(mood_summary)[:2000]}

JOURNAL ENTRIES (last 30 days, {len(journal_entries)} entries):
{str(journal_summary)[:1500]}

CHAT SESSIONS: {len(sessions)} sessions in last 30 days

Please provide:
1. Key patterns you notice (e.g., "Your mood tends to be lower on Mondays")
2. Positive trends (e.g., "You've been logging more consistently")
3. Areas of concern (e.g., "Anxiety levels have increased")
4. Personalized recommendations (e.g., "Try journaling more about gratitude")
5. Overall assessment (2-3 sentences)

Format your response as a JSON object with these keys:
- patterns: array of pattern strings
- positive_trends: array of positive trend strings
- concerns: array of concern strings
- recommendations: array of recommendation strings
- overall_assessment: string

Keep each insight concise (1-2 sentences max). Be supportive and constructive."""

        # Get AI insights
        if not groq_service.client:
            return {
                "patterns": [],
                "positive_trends": ["Continue tracking your mood and journal entries for better insights"],
                "concerns": [],
                "recommendations": ["AI insights unavailable - service not configured"],
                "overall_assessment": "Keep up the great work tracking your mental health journey!"
            }
        
        try:
            completion = groq_service.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a mental health data analyst. Provide insights in JSON format only."},
                    {"role": "user", "content": analysis_prompt}
                ],
                model=groq_service.model,
                temperature=0.5,
                max_tokens=800,
            )
            
            ai_response = completion.choices[0].message.content
            
            # Try to parse JSON from response
            import json
            import re
            
            # Extract JSON from response (handle markdown code blocks)
            json_match = re.search(r'\{.*\}', ai_response, re.DOTALL)
            if json_match:
                insights = json.loads(json_match.group())
            else:
                # Fallback: parse as text
                insights = {
                    "patterns": [],
                    "positive_trends": [],
                    "concerns": [],
                    "recommendations": [],
                    "overall_assessment": ai_response[:500]
                }
            
            return insights
            
        except Exception as e:
            logger.error(f"Failed to generate AI insights: {e}", exc_info=True)
            # Return basic insights based on data
            return generate_basic_insights(mood_logs, journal_entries, sessions)
            
    except Exception as e:
        logger.error(f"Error generating insights: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to generate insights: {str(e)}")

def generate_basic_insights(mood_logs: List, journal_entries: List, sessions: List) -> Dict:
    """Generate basic insights without AI"""
    insights = {
        "patterns": [],
        "positive_trends": [],
        "concerns": [],
        "recommendations": [],
        "overall_assessment": ""
    }
    
    if len(mood_logs) > 0:
        # Calculate average intensity
        intensities = [log.intensity for log in mood_logs if log.intensity]
        if intensities:
            avg_intensity = sum(intensities) / len(intensities)
            if avg_intensity < 5:
                insights["concerns"].append("Your average mood intensity is below 5/10. Consider reaching out for support.")
            elif avg_intensity > 7:
                insights["positive_trends"].append("Your average mood intensity is above 7/10 - great to see!")
        
        # Check consistency
        if len(mood_logs) >= 20:
            insights["positive_trends"].append("You've been consistently tracking your mood - excellent habit!")
        elif len(mood_logs) < 10:
            insights["recommendations"].append("Try logging your mood more frequently to get better insights.")
    
    if len(journal_entries) > 0:
        insights["positive_trends"].append(f"You've written {len(journal_entries)} journal entries - keep it up!")
    
    if len(sessions) > 0:
        insights["positive_trends"].append(f"You've had {len(sessions)} chat sessions - great engagement!")
    
    insights["overall_assessment"] = "Continue tracking your mental health journey. Every entry helps build a clearer picture of your patterns and progress."
    
    return insights


