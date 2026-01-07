import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { dashboardService } from '../services/dashboardService'
import { moodService } from '../services/moodService'
import { format } from 'date-fns'
import { 
  MessageCircle, TrendingUp, BookOpen, Brain, Heart, 
  Sparkles, Target, Moon, Book, AlertCircle, 
  Activity, Calendar, ArrowRight, Smile, Frown, 
  Meh, Laugh, AlertTriangle, FileText
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const data = await dashboardService.getDashboard()
      setDashboard(data)
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickMood = async (moodType) => {
    try {
      await moodService.logMood({
        mood_type: moodType,
        mood_value: 5, // Default value
      })
      loadDashboard()
    } catch (error) {
      console.error('Failed to log mood:', error)
    }
  }

  const moods = [
    { type: 'happy', icon: Laugh, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { type: 'calm', icon: Heart, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { type: 'neutral', icon: Meh, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { type: 'sad', icon: Frown, color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { type: 'anxious', icon: AlertTriangle, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 font-medium">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">
            Hello, {user?.full_name || 'there'} <Sparkles className="inline w-8 h-8 text-yellow-300 animate-pulse" />
          </h2>
          <p className="text-indigo-100 text-lg">How are you feeling today?</p>
        </div>
      </div>

      {/* Quick Mood Selector */}
      <div className="bg-gradient-to-br from-white/80 via-rose-50/50 to-amber-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-500/10 dark:shadow-gray-900/50 p-4 sm:p-6 border border-rose-200/30 dark:border-gray-700">
        <div className="flex justify-between sm:justify-around gap-2 sm:gap-3 overflow-x-auto pb-1">
          {moods.map((mood) => {
            const Icon = mood.icon
            return (
              <button
                key={mood.type}
                onClick={() => handleQuickMood(mood.type)}
                className={`group relative flex flex-col items-center gap-2 p-4 rounded-2xl ${mood.bgColor} hover:scale-110 transition-all duration-300 hover:shadow-lg`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 capitalize">{mood.type}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="group bg-gradient-to-br from-white/70 via-blue-50/70 to-indigo-50/70 dark:from-gray-800/70 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-200/40 dark:border-blue-800/50 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
            {dashboard?.total_sessions || 0}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Sessions</div>
        </div>
        <div className="group bg-gradient-to-br from-white/70 via-purple-50/70 to-pink-50/70 dark:from-gray-800/70 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-200/40 dark:border-purple-800/50 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {dashboard?.current_streak || 0}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Day Streak</div>
        </div>
        <div className="group bg-gradient-to-br from-white/70 via-emerald-50/70 to-teal-50/70 dark:from-gray-800/70 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-200/40 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
            {dashboard?.total_journal_entries || 0}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Entries</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Explore features</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/chat')}
            className="group relative bg-gradient-to-br from-white/80 via-indigo-50/60 to-purple-50/60 dark:from-gray-800/80 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-indigo-200/40 dark:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all">
                <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Chat with AI</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Talk to your therapist</div>
              <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/mood')}
            className="group relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 text-center border border-pink-100 dark:border-pink-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all">
                <Smile className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Log Mood</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Track your emotions</div>
              <ArrowRight className="w-4 h-4 text-pink-600 dark:text-pink-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/journal')}
            className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center border border-blue-100 dark:border-blue-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all">
                <BookOpen className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Journal</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Write your thoughts</div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 text-center border border-emerald-100 dark:border-emerald-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/40 transition-all">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Progress</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">View your journey</div>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/cbt')}
            className="group relative bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center border border-violet-100 dark:border-violet-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all">
                <Brain className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">CBT Tools</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Thought records</div>
              <ArrowRight className="w-4 h-4 text-violet-600 dark:text-violet-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="group relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 text-center border border-amber-100 dark:border-amber-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all">
                <Book className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Resources</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Learn & grow</div>
              <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/crisis')}
            className="group relative bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 text-center border border-red-100 dark:border-red-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-xl group-hover:shadow-red-500/40 transition-all">
                <AlertCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Crisis Help</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Emergency resources</div>
              <ArrowRight className="w-4 h-4 text-red-600 dark:text-red-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="group relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center border border-indigo-100 dark:border-indigo-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all">
                <FileText className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">AI Insights</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">View your patterns</div>
              <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/dbt')}
            className="group relative bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 text-center border border-cyan-100 dark:border-cyan-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all">
                <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">DBT Skills</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Emotional regulation</div>
              <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
          <button
            onClick={() => navigate('/meditation')}
            className="group relative bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-teal-100 dark:border-teal-800/50 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all">
                <Moon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-bold text-gray-900 dark:text-white mb-1">Meditation</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Relaxation & mindfulness</div>
              <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      {dashboard?.recent_activity && dashboard.recent_activity.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 space-y-3">
            {dashboard.recent_activity.map((activity, index) => {
              const Icon = activity.type === 'chat' ? MessageCircle : activity.type === 'mood' ? Smile : BookOpen
              const iconColor = activity.type === 'chat' ? 'text-indigo-600' : activity.type === 'mood' ? 'text-pink-600' : 'text-blue-600'
              const bgColor = activity.type === 'chat' ? 'bg-indigo-100 dark:bg-indigo-900/30' : activity.type === 'mood' ? 'bg-pink-100 dark:bg-pink-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">{activity.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

