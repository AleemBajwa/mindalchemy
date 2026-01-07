import { useState, useEffect } from 'react'
import api from '../services/api'
import { moodService } from '../services/moodService'
import { journalService } from '../services/journalService'
import { chatService } from '../services/chatService'
import { insightsService } from '../services/insightsService'
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns'
import { FileText, Calendar, Download, TrendingUp, BarChart3, Loader2, Brain, Sparkles, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Reports() {
  const [reportType, setReportType] = useState('weekly') // 'weekly' or 'monthly'
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [dateRange, setDateRange] = useState(null)
  const [insights, setInsights] = useState(null)
  const [insightsLoading, setInsightsLoading] = useState(false)

  useEffect(() => {
    generateReport()
    // Load insights separately, don't block if it fails
    loadInsights().catch(err => {
      console.error('Insights loading error:', err)
    })
  }, [reportType])

  const loadInsights = async () => {
    setInsightsLoading(true)
    try {
      const data = await insightsService.getPatterns()
      setInsights(data)
    } catch (error) {
      console.error('Failed to load insights:', error)
      // Set empty insights on error to prevent blank page
      setInsights({
        patterns: [],
        positive_trends: [],
        concerns: [],
        recommendations: [],
        overall_assessment: 'Unable to load AI insights at this time. Please try again later.'
      })
    } finally {
      setInsightsLoading(false)
    }
  }

  const generateReport = async () => {
    setLoading(true)
    try {
      // Get user data from export endpoint
      const userData = await api.get('/user/export').then(res => res.data)
      
      // Calculate date range
      const now = new Date()
      let start, end
      if (reportType === 'weekly') {
        start = startOfWeek(subWeeks(now, 1))
        end = endOfWeek(now)
      } else {
        start = startOfMonth(subMonths(now, 1))
        end = endOfMonth(now)
      }
      setDateRange({ start, end })

      // Process mood logs
      const moodLogs = userData.mood_logs || []
      const filteredMoods = moodLogs.filter(log => {
        const logDate = new Date(log.created_at)
        return logDate >= start && logDate <= end
      })

      // Process journal entries
      const journalEntries = userData.journal_entries || []
      const filteredJournals = journalEntries.filter(entry => {
        const entryDate = new Date(entry.created_at)
        return entryDate >= start && entryDate <= end
      })

      // Process sessions
      const sessions = userData.sessions || []
      const filteredSessions = sessions.filter(session => {
        const sessionDate = new Date(session.created_at)
        return sessionDate >= start && sessionDate <= end
      })

      // Calculate statistics
      const moodStats = calculateMoodStats(filteredMoods)
      const journalStats = {
        total: filteredJournals.length,
        byType: filteredJournals.reduce((acc, entry) => {
          const type = entry.journal_type || 'general'
          acc[type] = (acc[type] || 0) + 1
          return acc
        }, {})
      }

      const sessionStats = {
        total: filteredSessions.length,
        totalMessages: filteredSessions.reduce((sum, s) => sum + (s.messages?.length || 0), 0),
        averageSentiment: calculateAverageSentiment(filteredSessions)
      }

      setReportData({
        moodStats,
        journalStats,
        sessionStats,
        moodLogs: filteredMoods,
        journalEntries: filteredJournals,
        sessions: filteredSessions
      })
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateMoodStats = (moodLogs) => {
    if (moodLogs.length === 0) return null

    const moodCounts = {}
    const intensitySum = {}
    const intensityCount = {}

    moodLogs.forEach(log => {
      const type = log.mood_type
      moodCounts[type] = (moodCounts[type] || 0) + 1
      if (log.intensity) {
        intensitySum[type] = (intensitySum[type] || 0) + log.intensity
        intensityCount[type] = (intensityCount[type] || 0) + 1
      }
    })

    const averageIntensity = {}
    Object.keys(intensitySum).forEach(type => {
      averageIntensity[type] = (intensitySum[type] / intensityCount[type]).toFixed(1)
    })

    return {
      total: moodLogs.length,
      distribution: moodCounts,
      averageIntensity,
      chartData: Object.keys(moodCounts).map(type => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: moodCounts[type],
        intensity: parseFloat(averageIntensity[type] || 0)
      }))
    }
  }

  const calculateAverageSentiment = (sessions) => {
    const sentiments = sessions
      .map(s => s.sentiment)
      .filter(s => s && s !== 'neutral')
    
    if (sentiments.length === 0) return 'neutral'
    
    const sentimentCounts = {}
    sentiments.forEach(s => {
      sentimentCounts[s] = (sentimentCounts[s] || 0) + 1
    })
    
    return Object.keys(sentimentCounts).reduce((a, b) => 
      sentimentCounts[a] > sentimentCounts[b] ? a : b
    )
  }

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444']

  const exportReportToPDF = () => {
    // This would use jsPDF to create a comprehensive PDF report
    alert('PDF export coming soon! For now, you can use the browser print function.')
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Progress Reports</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View your weekly and monthly progress</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setReportType('weekly')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              reportType === 'weekly'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setReportType('monthly')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              reportType === 'monthly'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Generating report...</span>
        </div>
      ) : reportData ? (
        <div className="space-y-6">
          {/* Date Range */}
          {dateRange && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <div className="font-semibold text-indigo-900 dark:text-indigo-200">
                  {reportType === 'weekly' ? 'Last Week' : 'Last Month'}
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  {format(dateRange.start, 'MMM d')} - {format(dateRange.end, 'MMM d, yyyy')}
                </div>
              </div>
              <button
                onClick={exportReportToPDF}
                className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          )}

          {/* Mood Statistics */}
          {reportData.moodStats && (
            <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Mood Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Mood Logs</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{reportData.moodStats.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mood Distribution</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={reportData.moodStats.chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportData.moodStats.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Journal Statistics */}
          <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Journal Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Entries</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{reportData.journalStats.total}</p>
              </div>
              {Object.entries(reportData.journalStats.byType).map(([type, count]) => (
                <div key={type}>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">{type}</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Session Statistics */}
          <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Chat Session Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{reportData.sessionStats.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Messages</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{reportData.sessionStats.totalMessages}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Sentiment</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 capitalize">{reportData.sessionStats.averageSentiment}</p>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          {insightsLoading ? (
            <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-400">Analyzing your patterns...</span>
              </div>
            </div>
          ) : insights ? (
            <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Personalized analysis of your mental health journey</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Patterns */}
                {insights.patterns && insights.patterns.length > 0 && (
                  <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 border border-indigo-200/50 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Patterns Identified</h4>
                    </div>
                    <ul className="space-y-2">
                      {insights.patterns.map((pattern, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-indigo-500 mt-1">•</span>
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Positive Trends */}
                {insights.positive_trends && insights.positive_trends.length > 0 && (
                  <div className="bg-green-50/60 dark:bg-green-900/20 rounded-2xl p-4 border border-green-200/50 dark:border-green-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Positive Trends</h4>
                    </div>
                    <ul className="space-y-2">
                      {insights.positive_trends.map((trend, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{trend}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Concerns */}
                {insights.concerns && insights.concerns.length > 0 && (
                  <div className="bg-amber-50/60 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200/50 dark:border-amber-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Areas to Watch</h4>
                    </div>
                    <ul className="space-y-2">
                      {insights.concerns.map((concern, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-amber-500 mt-1">⚠</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {insights.recommendations && insights.recommendations.length > 0 && (
                  <div className="bg-blue-50/60 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Recommendations</h4>
                    </div>
                    <ul className="space-y-2">
                      {insights.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">💡</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Overall Assessment */}
                {insights.overall_assessment && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-4 border-2 border-indigo-200/50 dark:border-indigo-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Overall Assessment
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{insights.overall_assessment}</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No data available for this period</p>
        </div>
      )}
    </div>
  )
}


