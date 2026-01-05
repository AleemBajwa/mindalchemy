import { useState, useEffect } from 'react'
import { sleepService } from '../services/sleepService'
import { format } from 'date-fns'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Moon, TrendingUp, BarChart3 } from 'lucide-react'

export default function Sleep() {
  const [sleepLogs, setSleepLogs] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLogForm, setShowLogForm] = useState(false)
  const [sleepData, setSleepData] = useState({
    sleep_hours: 8,
    sleep_quality: 7,
    bedtime: '',
    wake_time: '',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [logs, statistics] = await Promise.all([
        sleepService.getSleepLogs(),
        sleepService.getSleepStats()
      ])
      setSleepLogs(logs)
      setStats(statistics)
    } catch (error) {
      console.error('Failed to load sleep data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogSleep = async () => {
    try {
      await sleepService.logSleep({
        ...sleepData,
        bedtime: sleepData.bedtime || null,
        wake_time: sleepData.wake_time || null
      })
      setShowLogForm(false)
      setSleepData({ sleep_hours: 8, sleep_quality: 7, bedtime: '', wake_time: '', notes: '' })
      loadData()
    } catch (error) {
      console.error('Failed to log sleep:', error)
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
        <h2 className="text-2xl font-bold text-gray-900">Sleep Tracking</h2>
        <button
          onClick={() => setShowLogForm(!showLogForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark"
        >
          + Log Sleep
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-white/70 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/70 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 text-center border border-indigo-200/40 dark:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-primary">{stats.total_logs}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Logs</div>
          </div>
          <div className="bg-gradient-to-br from-white/70 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/70 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 text-center border border-indigo-200/40 dark:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-primary">{stats.average_hours.toFixed(1)}h</div>
            <div className="text-xs text-gray-500">Avg Hours</div>
          </div>
          <div className="bg-gradient-to-br from-white/70 via-indigo-50/70 to-purple-50/70 dark:from-gray-800/70 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 text-center border border-indigo-200/40 dark:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-primary">{stats.average_quality.toFixed(1)}/10</div>
            <div className="text-xs text-gray-500">Avg Quality</div>
          </div>
        </div>
      )}

      {/* Sleep Quality Charts */}
      {sleepLogs.length > 0 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Sleep Quality Analytics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sleep Hours Trend */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Sleep Hours Trend
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sleepLogs.slice(0, 14).reverse().map(log => ({
                  date: format(new Date(log.created_at), 'MMM d'),
                  hours: log.sleep_hours,
                  quality: log.sleep_quality
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} name="Hours" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep Quality Trend */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" />
                Sleep Quality Trend
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={sleepLogs.slice(0, 14).reverse().map(log => ({
                  date: format(new Date(log.created_at), 'MMM d'),
                  quality: log.sleep_quality
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis domain={[0, 10]} stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="quality" stroke="#ec4899" strokeWidth={2} name="Quality (1-10)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Quality Distribution */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Quality Distribution</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { range: '1-3', count: sleepLogs.filter(l => l.sleep_quality >= 1 && l.sleep_quality <= 3).length },
                  { range: '4-6', count: sleepLogs.filter(l => l.sleep_quality >= 4 && l.sleep_quality <= 6).length },
                  { range: '7-8', count: sleepLogs.filter(l => l.sleep_quality >= 7 && l.sleep_quality <= 8).length },
                  { range: '9-10', count: sleepLogs.filter(l => l.sleep_quality >= 9 && l.sleep_quality <= 10).length }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Log Sleep Form */}
      {showLogForm && (
        <div className="bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Log Your Sleep</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Hours: {sleepData.sleep_hours}h
              </label>
              <input
                type="range"
                min="0"
                max="16"
                step="0.5"
                value={sleepData.sleep_hours}
                onChange={(e) => setSleepData({ ...sleepData, sleep_hours: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {sleepData.sleep_quality}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepData.sleep_quality}
                onChange={(e) => setSleepData({ ...sleepData, sleep_quality: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedtime (Optional)
              </label>
              <input
                type="datetime-local"
                value={sleepData.bedtime}
                onChange={(e) => setSleepData({ ...sleepData, bedtime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wake Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={sleepData.wake_time}
                onChange={(e) => setSleepData({ ...sleepData, wake_time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={sleepData.notes}
              onChange={(e) => setSleepData({ ...sleepData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="3"
              placeholder="How did you sleep? Any dreams or issues?"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLogSleep}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark"
            >
              Save Sleep Log
            </button>
            <button
              onClick={() => setShowLogForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sleep Logs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Sleep Logs</h3>
        {sleepLogs.length === 0 ? (
          <div className="bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-12 text-center border border-indigo-200/30 dark:border-gray-700">
            <div className="text-5xl mb-4">😴</div>
            <h3 className="text-xl font-semibold mb-2">No sleep logs yet</h3>
            <p className="text-gray-500 mb-6">Start tracking your sleep to see patterns</p>
            <button
              onClick={() => setShowLogForm(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark"
            >
              Log Your First Sleep
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sleepLogs.map((log) => (
              <div key={log.id} className="bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.01] transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-semibold">{log.sleep_hours} hours</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(log.created_at), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {log.sleep_quality}/10
                    </div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                </div>
                {log.notes && (
                  <p className="text-sm text-gray-600 mt-2">{log.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

