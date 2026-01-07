import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useTheme } from '../contexts/ThemeContext'
import { Home, MessageCircle, Smile, BookOpen, Target, Sun, Moon, LogOut, User, Bell, Settings, FileText } from 'lucide-react'
import { notificationService } from '../services/notificationService'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const { darkMode, toggleDarkMode } = useTheme()
  const hasCheckedOnboarding = useRef(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const notificationsRef = useRef(null)

  // Check onboarding completion - only once, not on every route change
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hasCheckedOnboarding.current) return // Only check once
    
    // Don't redirect if we're already on onboarding or auth pages
    if (location.pathname === '/onboarding' || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')) {
      return
    }
    
    try {
      const onboardingCompleted = localStorage.getItem('onboarding_completed')
      
      // If onboarding is not completed, redirect to onboarding
      if (!onboardingCompleted) {
        hasCheckedOnboarding.current = true
        navigate('/onboarding')
        return
      }
      
      // If onboarding is completed, mark as checked and allow navigation
      hasCheckedOnboarding.current = true
      
      // Clear any session flags after a delay
      const justCompleted = sessionStorage.getItem('onboarding_just_completed')
      if (justCompleted) {
        setTimeout(() => {
          sessionStorage.removeItem('onboarding_just_completed')
        }, 2000)
      }
    } catch (error) {
      console.error('Error checking onboarding:', error)
      hasCheckedOnboarding.current = true // Mark as checked even on error
    }
  }, []) // Empty dependency array - only run once on mount

  // Separate effect to check for country only when user loads (not on every route change)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!user) return // Wait for user to load
    
    // Don't check if we're on onboarding or auth pages
    if (location.pathname === '/onboarding' || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')) {
      return
    }
    
    // Don't check if we just completed onboarding
    const justCompleted = sessionStorage.getItem('onboarding_just_completed')
    if (justCompleted) {
      return
    }
    
    // Only check for country once, not on every navigation
    const hasCheckedCountry = sessionStorage.getItem('has_checked_country')
    if (hasCheckedCountry) {
      return
    }
    
    // Check if user has country
    if (!user.country) {
      const onboardingCompleted = localStorage.getItem('onboarding_completed')
      if (onboardingCompleted) {
        // User completed onboarding but doesn't have country
        // Redirect to onboarding to collect it
        sessionStorage.setItem('has_checked_country', 'true')
        navigate('/onboarding')
      }
    } else {
      // User has country, mark as checked
      sessionStorage.setItem('has_checked_country', 'true')
    }
  }, [user]) // Only run when user changes, not on route change

  // Load notifications and show browser notifications
  useEffect(() => {
    if (!user) return
    
    let previousCount = 0
    
    const loadNotifications = async () => {
      try {
        const count = await notificationService.getUnreadCount()
        
        // Show browser notification if new notification arrived
        if (count > previousCount && previousCount > 0) {
          const { browserNotifications } = await import('../services/notificationService')
          if (browserNotifications.getPermission() === 'granted') {
            const notifs = await notificationService.getNotifications(1, true)
            if (notifs.length > 0) {
              browserNotifications.show(notifs[0].title, {
                body: notifs[0].message,
                tag: `notification-${notifs[0].id}`
              })
            }
          }
        }
        
        previousCount = count
        setUnreadCount(count)
        
        if (showNotifications) {
          const notifs = await notificationService.getNotifications(10, true)
          setNotifications(notifs)
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }
    
    loadNotifications()
    // Refresh every 30 seconds
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [user, showNotifications])

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/mood', icon: Smile, label: 'Mood' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-rose-50/30 via-purple-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50/90 via-rose-50/90 to-purple-50/90 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-800/90 backdrop-blur-xl border-b border-amber-200/30 dark:border-gray-700/50 shadow-lg shadow-amber-500/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MindAlchemy
              </h1>
            </div>
            <div className="flex items-center gap-3">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                  </button>
              
              {/* Notifications Bell */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                      <button
                        onClick={() => navigate('/settings/notifications')}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-80">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                              notif.read === 'false' ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                            }`}
                            onClick={async () => {
                              if (notif.read === 'false') {
                                await notificationService.markAsRead(notif.id)
                                setUnreadCount(prev => Math.max(0, prev - 1))
                                setNotifications(prev => prev.map(n => n.id === notif.id ? {...n, read: 'true'} : n))
                              }
                            }}
                          >
                            <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                              {notif.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {notif.message}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                              {new Date(notif.sent_at).toLocaleString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={async () => {
                            await notificationService.markAllAsRead()
                            setUnreadCount(0)
                            setNotifications(prev => prev.map(n => ({...n, read: 'true'})))
                          }}
                          className="w-full text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => navigate('/settings')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                title="Settings"
              >
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.full_name || user?.email}</span>
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-50/95 via-rose-50/95 to-purple-50/95 dark:from-gray-800/95 dark:via-gray-800/95 dark:to-gray-800/95 backdrop-blur-xl border-t border-amber-200/30 dark:border-gray-700/50 z-50 shadow-2xl shadow-amber-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                        active
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                      aria-label={`Navigate to ${item.label}`}
                      aria-current={active ? 'page' : undefined}
                    >
                  <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                    active 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 scale-110' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}>
                    <Icon className={`w-5 h-5 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`} strokeWidth={active ? 2.5 : 2} />
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                    )}
                  </div>
                  <span className={`text-xs font-medium mt-1 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

