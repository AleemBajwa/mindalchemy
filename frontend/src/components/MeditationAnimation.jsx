import { useEffect, useState } from 'react'

export default function MeditationAnimation({ category, timeLeft, totalTime }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 10,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  if (category === 'sleep') {
    return (
      <div className="relative w-full h-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden">
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        {/* Moon */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-200 rounded-full shadow-2xl">
          <div className="absolute top-2 left-2 w-16 h-16 bg-indigo-900 rounded-full" />
        </div>
        {/* Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="rgba(99, 102, 241, 0.3)"
              className="animate-wave"
              style={{ transformOrigin: 'center' }}
            />
            <path
              d="M0,80 Q300,60 600,80 T1200,80 L1200,120 L0,120 Z"
              fill="rgba(139, 92, 246, 0.2)"
              className="animate-wave"
              style={{ animationDelay: '0.5s', transformOrigin: 'center' }}
            />
          </svg>
        </div>
      </div>
    )
  }

  if (category === 'anxiety') {
    return (
      <div className="relative w-full h-64 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl overflow-hidden">
        {/* Floating orbs */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/30 rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
        {/* Central calming circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse shadow-2xl">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">💚</span>
            </div>
          </div>
          <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-20" />
        </div>
      </div>
    )
  }

  if (category === 'body-scan') {
    return (
      <div className="relative w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden">
        {/* Body outline with scanning effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Body silhouette */}
            <div className="text-8xl opacity-20">🧘</div>
            {/* Scanning light */}
            <div
              className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-400 to-transparent opacity-60"
              style={{
                left: `${progress}%`,
                transition: 'left 1s linear'
              }}
            />
          </div>
        </div>
        {/* Progress indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Default mindfulness animation
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      {/* Breathing circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-4 border-indigo-400 rounded-full animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🧘</span>
          </div>
        </div>
        <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-ping opacity-30" />
      </div>
    </div>
  )
}

