import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle, TrendingUp } from 'lucide-react'

export default function ExposureTherapy() {
  const navigate = useNavigate()
  const [fearHierarchy, setFearHierarchy] = useState([])
  const [newItem, setNewItem] = useState({ situation: '', anxiety_level: 5, completed: false })
  const [currentStep, setCurrentStep] = useState(null)

  const handleAddItem = () => {
    if (!newItem.situation.trim()) return
    
    setFearHierarchy([...fearHierarchy, {
      id: Date.now(),
      ...newItem,
      completed: false
    }])
    setNewItem({ situation: '', anxiety_level: 5, completed: false })
  }

  const handleDeleteItem = (id) => {
    setFearHierarchy(fearHierarchy.filter(item => item.id !== id))
  }

  const handleCompleteItem = (id) => {
    setFearHierarchy(fearHierarchy.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const sortedHierarchy = [...fearHierarchy].sort((a, b) => a.anxiety_level - b.anxiety_level)

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/cbt')}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Exposure Therapy</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gradual exposure to overcome fears</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">About Exposure Therapy</h3>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Exposure therapy helps you gradually face your fears in a safe, controlled way. Start with situations that cause mild anxiety and work your way up. This technique is effective for anxiety, phobias, and PTSD.
        </p>
      </div>

      {/* Add New Item */}
      <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Add Fear/Situation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Situation or Fear
            </label>
            <input
              type="text"
              value={newItem.situation}
              onChange={(e) => setNewItem({ ...newItem, situation: e.target.value })}
              placeholder="e.g., Speaking in public, Going to crowded places"
              className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Anxiety Level: {newItem.anxiety_level}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={newItem.anxiety_level}
              onChange={(e) => setNewItem({ ...newItem, anxiety_level: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
          <button
            onClick={handleAddItem}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add to Hierarchy
          </button>
        </div>
      </div>

      {/* Fear Hierarchy */}
      {sortedHierarchy.length > 0 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Your Fear Hierarchy (Start from bottom)
          </h3>
          <div className="space-y-3">
            {sortedHierarchy.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  item.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Step {index + 1}
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            item.anxiety_level <= 3 ? 'bg-green-500' :
                            item.anxiety_level <= 6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(item.anxiety_level / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {item.anxiety_level}/10
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{item.situation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCompleteItem(item.id)}
                      className={`p-2 rounded-lg transition-all ${
                        item.completed
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}
                      title={item.completed ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-3">How to Use</h3>
        <ol className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
          <li className="flex items-start gap-2">
            <span className="font-semibold">1.</span>
            <span>List situations that cause anxiety, from least to most anxiety-provoking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">2.</span>
            <span>Start with the item at the bottom (lowest anxiety level)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">3.</span>
            <span>Practice that situation until your anxiety decreases significantly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">4.</span>
            <span>Mark it as completed and move to the next item</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">5.</span>
            <span>Work your way up the hierarchy gradually</span>
          </li>
        </ol>
      </div>
    </div>
  )
}


