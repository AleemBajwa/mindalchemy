import { useEffect, useState } from 'react'

export default function DBTAnimation({ toolId, stepIndex }) {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [stepIndex])

  // STOP Technique Animations
  if (toolId === 'stop') {
    const stopAnimations = [
      // Step 0: Stop
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-32 h-32 border-8 border-red-500 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-4xl">🛑</span>
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-100 rounded-full animate-bounce" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-100 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Freeze in your tracks</p>
      </div>,
      // Step 1: Take a Step Back
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative w-full max-w-md">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
              😌
            </div>
            <div className="text-4xl animate-pulse">←</div>
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white text-2xl">
              😰
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Create distance</p>
      </div>,
      // Step 2: Observe
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-40 h-40 border-4 border-indigo-300 rounded-full animate-spin-slow flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-indigo-400 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-5xl">👁️</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-8 h-8 bg-yellow-300 rounded-full animate-ping" />
          <div className="absolute top-0 right-0 w-6 h-6 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-0 left-0 w-7 h-7 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Notice without judgment</p>
      </div>,
      // Step 3: Proceed Mindfully
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-green-500 rounded-full animate-bounce flex items-center justify-center text-white">
              ✓
            </div>
            <div className="w-16 h-16 bg-green-400 rounded-full animate-pulse flex items-center justify-center text-white text-2xl">
              🧠
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full animate-bounce flex items-center justify-center text-white" style={{ animationDelay: '0.2s' }}>
              ✓
            </div>
          </div>
          <div className="mt-8 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full animate-progress" />
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Act with awareness</p>
      </div>
    ]
    return stopAnimations[stepIndex] || stopAnimations[0]
  }

  // TIPP Technique Animations
  if (toolId === 'tipp') {
    const tippAnimations = [
      // Step 0: Temperature
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-5xl animate-pulse">
            ❄️
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-300 rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Splash cold water or hold ice</p>
      </div>,
      // Step 1: Intense Exercise
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white text-5xl animate-bounce">
            💪
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Jump, run, or do push-ups</p>
      </div>,
      // Step 2: Paced Breathing
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-40 h-40 border-4 border-green-400 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-28 h-28 border-4 border-green-500 rounded-full animate-pulse flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <span className="text-4xl">🌬️</span>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="text-2xl animate-pulse">4</div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
            <div className="text-2xl animate-pulse">6</div>
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Inhale 4, Exhale 6</p>
      </div>,
      // Step 3: Paired Muscle Relaxation
      <div key={animationKey} className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
              ✊
            </div>
            <div className="text-3xl animate-pulse">→</div>
            <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center text-white text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
              ✋
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-600">Tense → Release</div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">Tense and release muscles</p>
      </div>
    ]
    return tippAnimations[stepIndex] || tippAnimations[0]
  }

  // Default animation
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-32 h-32 bg-indigo-500 rounded-full animate-pulse flex items-center justify-center text-white text-5xl">
        🧘
      </div>
    </div>
  )
}

