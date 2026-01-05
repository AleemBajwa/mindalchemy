import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import { 
  Sparkles, Heart, Brain, BarChart, AlertTriangle, 
  Smile, Frown, Users, Target, MessageCircle, 
  HandHelping, Zap, Globe, User, Calendar, 
  CheckCircle2, ArrowRight, ArrowLeft, Circle, Shield, FileText
} from 'lucide-react'

export default function Onboarding() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  
  // If user already has demographics but missing country, start at demographics step
  const hasExistingData = user && (user.country || user.age || user.gender)
  const initialStep = hasExistingData && !user.country ? 4 : 1
  
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    goals: [],
    concerns: [],
    currentMood: '',
    communicationStyle: '',
    // Demographics - pre-fill if user has them
    country: user?.country || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || '',
    acceptedTerms: false
  })
  const [errors, setErrors] = useState({})

  const totalSteps = 6

  const goals = [
    { id: 'feel_better', label: 'Feel Better', icon: Heart, color: 'from-emerald-400 to-teal-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'learn_skills', label: 'Learn Coping Skills', icon: Brain, color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'track_progress', label: 'Track My Progress', icon: BarChart, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'manage_anxiety', label: 'Manage Anxiety', icon: AlertTriangle, color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 'improve_mood', label: 'Improve My Mood', icon: Smile, color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
    { id: 'reduce_stress', label: 'Reduce Stress', icon: Zap, color: 'from-violet-400 to-purple-500', bgColor: 'bg-violet-50 dark:bg-violet-900/20' }
  ]

  const concerns = [
    { id: 'anxiety', label: 'Anxiety', icon: AlertTriangle, color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 'depression', label: 'Depression', icon: Frown, color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'stress', label: 'Stress', icon: Zap, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { id: 'relationships', label: 'Relationships', icon: Users, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'self_esteem', label: 'Self-Esteem', icon: Heart, color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
    { id: 'sleep', label: 'Sleep Issues', icon: Calendar, color: 'from-violet-400 to-purple-500', bgColor: 'bg-violet-50 dark:bg-violet-900/20' }
  ]

  const moods = [
    { value: 'great', label: 'Great', icon: Smile, color: 'from-emerald-400 to-green-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { value: 'good', label: 'Good', icon: Heart, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { value: 'okay', label: 'Okay', icon: Circle, color: 'from-amber-400 to-yellow-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { value: 'not_great', label: 'Not Great', icon: Frown, color: 'from-orange-400 to-amber-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { value: 'struggling', label: 'Struggling', icon: AlertTriangle, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' }
  ]

  const communicationStyles = [
    { value: 'supportive', label: 'Supportive & Encouraging', icon: Heart, color: 'from-emerald-400 to-teal-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { value: 'direct', label: 'Direct & Practical', icon: Target, color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { value: 'gentle', label: 'Gentle & Understanding', icon: HandHelping, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { value: 'motivational', label: 'Motivational & Energetic', icon: Zap, color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' }
  ]

  const countries = [
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  ]

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ]

  const handleToggle = (array, item) => {
    setFormData(prev => ({
      ...prev,
      [array]: prev[array].includes(item)
        ? prev[array].filter(i => i !== item)
        : [...prev[array], item]
    }))
    // Clear error when user makes a selection
    if (errors[array]) {
      setErrors(prev => ({ ...prev, [array]: null }))
    }
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (step === 2) {
      if (formData.goals.length === 0) {
        newErrors.goals = 'Please select at least one goal'
      }
    }
    
    if (step === 3) {
      if (formData.concerns.length === 0) {
        newErrors.concerns = 'Please select at least one concern'
      }
    }
    
    if (step === 4) {
      if (!formData.country) {
        newErrors.country = 'Country is required'
      }
      if (!formData.age) {
        newErrors.age = 'Age is required'
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required'
      }
    }
    
    if (step === 5) {
      if (!formData.currentMood) {
        newErrors.currentMood = 'Please select your current mood'
      }
      if (!formData.communicationStyle) {
        newErrors.communicationStyle = 'Please select a communication style'
      }
    }
    if (step === 6) {
      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = 'You must accept the Privacy Policy and Terms of Service to continue'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) {
      return
    }
    
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      // Clear errors when going back
      setErrors({})
    }
  }

  const handleComplete = async () => {
    try {
      // Update user profile with demographics first - CRITICAL for country
      if (formData.country || formData.age || formData.gender) {
        try {
          const updateData = {
            country: formData.country || null,
            age: formData.age ? parseInt(formData.age) : null,
            gender: formData.gender || null
          }
          
          console.log('Updating user demographics:', updateData)
          const response = await api.put('/auth/me', updateData)
          
          console.log('User update response:', response.data)
          
          // Verify country was saved
          if (formData.country && response.data.country !== formData.country) {
            console.warn('Country mismatch! Expected:', formData.country, 'Got:', response.data.country)
          }
          
          // Update user in store immediately with response data
          const { useAuthStore } = await import('../store/authStore')
          const currentUser = useAuthStore.getState().user
          if (currentUser) {
            useAuthStore.setState({
              user: {
                ...currentUser,
                country: response.data.country || formData.country || currentUser.country,
                age: response.data.age || (formData.age ? parseInt(formData.age) : currentUser.age),
                gender: response.data.gender || formData.gender || currentUser.gender
              }
            })
          }
          
          // Also refresh from server to be sure
          await useAuthStore.getState().checkAuth()
          
          // Double-check after refresh
          const refreshedUser = useAuthStore.getState().user
          if (formData.country && refreshedUser?.country !== formData.country) {
            console.error('Country still not saved after refresh! Expected:', formData.country, 'Got:', refreshedUser?.country)
            // Don't throw - let user continue, but log the error
          }
        } catch (error) {
          console.error('Failed to update user demographics:', error)
          // If country is required and update failed, show error
          if (formData.country) {
            alert('Failed to save your country. Please try again or contact support.')
            return // Don't continue if country save failed
          }
        }
      } else if (!formData.country) {
        // Country is required but not provided
        alert('Please select your country to continue.')
        return
      }
      
      // Store onboarding completion
      localStorage.setItem('onboarding_completed', 'true')
      localStorage.setItem('onboarding_data', JSON.stringify(formData))
      
      // Set flag to prevent immediate redirect
      sessionStorage.setItem('onboarding_just_completed', 'true')
      
      // Small delay to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Navigate to dashboard
      navigate('/')
    } catch (error) {
      console.error('Error completing onboarding:', error)
      // Still navigate even if there's an error
      localStorage.setItem('onboarding_completed', 'true')
      sessionStorage.setItem('onboarding_just_completed', 'true')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-rose-50/30 via-purple-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white/95 via-rose-50/70 to-amber-50/70 dark:from-gray-800/95 dark:via-gray-800/70 dark:to-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-500/10 dark:shadow-gray-900/25 max-w-3xl w-full p-8 md:p-10 border border-rose-200/30 dark:border-gray-700">
        {/* Premium Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Step {step} of {totalSteps}</span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-indigo-500/50"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNum = index + 1
              const isCompleted = stepNum < step
              const isCurrent = stepNum === step
              return (
                <div key={stepNum} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50' 
                      : isCurrent
                      ? 'bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg shadow-indigo-500/50 ring-4 ring-indigo-200 dark:ring-indigo-900/50'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                    ) : (
                      <span className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {stepNum}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                <Sparkles className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Welcome to MindAlchemy{user?.full_name ? `, ${user.full_name}` : ''}!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We're here to help you transform your mind and discover your inner strength.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/30 dark:border-indigo-800/30 shadow-lg">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 text-lg flex items-center gap-2">
                <Brain className="w-5 h-5" />
                What you can do here:
              </h3>
              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  { icon: MessageCircle, text: 'Chat with your AI therapist' },
                  { icon: Smile, text: 'Track your mood and emotions' },
                  { icon: BarChart, text: 'Journal your thoughts' },
                  { icon: Brain, text: 'Use CBT and DBT tools' },
                  { icon: Heart, text: 'Practice meditation' },
                  { icon: Target, text: 'Set and track goals' }
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm text-indigo-800 dark:text-indigo-200">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-md">
                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-4 shadow-lg shadow-emerald-500/50">
                <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What brings you here?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select at least one goal to personalize your experience
              </p>
              {errors.goals && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.goals}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                const isSelected = formData.goals.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => handleToggle('goals', goal.id)}
                    className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? `border-indigo-500 ${goal.bgColor} shadow-lg shadow-indigo-500/30`
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
                      isSelected ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{goal.label}</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Concerns */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 mb-4 shadow-lg shadow-indigo-500/50">
                <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What are you dealing with?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select at least one concern to help us personalize your experience
              </p>
              {errors.concerns && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.concerns}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {concerns.map((concern) => {
                const Icon = concern.icon
                const isSelected = formData.concerns.includes(concern.id)
                return (
                  <button
                    key={concern.id}
                    onClick={() => handleToggle('concerns', concern.id)}
                    className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? `border-indigo-500 ${concern.bgColor} shadow-lg shadow-indigo-500/30`
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${concern.color} flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
                      isSelected ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{concern.label}</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 4: Demographics */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 mb-4 shadow-lg shadow-blue-500/50">
                <Globe className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {hasExistingData && !user?.country ? 'Complete Your Profile' : 'Tell us about yourself'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {hasExistingData && !user?.country 
                  ? 'Please provide your information to access localized crisis resources and support.'
                  : 'This helps us provide country-specific resources and personalize your experience'}
              </p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => {
                    setFormData({ ...formData, country: e.target.value })
                    if (errors.country) setErrors(prev => ({ ...prev, country: null }))
                  }}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium ${
                    errors.country ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.country}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={(e) => {
                    setFormData({ ...formData, age: e.target.value })
                    if (errors.age) setErrors(prev => ({ ...prev, age: null }))
                  }}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium ${
                    errors.age ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  placeholder="Enter your age"
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value })
                    if (errors.gender) setErrors(prev => ({ ...prev, gender: null }))
                  }}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium ${
                    errors.gender ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  required
                >
                  <option value="">Select your gender</option>
                  {genders.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Mood & Communication */}
        {step === 5 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 mb-4 shadow-lg shadow-pink-500/50">
                <Smile className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                How are you feeling today?
              </h2>
              {errors.currentMood && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.currentMood}
                </p>
              )}
            </div>
            <div className="grid grid-cols-5 gap-3 mb-8">
              {moods.map((mood) => {
                const Icon = mood.icon
                const isSelected = formData.currentMood === mood.value
                return (
                  <button
                    key={mood.value}
                    onClick={() => {
                      setFormData({ ...formData, currentMood: mood.value })
                      if (errors.currentMood) setErrors(prev => ({ ...prev, currentMood: null }))
                    }}
                    className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-110 ${
                      isSelected
                        ? `border-indigo-500 ${mood.bgColor} shadow-lg shadow-indigo-500/30`
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mood.color} flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                      isSelected ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">{mood.label}</div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                How would you like your AI therapist to communicate?
              </h3>
              {errors.communicationStyle && (
                <p className="text-red-500 text-sm mb-4 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.communicationStyle}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {communicationStyles.map((style) => {
                  const Icon = style.icon
                  const isSelected = formData.communicationStyle === style.value
                  return (
                    <button
                      key={style.value}
                      onClick={() => {
                        setFormData({ ...formData, communicationStyle: style.value })
                        if (errors.communicationStyle) setErrors(prev => ({ ...prev, communicationStyle: null }))
                      }}
                      className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        isSelected
                          ? `border-indigo-500 ${style.bgColor} shadow-lg shadow-indigo-500/30`
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
                        isSelected ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white text-center">{style.label}</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Privacy Policy & Terms */}
        {step === 6 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 mb-4 shadow-lg shadow-indigo-500/50">
                <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Privacy & Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please review and accept our terms to continue
              </p>
              {errors.acceptedTerms && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.acceptedTerms}
                </p>
              )}
            </div>

            <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-indigo-200/30 dark:border-indigo-800/30 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Privacy Policy
                  </h3>
                  <p className="mb-3">
                    At MindAlchemy, we are committed to protecting your privacy. Your mental health data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>All conversations are confidential and encrypted</li>
                    <li>Your data is stored securely and never sold</li>
                    <li>You can export or delete your data at any time</li>
                    <li>We use your location only for crisis situations</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-indigo-200/30 dark:border-indigo-800/30">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Terms of Service
                  </h3>
                  <p className="mb-3">
                    By using MindAlchemy, you agree to the following terms:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>MindAlchemy is a support tool, not a replacement for professional therapy</li>
                    <li>In crisis situations, we may contact emergency services</li>
                    <li>You are responsible for the accuracy of information you provide</li>
                    <li>We reserve the right to update these terms as needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200/30 dark:border-indigo-800/30">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptedTerms}
                onChange={(e) => {
                  setFormData({ ...formData, acceptedTerms: e.target.checked })
                  if (errors.acceptedTerms) setErrors(prev => ({ ...prev, acceptedTerms: null }))
                }}
                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <label htmlFor="acceptTerms" className="flex-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                I have read and agree to the <span className="font-semibold text-indigo-600 dark:text-indigo-400">Privacy Policy</span> and <span className="font-semibold text-indigo-600 dark:text-indigo-400">Terms of Service</span>. I understand that MindAlchemy is a support tool and not a replacement for professional mental health care.
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {step > 1 && (
              <button
                onClick={handleBack}
                className="group px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
                Back
              </button>
            )}
          </div>
          <div>
            <button
              onClick={handleNext}
              className="group px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={false}
            >
              {step === totalSteps ? (
                <>
                  Get Started
                  <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
