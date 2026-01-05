import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { journalService } from '../services/journalService'
import { format } from 'date-fns'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { exportJournalToPDF } from '../utils/pdfExport'
import { Download, Heart, Moon } from 'lucide-react'

export default function JournalEntry() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    tags: [],
    journal_type: 'general'
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      loadEntry()
    } else {
      // Check for prompt from navigation state
      const state = window.history.state
      if (state?.prompt) {
        setEntry(prev => ({ ...prev, content: `<p>${state.prompt}</p>` }))
      }
    }
  }, [id])

  const loadEntry = async () => {
    try {
      setLoading(true)
      const data = await journalService.getEntry(id)
      setEntry({
        title: data.title || '',
        content: data.content || '',
        tags: data.tags || [],
        journal_type: data.journal_type || 'general'
      })
    } catch (error) {
      console.error('Failed to load entry:', error)
      setError('Failed to load journal entry')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!entry.content.trim()) {
      setError('Content is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      if (isNew) {
        await journalService.createEntry(entry)
      } else {
        await journalService.updateEntry(id, entry)
      }
      navigate('/journal')
    } catch (error) {
      console.error('Failed to save entry:', error)
      setError('Failed to save journal entry')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return
    }

    try {
      await journalService.deleteEntry(id)
      navigate('/journal')
    } catch (error) {
      console.error('Failed to delete entry:', error)
      setError('Failed to delete journal entry')
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !entry.tags.includes(tagInput.trim())) {
      setEntry({
        ...entry,
        tags: [...entry.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setEntry({
      ...entry,
      tags: entry.tags.filter(tag => tag !== tagToRemove)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isNew ? 'New Journal Entry' : 'Edit Entry'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/journal')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          {!isNew && (
            <>
              <button
                onClick={() => exportJournalToPDF(entry)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                title="Export to PDF"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gradient-to-br from-white/80 via-blue-50/50 to-cyan-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/10 dark:shadow-gray-900/50 p-6 space-y-4 border border-blue-200/30 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={entry.title}
              onChange={(e) => setEntry({ ...entry, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Give your entry a title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Journal Type
            </label>
            <select
              value={entry.journal_type}
              onChange={(e) => setEntry({ ...entry, journal_type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="general">General Journal</option>
              <option value="gratitude">Gratitude Journal</option>
              <option value="dream">Dream Journal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={entry.content}
              onChange={(content) => setEntry({ ...entry, content })}
              placeholder="Write your thoughts, feelings, and experiences here..."
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link'],
                  ['clean']
                ]
              }}
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add a tag and press Enter"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-indigo-700 hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

