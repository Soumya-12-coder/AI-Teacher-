import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, Users, Star, BookOpen, Filter, Search, CheckCircle, ArrowLeft } from 'lucide-react'

const Lessons = () => {
  const location = useLocation()
  const filter = location.state?.filter || 'all'
  
  const [lessons, setLessons] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(filter === 'completed')

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockLessons = [
      {
        id: 1,
        title: 'Introduction to Cybersecurity',
        description: 'Learn the fundamentals of cybersecurity including threat landscape, security principles, and basic defensive techniques.',
        category: 'Cybersecurity',
        difficulty: 'Beginner',
        duration: '45 min',
        instructor: 'Sarah Johnson',
        rating: 4.8,
        students: 1250,
        progress: 100,
        thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Cybersecurity',
        tags: ['Security', 'Fundamentals', 'Beginner-friendly']
      },
      {
        id: 2,
        title: 'Machine Learning Fundamentals',
        description: 'Comprehensive introduction to machine learning concepts, algorithms, and practical applications.',
        category: 'AI/ML',
        difficulty: 'Intermediate',
        duration: '1h 20 min',
        instructor: 'Dr. Michael Chen',
        rating: 4.9,
        students: 2100,
        progress: 65,
        thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=ML+Basics',
        tags: ['Machine Learning', 'AI', 'Algorithms']
      },
      {
        id: 3,
        title: 'AWS Cloud Architecture',
        description: 'Design and implement scalable cloud solutions using AWS services and best practices.',
        category: 'Cloud',
        difficulty: 'Advanced',
        duration: '2h 15 min',
        instructor: 'James Wilson',
        rating: 4.7,
        students: 890,
        progress: 30,
        thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=AWS+Cloud',
        tags: ['AWS', 'Cloud', 'Architecture']
      },
      {
        id: 4,
        title: 'Deep Learning with TensorFlow',
        description: 'Master deep learning concepts and build neural networks using TensorFlow and Keras.',
        category: 'AI/ML',
        difficulty: 'Advanced',
        duration: '3h 45 min',
        instructor: 'Dr. Lisa Rodriguez',
        rating: 4.9,
        students: 1580,
        progress: 0,
        thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Deep+Learning',
        tags: ['Deep Learning', 'TensorFlow', 'Neural Networks']
      },
      {
        id: 5,
        title: 'Ethical Hacking Basics',
        description: 'Learn ethical hacking techniques and penetration testing methodologies.',
        category: 'Cybersecurity',
        difficulty: 'Intermediate',
        duration: '2h 30 min',
        instructor: 'Alex Thompson',
        rating: 4.6,
        students: 980,
        progress: 0,
        thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Ethical+Hacking',
        tags: ['Hacking', 'Penetration Testing', 'Security']
      },
      {
        id: 6,
        title: 'Docker and Containerization',
        description: 'Master containerization with Docker and orchestration with Kubernetes.',
        category: 'Cloud',
        difficulty: 'Intermediate',
        duration: '1h 50 min',
        instructor: 'Kevin Park',
        rating: 4.8,
        students: 1320,
        progress: 0,
        thumbnail: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Docker',
        tags: ['Docker', 'Containers', 'DevOps']
      }
    ]
    
    setLessons(mockLessons)
    setFilteredLessons(mockLessons)
  }, [])

  // Filter lessons based on search and filters
  useEffect(() => {
    let filtered = lessons

    if (showOnlyCompleted) {
      filtered = filtered.filter(lesson => lesson.progress === 100)
    }

    if (searchQuery) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(lesson => lesson.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(lesson => lesson.difficulty === selectedDifficulty)
    }

    setFilteredLessons(filtered)
  }, [searchQuery, selectedCategory, selectedDifficulty, lessons, showOnlyCompleted])

  const categories = ['all', 'Cybersecurity', 'AI/ML', 'Cloud']
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cybersecurity': return 'bg-blue-100 text-blue-800'
      case 'AI/ML': return 'bg-purple-100 text-purple-800'
      case 'Cloud': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showOnlyCompleted ? '✅ Completed Lessons' : '📚 All Lessons'}
            </h1>
            <p className="text-gray-600">
              {showOnlyCompleted 
                ? `Showing ${filteredLessons.length} completed lessons` 
                : 'Explore our comprehensive learning modules'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {showOnlyCompleted && (
              <Link
                to="/"
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            )}
            <button
              onClick={() => setShowOnlyCompleted(!showOnlyCompleted)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                showOnlyCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {showOnlyCompleted ? 'Show All' : 'Show Completed'}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLessons.map((lesson, index) => (
          <div 
            key={lesson.id} 
            className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer relative transform"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'bounceIn 0.6s ease-out forwards'
            }}
          >
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500"></div>
            
            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Image overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {lesson.progress > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {lesson.progress}% Complete
                </div>
              )}
              
              {/* Floating badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-lg group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300">
                New
              </div>
            </div>
            
            <div className="p-6 relative">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-110 ${getCategoryColor(lesson.category)}`}>
                    {lesson.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-110 ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 group-hover:scale-105 transform origin-left">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">{lesson.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center group-hover:text-blue-500 transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-1 group-hover:animate-spin" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center group-hover:text-purple-500 transition-colors duration-300">
                    <Users className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                    {lesson.students}
                  </div>
                  <div className="flex items-center group-hover:text-yellow-500 transition-colors duration-300">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current group-hover:animate-pulse" />
                    {lesson.rating}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">by {lesson.instructor}</span>
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 relative overflow-hidden group/btn"
                  >
                    <BookOpen className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    <span className="relative z-10">{lesson.progress > 0 ? 'Continue' : 'Start'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  </Link>
                </div>
                
                {lesson.progress > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 group-hover:from-blue-600 group-hover:to-pink-600 relative overflow-hidden"
                        style={{ width: `${lesson.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default Lessons