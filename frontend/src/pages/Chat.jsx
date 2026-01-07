import { useState, useEffect, useRef } from 'react'
import { chatService } from '../services/chatService'
import { crisisService } from '../services/crisisService'
import { useAuthStore } from '../store/authStore'
import { format } from 'date-fns'
import { Bot, Send, AlertCircle, Phone, MessageSquare, AlertTriangle, History, Loader2 } from 'lucide-react'
import ChatHistory from '../components/ChatHistory'
import { SkeletonMessage } from '../components/SkeletonLoader'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [isCrisis, setIsCrisis] = useState(false)
  const [crisisResources, setCrisisResources] = useState(null)
  const [emergencyNumber, setEmergencyNumber] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [crisisNotified, setCrisisNotified] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [quickReplies, setQuickReplies] = useState([])
  const messagesEndRef = useRef(null)
  const user = useAuthStore((state) => state.user)

  const handleSelectSession = async (session) => {
    setSessionId(session.id)
    setMessages(session.messages || [])
  }

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm your MindAlchemy guide. I'm here to help transform your thoughts and support you. How are you feeling today?",
      timestamp: new Date().toISOString()
    }])
    
    // Request location permission (for crisis situations)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.log('Location permission denied or unavailable:', error)
          // Don't block - location is optional
        },
        { enableHighAccuracy: false, timeout: 5000 }
      )
    }
  }, [])

  // Reload crisis resources when user or country changes
  useEffect(() => {
    if (user?.country) {
      loadCrisisResources()
    }
  }, [user?.country])

  const loadCrisisResources = async () => {
    try {
      const resources = await crisisService.getResources()
      console.log('Loaded crisis resources:', resources) // Debug log
      setCrisisResources(resources)
    } catch (error) {
      console.error('Failed to load crisis resources:', error)
      // Fallback to default US resources only if user doesn't have a country
      if (!user?.country) {
        setCrisisResources({
          country: 'US',
          country_name: 'United States',
          emergency: '911',
          hotlines: [
            { name: 'National Suicide Prevention Lifeline', number: '988', description: '24/7 crisis support', available: '24/7', link: 'tel:988' },
            { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis support via text', available: '24/7', link: 'sms:741741' }
          ],
          online_resources: []
        })
      }
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (messageToSend = inputMessage) => {
    if (!messageToSend.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)
    setShowTyping(true)
    setQuickReplies([]) // Clear quick replies

    try {
      const response = await chatService.sendMessage(messageToSend, sessionId, userLocation)
      
      setSessionId(response.session_id)
      setIsCrisis(response.is_crisis)
      setEmergencyNumber(response.emergency_number)

      // If crisis detected, automatically initiate emergency call
      if (response.is_crisis && response.emergency_number && !crisisNotified) {
        setCrisisNotified(true)
        
        // Auto-dial emergency number (opens phone dialer)
        setTimeout(() => {
          window.location.href = `tel:${response.emergency_number.replace(/\D/g, '')}`
        }, 500)
      }

      const aiMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMessage])
      setQuickReplies(response.quick_replies || [])
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble processing that. Please try again.",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setShowTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSendClick = (e) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-8rem)] min-h-[500px] overflow-hidden">
      {/* Simple Crisis Notification Banner - Non-intrusive */}
      {isCrisis && emergencyNumber && (
        <div className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-[calc(100%-1rem)] sm:w-full mx-2 sm:mx-4 animate-slide-down">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl shadow-red-500/50 border-2 border-white/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs sm:text-sm">Help is on the way</p>
                <p className="text-[10px] sm:text-xs text-white/90">Authorities have been notified. Opening emergency dialer...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="bg-gradient-to-r from-white/90 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/70 backdrop-blur-sm border-b border-indigo-200/30 dark:border-gray-700 p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 flex-shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">MindAlchemy</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="truncate">Online • Always here for you</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg sm:rounded-xl font-medium hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-shrink-0 touch-manipulation"
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">History</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4 px-1 sm:px-0 scroll-smooth">
        {loading && messages.length === 0 ? (
          <>
            <SkeletonMessage />
            <SkeletonMessage />
          </>
        ) : (
          messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 border border-indigo-200/30 dark:border-gray-700'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm sm:text-base break-words">{message.content}</div>
              <div
                className={`text-[10px] sm:text-xs mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {format(new Date(message.timestamp), 'h:mm a')}
              </div>
            </div>
          </div>
        )))}
        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 border border-indigo-200/30 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 sm:ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Suggestions */}
      {quickReplies.length > 0 && !loading && (
        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 px-1 sm:px-2">Quick replies:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 px-1 sm:px-0">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(reply)
                  setTimeout(() => sendMessage(reply), 50)
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all border border-indigo-200/50 dark:border-indigo-800/50 touch-manipulation"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat History Modal */}
      <ChatHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectSession={handleSelectSession}
      />

      {/* Input */}
      <div className="bg-gradient-to-r from-white/90 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-indigo-200/40 dark:border-gray-700 p-2.5 sm:p-3 md:p-4 shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm sm:text-base"
            disabled={loading}
            aria-label="Type your message"
            aria-describedby="chat-input-help"
          />
          <span id="chat-input-help" className="sr-only">Press Enter to send, Shift+Enter for new line</span>
          <button
            onClick={handleSendClick}
            type="button"
            disabled={loading || !inputMessage.trim()}
            className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-1.5 sm:gap-2 touch-manipulation active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm sm:text-base">Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}

