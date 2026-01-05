import api from './api'

export const journalService = {
  createEntry: async (entryData) => {
    const response = await api.post('/journal/', entryData)
    return response.data
  },

  getEntries: async (limit = 50) => {
    const response = await api.get('/journal/', { params: { limit } })
    return response.data
  },

  getEntry: async (entryId) => {
    const response = await api.get(`/journal/${entryId}`)
    return response.data
  },

  updateEntry: async (entryId, entryData) => {
    const response = await api.put(`/journal/${entryId}`, entryData)
    return response.data
  },

  deleteEntry: async (entryId) => {
    const response = await api.delete(`/journal/${entryId}`)
    return response.data
  }
}

