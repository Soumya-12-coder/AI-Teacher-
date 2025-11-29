import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, Users, Star, FlaskConical, Filter, Search, Zap, CheckCircle, ArrowLeft } from 'lucide-react'

const Labs = () => {
  const location = useLocation()
  const filter = location.state?.filter || 'all'
  
  const [labs, setLabs] = useState([])
  const [filteredLabs, setFilteredLabs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showOnlyFinished, setShowOnlyFinished] = useState(filter === 'finished')

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockLabs = [
      {
        id: 1,
        title: 'Penetration Testing Lab',
        description: 'Hands-on lab to practice penetration testing techniques on vulnerable systems.',
        category: 'Cybersecurity',
        difficulty: 'Intermediate',
        duration: '2 hours',
        rating: 4.7,
        students: 850,
        status: 'available',
        completed: true,
        thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=PenTest+Lab',
        tools: ['Kali Linux', 'Metasploit', 'Nmap'],
        objectives: [
          'Perform network reconnaissance',
          'Identify vulnerabilities',
          'Exploit security flaws',
          'Generate professional report'
        ]
      },
      {
        id: 2,
        title: 'Neural Network Implementation',
        description: 'Build and train a neural network from scratch using Python and TensorFlow.',
        category: 'AI/ML',
        difficulty: 'Advanced',
        duration: '3 hours',
        rating: 4.9,
        students: 1200,
        status: 'available',
        completed: true,
        thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Neural+Network',
        tools: ['Python', 'TensorFlow', 'Jupyter'],
        objectives: [
          'Understand neural network architecture',
          'Implement backpropagation algorithm',
          'Train model on real dataset',
          'Evaluate model performance'
        ]
      },
      {
        id: 3,
        title: 'Docker Container Security',
        description: 'Learn to secure Docker containers and implement best practices.',
        category: 'Cloud',
        difficulty: 'Beginner',
        duration: '1.5 hours',
        rating: 4.6,
        students: 980,
        status: 'available',
        completed: false,
        thumbnail: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Docker+Security',
        tools: ['Docker', 'Docker Compose', 'Trivy'],
        objectives: [
          'Secure Docker images',
          'Implement container isolation',
          'Scan for vulnerabilities',
          'Apply security policies'
        ]
      },
      {
        id: 4,
        title: 'AWS Security Assessment',
        description: 'Conduct comprehensive security assessment of AWS infrastructure.',
        category: 'Cloud',
        difficulty: 'Advanced',
        duration: '4 hours',
        rating: 4.8,
        students: 650,
        status: 'coming-soon',
        completed: false,
        thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=AWS+Security',
        tools: ['AWS CLI', 'CloudTrail', 'GuardDuty'],
        objectives: [
          'Assess IAM policies',
          'Review security groups',
          'Analyze CloudTrail logs',
          'Implement security controls'
        ]
      },
      {
        id: 5,
        title: 'Malware Analysis Sandbox',
        description: 'Analyze malware samples in a controlled environment.',
        category: 'Cybersecurity',
        difficulty: 'Advanced',
        duration: '2.5 hours',
        rating: 4.5,
        students: 420,
        status: 'available',
        completed: true,
        thumbnail: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Malware+Analysis',
        tools: ['VirtualBox', 'Wireshark', 'OllyDbg'],
        objectives: [
          'Set up analysis environment',
          'Analyze malware behavior',
          'Identify IOCs',
          'Document findings'
        ]
      },
      {
        id: 6,
        title: 'Deep Learning Computer Vision',
        description: 'Build computer vision models using deep learning techniques.',
        category: 'AI/ML',
        difficulty: 'Intermediate',
        duration: '3.5 hours',
        rating: 4.8,
        students: 1100,
        status: 'available',
        completed: false,
        thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Computer+Vision',
        tools: ['Python', 'OpenCV', 'PyTorch'],
        objectives: [
          'Preprocess image data',
          'Build CNN architecture',
          'Train classification model',
          'Evaluate model accuracy'
        ]
      }
    ]
    
    setLabs(mockLabs)
    setFilteredLabs(mockLabs)
  }, [])

  useEffect(() => {
    let filtered = labs

    if (showOnlyFinished) {
      filtered = filtered.filter(lab => lab.completed === true)
    }

    if (searchQuery) {
      filtered = filtered.filter(lab =>
        lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(lab => lab.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(lab => lab.difficulty === selectedDifficulty)
    }

    setFilteredLabs(filtered)
  }, [searchQuery, selectedCategory, selectedDifficulty, labs, showOnlyFinished])

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-red-100 text-red-800'
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
              {showOnlyFinished ? '✅ Finished Labs' : '🧪 All Labs'}
            </h1>
            <p className="text-gray-600">
              {showOnlyFinished 
                ? `Showing ${filteredLabs.length} finished labs` 
                : 'Practice your skills with hands-on lab exercises'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {showOnlyFinished && (
              <Link
                to="/"
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            )}
            <button
              onClick={() => setShowOnlyFinished(!showOnlyFinished)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                showOnlyFinished
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {showOnlyFinished ? 'Show All' : 'Show Finished'}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search labs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLabs.map((lab, index) => (
          <div 
            key={lab.id} 
            className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer relative transform"
            style={{
              animationDelay: `${index * 120}ms`,
              animation: 'bounceIn 0.6s ease-out forwards'
            }}
          >
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-green-500/50 group-hover:to-blue-500/50 transition-all duration-500"></div>
            
            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={lab.thumbnail}
                alt={lab.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Image overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-2 rounded-full text-xs font-medium shadow-lg group-hover:scale-110 transition-all duration-300 ${getStatusColor(lab.status)}`}>
                  {lab.status === 'available' ? '🟢 Available' : '🔄 Coming Soon'}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Zap className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 group-hover:animate-pulse" />
                </div>
              </div>
              
              {/* Electric effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            </div>
            
            <div className="p-6 relative">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-110 ${getCategoryColor(lab.category)}`}>
                    {lab.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-110 ${getDifficultyColor(lab.difficulty)}`}>
                    {lab.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300 group-hover:scale-105 transform origin-left">{lab.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{lab.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center group-hover:text-green-500 transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-1 group-hover:animate-spin" />
                    {lab.duration}
                  </div>
                  <div className="flex items-center group-hover:text-blue-500 transition-colors duration-300">
                    <Users className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                    {lab.students}
                  </div>
                  <div className="flex items-center group-hover:text-yellow-500 transition-colors duration-300">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current group-hover:animate-pulse" />
                    {lab.rating}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">🛠️ Tools Used:</h4>
                  <div className="flex flex-wrap gap-1">
                    {lab.tools.map((tool, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'none'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">🎯 Learning Objectives:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {lab.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                        <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 group-hover:text-green-500 transition-colors duration-300 font-medium">⚡ Interactive Lab</span>
                  <Link
                    to={lab.status === 'available' ? `/labs/${lab.id}` : '#'}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center hover:scale-110 transform hover:-translate-y-1 relative overflow-hidden group/btn ${
                      lab.status === 'available'
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-lg hover:shadow-green-500/50'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => lab.status !== 'available' && e.preventDefault()}
                  >
                    <FlaskConical className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    <span className="relative z-10 font-medium">{lab.status === 'available' ? 'Start Lab' : 'Coming Soon'}</span>
                    {lab.status === 'available' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <div className="text-center py-12">
          <FlaskConical className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No labs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default Labs