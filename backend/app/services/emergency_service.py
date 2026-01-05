"""
Emergency Services Integration
Handles automatic notification to authorities when crisis is detected
"""
import logging
import json
from typing import Dict, Optional, Tuple
from app.services.crisis_resources import get_crisis_resources

logger = logging.getLogger(__name__)

class EmergencyService:
    """
    Service to handle automatic emergency notifications
    Can be extended to integrate with real emergency service APIs
    """
    
    @staticmethod
    async def notify_authorities(
        user_id: int,
        user_email: str,
        user_name: Optional[str],
        country: str,
        risk_level: str,
        user_message: str,
        location: Optional[Tuple[float, float]] = None
    ) -> Dict:
        """
        Notify emergency authorities about a crisis situation.
        
        This is a placeholder that logs the alert. In production, this would:
        1. Call emergency services API (if available for the country)
        2. Send SMS/email to local crisis hotlines
        3. Contact user's emergency contacts (if configured)
        4. Log to emergency response systems
        
        Args:
            user_id: User's ID
            user_email: User's email
            user_name: User's name
            country: Country code
            risk_level: 'high' or 'medium'
            user_message: The message that triggered the crisis
            location: Tuple of (latitude, longitude) if available
            
        Returns:
            Dict with notification status
        """
        try:
            # Get country-specific emergency resources
            resources = get_crisis_resources(country or 'US')
            emergency_number = resources.get('emergency', '911')
            
            # Prepare alert data
            alert_data = {
                "user_id": user_id,
                "user_email": user_email,
                "user_name": user_name,
                "country": country,
                "emergency_number": emergency_number,
                "risk_level": risk_level,
                "user_message": user_message,
                "location": location,
                "hotlines": resources.get('hotlines', [])[:3]  # Top 3 hotlines
            }
            
            # Log the crisis alert (in production, this would call real APIs)
            logger.critical(
                f"🚨 CRISIS ALERT - User {user_id} ({user_email}) in {country}. "
                f"Risk: {risk_level}. Emergency: {emergency_number}. "
                f"Message: {user_message[:100]}..."
            )
            
            if location:
                logger.critical(f"📍 Location: {location[0]}, {location[1]}")
            
            # TODO: In production, implement actual integrations:
            # - Emergency services API (country-specific)
            # - SMS gateway for crisis hotlines
            # - Email alerts to local mental health services
            # - Webhook to emergency response systems
            # - Integration with emergency contact system
            
            # For now, return success with logged status
            return {
                "status": "logged",
                "alert_id": None,  # Would be real alert ID from emergency service
                "emergency_number": emergency_number,
                "notified_services": ["internal_logging"],  # Would list actual services notified
                "message": "Crisis alert logged. In production, this would automatically notify authorities."
            }
            
        except Exception as e:
            logger.error(f"Failed to notify authorities: {e}", exc_info=True)
            return {
                "status": "error",
                "error": str(e)
            }
    
    @staticmethod
    def get_emergency_contact_info(country: str) -> Dict:
        """Get emergency contact information for a country"""
        resources = get_crisis_resources(country or 'US')
        return {
            "emergency": resources.get('emergency', '911'),
            "hotlines": resources.get('hotlines', [])[:3]
        }

