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
  window.addEventListener('load', () => {
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
            // Reload once so the page uses fresh assets, no manual action needed
            window.location.reload()
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

