import api from './api'

export const sleepService = {
  logSleep: async (sleepData) => {
    const response = await api.post('/sleep/', sleepData)
    return response.data
  },

  getSleepLogs: async (limit = 30) => {
    const response = await api.get('/sleep/', { params: { limit } })
    return response.data
  },

  getSleepStats: async () => {
    const response = await api.get('/sleep/stats')
    return response.data
  },

  getSleepLog: async (logId) => {
    const response = await api.get(`/sleep/${logId}`)
    return response.data
  }
}

