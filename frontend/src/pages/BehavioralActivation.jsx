import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BehavioralActivation() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({
    name: '',
    category: 'enjoyable',
    scheduled: false,
    completed: false,
    moodBefore: 5,
    moodAfter: 5
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = {
    enjoyable: { label: 'Enjoyable', icon: '😊', color: 'bg-green-100 text-green-700' },
    social: { label: 'Social', icon: '🤝', color: 'bg-blue-100 text-blue-700' },
    physical: { label: 'Physical', icon: '💪', color: 'bg-orange-100 text-orange-700' },
    achievement: { label: 'Achievement', icon: '⭐', color: 'bg-yellow-100 text-yellow-700' },
    self_care: { label: 'Self-Care', icon: '💚', color: 'bg-purple-100 text-purple-700' }
  }

  const handleAddActivity = () => {
    if (!newActivity.name.trim()) return

    setActivities([...activities, {
      ...newActivity,
      id: Date.now(),
      date: new Date().toISOString()
    }])
    setNewActivity({
      name: '',
      category: 'enjoyable',
      scheduled: false,
      completed: false,
      moodBefore: 5,
      moodAfter: 5
    })
    setShowAddForm(false)
  }

  const handleToggleComplete = (id) => {
    setActivities(activities.map(activity =>
      activity.id === id
        ? { ...activity, completed: !activity.completed }
        : activity
    ))
  }

  const handleDelete = (id) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  const completedActivities = activities.filter(a => a.completed)
  const scheduledActivities = activities.filter(a => a.scheduled && !a.completed)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/cbt')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Behavioral Activation</h2>
          <p className="text-gray-600 mt-1">Schedule activities to improve your mood</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          What is Behavioral Activation?
        </h3>
        <p className="text-sm text-indigo-800 mb-3">
          Behavioral Activation is a CBT technique that helps improve mood by increasing engagement
          in meaningful and enjoyable activities. When we're depressed or anxious, we often withdraw
          from activities, which can make us feel worse. By scheduling and completing activities,
          we can break this cycle.
        </p>
        <div className="text-sm text-indigo-800">
          <strong>Key Principles:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Schedule activities even when you don't feel like it</li>
            <li>Track your mood before and after activities</li>
            <li>Focus on activities that align with your values</li>
            <li>Start small and build momentum</li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white/70 via-emerald-50/70 to-teal-50/70 dark:from-gray-800/70 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-500/10 dark:shadow-gray-900/50 p-4 text-center border border-emerald-200/40 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">📋</div>
          <div className="text-2xl font-bold text-primary">{activities.length}</div>
          <div className="text-xs text-gray-500">Total Activities</div>
        </div>
        <div className="bg-gradient-to-br from-white/70 via-emerald-50/70 to-teal-50/70 dark:from-gray-800/70 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-500/10 dark:shadow-gray-900/50 p-4 text-center border border-emerald-200/40 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">{completedActivities.length}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-white/70 via-emerald-50/70 to-teal-50/70 dark:from-gray-800/70 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-500/10 dark:shadow-gray-900/50 p-4 text-center border border-emerald-200/40 dark:border-emerald-800/50 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">📅</div>
          <div className="text-2xl font-bold text-blue-600">{scheduledActivities.length}</div>
          <div className="text-xs text-gray-500">Scheduled</div>
        </div>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-white/80 via-emerald-50/50 to-teal-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-emerald-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-emerald-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Add New Activity</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Name
            </label>
            <input
              type="text"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Go for a walk, Call a friend"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setNewActivity({ ...newActivity, category: key })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    newActivity.category === key
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-xs font-semibold">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="scheduled"
              checked={newActivity.scheduled}
              onChange={(e) => setNewActivity({ ...newActivity, scheduled: e.target.checked })}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="scheduled" className="text-sm font-medium text-gray-700">
              Schedule for later
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddActivity}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark"
            >
              Add Activity
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark"
        >
          + Add Activity
        </button>
      )}

      {/* Activities List */}
      {activities.length === 0 ? (
        <div className="bg-gradient-to-br from-white/80 via-emerald-50/50 to-teal-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-emerald-500/10 dark:shadow-gray-900/50 p-12 text-center border border-emerald-200/30 dark:border-gray-700">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">No activities yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first activity</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark"
          >
            Add First Activity
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const category = categories[activity.category] || categories.enjoyable
            return (
              <div
                key={activity.id}
                className={`bg-gradient-to-br from-white/80 via-emerald-50/50 to-teal-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-500/10 dark:shadow-gray-900/50 p-6 border border-emerald-200/30 dark:border-gray-700 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.01] transition-all duration-300 ${
                  activity.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${activity.completed ? 'line-through' : ''}`}>
                          {activity.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${category.color}`}>
                          {category.label}
                        </span>
                      </div>
                      {activity.scheduled && (
                        <p className="text-xs text-gray-500">📅 Scheduled</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleComplete(activity.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        activity.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {activity.completed ? '✓ Done' : 'Mark Done'}
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {activity.completed && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Mood Before</div>
                        <div className="font-semibold">{activity.moodBefore}/10</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Mood After</div>
                        <div className="font-semibold text-primary">{activity.moodAfter}/10</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

