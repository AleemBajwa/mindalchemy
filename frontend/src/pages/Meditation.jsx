import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'

export default function Meditation() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('meditation_favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (categoryId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
      localStorage.setItem('meditation_favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const categories = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Calm your mind with guided breathing',
      icon: '🌬️',
      color: 'bg-blue-50 border-blue-200',
      type: 'breathing'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      description: 'Present-moment awareness practices',
      icon: '🧘',
      color: 'bg-green-50 border-green-200',
      type: 'guided',
      durations: [5, 10, 15, 20]
    },
    {
      id: 'sleep',
      title: 'Sleep Meditation',
      description: 'Relax and prepare for restful sleep',
      icon: '😴',
      color: 'bg-indigo-50 border-indigo-200',
      type: 'guided',
      durations: [10, 15, 20, 30]
    },
    {
      id: 'anxiety',
      title: 'Anxiety Relief',
      description: 'Calm anxiety and find peace',
      icon: '💚',
      color: 'bg-purple-50 border-purple-200',
      type: 'guided',
      durations: [5, 10, 15]
    },
    {
      id: 'body-scan',
      title: 'Body Scan',
      description: 'Progressive relaxation through body awareness',
      icon: '🌊',
      color: 'bg-yellow-50 border-yellow-200',
      type: 'guided',
      durations: [10, 15, 20]
    },
    {
      id: 'timer',
      title: 'Meditation Timer',
      description: 'Custom timer for your practice',
      icon: '⏱️',
      color: 'bg-gray-50 border-gray-200',
      type: 'timer'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Meditation & Mindfulness</h2>
        <p className="text-gray-600 mt-1">
          Guided meditations, breathing exercises, and relaxation tools
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          Benefits of Regular Meditation
        </h3>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Reduces stress and anxiety</li>
          <li>• Improves focus and concentration</li>
          <li>• Enhances emotional regulation</li>
          <li>• Promotes better sleep</li>
          <li>• Increases self-awareness</li>
        </ul>
      </div>

      {/* Favorites Filter */}
      {favorites.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              const showFavorites = localStorage.getItem('show_favorites_only') === 'true'
              localStorage.setItem('show_favorites_only', (!showFavorites).toString())
              window.location.reload()
            }}
            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all flex items-center gap-2"
          >
            <Star className={`w-4 h-4 ${localStorage.getItem('show_favorites_only') === 'true' ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            {localStorage.getItem('show_favorites_only') === 'true' ? 'Show All' : 'Show Favorites Only'}
          </button>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(localStorage.getItem('show_favorites_only') === 'true' 
          ? categories.filter(c => favorites.includes(c.id))
          : categories
        ).map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-xl border-2 p-6 hover:shadow-md transition-all relative group`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(category.id)
              }}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/50 transition-all z-10"
              title={favorites.includes(category.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star 
                className={`w-5 h-5 ${
                  favorites.includes(category.id) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-400 group-hover:text-yellow-400'
                }`} 
              />
            </button>
            <button
              onClick={() => {
                if (category.type === 'breathing') {
                  navigate('/meditation/breathing')
                } else if (category.type === 'timer') {
                  navigate('/meditation/timer')
                } else {
                  navigate(`/meditation/${category.id}`)
                }
              }}
              className="w-full text-left"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {category.description}
                  </p>
                  {category.durations && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {category.durations.join(', ')} min sessions
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-white/80 via-teal-50/50 to-emerald-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-teal-500/10 dark:shadow-gray-900/50 p-6 border border-teal-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Tips for Meditation</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Start with shorter sessions (5-10 minutes) and gradually increase</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Find a quiet, comfortable space where you won't be disturbed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>It's normal for your mind to wander - gently bring it back</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Consistency is more important than duration</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Practice at the same time each day to build a habit</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

