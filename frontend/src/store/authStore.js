import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const formData = new URLSearchParams()
          formData.append('username', email)
          formData.append('password', password)
          
          const response = await api.post('/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          
          const { access_token } = response.data
          const userResponse = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${access_token}` }
          })

          set({
            token: access_token,
            user: userResponse.data,
            isAuthenticated: true
          })

          // Set default auth header
          if (api.defaults.headers) {
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          }

          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.detail || error.message || 'Login failed' 
          }
        }
      },

      register: async (email, password, fullName) => {
        try {
          console.log('Attempting registration...', { email, fullName })
          console.log('API base URL:', api.defaults.baseURL)
          
          const response = await api.post('/auth/register', {
            email,
            password,
            full_name: fullName
          })
          
          console.log('Registration successful:', response.data)

          // Auto login after registration
          return await useAuthStore.getState().login(email, password)
        } catch (error) {
          console.error('Registration error:', error)
          console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
          })
          // Better error handling
          if (error.response) {
            // Server responded with error
            const status = error.response.status
            const detail = error.response.data?.detail || error.response.data?.message || error.response.data?.error
            
            if (status === 404) {
              return { 
                success: false, 
                error: 'API endpoint not found. Please check if backend is running correctly.' 
              }
            } else if (status === 500) {
              return { 
                success: false, 
                error: detail || 'Server error. Please check backend logs for details.' 
              }
            } else {
              return { 
                success: false, 
                error: detail || `Server error: ${status}` 
              }
            }
          } else if (error.request) {
            // Request made but no response (backend not running)
            return { 
              success: false, 
              error: 'Cannot connect to backend server. Please make sure backend is running on port 8000.' 
            }
          } else {
            // Something else
            return { 
              success: false, 
              error: error.message || 'Registration failed. Please check your connection.' 
            }
          }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
        delete api.defaults.headers.common['Authorization']
      },

      checkAuth: async () => {
        if (!isBrowser) return
        
        const { token } = useAuthStore.getState()
        if (!token) return

        try {
          if (api.defaults.headers) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          }
          const response = await api.get('/auth/me')
          set({
            user: response.data,
            isAuthenticated: true
          })
        } catch (error) {
          // Silently fail and logout
          useAuthStore.getState().logout()
        }
      },

      // Update user profile in the store after profile edits
      updateUserProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user
        }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
)

// Check auth on load (only in browser)
if (isBrowser) {
  // Delay to ensure store is initialized
  setTimeout(() => {
    useAuthStore.getState().checkAuth()
  }, 100)
}

export { useAuthStore }
export default useAuthStore

