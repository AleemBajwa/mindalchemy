import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import { Settings as SettingsIcon, Download, Trash2, AlertTriangle, User, Shield, Database, LogOut } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [exporting, setExporting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await api.get('/user/export')
      
      // Create downloadable JSON file
      const dataStr = JSON.stringify(response.data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `mindalchemy-data-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setMessage({ type: 'success', text: 'Data exported successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to export data:', error)
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' })
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' })
      return
    }

    setDeleting(true)
    try {
      await api.delete('/user/account')
      setMessage({ type: 'success', text: 'Account deleted successfully. Redirecting...' })
      
      // Clear local storage and logout
      localStorage.clear()
      sessionStorage.clear()
      
      setTimeout(() => {
        logout()
        navigate('/login')
      }, 2000)
    } catch (error) {
      console.error('Failed to delete account:', error)
      setMessage({ type: 'error', text: 'Failed to delete account. Please try again.' })
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <SettingsIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          {message.type === 'success' ? (
            <Download className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Account Information */}
      <div className="bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-500/10 dark:shadow-gray-900/50 p-6 border border-indigo-200/30 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Account Information</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <div className="text-gray-900 dark:text-white font-medium">{user?.email}</div>
          </div>
          {user?.full_name && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
              <div className="text-gray-900 dark:text-white font-medium">{user.full_name}</div>
            </div>
          )}
          {user?.country && (
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Country</label>
              <div className="text-gray-900 dark:text-white font-medium">{user.country}</div>
            </div>
          )}
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-gradient-to-br from-white/80 via-blue-50/50 to-cyan-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 dark:shadow-gray-900/50 p-6 border border-blue-200/30 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Export</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Download all your data in JSON format. This includes your journal entries, mood logs, goals, chat sessions, and more.
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          {exporting ? 'Exporting...' : 'Export My Data'}
        </button>
      </div>

      {/* Notification Settings Link */}
      <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-6 border border-amber-200/30 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Notification Settings</h3>
            <p className="text-gray-600 dark:text-gray-400">Manage your reminders and notifications</p>
          </div>
          <button
            onClick={() => navigate('/settings/notifications')}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 flex items-center gap-2"
          >
            <SettingsIcon className="w-5 h-5" />
            Manage
          </button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-gradient-to-br from-white/80 via-red-50/50 to-rose-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-red-500/10 dark:shadow-gray-900/50 p-6 border-2 border-red-200/50 dark:border-red-800/50">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Danger Zone</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200 mb-1">Warning: This action is permanent</p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    All your data will be permanently deleted, including:
                  </p>
                  <ul className="text-sm text-red-800 dark:text-red-300 list-disc list-inside mt-2 space-y-1">
                    <li>All journal entries</li>
                    <li>All mood logs</li>
                    <li>All chat sessions</li>
                    <li>All goals and progress</li>
                    <li>All sleep logs</li>
                    <li>All notifications</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <strong>DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-3 border-2 border-red-200 dark:border-red-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirmText !== 'DELETE'}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/25 flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                {deleting ? 'Deleting...' : 'Confirm Deletion'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeleteConfirmText('')
                }}
                disabled={deleting}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

