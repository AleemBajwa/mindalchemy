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
      content: [
        'Anxiety is a normal human response to threat, but it can become a problem when it is intense, frequent, and interferes with daily life.',
        'Common symptoms include racing thoughts, physical tension, trouble sleeping, irritability, and difficulty concentrating.',
        'Anxiety disorders are highly treatable. CBT and exposure‑based approaches teach you to notice anxious thoughts, challenge unhelpful predictions, and gradually face feared situations.',
        'Lifestyle habits such as regular movement, predictable sleep, limiting caffeine, and basic breathing practices can lower your baseline level of anxiety.'
      ],
      readTime: '5 min',
      icon: '😰'
    },
    {
      id: 2,
      title: 'Coping with Depression: A Comprehensive Guide',
      category: 'depression',
      summary: 'Understand depression, its symptoms, and effective treatment options. Learn self-help strategies and when to seek professional help.',
      content: [
        'Depression is more than sadness; it often shows up as exhaustion, loss of interest, feeling numb, or believing that nothing will improve.',
        'Helpful first steps include building a simple daily routine, scheduling one small meaningful activity per day, and reaching out to at least one supportive person.',
        'Evidence‑based treatments include CBT, behavioral activation, interpersonal therapy, and medication when appropriate.',
        'Seek urgent help immediately if you notice thoughts of harming yourself, feeling hopeless, or being unable to care for basic needs.'
      ],
      readTime: '7 min',
      icon: '😔'
    },
    {
      id: 3,
      title: 'Stress Management Techniques That Work',
      category: 'stress',
      summary: 'Explore proven stress management techniques including breathing exercises, time management, and lifestyle changes.',
      content: [
        'Stress becomes a problem when demands chronically exceed the resources you feel you have.',
        'Quick tools include paced breathing (inhale for 4, exhale for 6–8), brief movement breaks, and micro‑pauses before reacting to emails or messages.',
        'Longer‑term strategies involve clarifying priorities, setting boundaries, delegating where possible, and building regular recovery time into your week.',
        'Notice early warning signs—poor sleep, irritability, procrastination—so you can intervene before burnout sets in.'
      ],
      readTime: '6 min',
      icon: '😓'
    },
    {
      id: 4,
      title: 'Introduction to Mindfulness Meditation',
      category: 'mindfulness',
      summary: 'Learn the basics of mindfulness meditation, its benefits, and how to start your practice today.',
      content: [
        'Mindfulness means paying attention to the present moment on purpose, with curiosity rather than judgment.',
        'A simple starter practice is to sit comfortably and place attention on the feeling of the breath for 5 minutes, gently returning whenever the mind wanders.',
        'Common benefits include greater emotional awareness, less reactivity, and a stronger ability to choose responses instead of reacting on autopilot.',
        'Consistency matters more than length—aim for short, regular practices and bring mindful awareness into everyday activities like walking or eating.'
      ],
      readTime: '8 min',
      icon: '🧘'
    },
    {
      id: 5,
      title: 'Cognitive Behavioral Therapy (CBT) Basics',
      category: 'cbt',
      summary: 'Discover how CBT works, its core principles, and how to apply CBT techniques in your daily life.',
      content: [
        'CBT is based on the idea that thoughts, emotions, and behaviors are linked; by changing one part of the cycle, you influence the others.',
        'A key skill is catching automatic thoughts, writing them down, and gently questioning how accurate, helpful, or complete they really are.',
        'Behavioral experiments—small planned actions—help you test out new beliefs in real life instead of trusting anxiety or low mood as facts.',
        'CBT works best when you practice skills between sessions, like using thought records or scheduling specific coping actions.'
      ],
      readTime: '10 min',
      icon: '🧠'
    },
    {
      id: 6,
      title: 'DBT Skills for Emotional Regulation',
      category: 'dbt',
      summary: 'Learn Dialectical Behavior Therapy skills for managing intense emotions and improving relationships.',
      content: [
        'DBT teaches four main skill sets: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.',
        'Emotion regulation skills include naming emotions, checking the facts, and building a life that reduces vulnerability (sleep, food, movement, substances).',
        'Distress‑tolerance tools focus on getting through emotional storms safely using grounding, self‑soothing, and distraction that does not make problems worse.',
        'Interpersonal effectiveness skills help you ask for what you need, say no, and keep self‑respect in relationships.'
      ],
      readTime: '9 min',
      icon: '💙'
    },
    {
      id: 7,
      title: 'Improving Sleep Quality: A Complete Guide',
      category: 'sleep',
      summary: 'Understand sleep hygiene, common sleep problems, and evidence-based strategies for better sleep.',
      content: [
        'Start with a consistent schedule: aim to wake up and go to bed at roughly the same time every day, even on weekends.',
        'Create a wind‑down routine for the last 30–60 minutes before bed—dim lights, avoid heavy conversations, and switch from screens to calming activities.',
        'Keep the bed for sleep and intimacy only. If you cannot fall asleep within about 20 minutes, get up, do something quiet in low light, and return to bed when sleepy.',
        'Limit caffeine after mid‑afternoon, avoid large meals and alcohol close to bedtime, and try gentle movement or stretching during the day.',
        'If sleep problems last more than a few weeks or significantly impair your functioning, consider discussing CBT‑I (insomnia treatment) or a medical evaluation with a professional.'
      ],
      readTime: '6 min',
      icon: '😴'
    },
    {
      id: 8,
      title: 'Building Healthy Relationships',
      category: 'relationships',
      summary: 'Learn communication skills, boundary setting, and strategies for maintaining healthy relationships.',
      content: [
        'Healthy relationships balance connection with autonomy: both people feel heard, respected, and able to be honest.',
        'Clear communication often starts with “I” statements—describing your experience rather than blaming the other person.',
        'Boundaries are limits that protect your energy, values, and safety; saying no is an act of clarity, not selfishness.',
        'Repair is more important than never arguing: noticing when something feels off, naming it, and working together to make amends.'
      ],
      readTime: '7 min',
      icon: '🤝'
    },
    {
      id: 9,
      title: 'Panic Attacks: What They Are and How to Cope',
      category: 'anxiety',
      summary: 'Understand panic attacks, their symptoms, and effective coping strategies including grounding techniques.',
      content: [
        'Panic attacks are sudden surges of intense fear accompanied by physical sensations such as racing heart, shortness of breath, dizziness, or shaking.',
        'Although terrifying, panic symptoms themselves are not dangerous; they are your body’s alarm system misfiring.',
        'Grounding skills—naming five things you can see, four you can touch, three you can hear, two you can smell, one you can taste—help anchor you in the present.',
        'Long‑term improvement comes from gradually facing feared sensations and situations instead of avoiding them, often with the support of CBT or exposure therapy.'
      ],
      readTime: '5 min',
      icon: '😰'
    },
    {
      id: 10,
      title: 'Self-Care Strategies for Mental Health',
      category: 'mindfulness',
      summary: 'Discover practical self-care strategies that support your mental health and overall well-being.',
      content: [
        'Self‑care is about caring for your future self, not just comfort in the moment.',
        'Core pillars include sleep, food, movement, social connection, and meaningful rest (activities that refill you rather than just distract).',
        'It helps to start tiny: one glass of water, a five‑minute walk, or sending one message to a supportive person can be enough to build momentum.',
        'Notice the difference between short‑term relief that creates new problems (e.g., over‑using substances) and small actions that genuinely stabilize you.'
      ],
      readTime: '6 min',
      icon: '💚'
    },
    {
      id: 11,
      title: 'Challenging Negative Thoughts: A CBT Approach',
      category: 'cbt',
      summary: 'Learn how to identify and challenge negative thought patterns using cognitive restructuring techniques.',
      content: [
        'Start by catching negative thoughts in real time and writing them down verbatim—even if they feel harsh or extreme.',
        'Look for common thinking styles such as all‑or‑nothing thinking, catastrophizing, mind‑reading, or discounting the positive.',
        'Ask balanced questions: “What evidence supports this? What evidence points in another direction? What would I say to a friend in this situation?”',
        'The goal is not to force positive thinking but to move toward more accurate, flexible, and compassionate thoughts that open up new choices.'
      ],
      readTime: '8 min',
      icon: '🧠'
    },
    {
      id: 12,
      title: 'Managing Social Anxiety',
      category: 'anxiety',
      summary: 'Explore strategies for managing social anxiety, including exposure techniques and cognitive reframing.',
      content: [
        'Social anxiety often centers on a fear of embarrassment, judgment, or rejection in social situations.',
        'Helpful strategies include gently challenging predictions about what others think and focusing attention outward on the conversation instead of on internal sensations.',
        'Gradual exposure—starting with easier situations and working up to more challenging ones—teaches your brain that you can cope without avoiding.',
        'Practicing small skills like prepared conversation starters or brief eye contact can make real‑world experiments feel safer.'
      ],
      readTime: '7 min',
      icon: '😰'
    },
    {
      id: 13,
      title: 'Understanding Your Emotions',
      category: 'dbt',
      summary: 'Learn to identify, understand, and regulate your emotions using DBT emotion regulation skills.',
      content: [
        'Emotions carry information about your needs, values, and the environment; they are signals, not problems to erase.',
        'Naming emotions accurately (“I feel disappointed and anxious,” not just “bad”) already reduces intensity for many people.',
        'DBT suggests checking whether emotion‑driven urges fit the facts of the situation; if they do not, you can practice “opposite action”—doing the opposite of what the emotion urges.',
        'Caring for your body (sleep, food, movement, substances) makes emotions more manageable and less likely to swing to extremes.'
      ],
      readTime: '6 min',
      icon: '💙'
    },
    {
      id: 14,
      title: 'Work-Life Balance and Stress',
      category: 'stress',
      summary: 'Discover strategies for achieving better work-life balance and reducing work-related stress.',
      content: [
        'Work–life balance is less about perfect equality and more about making sure work does not consume all of your time, energy, and identity.',
        'Start by noticing your current pattern: when do you feel most drained, and what obligations could be renegotiated, delayed, or delegated?',
        'Introduce small boundaries such as protected offline time, meeting‑free blocks, or a shutdown ritual that marks the end of the workday.',
        'Reinvest saved time into recovery activities—connection, hobbies, movement, or quiet—that genuinely refill you.'
      ],
      readTime: '5 min',
      icon: '😓'
    },
    {
      id: 15,
      title: 'Grief and Loss: Coping Strategies',
      category: 'depression',
      summary: 'Understand the grieving process and learn healthy ways to cope with loss and grief.',
      content: [
        'Grief is a natural response to losing someone or something important; it does not follow a neat set of stages.',
        'Common experiences include waves of sadness, numbness, anger, relief, guilt, or confusion—often cycling quickly.',
        'Helpful coping can include telling the story of your loss to trusted people, creating rituals of remembrance, and allowing both painful and warm memories.',
        'Seek additional support if grief leaves you unable to function in daily life for a long period, or if you notice strong urges to harm yourself.'
      ],
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
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {Array.isArray(activeArticle.content) ? (
                activeArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{activeArticle.summary}</p>
              )}
            </div>
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
