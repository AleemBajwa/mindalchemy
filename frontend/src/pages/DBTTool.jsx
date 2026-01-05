import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DBTAnimation from '../components/DBTAnimation'

export default function DBTTool() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const tools = {
    stop: {
      title: 'STOP Technique',
      description: 'A quick distress tolerance skill to pause and respond mindfully',
      icon: '🛑',
      steps: [
        {
          title: 'Stop',
          description: 'Just pause. Don\'t react. Don\'t move a muscle. Freeze in your tracks.',
          instruction: 'Take a moment to physically stop what you\'re doing. If you\'re moving, sit down. If you\'re talking, stop talking.',
          action: 'Take a deep breath and physically pause.'
        },
        {
          title: 'Take a Step Back',
          description: 'Step back from the situation. Take a break. Let go. Take a deep breath.',
          instruction: 'Create some distance between you and the situation. This can be physical or mental distance.',
          action: 'Take 3 deep breaths. Count to 10 slowly.'
        },
        {
          title: 'Observe',
          description: 'Notice what\'s going on inside and outside of you. What are you thinking? What are you feeling?',
          instruction: 'Observe your thoughts, feelings, and body sensations without judgment. Notice what\'s happening around you.',
          action: 'Write down or mentally note: What am I thinking? What am I feeling? What\'s happening around me?'
        },
        {
          title: 'Proceed Mindfully',
          description: 'Act with awareness. Consider your goals. Ask yourself: What do I want from this situation?',
          instruction: 'Think about what you want to achieve. Consider the consequences of different actions. Choose a response that aligns with your values.',
          action: 'Ask yourself: What do I want? What are my options? What\'s the wise choice?'
        }
      ]
    },
    tipp: {
      title: 'TIPP Technique',
      description: 'Temperature, Intense exercise, Paced breathing, Paired muscle relaxation',
      icon: '🌊',
      steps: [
        {
          title: 'Temperature',
          description: 'Change your body temperature to quickly reduce emotional intensity.',
          instruction: 'Splash cold water on your face, hold ice cubes, or take a cold shower. The cold temperature activates the dive reflex, which can help calm your nervous system.',
          action: 'Splash cold water on your face or hold ice cubes for 30 seconds.'
        },
        {
          title: 'Intense Exercise',
          description: 'Engage in intense physical activity to release built-up energy and tension.',
          instruction: 'Do jumping jacks, run in place, push-ups, or any intense exercise for 5-10 minutes. This helps release endorphins and reduces stress.',
          action: 'Do 20 jumping jacks or run in place for 2 minutes.'
        },
        {
          title: 'Paced Breathing',
          description: 'Slow down your breathing to activate the parasympathetic nervous system.',
          instruction: 'Breathe out longer than you breathe in. Try: Inhale for 4 counts, hold for 2, exhale for 6 counts. Repeat 5-10 times.',
          action: 'Practice paced breathing: Inhale (4), Hold (2), Exhale (6). Repeat 5 times.'
        },
        {
          title: 'Paired Muscle Relaxation',
          description: 'Tense and release muscle groups to reduce physical tension.',
          instruction: 'Tense a muscle group (e.g., hands, arms, shoulders) for 5 seconds, then release. Notice the difference. Move through different muscle groups.',
          action: 'Tense your hands for 5 seconds, then release. Notice the relaxation. Repeat with other muscle groups.'
        }
      ]
    },
    mindfulness: {
      title: 'Mindfulness Exercises',
      description: 'Present-moment awareness and acceptance practices',
      icon: '🧘',
      steps: [
        {
          title: 'Set Your Intention',
          description: 'Decide to be present and non-judgmental.',
          instruction: 'Set an intention to observe your experience without trying to change it. Accept whatever arises.',
          action: 'Take a moment to set your intention: "I will observe my experience with curiosity and acceptance."'
        },
        {
          title: 'Focus on Your Breath',
          description: 'Bring your attention to your breathing.',
          instruction: 'Notice the sensation of your breath entering and leaving your body. When your mind wanders, gently bring it back to your breath.',
          action: 'Spend 2 minutes focusing on your breath. Count 10 breaths.'
        },
        {
          title: 'Body Scan',
          description: 'Bring awareness to different parts of your body.',
          instruction: 'Slowly scan your body from head to toe, noticing any sensations, tension, or areas of comfort.',
          action: 'Scan your body: Start at your head, move to your shoulders, arms, chest, stomach, legs, and feet.'
        },
        {
          title: 'Observe Your Thoughts',
          description: 'Watch your thoughts come and go like clouds in the sky.',
          instruction: 'Notice your thoughts without getting caught up in them. Label them: "thinking" and let them pass.',
          action: 'Spend 2 minutes observing your thoughts. Label each one: "thinking" and let it go.'
        },
        {
          title: 'Return to the Present',
          description: 'Gently return your attention to the present moment.',
          instruction: 'Notice your surroundings. What do you see, hear, feel? Bring your full attention to the present moment.',
          action: 'Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste.'
        }
      ]
    },
    'distress-tolerance': {
      title: 'Distress Tolerance',
      description: 'Skills to tolerate and survive crisis situations',
      icon: '💪',
      steps: [
        {
          title: 'Accept Reality',
          description: 'Acknowledge what is happening without fighting it.',
          instruction: 'Accept that the situation is what it is right now. Fighting reality only increases suffering.',
          action: 'Say to yourself: "This is what is happening right now. I can accept this moment."'
        },
        {
          title: 'Use Distraction',
          description: 'Temporarily shift your attention away from the distress.',
          instruction: 'Engage in activities that occupy your mind: count, do puzzles, watch a show, call a friend.',
          action: 'Choose one distraction: Count backwards from 100, do a puzzle, or call someone.'
        },
        {
          title: 'Self-Soothe',
          description: 'Comfort yourself through your five senses.',
          instruction: 'Engage your senses in a comforting way: listen to music, light a candle, wrap in a blanket, drink tea.',
          action: 'Engage one sense: Listen to calming music, light a scented candle, or wrap in a soft blanket.'
        },
        {
          title: 'Improve the Moment',
          description: 'Make the moment more bearable.',
          instruction: 'Use imagery, meaning, prayer, relaxation, one thing in the moment, vacation, or encouragement.',
          action: 'Try one: Imagine a peaceful place, find meaning in the situation, or take a mental vacation.'
        },
        {
          title: 'Pros and Cons',
          description: 'Consider the pros and cons of acting on urges.',
          instruction: 'List the pros and cons of acting on your urge vs. not acting. Consider both short-term and long-term consequences.',
          action: 'Write down: Pros of acting on urge, Cons of acting, Pros of not acting, Cons of not acting.'
        },
        {
          title: 'Radical Acceptance',
          description: 'Fully accept reality as it is, without judgment.',
          instruction: 'Accept that you cannot change what has already happened. Let go of fighting reality.',
          action: 'Repeat: "I cannot change what has happened. I can only control how I respond now."'
        }
      ]
    },
    'emotion-regulation': {
      title: 'Emotion Regulation',
      description: 'Skills to understand and manage your emotions',
      icon: '💚',
      steps: [
        {
          title: 'Identify Your Emotion',
          description: 'Name the emotion you\'re feeling.',
          instruction: 'Be specific: Are you feeling angry, sad, anxious, or something else? Notice where you feel it in your body.',
          action: 'Name your emotion: "I am feeling [emotion]." Notice where you feel it in your body.'
        },
        {
          title: 'Understand the Function',
          description: 'Understand what your emotion is trying to tell you.',
          instruction: 'Emotions give us information. What is this emotion trying to communicate? What need is it signaling?',
          action: 'Ask: "What is this emotion telling me? What need am I trying to meet?"'
        },
        {
          title: 'Check the Facts',
          description: 'Examine whether your emotional response fits the facts.',
          instruction: 'Is your emotional intensity appropriate for the situation? Are you interpreting the situation accurately?',
          action: 'Ask: "What are the facts? Is my emotion intensity matching the situation?"'
        },
        {
          title: 'Opposite Action',
          description: 'Act opposite to your emotional urge when the emotion doesn\'t fit the facts.',
          instruction: 'If your emotion doesn\'t fit the facts, do the opposite of what the emotion urges you to do.',
          action: 'If anxious urges you to avoid, do the opposite: approach. If angry urges you to attack, do the opposite: be kind.'
        },
        {
          title: 'Problem Solve',
          description: 'If the emotion fits the facts, problem-solve to change the situation.',
          instruction: 'If your emotion is justified, take action to change the situation. Identify the problem, brainstorm solutions, choose one, and act.',
          action: 'Identify the problem, brainstorm 3 solutions, choose the best one, and take action.'
        }
      ]
    },
    interpersonal: {
      title: 'Interpersonal Effectiveness',
      description: 'Skills for healthy relationships and communication',
      icon: '🤝',
      steps: [
        {
          title: 'DEAR MAN',
          description: 'Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate.',
          instruction: 'Use DEAR MAN to ask for what you want: Describe the situation, Express your feelings, Assert your request, Reinforce why it matters, stay Mindful, Appear confident, and Negotiate if needed.',
          action: 'Practice: Describe what you want, express why it matters, assert your request clearly.'
        },
        {
          title: 'GIVE',
          description: 'Gentle, Interested, Validate, Easy manner.',
          instruction: 'Use GIVE to maintain relationships: Be Gentle, act Interested, Validate the other person, and use an Easy manner.',
          action: 'Practice: Be gentle in your approach, show interest, validate their perspective, keep it light.'
        },
        {
          title: 'FAST',
          description: 'Fair, Apologies, Stick to values, Truthful.',
          instruction: 'Use FAST to maintain self-respect: Be Fair, don\'t over-apologize, Stick to your values, and be Truthful.',
          action: 'Practice: Be fair to yourself, don\'t apologize unnecessarily, stick to your values, be honest.'
        },
        {
          title: 'Practice',
          description: 'Practice these skills in low-stakes situations first.',
          instruction: 'Start with easier situations to build confidence. Role-play with a friend or therapist. Practice makes these skills more natural.',
          action: 'Choose one skill to practice this week. Start with a low-stakes situation.'
        }
      ]
    }
  }

  const tool = tools[toolId]
  const totalSteps = tool?.steps.length || 0

  if (!tool) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h2>
          <button
            onClick={() => navigate('/dbt')}
            className="text-primary hover:underline"
          >
            Return to DBT Tools
          </button>
        </div>
      </div>
    )
  }

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(new Set([...completedSteps, stepIndex]))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = tool.steps[currentStep - 1]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dbt')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">{tool.icon}</span>
            {tool.title}
          </h2>
          <p className="text-gray-600 mt-1">{tool.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between mb-2">
          {tool.steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full mx-1 ${
                index + 1 < currentStep
                  ? 'bg-green-500'
                  : index + 1 === currentStep
                  ? 'bg-primary'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Animated Demonstration */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm p-6 mb-6">
        <DBTAnimation toolId={toolId} stepIndex={currentStep - 1} />
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-gray-700 mb-4">
            {currentStepData.description}
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-indigo-900 mb-2">Instructions:</h4>
          <p className="text-sm text-indigo-800 mb-3">
            {currentStepData.instruction}
          </p>
          <div className="bg-white rounded p-3 mt-3">
            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Try This:</h5>
            <p className="text-sm text-gray-700">
              {currentStepData.action}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          <button
            onClick={() => handleStepComplete(currentStep - 1)}
            className={`px-4 py-2 rounded-lg ${
              completedSteps.has(currentStep - 1)
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {completedSteps.has(currentStep - 1) ? '✓ Completed' : 'Mark Complete'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* All Steps Overview */}
      <details className="bg-gray-50 rounded-xl p-4">
        <summary className="font-semibold text-gray-700 cursor-pointer">
          View All Steps
        </summary>
        <div className="mt-4 space-y-3">
          {tool.steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-4 border-2 ${
                index + 1 === currentStep
                  ? 'border-primary'
                  : completedSteps.has(index)
                  ? 'border-green-500'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index + 1 === currentStep
                    ? 'bg-primary text-white'
                    : completedSteps.has(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedSteps.has(index) ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

