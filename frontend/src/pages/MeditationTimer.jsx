import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MeditationTimer() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [selectedMinutes, setSelectedMinutes] = useState(10)

  useEffect(() => {
    let interval = null
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false)
            setCompleted(true)
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeLeft(selectedMinutes * 60)
    setCompleted(false)
  }

  const handleSetTime = (minutes) => {
    setSelectedMinutes(minutes)
    if (!isActive) {
      setTimeLeft(minutes * 60)
    }
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Time's Up!</h2>
          <p className="text-gray-600 mb-6">
            Your meditation session is complete. Great job!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Start Again
            </button>
            <button
              onClick={() => navigate('/meditation')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
            >
              Return to Library
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Meditation Timer</h2>
        <p className="text-gray-600">Set your own meditation duration</p>
      </div>

      {/* Timer Display */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-12 text-center text-white">
        <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
        <div className="text-lg opacity-90">
          {isActive ? (isPaused ? 'Paused' : 'In Session') : 'Ready'}
        </div>
      </div>

      {/* Quick Time Selector */}
      {!isActive && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Select</h3>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => handleSetTime(minutes)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedMinutes === minutes
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {minutes}m
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Time Input */}
      {!isActive && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Custom Duration</h3>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Minutes:</label>
            <input
              type="number"
              min="1"
              max="120"
              value={selectedMinutes}
              onChange={(e) => handleSetTime(parseInt(e.target.value) || 1)}
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
            >
              Start Timer
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

