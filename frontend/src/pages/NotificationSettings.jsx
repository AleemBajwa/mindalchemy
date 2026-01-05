import { useState, useEffect } from 'react'
import { notificationService, browserNotifications } from '../services/notificationService'
import { Bell, Clock, CheckCircle2, XCircle, Save, AlertCircle } from 'lucide-react'

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState('default')
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadPreferences()
    checkNotificationPermission()
  }, [])

  const loadPreferences = async () => {
    try {
      const prefs = await notificationService.getPreferences()
      setPreferences(prefs)
    } catch (error) {
      console.error('Failed to load preferences:', error)
      setMessage({ type: 'error', text: 'Failed to load notification preferences' })
    } finally {
      setLoading(false)
    }
  }

  const checkNotificationPermission = () => {
    if (browserNotifications.isSupported()) {
      setNotificationPermission(browserNotifications.getPermission())
    }
  }

  const requestNotificationPermission = async () => {
    const granted = await browserNotifications.requestPermission()
    setNotificationPermission(browserNotifications.getPermission())
    if (granted) {
      setMessage({ type: 'success', text: 'Notification permission granted!' })
    } else {
      setMessage({ type: 'error', text: 'Notification permission denied' })
    }
  }

  const handleToggle = (field) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field] === 'true' ? 'false' : 'true'
    }))
  }

  const handleTimeChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFrequencyChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await notificationService.updatePreferences(preferences)
      setMessage({ type: 'success', text: 'Notification preferences saved!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to save preferences:', error)
      setMessage({ type: 'error', text: 'Failed to save preferences' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading preferences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Bell className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your reminders and notifications</p>
        </div>
      </div>

      {/* Browser Notification Permission */}
      {browserNotifications.isSupported() && (
        <div className="bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Browser Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {notificationPermission === 'granted' 
                  ? 'Notifications are enabled' 
                  : notificationPermission === 'denied'
                  ? 'Notifications are blocked. Please enable them in your browser settings.'
                  : 'Enable browser notifications to receive reminders'}
              </p>
            </div>
            {notificationPermission !== 'granted' && (
              <button
                onClick={requestNotificationPermission}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
              >
                Enable
              </button>
            )}
          </div>
        </div>
      )}

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Daily Check-in */}
      <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-6 border border-amber-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Daily Check-in</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Morning reminder to check in with yourself</p>
          </div>
          <button
            onClick={() => handleToggle('daily_checkin_enabled')}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              preferences.daily_checkin_enabled === 'true' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              preferences.daily_checkin_enabled === 'true' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
        {preferences.daily_checkin_enabled === 'true' && (
          <div className="flex items-center gap-3 mt-4">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <input
              type="time"
              value={preferences.daily_checkin_time}
              onChange={(e) => handleTimeChange('daily_checkin_time', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>

      {/* Mood Reminder */}
      <div className="bg-gradient-to-br from-white/80 via-pink-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-pink-500/10 dark:shadow-gray-900/50 p-6 border border-pink-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mood Logging Reminder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Evening reminder to log your mood</p>
          </div>
          <button
            onClick={() => handleToggle('mood_reminder_enabled')}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              preferences.mood_reminder_enabled === 'true' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              preferences.mood_reminder_enabled === 'true' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
        {preferences.mood_reminder_enabled === 'true' && (
          <div className="flex items-center gap-3 mt-4">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <input
              type="time"
              value={preferences.mood_reminder_time}
              onChange={(e) => handleTimeChange('mood_reminder_time', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>

      {/* Meditation Reminder */}
      <div className="bg-gradient-to-br from-white/80 via-teal-50/50 to-cyan-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-teal-500/10 dark:shadow-gray-900/50 p-6 border border-teal-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Meditation Reminder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reminder to practice mindfulness</p>
          </div>
          <button
            onClick={() => handleToggle('meditation_reminder_enabled')}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              preferences.meditation_reminder_enabled === 'true' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              preferences.meditation_reminder_enabled === 'true' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
        {preferences.meditation_reminder_enabled === 'true' && (
          <div className="flex items-center gap-3 mt-4">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <input
              type="time"
              value={preferences.meditation_reminder_time}
              onChange={(e) => handleTimeChange('meditation_reminder_time', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>

      {/* Goal Reminder */}
      <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-yellow-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-6 border border-amber-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Goal Progress Reminder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reminder to check in on your goals</p>
          </div>
          <button
            onClick={() => handleToggle('goal_reminder_enabled')}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              preferences.goal_reminder_enabled === 'true' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              preferences.goal_reminder_enabled === 'true' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
        {preferences.goal_reminder_enabled === 'true' && (
          <div className="flex items-center gap-3 mt-4">
            <select
              value={preferences.goal_reminder_frequency}
              onChange={(e) => handleFrequencyChange('goal_reminder_frequency', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
      </div>

      {/* Motivational Messages */}
      <div className="bg-gradient-to-br from-white/80 via-purple-50/50 to-indigo-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-500/10 dark:shadow-gray-900/50 p-6 border border-purple-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Motivational Messages</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Receive encouraging messages</p>
          </div>
          <button
            onClick={() => handleToggle('motivational_messages_enabled')}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              preferences.motivational_messages_enabled === 'true' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              preferences.motivational_messages_enabled === 'true' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
        {preferences.motivational_messages_enabled === 'true' && (
          <div className="flex items-center gap-3 mt-4">
            <select
              value={preferences.motivational_frequency}
              onChange={(e) => handleFrequencyChange('motivational_frequency', e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}

