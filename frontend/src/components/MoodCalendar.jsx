import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns'

export default function MoodCalendar({ moodLogs = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const getMoodForDate = (date) => {
    return moodLogs.find(log => isSameDay(new Date(log.created_at), date))
  }
  
  const getMoodEmoji = (moodType) => {
    const emojis = {
      happy: '😊',
      calm: '😌',
      neutral: '😐',
      sad: '😔',
      anxious: '😰',
      angry: '😡'
    }
    return emojis[moodType] || '😐'
  }
  
  const getMoodColor = (moodType) => {
    const colors = {
      happy: 'bg-yellow-100 border-yellow-300',
      calm: 'bg-green-100 border-green-300',
      neutral: 'bg-gray-100 border-gray-300',
      sad: 'bg-blue-100 border-blue-300',
      anxious: 'bg-orange-100 border-orange-300',
      angry: 'bg-red-100 border-red-300'
    }
    return colors[moodType] || 'bg-gray-100 border-gray-300'
  }
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Get first day of week for the month
  const firstDayOfWeek = monthStart.getDay()
  const emptyDays = Array(firstDayOfWeek).fill(null)
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="px-3 py-1 text-gray-600 hover:text-gray-900"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 text-gray-600 hover:text-gray-900"
        >
          →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {daysInMonth.map((day) => {
          const moodLog = getMoodForDate(day)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div
              key={day.toISOString()}
              className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-2xl ${
                moodLog ? getMoodColor(moodLog.mood_type) : 'bg-gray-50 border-gray-200'
              } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              <div className="text-xs font-medium text-gray-600 mb-1">
                {format(day, 'd')}
              </div>
              {moodLog && (
                <div className="text-xl">
                  {getMoodEmoji(moodLog.mood_type)}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-700 mb-2">Mood Types:</div>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span>😊</span>
            <span className="text-gray-600">Happy</span>
          </div>
          <div className="flex items-center gap-1">
            <span>😌</span>
            <span className="text-gray-600">Calm</span>
          </div>
          <div className="flex items-center gap-1">
            <span>😐</span>
            <span className="text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center gap-1">
            <span>😔</span>
            <span className="text-gray-600">Sad</span>
          </div>
          <div className="flex items-center gap-1">
            <span>😰</span>
            <span className="text-gray-600">Anxious</span>
          </div>
          <div className="flex items-center gap-1">
            <span>😡</span>
            <span className="text-gray-600">Angry</span>
          </div>
        </div>
      </div>
    </div>
  )
}

