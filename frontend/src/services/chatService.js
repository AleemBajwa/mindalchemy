import api from './api'

export const chatService = {
  sendMessage: async (message, sessionId = null, location = null) => {
    const response = await api.post('/chat/', {
      message,
      session_id: sessionId,
      location: location ? { lat: location.latitude, lng: location.longitude } : null
    })
    return response.data
  },

  getSessions: async () => {
    const response = await api.get('/chat/sessions')
    return response.data
  },

  getSession: async (sessionId) => {
    const response = await api.get(`/chat/sessions/${sessionId}`)
    return response.data
  },

  deleteSession: async (sessionId) => {
    const response = await api.delete(`/chat/sessions/${sessionId}`)
    return response.data
  },

  generateSummary: async (sessionId) => {
    const response = await api.post(`/chat/sessions/${sessionId}/summary`)
    return response.data
  },

  searchSessions: async (query) => {
    const response = await api.get(`/chat/sessions/search?query=${encodeURIComponent(query)}`)
    return response.data
  }
}

