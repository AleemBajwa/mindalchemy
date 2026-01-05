import api from './api'

export const goalService = {
  createGoal: async (goalData) => {
    const response = await api.post('/goals/', goalData)
    return response.data
  },

  getGoals: async (status = null) => {
    const params = status ? { status } : {}
    const response = await api.get('/goals/', { params })
    return response.data
  },

  getGoal: async (goalId) => {
    const response = await api.get(`/goals/${goalId}`)
    return response.data
  },

  updateGoal: async (goalId, goalData) => {
    const response = await api.put(`/goals/${goalId}`, goalData)
    return response.data
  },

  deleteGoal: async (goalId) => {
    const response = await api.delete(`/goals/${goalId}`)
    return response.data
  }
}

