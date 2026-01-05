# Groq API Implementation Guide for AI Therapist

## 🚀 GROQ API OVERVIEW

**Groq API** is a high-speed inference API that provides fast, efficient AI model access. It's perfect for real-time conversational applications like our AI Therapist.

### **Why Groq for AI Therapist?**
- ⚡ **Ultra-fast inference** - Low latency for real-time conversations
- 💰 **Cost-effective** - Competitive pricing
- 🔄 **OpenAI-compatible** - Easy integration
- 🎯 **Multiple models** - Various LLM options
- 📈 **Scalable** - Handles high traffic

---

## 📋 AVAILABLE GROQ MODELS

### **Recommended Models for AI Therapist:**

1. **`llama-3.1-70b-versatile`** (Recommended)
   - Best balance of quality and speed
   - Excellent for therapeutic conversations
   - Good context understanding

2. **`llama-3.1-8b-instant`**
   - Fastest responses
   - Good for quick interactions
   - Lower cost

3. **`mixtral-8x7b-32768`**
   - Large context window (32K tokens)
   - Good for long conversations
   - Better memory retention

4. **`gemma2-9b-it`**
   - Google's model
   - Good for empathetic responses
   - Balanced performance

### **Model Selection Strategy:**
- **Primary**: `llama-3.1-70b-versatile` (main conversations)
- **Fast Mode**: `llama-3.1-8b-instant` (quick responses)
- **Long Context**: `mixtral-8x7b-32768` (extended sessions)

---

## 🔧 SETUP & INSTALLATION

