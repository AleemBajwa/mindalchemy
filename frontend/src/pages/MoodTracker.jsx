import { useState, useEffect } from 'react'
import { moodService } from '../services/moodService'
import { format } from 'date-fns'
import MoodCalendar from '../components/MoodCalendar'
import MoodCharts from '../components/MoodCharts'
import { exportMoodHistoryToPDF } from '../utils/pdfExport'
import { Download } from 'lucide-react'

export default function MoodTracker() {
  const [moodLogs, setMoodLogs] = useState([])
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodDetails, setMoodDetails] = useState({
    intensity: 5,
    trigger: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMoodLogs()
  }, [])

  const loadMoodLogs = async () => {
    try {
      const logs = await moodService.getMoodLogs()
      setMoodLogs(logs)
    } catch (error) {
      console.error('Failed to load mood logs:', error)
    }
  }

  const moods = [
    { type: 'happy', emoji: '😊', label: 'Happy' },
    { type: 'calm', emoji: '😌', label: 'Calm' },
    { type: 'neutral', emoji: '😐', label: 'Neutral' },
    { type: 'sad', emoji: '😔', label: 'Sad' },
    { type: 'anxious', emoji: '😰', label: 'Anxious' },
    { type: 'angry', emoji: '😡', label: 'Angry' },
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  const handleSaveMood = async () => {
    if (!selectedMood) return

    setLoading(true)
    try {
      await moodService.logMood({
        mood_type: selectedMood.type,
        mood_value: moodDetails.intensity,
        intensity: moodDetails.intensity,
        trigger: moodDetails.trigger,
        notes: moodDetails.notes
      })
      
      // Reset form
      setSelectedMood(null)
      setMoodDetails({ intensity: 5, trigger: '', notes: '' })
      loadMoodLogs()
    } catch (error) {
      console.error('Failed to save mood:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <span className="text-2xl">😊</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mood Tracking</h2>
        </div>
        {moodLogs.length > 0 && (
          <button
            onClick={() => exportMoodHistoryToPDF(moodLogs)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            title="Export mood history to PDF"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        )}
      </div>

      {/* Mood Selector */}
      <div className="bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-500/10 dark:shadow-gray-900/50 p-6 border border-rose-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">How are you feeling right now?</h3>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.type}
              onClick={() => handleMoodSelect(mood)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedMood?.type === mood.type
                  ? 'border-primary bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Details Form */}
      {selectedMood && (
        <div className="bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-rose-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Tell us more</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity: {moodDetails.intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodDetails.intensity}
              onChange={(e) => setMoodDetails({ ...moodDetails, intensity: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Intense</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What triggered this mood? (Optional)
            </label>
            <textarea
              value={moodDetails.trigger}
              onChange={(e) => setMoodDetails({ ...moodDetails, trigger: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="2"
              placeholder="Describe what led to this feeling..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={moodDetails.notes}
              onChange={(e) => setMoodDetails({ ...moodDetails, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="3"
              placeholder="Any additional thoughts..."
            />
          </div>

          <button
            onClick={handleSaveMood}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Mood'}
          </button>
        </div>
      )}

      {/* Mood Calendar */}
      {moodLogs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Mood Calendar</h3>
          <MoodCalendar moodLogs={moodLogs} />
        </div>
      )}

      {/* Mood Charts */}
      {moodLogs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Mood Analytics</h3>
          <MoodCharts moodLogs={moodLogs} />
        </div>
      )}

      {/* Recent Mood Logs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Mood Logs</h3>
        <div className="bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-500/10 dark:shadow-gray-900/50 p-6 space-y-3 border border-rose-200/30 dark:border-gray-700">
          {moodLogs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No mood logs yet. Start tracking your mood!
            </div>
          ) : (
            moodLogs.slice(0, 10).map((log) => {
              const mood = moods.find(m => m.type === log.mood_type)
              return (
                <div key={log.id} className="flex items-center gap-4 pb-3 border-b last:border-0">
                  <div className="text-3xl">{mood?.emoji || '😐'}</div>
                  <div className="flex-1">
                    <div className="font-medium capitalize">{log.mood_type}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(log.created_at), 'MMM d, h:mm a')}
                    </div>
                    {log.notes && (
                      <div className="text-sm text-gray-600 mt-1">{log.notes}</div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {log.mood_value}/10
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

