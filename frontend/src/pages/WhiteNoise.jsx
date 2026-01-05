import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react'

const SOUNDS = [
  { id: 'white', name: 'White Noise', color: 'from-gray-400 to-gray-600' },
  { id: 'pink', name: 'Pink Noise', color: 'from-pink-400 to-rose-600' },
  { id: 'brown', name: 'Brown Noise', color: 'from-amber-400 to-orange-600' },
  { id: 'rain', name: 'Rain', color: 'from-blue-400 to-cyan-600' },
  { id: 'ocean', name: 'Ocean Waves', color: 'from-teal-400 to-emerald-600' },
  { id: 'forest', name: 'Forest', color: 'from-green-400 to-teal-600' },
  { id: 'fire', name: 'Fireplace', color: 'from-red-400 to-orange-600' },
  { id: 'fan', name: 'Fan', color: 'from-indigo-400 to-purple-600' }
]

export default function WhiteNoise() {
  const [selectedSound, setSelectedSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioContext, setAudioContext] = useState(null)
  const [gainNode, setGainNode] = useState(null)
  const [oscillator, setOscillator] = useState(null)
  const audioContextRef = useRef(null)

  useEffect(() => {
    // Initialize AudioContext
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContextClass()
      setAudioContext(audioContextRef.current)
    }

    return () => {
      if (oscillator) {
        oscillator.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const generateWhiteNoise = (type = 'white') => {
    if (!audioContext) return null

    const bufferSize = 4096
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      if (type === 'white') {
        data[i] = Math.random() * 2 - 1
      } else if (type === 'pink') {
        // Simplified pink noise
        data[i] = (Math.random() * 2 - 1) * 0.5
      } else if (type === 'brown') {
        // Simplified brown noise
        data[i] = (Math.random() * 2 - 1) * 0.3
      } else {
        data[i] = Math.random() * 2 - 1
      }
    }

    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const gain = audioContext.createGain()
    gain.gain.value = volume

    source.connect(gain)
    gain.connect(audioContext.destination)

    return { source, gain }
  }

  const handlePlay = () => {
    if (isPlaying) {
      // Stop
      if (oscillator) {
        oscillator.stop()
        setOscillator(null)
      }
      setIsPlaying(false)
    } else {
      // Play
      if (!selectedSound) {
        alert('Please select a sound first')
        return
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }

      const sound = generateWhiteNoise(selectedSound)
      if (sound) {
        sound.source.start()
        setOscillator(sound.source)
        setGainNode(sound.gain)
        setIsPlaying(true)
      }
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (gainNode) {
      gainNode.gain.value = newVolume
    }
  }

  const handleReset = () => {
    if (oscillator) {
      oscillator.stop()
      setOscillator(null)
    }
    setIsPlaying(false)
    setSelectedSound(null)
    setVolume(0.5)
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">White Noise Generator</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Relaxing sounds for focus and sleep</p>
        </div>
      </div>

      {/* Sound Selection */}
      <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Select a Sound</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SOUNDS.map((sound) => (
            <button
              key={sound.id}
              onClick={() => {
                if (isPlaying) {
                  handlePlay() // Stop current
                }
                setSelectedSound(sound.id)
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedSound === sound.id
                  ? `border-indigo-500 bg-gradient-to-br ${sound.color} text-white shadow-lg`
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="font-semibold">{sound.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      {selectedSound && (
        <div className="bg-gradient-to-br from-white/90 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/90 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">
            {SOUNDS.find(s => s.id === selectedSound)?.name}
          </h3>
          
          <div className="space-y-6">
            {/* Play/Pause Button */}
            <div className="flex justify-center">
              <button
                onClick={handlePlay}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isPlaying
                    ? 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" strokeWidth={2.5} />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Volume: {Math.round(volume * 100)}%
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Tip:</strong> White noise can help with focus, relaxation, and sleep. Adjust the volume to a comfortable level and use headphones for the best experience.
        </p>
      </div>
    </div>
  )
}


