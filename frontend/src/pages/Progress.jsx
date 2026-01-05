import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'
import { moodService } from '../services/moodService'
import { insightsService } from '../services/insightsService'
import MoodCharts from '../components/MoodCharts'
import { Brain, TrendingUp, AlertCircle, Lightbulb, Sparkles, Loader2 } from 'lucide-react'

export default function Progress() {
  const [dashboard, setDashboard] = useState(null)
  const [moodStats, setMoodStats] = useState(null)
  const [moodLogs, setMoodLogs] = useState([])
  const [insights, setInsights] = useState(null)
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [dashboardData, statsData, logsData] = await Promise.all([
        dashboardService.getDashboard(),
        moodService.getMoodStats(),
        moodService.getMoodLogs(100) // Get more logs for charts
      ])
      setDashboard(dashboardData)
      setMoodStats(statsData)
      setMoodLogs(logsData)
    } catch (error) {
      console.error('Failed to load progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadInsights = async () => {
    setLoadingInsights(true)
    try {
      const data = await insightsService.getPatterns()
      setInsights(data)
    } catch (error) {
      console.error('Failed to load AI insights:', error)
    } finally {
      setLoadingInsights(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      loadInsights()
    }
  }, [loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Progress & Analytics</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white/70 via-emerald-50/70 to-teal-50/70 dark:from-gray-800/70 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-500/10 dark:shadow-gray-900/50 p-6 text-center border border-emerald-200/40 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-3xl font-bold text-primary">{dashboard?.current_streak || 0}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </div>
        <div className="bg-gradient-to-br from-white/70 via-blue-50/70 to-indigo-50/70 dark:from-gray-800/70 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 dark:shadow-gray-900/50 p-6 text-center border border-blue-200/40 dark:border-blue-800/50 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-3xl mb-2">💬</div>
          <div className="text-3xl font-bold text-primary">{dashboard?.total_sessions || 0}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Chat Sessions</div>
        </div>
        <div className="bg-gradient-to-br from-white/70 via-purple-50/70 to-pink-50/70 dark:from-gray-800/70 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 dark:shadow-gray-900/50 p-6 text-center border border-purple-200/40 dark:border-purple-800/50 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-3xl font-bold text-primary">{dashboard?.total_journal_entries || 0}</div>
          <div className="text-sm text-gray-500">Journal Entries</div>
        </div>
      </div>

      {/* Mood Statistics */}
      {moodStats && (
        <div className="bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-500/10 dark:shadow-gray-900/50 p-6 border border-rose-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Mood Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Mood Logs</span>
              <span className="font-semibold">{moodStats.total_logs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Mood</span>
              <span className="font-semibold">{moodStats.average_mood.toFixed(1)}/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recent Trend</span>
              <span className="font-semibold capitalize">{moodStats.recent_trend}</span>
            </div>
            
            {moodStats.mood_distribution && Object.keys(moodStats.mood_distribution).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Mood Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(moodStats.mood_distribution).map(([mood, count]) => (
                    <div key={mood} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 capitalize w-20">{mood}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(count / moodStats.total_logs) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mood Charts */}
      {moodLogs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Mood Analytics</h3>
          <MoodCharts moodLogs={moodLogs} moodStats={moodStats} />
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            AI-Powered Insights
          </h3>
          {loadingInsights && (
            <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
          )}
        </div>
        
        {insights ? (
          <div className="space-y-4">
            {/* Patterns */}
            {insights.patterns && insights.patterns.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  Patterns Identified
                </h4>
                <ul className="space-y-2">
                  {insights.patterns.map((pattern, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positive Trends */}
            {insights.positive_trends && insights.positive_trends.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Positive Trends
                </h4>
                <ul className="space-y-2">
                  {insights.positive_trends.map((trend, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Concerns */}
            {insights.concerns && insights.concerns.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Areas to Watch
                </h4>
                <ul className="space-y-2">
                  {insights.concerns.map((concern, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {insights.recommendations && insights.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {insights.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Overall Assessment */}
            {insights.overall_assessment && (
              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Overall Assessment</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{insights.overall_assessment}</p>
              </div>
            )}
          </div>
        ) : !loadingInsights ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No insights available yet. Keep tracking your mood and journal entries!</p>
        ) : null}
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-yellow-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-6 border border-amber-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 ${
            (dashboard?.current_streak || 0) >= 7
              ? 'border-primary bg-indigo-50'
              : 'border-gray-200 bg-gray-50 opacity-50'
          }`}>
            <div className="text-3xl mb-2">🔥</div>
            <div className="font-semibold">7 Day Streak</div>
          </div>
          <div className={`p-4 rounded-xl border-2 ${
            (dashboard?.total_sessions || 0) >= 10
              ? 'border-primary bg-indigo-50'
              : 'border-gray-200 bg-gray-50 opacity-50'
          }`}>
            <div className="text-3xl mb-2">💬</div>
            <div className="font-semibold">10 Sessions</div>
          </div>
          <div className={`p-4 rounded-xl border-2 ${
            (dashboard?.total_journal_entries || 0) >= 20
              ? 'border-primary bg-indigo-50'
              : 'border-gray-200 bg-gray-50 opacity-50'
          }`}>
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold">20 Entries</div>
          </div>
          <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-50">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-semibold">30 Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}

