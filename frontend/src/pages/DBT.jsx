import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DBT() {
  const navigate = useNavigate()

  const dbtTools = [
    {
      id: 'stop',
      title: 'STOP Technique',
      description: 'A quick distress tolerance skill to pause and respond mindfully',
      icon: '🛑',
      color: 'bg-red-50 border-red-200',
      steps: 4
    },
    {
      id: 'tipp',
      title: 'TIPP Technique',
      description: 'Temperature, Intense exercise, Paced breathing, Paired muscle relaxation',
      icon: '🌊',
      color: 'bg-blue-50 border-blue-200',
      steps: 4
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Exercises',
      description: 'Present-moment awareness and acceptance practices',
      icon: '🧘',
      color: 'bg-green-50 border-green-200',
      steps: 5
    },
    {
      id: 'distress-tolerance',
      title: 'Distress Tolerance',
      description: 'Skills to tolerate and survive crisis situations',
      icon: '💪',
      color: 'bg-purple-50 border-purple-200',
      steps: 6
    },
    {
      id: 'emotion-regulation',
      title: 'Emotion Regulation',
      description: 'Skills to understand and manage your emotions',
      icon: '💚',
      color: 'bg-indigo-50 border-indigo-200',
      steps: 5
    },
    {
      id: 'interpersonal',
      title: 'Interpersonal Effectiveness',
      description: 'Skills for healthy relationships and communication',
      icon: '🤝',
      color: 'bg-yellow-50 border-yellow-200',
      steps: 4
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">DBT Skills</h2>
        <p className="text-gray-600 mt-1">
          Dialectical Behavior Therapy tools for emotional regulation and distress tolerance
        </p>
      </div>

      {/* DBT Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          What is DBT?
        </h3>
        <p className="text-sm text-indigo-800">
          Dialectical Behavior Therapy (DBT) is a type of cognitive-behavioral therapy that focuses on
          teaching skills in four key areas: mindfulness, distress tolerance, emotion regulation, and
          interpersonal effectiveness. These skills help you manage difficult emotions and improve relationships.
        </p>
      </div>

      {/* DBT Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dbtTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => navigate(`/dbt/${tool.id}`)}
            className={`${tool.color} rounded-xl border-2 p-6 text-left hover:shadow-md transition-all`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{tool.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {tool.description}
                </p>
                <div className="text-xs text-gray-500">
                  {tool.steps} steps
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-white/80 via-cyan-50/50 to-blue-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-cyan-500/10 dark:shadow-gray-900/50 p-6 border border-cyan-200/30 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Practice these skills regularly, not just during crises</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Start with STOP or TIPP when you're feeling overwhelmed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Mindfulness can be practiced anywhere, anytime</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Keep a journal of which skills work best for you</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

