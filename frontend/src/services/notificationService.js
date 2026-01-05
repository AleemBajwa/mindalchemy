import api from './api'

export const notificationService = {
  async getPreferences() {
    const response = await api.get('/notifications/preferences')
    return response.data
  },

  async updatePreferences(preferences) {
    const response = await api.put('/notifications/preferences', preferences)
    return response.data
  },

  async getNotifications(limit = 50, unreadOnly = false) {
    const response = await api.get('/notifications/', {
      params: { limit, unread_only: unreadOnly }
    })
    return response.data
  },

  async markAsRead(notificationId) {
    const response = await api.put(`/notifications/${notificationId}/read`)
    return response.data
  },

  async markAllAsRead() {
    const response = await api.put('/notifications/read-all')
    return response.data
  },

  async deleteNotification(notificationId) {
    const response = await api.delete(`/notifications/${notificationId}`)
    return response.data
  },

  async getUnreadCount() {
    const response = await api.get('/notifications/unread-count')
    return response.data.count
  }
}

// Browser Notifications API helper
export const browserNotifications = {
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }

    return false
  },

  show(title, options = {}) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })

      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      // Auto-close after 5 seconds
      setTimeout(() => notification.close(), 5000)
      return notification
    }
  },

  isSupported() {
    return 'Notification' in window
  },

  getPermission() {
    return Notification.permission
  }
}

