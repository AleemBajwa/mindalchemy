import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cbtService } from '../services/cbtService'
import { format } from 'date-fns'

export default function ThoughtRecord() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  
  const [record, setRecord] = useState({
    situation: '',
    automatic_thoughts: '',
    emotions: '',
    emotion_intensity: 5,
    evidence_for: '',
    evidence_against: '',
    alternative_thoughts: '',
    outcome_rating: 5
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7

  useEffect(() => {
    if (!isNew) {
      loadRecord()
    }
  }, [id])

  const loadRecord = async () => {
    try {
      setLoading(true)
      const data = await cbtService.getThoughtRecord(id)
      setRecord({
        situation: data.situation || '',
        automatic_thoughts: data.automatic_thoughts || '',
        emotions: data.emotions || '',
        emotion_intensity: data.emotion_intensity || 5,
        evidence_for: data.evidence_for || '',
        evidence_against: data.evidence_against || '',
        alternative_thoughts: data.alternative_thoughts || '',
        outcome_rating: data.outcome_rating || 5
      })
    } catch (error) {
      console.error('Failed to load record:', error)
      setError('Failed to load thought record')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      if (isNew) {
        await cbtService.createThoughtRecord(record)
      } else {
        await cbtService.updateThoughtRecord(id, record)
      }
      navigate('/cbt')
    } catch (error) {
      console.error('Failed to save record:', error)
      setError('Failed to save thought record')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this thought record?')) {
      return
    }

    try {
      await cbtService.deleteThoughtRecord(id)
      navigate('/cbt')
    } catch (error) {
      console.error('Failed to delete record:', error)
      setError('Failed to delete thought record')
    }
  }

  const steps = [
    {
      title: 'Situation',
      description: 'What was the situation? Where were you? Who were you with?',
      field: 'situation',
      type: 'textarea'
    },
    {
      title: 'Automatic Thoughts',
      description: 'What thoughts went through your mind? What were you thinking?',
      field: 'automatic_thoughts',
      type: 'textarea'
    },
    {
      title: 'Emotions',
      description: 'What emotions did you feel? (e.g., sad, anxious, angry)',
      field: 'emotions',
      type: 'textarea'
    },
    {
      title: 'Emotion Intensity',
      description: 'How intense were these emotions? (1 = mild, 10 = extremely intense)',
      field: 'emotion_intensity',
      type: 'slider'
    },
    {
      title: 'Evidence For',
      description: 'What evidence supports your automatic thoughts?',
      field: 'evidence_for',
      type: 'textarea'
    },
    {
      title: 'Evidence Against',
      description: 'What evidence contradicts your automatic thoughts?',
      field: 'evidence_against',
      type: 'textarea'
    },
    {
      title: 'Alternative Thoughts',
      description: 'What are more balanced or alternative ways of thinking about this situation?',
      field: 'alternative_thoughts',
      type: 'textarea'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Thought Record' : 'Edit Thought Record'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/cbt')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          {!isNew && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-4 border border-violet-200/30 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full mx-1 ${
                index + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Step Navigation */}
      <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 border border-violet-200/30 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <h3 className="text-xl font-semibold text-center">
            {currentStepData.title}
          </h3>
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-center">
          {currentStepData.description}
        </p>

        {currentStepData.type === 'textarea' ? (
          <textarea
            value={record[currentStepData.field]}
            onChange={(e) => setRecord({ ...record, [currentStepData.field]: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="8"
            placeholder={`Enter ${currentStepData.title.toLowerCase()}...`}
          />
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Intensity: {record.emotion_intensity}/10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={record.emotion_intensity}
                onChange={(e) => setRecord({ ...record, emotion_intensity: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Extremely Intense</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Outcome Rating (Final Step) */}
      {currentStep === totalSteps && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Outcome Rating</h3>
          <p className="text-gray-600 mb-4">
            After completing this thought record, how much do you believe your alternative thoughts? (1 = not at all, 10 = completely)
          </p>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Belief Rating: {record.outcome_rating}/10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={record.outcome_rating}
              onChange={(e) => setRecord({ ...record, outcome_rating: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not at all</span>
              <span>Completely</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick View All Fields */}
      <details className="bg-gray-50 rounded-xl p-4">
        <summary className="font-semibold text-gray-700 cursor-pointer">
          View All Fields
        </summary>
        <div className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-gradient-to-br from-white/70 via-violet-50/50 to-purple-50/50 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-violet-200/30 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
              {step.type === 'textarea' ? (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {record[step.field] || <span className="text-gray-400">Not filled</span>}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  {record[step.field]}/10
                </p>
              )}
            </div>
          ))}
          <div className="bg-gradient-to-br from-white/70 via-violet-50/50 to-purple-50/50 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-violet-200/30 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 mb-2">Outcome Rating</h4>
            <p className="text-sm text-gray-600">{record.outcome_rating}/10</p>
          </div>
        </div>
      </details>
    </div>
  )
}

