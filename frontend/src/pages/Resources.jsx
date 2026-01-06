import { useState, useEffect } from 'react'
import { Star, BookOpen } from 'lucide-react'

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [bookmarks, setBookmarks] = useState([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [activeArticle, setActiveArticle] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('resource_bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const toggleBookmark = (articleId) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
      localStorage.setItem('resource_bookmarks', JSON.stringify(newBookmarks))
      return newBookmarks
    })
  }

  const categories = {
    all: 'All Resources',
    anxiety: 'Anxiety',
    depression: 'Depression',
    stress: 'Stress',
    mindfulness: 'Mindfulness',
    cbt: 'CBT',
    dbt: 'DBT',
    sleep: 'Sleep',
    relationships: 'Relationships'
  }

  const articles = [
    {
      id: 1,
      title: 'Understanding Anxiety: Symptoms and Causes',
      category: 'anxiety',
      summary: 'Learn about anxiety disorders, common symptoms, and what causes anxiety. Discover evidence-based strategies for managing anxiety.',
      readTime: '5 min',
      icon: '😰'
    },
    {
      id: 2,
      title: 'Coping with Depression: A Comprehensive Guide',
      category: 'depression',
      summary: 'Understand depression, its symptoms, and effective treatment options. Learn self-help strategies and when to seek professional help.',
      readTime: '7 min',
      icon: '😔'
    },
    {
      id: 3,
      title: 'Stress Management Techniques That Work',
      category: 'stress',
      summary: 'Explore proven stress management techniques including breathing exercises, time management, and lifestyle changes.',
      readTime: '6 min',
      icon: '😓'
    },
    {
      id: 4,
      title: 'Introduction to Mindfulness Meditation',
      category: 'mindfulness',
      summary: 'Learn the basics of mindfulness meditation, its benefits, and how to start your practice today.',
      readTime: '8 min',
      icon: '🧘'
    },
    {
      id: 5,
      title: 'Cognitive Behavioral Therapy (CBT) Basics',
      category: 'cbt',
      summary: 'Discover how CBT works, its core principles, and how to apply CBT techniques in your daily life.',
      readTime: '10 min',
      icon: '🧠'
    },
    {
      id: 6,
      title: 'DBT Skills for Emotional Regulation',
      category: 'dbt',
      summary: 'Learn Dialectical Behavior Therapy skills for managing intense emotions and improving relationships.',
      readTime: '9 min',
      icon: '💙'
    },
    {
      id: 7,
      title: 'Improving Sleep Quality: A Complete Guide',
      category: 'sleep',
      summary: 'Understand sleep hygiene, common sleep problems, and evidence-based strategies for better sleep.',
      readTime: '6 min',
      icon: '😴'
    },
    {
      id: 8,
      title: 'Building Healthy Relationships',
      category: 'relationships',
      summary: 'Learn communication skills, boundary setting, and strategies for maintaining healthy relationships.',
      readTime: '7 min',
      icon: '🤝'
    },
    {
      id: 9,
      title: 'Panic Attacks: What They Are and How to Cope',
      category: 'anxiety',
      summary: 'Understand panic attacks, their symptoms, and effective coping strategies including grounding techniques.',
      readTime: '5 min',
      icon: '😰'
    },
    {
      id: 10,
      title: 'Self-Care Strategies for Mental Health',
      category: 'mindfulness',
      summary: 'Discover practical self-care strategies that support your mental health and overall well-being.',
      readTime: '6 min',
      icon: '💚'
    },
    {
      id: 11,
      title: 'Challenging Negative Thoughts: A CBT Approach',
      category: 'cbt',
      summary: 'Learn how to identify and challenge negative thought patterns using cognitive restructuring techniques.',
      readTime: '8 min',
      icon: '🧠'
    },
    {
      id: 12,
      title: 'Managing Social Anxiety',
      category: 'anxiety',
      summary: 'Explore strategies for managing social anxiety, including exposure techniques and cognitive reframing.',
      readTime: '7 min',
      icon: '😰'
    },
    {
      id: 13,
      title: 'Understanding Your Emotions',
      category: 'dbt',
      summary: 'Learn to identify, understand, and regulate your emotions using DBT emotion regulation skills.',
      readTime: '6 min',
      icon: '💙'
    },
    {
      id: 14,
      title: 'Work-Life Balance and Stress',
      category: 'stress',
      summary: 'Discover strategies for achieving better work-life balance and reducing work-related stress.',
      readTime: '5 min',
      icon: '😓'
    },
    {
      id: 15,
      title: 'Grief and Loss: Coping Strategies',
      category: 'depression',
      summary: 'Understand the grieving process and learn healthy ways to cope with loss and grief.',
      readTime: '6 min',
      icon: '😔'
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(article.id)
    return matchesSearch && matchesCategory && matchesBookmark
  })

  const categoryColors = {
    anxiety: 'bg-red-100 text-red-700',
    depression: 'bg-blue-100 text-blue-700',
    stress: 'bg-orange-100 text-orange-700',
    mindfulness: 'bg-green-100 text-green-700',
    cbt: 'bg-purple-100 text-purple-700',
    dbt: 'bg-indigo-100 text-indigo-700',
    sleep: 'bg-yellow-100 text-yellow-700',
    relationships: 'bg-pink-100 text-pink-700'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Educational Resources</h2>
        <p className="text-gray-600 mt-1">
          Learn about mental health, coping strategies, and therapeutic techniques
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-4 space-y-4 border border-amber-200/30 dark:border-gray-700">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            aria-label="Search articles"
          />
          {bookmarks.length > 0 && (
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                showBookmarksOnly
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Toggle bookmarks filter"
            >
              <Star className={`w-4 h-4 ${showBookmarksOnly ? 'fill-white' : ''}`} />
              Bookmarks ({bookmarks.length})
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedCategory === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Filter by ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-500/10 dark:shadow-gray-900/50 p-12 text-center border border-amber-200/30 dark:border-gray-700">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-500/10 dark:shadow-gray-900/50 p-6 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300 border border-amber-200/30 dark:border-gray-700 relative group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleBookmark(article.id)
                }}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all z-10"
                aria-label={bookmarks.includes(article.id) ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Star 
                  className={`w-5 h-5 ${
                    bookmarks.includes(article.id) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-400 group-hover:text-yellow-400'
                  }`} 
                />
              </button>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{article.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[article.category]}`}>
                    {categories[article.category]}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">⏱️ {article.readTime}</span>
                <button
                  className="text-primary text-sm font-semibold hover:underline"
                  onClick={() => setActiveArticle(article)}
                  aria-label={`Read more about ${article.title}`}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          📖 About These Resources
        </h3>
        <p className="text-sm text-indigo-800">
          These educational resources are designed to help you understand mental health topics and learn
          evidence-based coping strategies. Remember, these articles are for educational purposes and are
          not a substitute for professional mental health treatment. If you're experiencing a mental health
          crisis, please seek immediate professional help.
        </p>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-article-title"
        >
          <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="resource-article-title"
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
                >
                  {activeArticle.title}
                </h3>
                <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${categoryColors[activeArticle.category]}`}>
                  {categories[activeArticle.category]}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close article details"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {activeArticle.summary}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>⏱️ Estimated reading time: {activeArticle.readTime}</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-primary font-semibold hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
