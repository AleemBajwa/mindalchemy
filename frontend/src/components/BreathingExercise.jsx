import { useState, useEffect } from 'react'
import AnimatedBreathing from './AnimatedBreathing'

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState('inhale') // inhale, hold, exhale, pause
  const [count, setCount] = useState(0)
  const [settings, setSettings] = useState({
    inhale: 4,
    hold: 2,
    exhale: 6,
    pause: 2
  })
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const phases = [
      { name: 'inhale', duration: settings.inhale },
      { name: 'hold', duration: settings.hold },
      { name: 'exhale', duration: settings.exhale },
      { name: 'pause', duration: settings.pause }
    ]

    let currentPhaseIndex = 0
    let currentCount = 0

    const interval = setInterval(() => {
      const currentPhase = phases[currentPhaseIndex]
      setPhase(currentPhase.name)
      setCount(currentCount)

      currentCount++

      if (currentCount >= currentPhase.duration) {
        currentCount = 0
        currentPhaseIndex++

        if (currentPhaseIndex >= phases.length) {
          currentPhaseIndex = 0
          setCycle(prev => prev + 1)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, settings])


  const reset = () => {
    setIsActive(false)
    setPhase('inhale')
    setCount(0)
    setCycle(0)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Breathing Exercise</h2>
        <p className="text-gray-600">Follow the circle to guide your breathing</p>
      </div>

      {/* Animated Breathing Circle */}
      <AnimatedBreathing phase={phase} count={count} settings={settings} />

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-lg font-semibold text-white ${
              isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600">Cycles Completed</div>
          <div className="text-3xl font-bold text-primary">{cycle}</div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Breathing Pattern</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inhale: {settings.inhale} seconds
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={settings.inhale}
              onChange={(e) => setSettings({ ...settings, inhale: parseInt(e.target.value) })}
              disabled={isActive}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hold: {settings.hold} seconds
            </label>
            <input
              type="range"
              min="0"
              max="4"
              value={settings.hold}
              onChange={(e) => setSettings({ ...settings, hold: parseInt(e.target.value) })}
              disabled={isActive}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exhale: {settings.exhale} seconds
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={settings.exhale}
              onChange={(e) => setSettings({ ...settings, exhale: parseInt(e.target.value) })}
              disabled={isActive}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pause: {settings.pause} seconds
            </label>
            <input
              type="range"
              min="0"
              max="4"
              value={settings.pause}
              onChange={(e) => setSettings({ ...settings, pause: parseInt(e.target.value) })}
              disabled={isActive}
              className="w-full"
            />
          </div>
        </div>

        {/* Preset Patterns */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Preset Patterns</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSettings({ inhale: 4, hold: 2, exhale: 6, pause: 2 })}
              disabled={isActive}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Box Breathing (4-4-4-4)
            </button>
            <button
              onClick={() => setSettings({ inhale: 4, hold: 0, exhale: 6, pause: 0 })}
              disabled={isActive}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Calming (4-0-6-0)
            </button>
            <button
              onClick={() => setSettings({ inhale: 4, hold: 2, exhale: 4, pause: 2 })}
              disabled={isActive}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Balanced (4-2-4-2)
            </button>
            <button
              onClick={() => setSettings({ inhale: 5, hold: 0, exhale: 5, pause: 0 })}
              disabled={isActive}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Simple (5-0-5-0)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

