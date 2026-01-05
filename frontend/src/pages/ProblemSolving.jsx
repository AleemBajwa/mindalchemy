import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Lightbulb, CheckCircle2 } from 'lucide-react'

export default function ProblemSolving() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    problem: '',
    goal: '',
    solutions: ['', '', ''],
    pros_cons: [{ solution: '', pros: '', cons: '' }],
    chosen_solution: '',
    action_plan: '',
    evaluation: ''
  })

  const totalSteps = 6

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

  const handleSave = () => {
    // Save to localStorage for now (can be enhanced with backend)
    const saved = JSON.parse(localStorage.getItem('problem_solving_worksheets') || '[]')
    saved.push({
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString()
    })
    localStorage.setItem('problem_solving_worksheets', JSON.stringify(saved))
    alert('Problem-solving worksheet saved!')
  }

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
          <Lightbulb className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Problem-Solving Worksheet</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Structured approach to solving problems</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Step {step} of {totalSteps}</span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Define Problem */}
      {step === 1 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 1: Define the Problem</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What is the problem you're facing?
              </label>
              <textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Describe the problem clearly and specifically..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What is your goal? (What would you like to achieve?)
              </label>
              <textarea
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="What outcome are you hoping for?"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Brainstorm Solutions */}
      {step === 2 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 2: Brainstorm Solutions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            List as many possible solutions as you can think of. Don't judge them yet - just brainstorm!
          </p>
          <div className="space-y-3">
            {formData.solutions.map((solution, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Solution {index + 1}
                </label>
                <input
                  type="text"
                  value={solution}
                  onChange={(e) => {
                    const newSolutions = [...formData.solutions]
                    newSolutions[index] = e.target.value
                    setFormData({ ...formData, solutions: newSolutions })
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder={`Possible solution ${index + 1}...`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Evaluate Solutions */}
      {step === 3 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 3: Evaluate Solutions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            For each solution, list the pros and cons
          </p>
          <div className="space-y-4">
            {formData.solutions.filter(s => s.trim()).map((solution, index) => (
              <div key={index} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{solution}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                      Pros
                    </label>
                    <textarea
                      value={formData.pros_cons[index]?.pros || ''}
                      onChange={(e) => {
                        const newProsCons = [...formData.pros_cons]
                        if (!newProsCons[index]) newProsCons[index] = { solution, pros: '', cons: '' }
                        newProsCons[index].pros = e.target.value
                        setFormData({ ...formData, pros_cons: newProsCons })
                      }}
                      rows={4}
                      className="w-full px-3 py-2 border border-green-200 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white"
                      placeholder="Advantages..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                      Cons
                    </label>
                    <textarea
                      value={formData.pros_cons[index]?.cons || ''}
                      onChange={(e) => {
                        const newProsCons = [...formData.pros_cons]
                        if (!newProsCons[index]) newProsCons[index] = { solution, pros: '', cons: '' }
                        newProsCons[index].cons = e.target.value
                        setFormData({ ...formData, pros_cons: newProsCons })
                      }}
                      rows={4}
                      className="w-full px-3 py-2 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white"
                      placeholder="Disadvantages..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Choose Solution */}
      {step === 4 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 4: Choose the Best Solution</h3>
          <div className="space-y-3">
            {formData.solutions.filter(s => s.trim()).map((solution, index) => (
              <button
                key={index}
                onClick={() => setFormData({ ...formData, chosen_solution: solution })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  formData.chosen_solution === solution
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {formData.chosen_solution === solution ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                  )}
                  <span className="font-medium text-gray-900 dark:text-white">{solution}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Action Plan */}
      {step === 5 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 5: Create an Action Plan</h3>
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-1">Chosen Solution:</p>
            <p className="text-gray-900 dark:text-white">{formData.chosen_solution || 'Not selected'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What specific steps will you take?
            </label>
            <textarea
              value={formData.action_plan}
              onChange={(e) => setFormData({ ...formData, action_plan: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Step 1: ...&#10;Step 2: ...&#10;Step 3: ..."
            />
          </div>
        </div>
      )}

      {/* Step 6: Evaluation */}
      {step === 6 && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Step 6: Evaluation</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              After implementing your solution, how did it work? What would you do differently?
            </label>
            <textarea
              value={formData.evaluation}
              onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Reflect on the outcome..."
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <div className="flex gap-3">
          {step === totalSteps && (
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Worksheet
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === totalSteps}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}


