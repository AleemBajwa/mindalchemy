import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// One-time cleanup: automatically unregister old service workers
// so users don't need to clear cache manually. This prevents
// blank pages caused by stale cached assets.
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduleCleanup = (callback) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2000 })
    } else {
      setTimeout(callback, 1000)
    }
  }

  scheduleCleanup(() => {
    try {
      const alreadyCleared = localStorage.getItem('sw_cleared_v1')
      if (alreadyCleared === '1') return

      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          if (!registrations || registrations.length === 0) {
            localStorage.setItem('sw_cleared_v1', '1')
            return
          }

          return Promise.all(registrations.map((reg) => reg.unregister())).finally(() => {
            localStorage.setItem('sw_cleared_v1', '1')
            // Only reload if we're not already on a working page
            // This prevents blank pages on mobile
            if (window.location.pathname === '/' || window.location.pathname === '') {
              // Small delay to ensure React has rendered
              setTimeout(() => {
                window.location.reload()
              }, 500)
            }
          })
        })
        .catch((error) => {
          console.error('Service worker cleanup error:', error)
          localStorage.setItem('sw_cleared_v1', '1')
        })
    } catch (error) {
      console.error('Service worker cleanup setup failed:', error)
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

