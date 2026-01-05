"""
Groq API Service for MindAlchemy
"""
import os
import logging

# CRITICAL: Patch httpx BEFORE importing Groq to fix proxies error
import httpx

# Store original __init__ methods
_original_httpx_client_init = httpx.Client.__init__
_original_async_client_init = httpx.AsyncClient.__init__

# Patch httpx.Client to remove proxies parameter
def _patched_httpx_client_init(self, *args, **kwargs):
    kwargs.pop('proxies', None)
    return _original_httpx_client_init(self, *args, **kwargs)

# Patch httpx.AsyncClient to remove proxies parameter  
def _patched_async_client_init(self, *args, **kwargs):
    kwargs.pop('proxies', None)
    return _original_async_client_init(self, *args, **kwargs)

# Apply patches
httpx.Client.__init__ = _patched_httpx_client_init
httpx.AsyncClient.__init__ = _patched_async_client_init

# NOW import Groq - it will use the patched httpx
from groq import Groq

from app.config import settings
from app.services.crisis_resources import get_crisis_resources, get_available_countries
from typing import List, Dict, Optional, Tuple

logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self):
        # Only initialize Groq client if API key is provided
        self.client = None
        if settings.groq_api_key and settings.groq_api_key != "your_groq_api_key_here":
            try:
                # Remove ALL proxy environment variables before initialization
                proxy_vars = ['HTTP_PROXY', 'HTTPS_PROXY', 'http_proxy', 'https_proxy', 
                             'ALL_PROXY', 'all_proxy', 'NO_PROXY', 'no_proxy']
                saved_proxies = {}
                for var in proxy_vars:
                    if var in os.environ:
                        saved_proxies[var] = os.environ.pop(var)
                
                try:
                    # Initialize Groq - the patched version will handle proxies
                    self.client = Groq(api_key=settings.groq_api_key)
                    logger.info("Groq client initialized successfully")
                except Exception as init_error:
                    error_str = str(init_error)
                    if "proxies" in error_str.lower():
                        logger.warning("Groq proxies error - trying alternative initialization")
                        # Last resort: try without any parameters that might cause issues
                        try:
                            # Create a minimal client
                            self.client = Groq(api_key=settings.groq_api_key)
                        except:
                            logger.warning("Groq initialization failed - AI chat disabled")
                            self.client = None
                    else:
                        logger.warning(f"Groq initialization failed: {init_error}")
                        self.client = None
                finally:
                    # Restore proxy env vars
                    for var, value in saved_proxies.items():
                        os.environ[var] = value
            except Exception as e:
                logger.warning(f"Groq client setup failed (non-critical): {e}")
                self.client = None
        else:
            logger.warning("Groq API key not configured. AI chat will not work.")
            self.client = None
        self.model = settings.groq_model
        self.system_prompt = """You are a compassionate, empathetic AI guide for MindAlchemy - a therapeutic alchemy platform. You help users transform their mental states through therapeutic alchemy. Your expertise includes:
- Cognitive Behavioral Therapy (CBT)
- Dialectical Behavior Therapy (DBT)
- Mindfulness-based interventions

Your approach:
1. Validate and empathize with the user's feelings
2. Ask thoughtful, therapeutic questions
3. Provide evidence-based coping strategies
4. Guide users through CBT/DBT exercises when appropriate
5. Maintain professional boundaries

Always prioritize user safety. If crisis is detected, provide immediate resources and encourage professional help.

Important: You are a support tool, not a replacement for professional therapy. For severe mental health issues, always encourage users to seek professional help."""

    def get_therapeutic_prompt(self, user_context: Optional[Dict] = None) -> str:
        """Generate personalized system prompt"""
        prompt = self.system_prompt
        
        if user_context:
            if user_context.get('primary_concern'):
                prompt += f"\n\nUser's primary concern: {user_context['primary_concern']}"
            if user_context.get('goals'):
                prompt += f"\nUser's goals: {user_context['goals']}"
        
        return prompt

    def detect_crisis(self, message: str) -> Tuple[bool, str]:
        """Detect if user is in crisis - returns (is_crisis, risk_level)"""
        crisis_keywords_high = [
            "suicide", "kill myself", "end my life", "hurt myself",
            "want to die", "no point living", "self harm", "cutting",
            "overdose", "jump off", "hang myself"
        ]
        
        crisis_keywords_medium = [
            "want to die", "no point", "can't go on", "give up"
        ]
        
        message_lower = message.lower()
        
        # Check for high-risk keywords
        for keyword in crisis_keywords_high:
            if keyword in message_lower:
                return True, "high"
        
        # Check for medium-risk keywords
        for keyword in crisis_keywords_medium:
            if keyword in message_lower:
                return True, "medium"
        
        return False, "none"

    def get_crisis_response(self, country_code: Optional[str] = None) -> str:
        """Get crisis intervention response with country-specific resources"""
        # Get country-specific resources
        # Handle None, empty string, or whitespace
        if not country_code or not country_code.strip():
            country_code = 'US'
        else:
            country_code = country_code.strip().upper()
        
        logger.info(f"Getting crisis response for country: {country_code}")
        resources = get_crisis_resources(country_code)
        
        # Get country name
        countries = get_available_countries()
        country_name = next((c['name'] for c in countries if c['code'] == country_code), 'Your Country')
        
        # Build crisis response with country-specific hotlines
        response = f"I'm very concerned about you. You're not alone, and there is help available right now.\n\n"
        response += f"**Immediate Help for {country_name}:**\n"
        
        # Add top 2-3 hotlines (excluding emergency services if it's already in hotlines)
        hotlines = resources.get('hotlines', [])
        emergency = resources.get('emergency', '911')
        
        # Filter out duplicate emergency service entries and get unique hotlines
        unique_hotlines = []
        seen_numbers = set()
        for hotline in hotlines:
            # Normalize number for comparison (remove non-digits)
            normalized = ''.join(filter(str.isdigit, hotline['number']))
            if normalized not in seen_numbers:
                seen_numbers.add(normalized)
                unique_hotlines.append(hotline)
            if len(unique_hotlines) >= 3:
                break
        
        # Add hotlines to response
        if unique_hotlines:
            for hotline in unique_hotlines:
                response += f"• {hotline['name']}: {hotline['number']} ({hotline.get('available', '24/7')})\n"
        
        # Add emergency number if not already included
        emergency_in_hotlines = any(
            ''.join(filter(str.isdigit, h['number'])) == ''.join(filter(str.isdigit, str(emergency)))
            for h in unique_hotlines
        )
        if not emergency_in_hotlines:
            response += f"• Emergency Services: {emergency}\n"
        
        response += "\nPlease reach out to a professional immediately. Your life has value, and there are people who want to help you.\n\n"
        response += "I'm here to support you, but for your safety, please contact one of these resources right away."
        
        return response

    async def chat(
        self,
        messages: List[Dict[str, str]],
        user_message: str,
        user_context: Optional[Dict] = None
    ) -> Dict:
        """Send message to AI therapist and get response"""
        
        # Crisis detection
        is_crisis, risk_level = self.detect_crisis(user_message)
        
        if is_crisis:
            # Get country from user context
            country_code = user_context.get('country') if user_context else None
            logger.info(f"Crisis detected. User country from context: {country_code}")
            return {
                "response": self.get_crisis_response(country_code),
                "is_crisis": True,
                "risk_level": risk_level,
                "sentiment": "crisis"
            }
        
        # Check if Groq client is initialized
        if not self.client:
            logger.warning("Groq client not initialized - API key missing or invalid")
            return {
                "response": "AI service is not configured. Please set GROQ_API_KEY in environment variables. Check your backend/.env file.",
                "is_crisis": False,
                "risk_level": "none",
                "sentiment": "neutral"
            }
        
        # Build conversation - clean messages to only include role and content (Groq API doesn't accept timestamp)
        system_prompt = self.get_therapeutic_prompt(user_context)
        
        # Clean messages: only keep 'role' and 'content' fields (remove 'timestamp' and any other fields)
        cleaned_messages = [
            {"role": msg.get("role"), "content": msg.get("content")}
            for msg in messages
            if msg.get("role") and msg.get("content")
        ]
        
        conversation = [
            {"role": "system", "content": system_prompt}
        ] + cleaned_messages + [{"role": "user", "content": user_message}]
        
        try:
            logger.info(f"Sending message to Groq API with model: {self.model}")
            chat_completion = self.client.chat.completions.create(
                messages=conversation,
                model=self.model,
                temperature=0.7,  # Balanced creativity
                max_tokens=500,   # Reasonable response length
                top_p=0.9,
            )
            
            ai_response = chat_completion.choices[0].message.content
            logger.info("Successfully received response from Groq API")
            
            return {
                "response": ai_response,
                "is_crisis": False,
                "risk_level": "none",
                "sentiment": await self.analyze_sentiment(user_message)
            }
            
        except Exception as e:
            error_msg = str(e)
            logger.error(f"Groq API error: {error_msg}", exc_info=True)
            
            # Provide more helpful error messages
            if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
                return {
                    "response": "AI service authentication failed. Please check your GROQ_API_KEY in backend/.env file.",
                    "error": error_msg,
                    "is_crisis": False
                }
            elif "rate limit" in error_msg.lower() or "quota" in error_msg.lower():
                return {
                    "response": "AI service is currently busy. Please wait a moment and try again.",
                    "error": error_msg,
                    "is_crisis": False
                }
            elif "model" in error_msg.lower():
                return {
                    "response": f"AI model configuration error. Please check your GROQ_MODEL setting. Error: {error_msg}",
                    "error": error_msg,
                    "is_crisis": False
                }
            else:
                return {
                    "response": f"I'm having trouble processing that right now. Error: {error_msg}. Please check your backend logs for details.",
                    "error": error_msg,
                    "is_crisis": False
                }

    async def analyze_sentiment(self, text: str) -> str:
        """Simple sentiment analysis using Groq"""
        if not self.client:
            return "neutral"
        
        try:
            sentiment_prompt = f"""Analyze the sentiment of this text and respond with only one word: 
            positive, negative, neutral, anxious, depressed, or angry.
            
            Text: {text}"""
            
            completion = self.client.chat.completions.create(
                messages=[{"role": "user", "content": sentiment_prompt}],
                model="llama-3.1-8b-instant",  # Use faster model for sentiment
                temperature=0.3,
                max_tokens=10,
            )
            
            return completion.choices[0].message.content.strip().lower()
        except:
            return "neutral"

    async def generate_session_summary(self, messages: List[Dict[str, str]]) -> str:
        """Generate a concise summary of a chat session"""
        if not self.client:
            return "Summary unavailable - AI service not configured."
        
        if not messages or len(messages) < 2:
            return "Session too short to generate summary."
        
        try:
            # Extract conversation text
            conversation_text = "\n".join([
                f"{msg.get('role', 'unknown')}: {msg.get('content', '')}"
                for msg in messages
                if msg.get('content')
            ])
            
            summary_prompt = f"""Generate a concise, professional summary of this therapy session conversation. 
            Focus on:
            1. Main topics discussed
            2. Key concerns or issues raised
            3. Coping strategies or advice provided
            4. Overall sentiment and progress
            
            Keep it to 3-4 sentences maximum.
            
            Conversation:
            {conversation_text[:2000]}  # Limit to avoid token limits
            
            Summary:"""
            
            completion = self.client.chat.completions.create(
                messages=[{"role": "user", "content": summary_prompt}],
                model=self.model,
                temperature=0.5,
                max_tokens=200,
            )
            
            return completion.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Failed to generate session summary: {e}", exc_info=True)
            return "Summary generation failed. Please try again later."

# Create singleton instance
groq_service = GroqService()