### **Step 1: Get Groq API Key**
1. Go to [Groq Console](https://console.groq.com/)
2. Create a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy and store securely

### **Step 2: Install Groq SDK**

**Python:**
```bash
pip install groq
```

**Node.js:**
```bash
npm install groq-sdk
```

**JavaScript/TypeScript:**
```bash
npm install groq-sdk
```

---

## 💻 IMPLEMENTATION EXAMPLES

### **Python Implementation**

#### **Basic Setup:**
```python
import os
from groq import Groq
from typing import List, Dict

class AITherapistGroq:
    def __init__(self):
        self.client = Groq(
            api_key=os.environ.get("GROQ_API_KEY")
        )
        self.model = "llama-3.1-70b-versatile"
        self.system_prompt = """You are a compassionate, empathetic AI therapist. 
        Your role is to provide emotional support, validate feelings, and guide users 
        through evidence-based therapeutic techniques like CBT and DBT. 
        Always be non-judgmental, patient, and supportive. 
        If you detect a crisis situation, provide immediate resources and encourage 
        professional help."""
    
    def chat(self, messages: List[Dict[str, str]], user_message: str) -> str:
        """Send message to AI therapist and get response"""
        conversation = messages + [{"role": "user", "content": user_message}]
        
        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": self.system_prompt}
                ] + conversation,
                model=self.model,
                temperature=0.7,  # Balanced creativity
                max_tokens=500,   # Reasonable response length
                top_p=0.9,
            )
            
            return chat_completion.choices[0].message.content
            
        except Exception as e:
            return f"I'm having trouble processing that. Please try again. Error: {str(e)}"
    
    def detect_crisis(self, message: str) -> bool:
        """Detect if user is in crisis"""
        crisis_keywords = [
            "suicide", "kill myself", "end my life", "hurt myself",
            "want to die", "no point living", "self harm"
        ]
        message_lower = message.lower()
        return any(keyword in message_lower for keyword in crisis_keywords)
    
    def get_crisis_response(self) -> str:
        """Get crisis intervention response"""
        return """I'm very concerned about you. You're not alone, and there is help available.

**Immediate Help:**
• National Suicide Prevention Lifeline: 988 (24/7)
• Crisis Text Line: Text HOME to 741741
• Emergency Services: 911

Please reach out to a professional immediately. Your life has value, and there are people who want to help you."""
```

#### **Advanced Implementation with Context Management:**
```python
class AdvancedAITherapist:
    def __init__(self):
        self.client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        self.model = "llama-3.1-70b-versatile"
        self.conversation_history = []
        self.max_history = 10  # Keep last 10 messages for context
    
    def get_therapeutic_prompt(self, user_context: dict = None) -> str:
        """Generate personalized system prompt"""
        base_prompt = """You are a compassionate AI therapist specializing in:
        - Cognitive Behavioral Therapy (CBT)
        - Dialectical Behavior Therapy (DBT)
        - Mindfulness-based interventions
        
        Your approach:
        1. Validate and empathize with the user's feelings
        2. Ask thoughtful, therapeutic questions
        3. Provide evidence-based coping strategies
        4. Guide users through CBT/DBT exercises when appropriate
        5. Maintain professional boundaries
        
        Always prioritize user safety. If crisis is detected, provide immediate resources."""
        
        if user_context:
            if user_context.get('primary_concern'):
                base_prompt += f"\n\nUser's primary concern: {user_context['primary_concern']}"
            if user_context.get('goals'):
                base_prompt += f"\nUser's goals: {user_context['goals']}"
        
        return base_prompt
    
    def chat_with_context(self, user_message: str, user_context: dict = None) -> dict:
        """Chat with context management and sentiment analysis"""
        
        # Crisis detection
        if self.detect_crisis(user_message):
            return {
                "response": self.get_crisis_response(),
                "is_crisis": True,
                "sentiment": "crisis"
            }
        
        # Build conversation
        system_prompt = self.get_therapeutic_prompt(user_context)
        
        # Maintain conversation history
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add recent history (last 10 messages)
        messages.extend(self.conversation_history[-self.max_history:])
        messages.append({"role": "user", "content": user_message})
        
        # Get AI response
        try:
            completion = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=0.7,
                max_tokens=500,
            )
            
            ai_response = completion.choices[0].message.content
            
            # Update conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            self.conversation_history.append({"role": "assistant", "content": ai_response})
            
            # Keep history manageable
            if len(self.conversation_history) > self.max_history * 2:
                self.conversation_history = self.conversation_history[-self.max_history * 2:]
            
            return {
                "response": ai_response,
                "is_crisis": False,
                "sentiment": self.analyze_sentiment(user_message)
            }
            
        except Exception as e:
            return {
                "response": "I'm having trouble processing that. Please try again.",
                "error": str(e),
                "is_crisis": False
            }
    
    def analyze_sentiment(self, text: str) -> str:
        """Simple sentiment analysis using Groq"""
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
```

---

### **Node.js/TypeScript Implementation**

```typescript
import Groq from 'groq-sdk';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response: string;
  isCrisis: boolean;
  sentiment?: string;
}

class AITherapistGroq {
  private client: Groq;
  private model: string = 'llama-3.1-70b-versatile';
  private conversationHistory: Message[] = [];
  private maxHistory: number = 10;

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY || ''
    });
  }

  private getSystemPrompt(): string {
    return `You are a compassionate, empathetic AI therapist. 
    Provide emotional support, validate feelings, and guide users through 
    evidence-based therapeutic techniques (CBT, DBT). 
    Be non-judgmental, patient, and supportive. 
    If crisis detected, provide immediate resources.`;
  }

  private detectCrisis(message: string): boolean {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end my life', 'hurt myself',
      'want to die', 'no point living', 'self harm'
    ];
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  async chat(userMessage: string): Promise<ChatResponse> {
    // Crisis detection
    if (this.detectCrisis(userMessage)) {
      return {
        response: this.getCrisisResponse(),
        isCrisis: true
      };
    }

    // Build messages
    const messages: Message[] = [
      { role: 'system', content: this.getSystemPrompt() },
      ...this.conversationHistory.slice(-this.maxHistory),
      { role: 'user', content: userMessage }
    ];

    try {
      const completion = await this.client.chat.completions.create({
        messages: messages,
        model: this.model,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = completion.choices[0]?.message?.content || '';

      // Update history
      this.conversationHistory.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      );

      // Manage history size
      if (this.conversationHistory.length > this.maxHistory * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistory * 2);
      }

      return {
        response: aiResponse,
        isCrisis: false
      };

    } catch (error) {
      return {
        response: 'I\'m having trouble processing that. Please try again.',
        isCrisis: false
      };
    }
  }

  private getCrisisResponse(): string {
    return `I'm very concerned about you. You're not alone.

**Immediate Help:**
• National Suicide Prevention Lifeline: 988 (24/7)
• Crisis Text Line: Text HOME to 741741
• Emergency Services: 911

Please reach out to a professional immediately.`;
  }
}

export default AITherapistGroq;
```

---

## 🎯 GROQ API CONFIGURATION FOR AI THERAPIST

### **Optimal Settings:**

```python
# Recommended configuration
config = {
    "model": "llama-3.1-8b-instant",  # Updated: llama-3.1-70b-versatile was decommissioned
    "temperature": 0.7,                  # Balanced (0.0-1.0)
    "max_tokens": 500,                   # Response length
    "top_p": 0.9,                        # Nucleus sampling
    "frequency_penalty": 0.1,            # Reduce repetition
    "presence_penalty": 0.1,            # Encourage new topics
}
```

### **Model-Specific Recommendations:**

| Use Case | Model | Temperature | Max Tokens |
|----------|-------|-------------|------------|
| Main Conversations | llama-3.1-8b-instant | 0.7 | 500 |
| Quick Responses | llama-3.1-8b-instant | 0.7 | 300 |
| Long Sessions | mixtral-8x7b-32768 | 0.7 | 500 |
| Sentiment Analysis | llama-3.1-8b-instant | 0.3 | 50 |

---

## 🔐 SECURITY & BEST PRACTICES

### **1. API Key Management**
```python
# ✅ GOOD - Use environment variables
import os
api_key = os.environ.get("GROQ_API_KEY")

# ❌ BAD - Never hardcode
api_key = "gsk_1234567890abcdef"
```

### **2. Error Handling**
```python
try:
    response = client.chat.completions.create(...)
except groq.RateLimitError:
    # Handle rate limiting
    return "I'm receiving many requests. Please wait a moment."
except groq.APIError as e:
    # Handle API errors
    return f"Service temporarily unavailable. Error: {str(e)}"
except Exception as e:
    # Handle unexpected errors
    return "Something went wrong. Please try again."
```

### **3. Rate Limiting**
- Implement client-side rate limiting
- Cache responses when appropriate
- Use exponential backoff for retries

### **4. Cost Management**
- Monitor API usage
- Set usage limits
- Use faster models for simple tasks
- Cache common responses

---

## 📊 SYSTEM PROMPT TEMPLATES

### **Base Therapist Prompt:**
```
You are a compassionate, empathetic AI therapist with expertise in:
- Cognitive Behavioral Therapy (CBT)
- Dialectical Behavior Therapy (DBT)
- Mindfulness-based interventions

Your approach:
1. Validate and empathize with the user's feelings
2. Ask thoughtful, therapeutic questions
3. Provide evidence-based coping strategies
4. Guide users through CBT/DBT exercises when appropriate
5. Maintain professional boundaries

Always prioritize user safety. If crisis is detected, provide immediate resources.
```

### **CBT-Focused Prompt:**
```
You are a CBT specialist AI therapist. Help users:
- Identify negative thought patterns
- Challenge cognitive distortions
- Develop alternative perspectives
- Create behavioral experiments
- Track progress

Use Socratic questioning and guide users through thought records.
```

### **DBT-Focused Prompt:**
```
You are a DBT specialist AI therapist. Help users with:
- Mindfulness practices
- Distress tolerance (TIPP, STOP)
- Emotion regulation
- Interpersonal effectiveness

Provide step-by-step guidance for DBT skills.
```

---

## 🧪 TESTING GROQ INTEGRATION

### **Test Script:**
```python
def test_groq_integration():
    therapist = AITherapistGroq()
    
    # Test 1: Normal conversation
    response = therapist.chat([], "I'm feeling anxious about work")
    print("Test 1 - Normal:", response)
    
    # Test 2: Crisis detection
    response = therapist.chat([], "I want to hurt myself")
    print("Test 2 - Crisis:", response)
    
    # Test 3: Multi-turn conversation
    messages = []
    messages.append({"role": "user", "content": "I'm stressed"})
    response1 = therapist.chat(messages, "I'm stressed")
    messages.append({"role": "assistant", "content": response1})
    response2 = therapist.chat(messages, "It's about my job")
    print("Test 3 - Multi-turn:", response2)
```

---

## 📈 PERFORMANCE OPTIMIZATION

### **1. Response Caching**
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_response(prompt_hash: str):
    # Cache common therapeutic responses
    pass
```

### **2. Async Processing**
```python
import asyncio
from groq import AsyncGroq

async def async_chat(user_message: str):
    client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
    completion = await client.chat.completions.create(...)
    return completion.choices[0].message.content
```

### **3. Batch Processing**
```python
# Process multiple user messages efficiently
def batch_chat(messages: List[str]):
    # Group and process in batches
    pass
```

---

## 🚨 CRISIS DETECTION IMPLEMENTATION

```python
class CrisisDetector:
    def __init__(self):
        self.crisis_keywords = [
            "suicide", "kill myself", "end my life", "hurt myself",
            "want to die", "no point", "self harm", "cutting",
            "overdose", "jump off", "hang myself"
        ]
        self.risk_levels = {
            "high": ["suicide", "kill myself", "end my life"],
            "medium": ["want to die", "no point living"],
            "low": ["feel hopeless", "can't go on"]
        }
    
    def detect(self, message: str) -> tuple[bool, str]:
        """Returns (is_crisis, risk_level)"""
        message_lower = message.lower()
        
        for keyword in self.risk_levels["high"]:
            if keyword in message_lower:
                return True, "high"
        
        for keyword in self.risk_levels["medium"]:
            if keyword in message_lower:
                return True, "medium"
        
        return False, "none"
```

---

## 📝 ENVIRONMENT SETUP

### **`.env` File:**
```env
GROQ_API_KEY=your_api_key_here
GROQ_MODEL=llama-3.1-70b-versatile
GROQ_TEMPERATURE=0.7
GROQ_MAX_TOKENS=500
```

### **Loading Environment:**
```python
from dotenv import load_dotenv
load_dotenv()
```

---

## 🎯 NEXT STEPS

1. ✅ Set up Groq API account
2. ✅ Get API key
3. ✅ Install Groq SDK
4. ✅ Implement basic chat function
5. ✅ Add crisis detection
6. ✅ Implement context management
7. ✅ Add sentiment analysis
8. ✅ Test and optimize

---

**Ready to integrate Groq API into your AI Therapist application!** 🚀

