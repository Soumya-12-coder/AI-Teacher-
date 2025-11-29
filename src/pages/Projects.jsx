import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, Users, Star, FolderOpen, Search, Plus, Calendar, Target, CheckCircle, ArrowLeft } from 'lucide-react'

const Projects = () => {
  const location = useLocation()
  const filter = location.state?.filter || 'all'
  
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(filter === 'completed')

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockProjects = [
      {
        id: 1,
        title: 'Build a Security Monitoring Dashboard',
        description: 'Create a comprehensive security monitoring dashboard using React and Python backend to visualize security metrics and alerts.',
        category: 'Cybersecurity',
        difficulty: 'Intermediate',
        duration: '2-3 weeks',
        rating: 4.8,
        students: 450,
        status: 'available',
        progress: 100,
        completed: true,
        thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Security+Dashboard',
        technologies: ['React', 'Python', 'Flask', 'D3.js', 'PostgreSQL'],
        objectives: [
          'Design responsive dashboard interface',
          'Implement real-time data visualization',
          'Create alert management system',
          'Add user authentication and authorization'
        ],
        deliverables: [
          'Functional web application',
          'Source code repository',
          'Documentation and user guide',
          'Presentation video'
        ]
      },
      {
        id: 2,
        title: 'Machine Learning Fraud Detection System',
        description: 'Develop an ML-based fraud detection system using various algorithms to identify suspicious financial transactions.',
        category: 'AI/ML',
        difficulty: 'Advanced',
        duration: '3-4 weeks',
        rating: 4.9,
        students: 320,
        status: 'available',
        progress: 65,
        completed: false,
        thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Fraud+Detection',
        technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas', 'Flask'],
        objectives: [
          'Analyze transaction patterns',
          'Implement multiple ML algorithms',
          'Evaluate model performance',
          'Deploy model as web service'
        ],
        deliverables: [
          'Trained ML models',
          'Model evaluation report',
          'REST API for predictions',
          'Performance metrics dashboard'
        ]
      },
      {
        id: 3,
        title: 'Serverless Web Application on AWS',
        description: 'Build a fully serverless web application using AWS Lambda, API Gateway, and DynamoDB.',
        category: 'Cloud',
        difficulty: 'Intermediate',
        duration: '2-3 weeks',
        rating: 4.7,
        students: 280,
        status: 'available',
        progress: 100,
        completed: true,
        thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Serverless+App',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront'],
        objectives: [
          'Design serverless architecture',
          'Implement Lambda functions',
          'Set up API Gateway',
          'Configure database and storage'
        ],
        deliverables: [
          'Deployed serverless application',
          'Architecture documentation',
          'Cost optimization report',
          'Security best practices guide'
        ]
      },
      {
        id: 4,
        title: 'Blockchain-based Voting System',
        description: 'Create a secure, transparent voting system using blockchain technology to ensure vote integrity.',
        category: 'Cybersecurity',
        difficulty: 'Advanced',
        duration: '4-5 weeks',
        rating: 4.6,
        students: 180,
        status: 'coming-soon',
        progress: 0,
        completed: false,
        thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Blockchain+Vote',
        technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'MetaMask'],
        objectives: [
          'Design smart contract architecture',
          'Implement voting logic',
          'Create user interface',
          'Ensure security and transparency'
        ],
        deliverables: [
          'Smart contract code',
          'Web application interface',
          'Security audit report',
          'User manual and demo'
        ]
      },
      {
        id: 5,
        title: 'Computer Vision Image Classifier',
        description: 'Build an image classification system using deep learning to identify objects in images.',
        category: 'AI/ML',
        difficulty: 'Intermediate',
        duration: '2-3 weeks',
        rating: 4.8,
        students: 520,
        status: 'available',
        progress: 30,
        thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Image+Classifier',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Keras', 'Flask'],
        objectives: [
          'Prepare and preprocess dataset',
          'Build CNN architecture',
          'Train and validate model',
          'Deploy as web service'
        ],
        deliverables: [
          'Trained model files',
          'Web application demo',
          'Training report',
          'API documentation'
        ]
      }
    ]
    
    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
  }, [])

  useEffect(() => {
    let filtered = projects

    if (showOnlyCompleted) {
      filtered = filtered.filter(project => project.completed === true)
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, selectedCategory, selectedStatus, projects, showOnlyCompleted])

  const categories = ['all', 'Cybersecurity', 'AI/ML', 'Cloud']
  const statuses = ['all', 'available', 'coming-soon', 'in-progress', 'completed']

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
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
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
              {showOnlyCompleted ? '✅ Completed Projects' : '📂 All Projects'}
            </h1>
            <p className="text-gray-600">
              {showOnlyCompleted 
                ? `Showing ${filteredProjects.length} completed projects` 
                : 'Build real-world applications to showcase your skills'
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
            {!showOnlyCompleted && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </button>
            )}
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
              placeholder="Search projects..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer relative transform"
            style={{
              animationDelay: `${index * 150}ms`,
              animation: 'bounceIn 0.6s ease-out forwards'
            }}
          >
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-500"></div>
            
            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Image overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-3 py-2 rounded-full text-xs font-medium shadow-lg transition-all duration-300 group-hover:scale-110 ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <span className={`px-3 py-2 rounded-full text-xs font-medium shadow-lg transition-all duration-300 group-hover:scale-110 ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-2 rounded-full text-xs font-medium shadow-lg transition-all duration-300 group-hover:scale-110 ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              {project.progress > 0 && (
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {project.progress}% Complete
                </div>
              )}
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            </div>
            
            <div className="p-6 relative">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 group-hover:scale-105 transform origin-left">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{project.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center group-hover:text-purple-500 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                    {project.duration}
                  </div>
                  <div className="flex items-center group-hover:text-pink-500 transition-colors duration-300">
                    <Users className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                    {project.students}
                  </div>
                  <div className="flex items-center group-hover:text-yellow-500 transition-colors duration-300">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current group-hover:animate-pulse" />
                    {project.rating}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">💻 Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'none'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">🎯 Key Objectives:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                        <Target className="w-3 h-3 mr-2 mt-1 text-blue-500 flex-shrink-0 group-hover:text-purple-500 group-hover:scale-125 transition-all duration-300" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">Progress</span>
                      <span className="text-sm text-gray-600 group-hover:text-pink-600 transition-colors duration-300">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 group-hover:from-purple-600 group-hover:to-pink-600 relative overflow-hidden"
                        style={{ width: `${project.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 group-hover:text-purple-500 transition-colors duration-300">
                    <span className="font-medium">📋 {project.deliverables.length}</span> deliverables
                  </div>
                  <Link
                    to={project.status === 'available' ? `/projects/${project.id}` : '#'}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center hover:scale-110 transform hover:-translate-y-1 relative overflow-hidden group/btn ${
                      project.status === 'available'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/50'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => project.status !== 'available' && e.preventDefault()}
                  >
                    <FolderOpen className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    <span className="relative z-10 font-medium">{project.progress > 0 ? 'Continue' : project.status === 'available' ? 'Start Project' : 'Coming Soon'}</span>
                    {project.status === 'available' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default Projects