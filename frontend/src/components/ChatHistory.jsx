import { useState, useEffect } from 'react'
import { chatService } from '../services/chatService'
import { format } from 'date-fns'
import { Search, X, FileText, Sparkles, Trash2, Loader2 } from 'lucide-react'
import { SkeletonList } from './SkeletonLoader'

export default function ChatHistory({ isOpen, onClose, onSelectSession }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [generatingSummary, setGeneratingSummary] = useState(null)

  useEffect(() => {
    if (isOpen) {
      loadSessions()
    }
  }, [isOpen])

  const loadSessions = async () => {
    setLoading(true)
    try {
      const data = await chatService.getSessions()
      setSessions(data)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim() || query.length < 2) {
      loadSessions()
      return
    }

    setSearching(true)
    try {
      const results = await chatService.searchSessions(query)
      setSessions(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setSearching(false)
    }
  }

  const handleGenerateSummary = async (sessionId) => {
    setGeneratingSummary(sessionId)
    try {
      const result = await chatService.generateSummary(sessionId)
      // Update session in list
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, summary: result.summary } : s
      ))
    } catch (error) {
      console.error('Failed to generate summary:', error)
    } finally {
      setGeneratingSummary(null)
    }
  }

  const handleDeleteSession = async (sessionId, e) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this session?')) return

    try {
      await chatService.deleteSession(sessionId)
      setSessions(prev => prev.filter(s => s.id !== sessionId))
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white/95 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/95 dark:via-gray-800/70 dark:to-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-200/30 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-200/30 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chat History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-indigo-200/30 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading || searching ? (
            <SkeletonList />
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No sessions found' : 'No chat sessions yet'}
              </p>
            </div>
          ) : (
            sessions.map((session) => {
              const messageCount = session.messages?.length || 0
              const lastMessage = session.messages?.[session.messages.length - 1]
              const preview = lastMessage?.content?.substring(0, 100) || 'No messages'

              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session)
                    onClose()
                  }}
                  className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border-2 border-indigo-200/30 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Session {session.id}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(session.updated_at || session.created_at), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      
                      {session.summary ? (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                          {session.summary}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {preview}...
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{messageCount} messages</span>
                        {session.sentiment && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                            {session.sentiment}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!session.summary && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleGenerateSummary(session.id)
                          }}
                          disabled={generatingSummary === session.id}
                          className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                          title="Generate summary"
                        >
                          {generatingSummary === session.id ? (
                            <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete session"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

