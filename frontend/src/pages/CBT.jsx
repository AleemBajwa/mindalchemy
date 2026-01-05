import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cbtService } from '../services/cbtService'
import { format } from 'date-fns'

export default function CBT() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecords()
  }, [])

  const loadRecords = async () => {
    try {
      const data = await cbtService.getThoughtRecords()
      setRecords(data)
    } catch (error) {
      console.error('Failed to load thought records:', error)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <span className="text-2xl">🧠</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">CBT Tools</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Cognitive Behavioral Therapy exercises to help transform your thoughts
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/cbt/thought-record/new')}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark"
        >
          + New Thought Record
        </button>
      </div>

      {/* CBT Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => navigate('/cbt/thought-record/new')}
          className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 border-2 border-violet-200/40 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <div className="text-4xl mb-2">📝</div>
          <div className="font-semibold mb-1">Thought Record</div>
          <div className="text-sm text-gray-500">Challenge negative thoughts</div>
        </button>
        <button
          onClick={() => navigate('/cbt/cognitive-restructuring')}
          className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 border-2 border-violet-200/40 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <div className="text-4xl mb-2">🧠</div>
          <div className="font-semibold mb-1">Cognitive Restructuring</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Reframe negative thoughts</div>
        </button>
        <button
          onClick={() => navigate('/cbt/behavioral-activation')}
          className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 border-2 border-violet-200/40 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <div className="text-4xl mb-2">📋</div>
          <div className="font-semibold mb-1">Behavioral Activation</div>
          <div className="text-sm text-gray-500">Schedule activities</div>
        </button>
        <button
          onClick={() => navigate('/cbt/exposure-therapy')}
          className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 border-2 border-violet-200/40 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <div className="text-4xl mb-2">🌊</div>
          <div className="font-semibold mb-1">Exposure Therapy</div>
          <div className="text-sm text-gray-500">Gradual exposure exercises</div>
        </button>
        <button
          onClick={() => navigate('/cbt/problem-solving')}
          className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 border-2 border-violet-200/40 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600"
        >
          <div className="text-4xl mb-2">🔧</div>
          <div className="font-semibold mb-1">Problem-Solving</div>
          <div className="text-sm text-gray-500">Structured problem-solving</div>
        </button>
      </div>

      {/* CBT Tools Info */}
      <div className="bg-gradient-to-br from-violet-50/80 via-indigo-50/80 to-purple-50/80 dark:from-violet-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border-2 border-violet-200/50 dark:border-violet-800/50 rounded-2xl p-6 mb-6 backdrop-blur-sm shadow-lg shadow-violet-500/10">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          About CBT Tools
        </h3>
        <p className="text-sm text-indigo-800">
          Cognitive Behavioral Therapy (CBT) tools help you identify and challenge negative thought patterns.
          By examining the evidence for and against your thoughts, you can develop more balanced and helpful ways of thinking.
        </p>
      </div>

      {/* Thought Records List */}
      {records.length === 0 ? (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-12 text-center border border-violet-200/30 dark:border-gray-700">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold mb-2">No thought records yet</h3>
          <p className="text-gray-500 mb-6">
            Start your first thought record to begin challenging negative thought patterns
          </p>
          <button
            onClick={() => navigate('/cbt/thought-record/new')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark"
          >
            Create First Thought Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              onClick={() => navigate(`/cbt/thought-record/${record.id}`)}
              className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-6 cursor-pointer hover:shadow-xl hover:shadow-violet-500/20 hover:scale-[1.02] transition-all duration-300 border border-violet-200/30 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Thought Record
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {format(new Date(record.created_at), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
                {record.outcome_rating && (
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Outcome</div>
                    <div className="text-lg font-bold text-primary">
                      {record.outcome_rating}/10
                    </div>
                  </div>
                )}
              </div>
              
              {record.situation && (
                <div className="mb-2">
                  <div className="text-xs font-medium text-gray-500 mb-1">Situation</div>
                  <p className="text-sm text-gray-700 line-clamp-2">{record.situation}</p>
                </div>
              )}
              
              {record.automatic_thoughts && (
                <div className="mb-2">
                  <div className="text-xs font-medium text-gray-500 mb-1">Automatic Thoughts</div>
                  <p className="text-sm text-gray-700 line-clamp-2">{record.automatic_thoughts}</p>
                </div>
              )}
              
              {record.alternative_thoughts && (
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">Alternative Thoughts</div>
                  <p className="text-sm text-gray-700 line-clamp-2">{record.alternative_thoughts}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

