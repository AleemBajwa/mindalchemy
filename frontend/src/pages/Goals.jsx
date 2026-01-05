import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { goalService } from '../services/goalService'
import { format } from 'date-fns'

export default function Goals() {
  const navigate = useNavigate()
  const [goals, setGoals] = useState([])
  const [filter, setFilter] = useState('all') // all, active, completed, paused
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'mental_health',
    target_date: ''
  })

  useEffect(() => {
    loadGoals()
  }, [filter])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await goalService.getGoals(filter === 'all' ? null : filter)
      setGoals(data)
    } catch (error) {
      console.error('Failed to load goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newGoal.title.trim()) return

    try {
      await goalService.createGoal({
        ...newGoal,
        target_date: newGoal.target_date || null
      })
      setShowCreate(false)
      setNewGoal({ title: '', description: '', category: 'mental_health', target_date: '' })
      loadGoals()
    } catch (error) {
      console.error('Failed to create goal:', error)
    }
  }

  const handleUpdateProgress = async (goalId, progress) => {
    try {
      await goalService.updateGoal(goalId, { progress })
      loadGoals()
    } catch (error) {
      console.error('Failed to update goal:', error)
    }
  }

  const handleComplete = async (goalId) => {
    try {
      await goalService.updateGoal(goalId, { status: 'completed', progress: 100 })
      loadGoals()
    } catch (error) {
      console.error('Failed to complete goal:', error)
    }
  }

  const handleDelete = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return

    try {
      await goalService.deleteGoal(goalId)
      loadGoals()
    } catch (error) {
      console.error('Failed to delete goal:', error)
    }
  }

  const categories = {
    mental_health: { label: 'Mental Health', icon: '🧠', color: 'bg-purple-100 text-purple-700' },
    wellness: { label: 'Wellness', icon: '💚', color: 'bg-green-100 text-green-700' },
    therapy: { label: 'Therapy', icon: '💬', color: 'bg-blue-100 text-blue-700' },
    personal: { label: 'Personal', icon: '⭐', color: 'bg-yellow-100 text-yellow-700' }
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Goals</h2>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark"
        >
          + New Goal
        </button>
      </div>

      {/* Create Goal Form */}
      {showCreate && (
        <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-amber-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Create New Goal</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Practice meditation daily"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="3"
              placeholder="Describe your goal..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Date (Optional)
              </label>
              <input
                type="date"
                value={newGoal.target_date}
                onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark"
            >
              Create Goal
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-500/10 dark:shadow-gray-900/50 p-2 border border-amber-200/30 dark:border-gray-700">
        {['all', 'active', 'completed', 'paused'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold capitalize ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-12 text-center border border-amber-200/30 dark:border-gray-700">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
          <p className="text-gray-500 mb-6">Set your first goal to start tracking your progress</p>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark"
          >
            Create First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const category = categories[goal.category] || categories.personal
            return (
              <div
                key={goal.id}
                className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-500/10 dark:shadow-gray-900/50 p-6 border border-amber-200/30 dark:border-gray-700 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${category.color}`}>
                        {category.label}
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                    )}
                    {goal.target_date && (
                      <p className="text-xs text-gray-500">
                        Target: {format(new Date(goal.target_date), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {goal.status === 'active' && (
                      <button
                        onClick={() => handleComplete(goal.id)}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Progress Controls */}
                {goal.status === 'active' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleUpdateProgress(goal.id, Math.max(0, goal.progress - 10))}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => handleUpdateProgress(goal.id, Math.min(100, goal.progress + 10))}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      +10%
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                )}

                {/* Status Badge */}
                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.status === 'completed' ? 'bg-green-100 text-green-700' :
                    goal.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {goal.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

