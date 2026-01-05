import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'

export default function MoodCharts({ moodLogs = [], moodStats = null }) {
  // Prepare data for mood trend chart (last 30 days)
  const prepareTrendData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i)
      const logsForDate = moodLogs.filter(log => {
        const logDate = new Date(log.created_at)
        return format(logDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      })
      
      if (logsForDate.length > 0) {
        const avgMood = logsForDate.reduce((sum, log) => sum + log.mood_value, 0) / logsForDate.length
        return {
          date: format(date, 'MMM d'),
          mood: Math.round(avgMood * 10) / 10,
          count: logsForDate.length
        }
      }
      return {
        date: format(date, 'MMM d'),
        mood: null,
        count: 0
      }
    })
    
    return last30Days.filter(d => d.mood !== null)
  }
  
  // Prepare data for mood distribution pie chart
  const prepareDistributionData = () => {
    if (!moodStats?.mood_distribution) return []
    
    const colors = {
      happy: '#FCD34D',
      calm: '#10B981',
      neutral: '#9CA3AF',
      sad: '#3B82F6',
      anxious: '#F97316',
      angry: '#EF4444'
    }
    
    return Object.entries(moodStats.mood_distribution).map(([mood, count]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: count,
      color: colors[mood] || '#9CA3AF'
    }))
  }
  
  const trendData = prepareTrendData()
  const distributionData = prepareDistributionData()
  
  const COLORS = ['#FCD34D', '#10B981', '#9CA3AF', '#3B82F6', '#F97316', '#EF4444']
  
  return (
    <div className="space-y-6">
      {/* Mood Trend Line Chart */}
      {trendData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mood Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fontSize: 12 }}
                label={{ value: 'Mood Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${value}/10`, 'Mood']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#6366F1" 
                strokeWidth={2}
                name="Mood Value"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Mood Distribution Pie Chart */}
      {distributionData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Mood Distribution Bar Chart */}
      {distributionData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mood Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#6366F1"
                name="Mood Count"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

