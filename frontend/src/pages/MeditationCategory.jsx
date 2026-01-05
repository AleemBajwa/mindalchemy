import { useParams, useNavigate } from 'react-router-dom'

export default function MeditationCategory() {
  const { category } = useParams()
  const navigate = useNavigate()

  const categoryInfo = {
    mindfulness: {
      title: 'Mindfulness Meditation',
      description: 'Focus on the present moment with awareness and acceptance',
      durations: [5, 10, 15, 20]
    },
    sleep: {
      title: 'Sleep Meditation',
      description: 'Relax your body and mind for restful sleep',
      durations: [10, 15, 20, 30]
    },
    anxiety: {
      title: 'Anxiety Relief Meditation',
      description: 'Calm anxiety and find inner peace',
      durations: [5, 10, 15]
    },
    'body-scan': {
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation through body awareness',
      durations: [10, 15, 20]
    }
  }

  const info = categoryInfo[category]

  if (!info) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
        <button
          onClick={() => navigate('/meditation')}
          className="text-primary hover:underline"
        >
          Return to Meditation Library
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h2>
        <p className="text-gray-600">{info.description}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
        <div className="grid grid-cols-2 gap-4">
          {info.durations.map((duration) => (
            <button
              key={duration}
              onClick={() => navigate(`/meditation/${category}/${duration}`)}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-3xl font-bold mb-2">{duration} min</div>
              <div className="text-sm opacity-90">Click to start</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('/meditation')}
        className="w-full px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        ← Back to Meditation Library
      </button>
    </div>
  )
}

