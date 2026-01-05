import api from './api'

export const insightsService = {
  getPatterns: async () => {
    const response = await api.get('/insights/patterns')
    return response.data
  }
}


