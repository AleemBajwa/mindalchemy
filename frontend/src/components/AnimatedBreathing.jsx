import { useState, useEffect } from 'react'

export default function AnimatedBreathing({ phase, count, settings }) {
  const getCircleSize = () => {
    switch (phase) {
      case 'inhale':
        return { width: '256px', height: '256px', opacity: 1 }
      case 'hold':
        return { width: '256px', height: '256px', opacity: 1 }
      case 'exhale':
        return { width: '128px', height: '128px', opacity: 0.8 }
      case 'pause':
        return { width: '128px', height: '128px', opacity: 0.6 }
      default:
        return { width: '192px', height: '192px', opacity: 0.9 }
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600'
      case 'hold':
        return 'from-yellow-400 to-yellow-600'
      case 'exhale':
        return 'from-green-400 to-green-600'
      case 'pause':
        return 'from-gray-300 to-gray-500'
      default:
        return 'from-indigo-400 to-indigo-600'
    }
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      case 'pause':
        return 'Pause'
      default:
        return 'Ready'
    }
  }

  const size = getCircleSize()
  const color = getPhaseColor()

  return (
    <div className="relative flex items-center justify-center min-h-[400px]">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const particleColor = phase === 'inhale' ? 'bg-blue-200' : phase === 'exhale' ? 'bg-green-200' : 'bg-gray-200'
          return (
            <div
              key={i}
              className={`absolute rounded-full ${particleColor} opacity-20 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          )
        })}
      </div>

      {/* Main breathing circle */}
      <div
        className={`relative bg-gradient-to-br ${color} rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center shadow-2xl`}
        style={{
          width: size.width,
          height: size.height,
          opacity: size.opacity
        }}
      >
        {/* Inner glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl opacity-50 animate-pulse`} />
        
        {/* Countdown number */}
        <div className="relative z-10 text-white text-center">
          <div className="text-6xl font-bold mb-2">
            {settings[phase] - count}
          </div>
          <div className="text-xl font-medium">
            {getPhaseText()}
          </div>
        </div>

        {/* Breathing rings */}
        {phase === 'inhale' && (
          <>
            <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-20" />
            <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        {phase === 'exhale' && (
          <div className="absolute inset-0 border-4 border-white rounded-full animate-pulse opacity-30" />
        )}
      </div>

      {/* Instruction text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
          <p className="text-sm text-gray-700 font-medium">
            {phase === 'inhale' && 'Slowly breathe in through your nose...'}
            {phase === 'hold' && 'Hold your breath gently...'}
            {phase === 'exhale' && 'Slowly breathe out through your mouth...'}
            {phase === 'pause' && 'Take a moment to rest...'}
          </p>
        </div>
      </div>
    </div>
  )
}

