import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { journalService } from '../services/journalService'
import { format } from 'date-fns'
import { BookOpen, Plus, Search, Sparkles, Calendar } from 'lucide-react'

export default function Journal() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showPrompts, setShowPrompts] = useState(false)

  useEffect(() => {
    loadEntries()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = entries.filter(entry => {
        const searchLower = searchQuery.toLowerCase()
        return (
          (entry.title && entry.title.toLowerCase().includes(searchLower)) ||
          entry.content.toLowerCase().includes(searchLower) ||
          (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        )
      })
      setFilteredEntries(filtered)
    } else {
      setFilteredEntries(entries)
    }
  }, [searchQuery, entries])

  const loadEntries = async () => {
    try {
      const data = await journalService.getEntries()
      setEntries(data)
    } catch (error) {
      console.error('Failed to load entries:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  const journalPrompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What emotions did I experience today?",
    "What did I learn about myself today?",
    "What would I tell my past self?",
    "What are three things that went well today?",
    "What am I looking forward to?",
    "What do I need to let go of?",
    "How have I grown recently?",
    "What brings me peace?"
  ]

  const handlePromptClick = (prompt) => {
    navigate('/journal/new', { state: { prompt } })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Journal</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2.5 rounded-xl font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {showPrompts ? 'Hide' : 'Show'} Prompts
          </button>
          <button
            onClick={() => navigate('/journal/new')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-white/90 via-blue-50/70 to-cyan-50/70 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 dark:shadow-gray-900/50 border border-blue-200/30 dark:border-gray-700 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal entries..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Journal Prompts */}
      {showPrompts && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-4">Journal Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {journalPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left px-4 py-3 bg-white rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
              >
                <span className="text-sm text-indigo-800">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredEntries.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <BookOpen className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No entries yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">Start writing your thoughts and feelings</p>
          <button
            onClick={() => navigate('/journal/new')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => navigate(`/journal/${entry.id}`)}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {entry.title || 'Untitled Entry'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(entry.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <div 
                className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: entry.content.substring(0, 200) + '...' }}
              />
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

