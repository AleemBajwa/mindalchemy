import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MeditationAnimation from '../components/MeditationAnimation'

export default function MeditationSession() {
  const { category, duration } = useParams()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(duration ? parseInt(duration) * 60 : 300) // Convert to seconds
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completed, setCompleted] = useState(false)

  const categories = {
    mindfulness: {
      title: 'Mindfulness Meditation',
      description: 'Focus on the present moment with awareness and acceptance',
      instructions: [
        'Find a comfortable seated position',
        'Close your eyes or soften your gaze',
        'Bring your attention to your breath',
        'When your mind wanders, gently return to your breath',
        'Observe thoughts and feelings without judgment'
      ]
    },
    sleep: {
      title: 'Sleep Meditation',
      description: 'Relax your body and mind for restful sleep',
      instructions: [
        'Lie down in a comfortable position',
        'Close your eyes and take deep breaths',
        'Progressively relax each part of your body',
        'Let go of the day\'s thoughts and worries',
        'Allow yourself to drift into peaceful sleep'
      ]
    },
    anxiety: {
      title: 'Anxiety Relief Meditation',
      description: 'Calm anxiety and find inner peace',
      instructions: [
        'Sit comfortably with your feet on the ground',
        'Take slow, deep breaths',
        'Acknowledge your anxiety without fighting it',
        'Visualize tension leaving your body with each exhale',
        'Focus on the present moment, not future worries'
      ]
    },
    'body-scan': {
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation through body awareness',
      instructions: [
        'Lie down comfortably',
        'Start by bringing awareness to your toes',
        'Slowly move your attention up through your body',
        'Notice any tension and allow it to release',
        'End by bringing awareness to your whole body'
      ]
    }
  }

  const currentCategory = categories[category] || categories.mindfulness
  const totalTime = duration ? parseInt(duration) * 60 : 300

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
    setTimeLeft(duration ? parseInt(duration) * 60 : 300)
    setCompleted(false)
  }

  const handleComplete = () => {
    navigate('/meditation')
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Meditation Complete!</h2>
          <p className="text-gray-600 mb-6">
            Great job completing your {duration}-minute meditation session.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Start Again
            </button>
            <button
              onClick={handleComplete}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.title}</h2>
        <p className="text-gray-600">{currentCategory.description}</p>
      </div>

      {/* Animated Background */}
      {isActive && !isPaused && (
        <MeditationAnimation category={category} timeLeft={timeLeft} totalTime={totalTime} />
      )}

      {/* Timer Display */}
      <div className={`${isActive && !isPaused ? 'bg-white/90 backdrop-blur-sm' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} rounded-2xl p-12 text-center ${isActive && !isPaused ? 'text-gray-900' : 'text-white'} shadow-lg`}>
        <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
        <div className="text-lg opacity-90">
          {isActive ? (isPaused ? 'Paused' : 'In Session') : 'Ready to Begin'}
        </div>
      </div>

      {/* Instructions */}
      {!isActive && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Instructions</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            {currentCategory.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-semibold">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
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
              Start Meditation
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

      {/* Guided Prompts (shown during active session) */}
      {isActive && !isPaused && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h4 className="font-semibold text-indigo-900 mb-2">Guided Prompt</h4>
          <p className="text-sm text-indigo-800">
            {timeLeft > timeLeft * 0.8
              ? 'Take a deep breath and settle into this moment. Allow your body to relax.'
              : timeLeft > timeLeft * 0.5
              ? 'Notice any thoughts or feelings that arise. Observe them without judgment, then gently return to your breath.'
              : timeLeft > timeLeft * 0.2
              ? 'Feel the calm and peace within you. This is your natural state.'
              : 'Slowly bring your awareness back. Wiggle your fingers and toes. When ready, open your eyes.'}
          </p>
        </div>
      )}
    </div>
  )
}

