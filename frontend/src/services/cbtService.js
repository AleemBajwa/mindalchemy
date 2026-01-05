import api from './api'

export const cbtService = {
  createThoughtRecord: async (recordData) => {
    const response = await api.post('/cbt/thought-records', recordData)
    return response.data
  },

  getThoughtRecords: async (limit = 50) => {
    const response = await api.get('/cbt/thought-records', { params: { limit } })
    return response.data
  },

  getThoughtRecord: async (recordId) => {
    const response = await api.get(`/cbt/thought-records/${recordId}`)
    return response.data
  },

  updateThoughtRecord: async (recordId, recordData) => {
    const response = await api.put(`/cbt/thought-records/${recordId}`, recordData)
    return response.data
  },

  deleteThoughtRecord: async (recordId) => {
    const response = await api.delete(`/cbt/thought-records/${recordId}`)
    return response.data
  }
}

