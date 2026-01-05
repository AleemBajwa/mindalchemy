import { useState, useEffect } from 'react'
import { crisisService } from '../services/crisisService'
import useAuthStore from '../store/authStore'
import { Globe, Phone, ExternalLink, AlertCircle } from 'lucide-react'

export default function CrisisResources() {
  const [showEmergency, setShowEmergency] = useState(false)
  const [resources, setResources] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const data = await crisisService.getResources()
      setResources(data)
    } catch (error) {
      console.error('Failed to load crisis resources:', error)
      // Fallback to default US resources
      setResources({
        country: 'US',
        country_name: 'United States',
        emergency: '911',
        hotlines: [],
        online_resources: []
      })
    } finally {
      setLoading(false)
    }
  }

  const emergencyHotlines = resources?.hotlines || []
  const onlineResources = resources?.online_resources || []
  const emergencyNumber = resources?.emergency || '911'
  const countryName = resources?.country_name || 'Your Country'

  const copingStrategies = [
    {
      title: 'Grounding Techniques',
      steps: [
        '5-4-3-2-1: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
        'Deep breathing: Inhale for 4 counts, hold for 4, exhale for 4',
        'Focus on your feet: Feel your feet on the ground, wiggle your toes'
      ]
    },
    {
      title: 'TIPP Technique (Temperature)',
      steps: [
        'Temperature: Hold ice cubes or splash cold water on your face',
        'Intense Exercise: Do jumping jacks or run in place for 2 minutes',
        'Paced Breathing: Breathe in for 4, hold for 4, out for 6',
        'Paired Muscle Relaxation: Tense and release muscle groups'
      ]
    },
    {
      title: 'STOP Technique',
      steps: [
        'Stop: Pause and take a breath',
        'Take a step back: Observe what\'s happening',
        'Observe: Notice your thoughts and feelings',
        'Proceed mindfully: Choose your response carefully'
      ]
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 dark:text-gray-400 font-medium">Loading crisis resources...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
          <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Crisis Resources</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Resources for {countryName}
          </p>
        </div>
      </div>
      
      {/* Country Info Banner */}
      {resources?.country && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 flex items-center gap-3">
          <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <div className="font-semibold text-indigo-900 dark:text-indigo-200">
              Showing resources for {countryName}
            </div>
            <div className="text-sm text-indigo-700 dark:text-indigo-300">
              Emergency: {emergencyNumber} • Update your country in profile settings
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          If you're in immediate danger, please call <strong>{emergencyNumber}</strong> or your local emergency services.
        </p>
      </div>

      {/* Emergency Button */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
        <button
          onClick={() => setShowEmergency(!showEmergency)}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          {showEmergency ? 'Hide' : 'Show'} Emergency Contacts
        </button>
        {showEmergency && (
          <div className="mt-4 space-y-3">
            {emergencyHotlines.length > 0 ? (
              emergencyHotlines.map((hotline, index) => (
                <a
                  key={index}
                  href={hotline.link}
                  className="block bg-gradient-to-br from-white/90 via-red-50/70 to-rose-50/70 dark:from-gray-800/90 dark:via-red-900/30 dark:to-rose-900/30 backdrop-blur-sm rounded-xl p-4 border-2 border-red-200/50 dark:border-red-800/50 shadow-lg shadow-red-500/10 hover:shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] transition-all"
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">{hotline.name}</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {hotline.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{hotline.description}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available: {hotline.available}</div>
                </a>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No emergency hotlines available for your country. Please contact local emergency services.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Immediate Help Section */}
      <div className="bg-gradient-to-br from-white/80 via-red-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-red-500/10 dark:shadow-gray-900/50 p-6 border border-red-200/30 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Immediate Help
        </h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
            <div className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
              If you're having thoughts of suicide or self-harm:
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-indigo-800 dark:text-indigo-300">
              <li>You are not alone - help is available</li>
              <li>Call {emergencyNumber} for immediate emergency assistance</li>
              <li>Contact the hotlines listed above - available 24/7</li>
              <li>Go to your nearest emergency room</li>
              <li>Reach out to a trusted friend or family member</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coping Strategies */}
      <div className="bg-gradient-to-br from-white/80 via-red-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-red-500/10 dark:shadow-gray-900/50 p-6 border border-red-200/30 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🧘</span>
          Coping Strategies
        </h3>
        <div className="space-y-4">
          {copingStrategies.map((strategy, index) => (
            <div key={index} className="bg-gradient-to-br from-white/70 via-amber-50/50 to-yellow-50/50 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm border-2 border-amber-200/50 dark:border-amber-800/50 rounded-xl p-4 hover:shadow-lg transition-all">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{strategy.title}</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {strategy.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Online Resources */}
      <div className="bg-gradient-to-br from-white/80 via-red-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-red-500/10 dark:shadow-gray-900/50 p-6 border border-red-200/30 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          Online Resources
        </h3>
        <div className="space-y-3">
          {onlineResources.length > 0 ? (
            onlineResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-800/50 rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div className="font-semibold text-gray-900 dark:text-white">{resource.name}</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</div>
              </a>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              No online resources available for your country.
            </div>
          )}
        </div>
      </div>

      {/* Safety Planning */}
      <div className="bg-gradient-to-br from-white/80 via-red-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-red-500/10 dark:shadow-gray-900/50 p-6 border border-red-200/30 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          Safety Planning
        </h3>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-medium">
            If you're experiencing thoughts of self-harm, creating a safety plan can help:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>
              <strong>Warning signs:</strong> Identify what triggers or warning signs you notice
            </li>
            <li>
              <strong>Internal coping strategies:</strong> Things you can do to distract yourself
            </li>
            <li>
              <strong>People and places:</strong> List people you can contact and safe places to go
            </li>
            <li>
              <strong>Professional help:</strong> Keep contact information for mental health professionals
            </li>
            <li>
              <strong>Make environment safe:</strong> Remove means of self-harm if possible
            </li>
          </ol>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <div className="font-semibold text-yellow-900 dark:text-yellow-200">Important Note</div>
        </div>
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          MindAlchemy is a support tool and not a replacement for professional mental health care.
          If you're experiencing a mental health crisis, please contact a mental health professional
          or emergency services immediately.
        </p>
      </div>
    </div>
  )
}

