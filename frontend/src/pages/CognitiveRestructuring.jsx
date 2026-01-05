import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CognitiveRestructuring() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    negativeThought: '',
    situation: '',
    emotions: '',
    emotionIntensity: 5,
    evidenceFor: '',
    evidenceAgainst: '',
    cognitiveDistortions: [],
    balancedThought: '',
    beliefRating: 5
  })

  const distortions = [
    { id: 'all_or_nothing', label: 'All-or-Nothing Thinking', desc: 'Seeing things in black and white' },
    { id: 'overgeneralization', label: 'Overgeneralization', desc: 'One negative event means everything is bad' },
    { id: 'mental_filter', label: 'Mental Filter', desc: 'Focusing only on negative details' },
    { id: 'jumping_conclusions', label: 'Jumping to Conclusions', desc: 'Assuming the worst without evidence' },
    { id: 'magnification', label: 'Magnification', desc: 'Blowing things out of proportion' },
    { id: 'emotional_reasoning', label: 'Emotional Reasoning', desc: 'Believing feelings reflect reality' },
    { id: 'should_statements', label: 'Should Statements', desc: 'Using "should" or "must" statements' },
    { id: 'labeling', label: 'Labeling', desc: 'Attaching negative labels to yourself' },
    { id: 'personalization', label: 'Personalization', desc: 'Blaming yourself for things outside your control' }
  ]

  const totalSteps = 7

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const toggleDistortion = (id) => {
    setFormData(prev => ({
      ...prev,
      cognitiveDistortions: prev.cognitiveDistortions.includes(id)
        ? prev.cognitiveDistortions.filter(d => d !== id)
        : [...prev.cognitiveDistortions, id]
    }))
  }

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
          <h2 className="text-2xl font-bold text-gray-900">Cognitive Restructuring</h2>
          <p className="text-gray-600 mt-1">Challenge and reframe negative thoughts</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-violet-500/10 dark:shadow-gray-900/50 p-4 border border-violet-200/30 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Situation */}
      {step === 1 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 1: What's the Situation?</h3>
          <p className="text-gray-600">Describe the situation that triggered your negative thought.</p>
          <textarea
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="What happened? Where were you? Who was involved?"
          />
        </div>
      )}

      {/* Step 2: Negative Thought */}
      {step === 2 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 2: Identify Your Negative Thought</h3>
          <p className="text-gray-600">What thought went through your mind? Be specific.</p>
          <textarea
            value={formData.negativeThought}
            onChange={(e) => setFormData({ ...formData, negativeThought: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="What did you think? What did you tell yourself?"
          />
        </div>
      )}

      {/* Step 3: Emotions */}
      {step === 3 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 3: What Emotions Did You Feel?</h3>
          <p className="text-gray-600">Identify the emotions you experienced.</p>
          <input
            type="text"
            value={formData.emotions}
            onChange={(e) => setFormData({ ...formData, emotions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., anxious, sad, angry, ashamed"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity: {formData.emotionIntensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.emotionIntensity}
              onChange={(e) => setFormData({ ...formData, emotionIntensity: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 4: Cognitive Distortions */}
      {step === 4 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 4: Identify Cognitive Distortions</h3>
          <p className="text-gray-600">Which thinking patterns apply to your negative thought?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {distortions.map((distortion) => (
              <button
                key={distortion.id}
                onClick={() => toggleDistortion(distortion.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  formData.cognitiveDistortions.includes(distortion.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{distortion.label}</div>
                <div className="text-xs text-gray-600">{distortion.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Evidence For */}
      {step === 5 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 5: Evidence Supporting the Thought</h3>
          <p className="text-gray-600">What evidence supports this negative thought?</p>
          <textarea
            value={formData.evidenceFor}
            onChange={(e) => setFormData({ ...formData, evidenceFor: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="What facts or experiences support this thought?"
          />
        </div>
      )}

      {/* Step 6: Evidence Against */}
      {step === 6 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 6: Evidence Against the Thought</h3>
          <p className="text-gray-600">What evidence contradicts this negative thought?</p>
          <textarea
            value={formData.evidenceAgainst}
            onChange={(e) => setFormData({ ...formData, evidenceAgainst: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="What facts or experiences contradict this thought? What would you tell a friend?"
          />
        </div>
      )}

      {/* Step 7: Balanced Thought */}
      {step === 7 && (
        <div className="bg-gradient-to-br from-white/80 via-violet-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-violet-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-violet-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Step 7: Create a Balanced Thought</h3>
          <p className="text-gray-600">Based on the evidence, what's a more balanced and realistic thought?</p>
          <textarea
            value={formData.balancedThought}
            onChange={(e) => setFormData({ ...formData, balancedThought: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            placeholder="What's a more balanced way to think about this situation?"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How much do you believe this balanced thought? {formData.beliefRating}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.beliefRating}
              onChange={(e) => setFormData({ ...formData, beliefRating: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={step === totalSteps}
          className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === totalSteps ? 'Complete' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

