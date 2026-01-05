import axios from 'axios'

// Get API URL from environment or use default
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl) {
    // If VITE_API_URL is set, use it (should be http://localhost:8000)
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`
  }
  // Default fallback
  return 'http://localhost:8000/api'
}

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-storage')
      if (token) {
        try {
          const parsed = JSON.parse(token)
          if (parsed?.state?.token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${parsed.state.token}`
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear auth on 401
      localStorage.removeItem('auth-storage')
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

