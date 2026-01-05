import api from './api'

export const dashboardService = {
  getDashboard: async () => {
    const response = await api.get('/user/dashboard')
    return response.data
  }
}

