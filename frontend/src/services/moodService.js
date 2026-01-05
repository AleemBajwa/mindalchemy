import api from './api'

export const moodService = {
  logMood: async (moodData) => {
    const response = await api.post('/mood/', moodData)
    return response.data
  },

  getMoodLogs: async (limit = 30) => {
    const response = await api.get('/mood/', { params: { limit } })
    return response.data
  },

  getMoodStats: async () => {
    const response = await api.get('/mood/stats')
    return response.data
  },

  getMoodLog: async (moodId) => {
    const response = await api.get(`/mood/${moodId}`)
    return response.data
  }
}

