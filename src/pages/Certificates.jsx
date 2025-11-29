import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Award, 
  Download, 
  Calendar, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle, 
  ExternalLink,
  Search,
  Filter,
  Trophy,
  Medal,
  Crown,
  Target,
  BookOpen,
  FlaskConical,
  FolderOpen,
  Zap,
  FileText as CertificateIcon,
  Share2,
  Eye,
  Printer
} from 'lucide-react'

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredCertificates, setFilteredCertificates] = useState([])

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: 'Cybersecurity Fundamentals',
      category: 'Cybersecurity',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      credentialId: 'CYB-2024-001-NP',
      issuer: 'AI Technical Teacher',
      status: 'Active',
      verificationUrl: 'https://verify.ai-teacher.com/CYB-2024-001-NP',
      skills: ['Network Security', 'Threat Analysis', 'Incident Response', 'Risk Assessment'],
      description: 'Comprehensive certification covering fundamental cybersecurity concepts, threat landscape, and defensive strategies.',
      thumbnail: '/certificates/cybersecurity-cert.png',
      grade: 'A+',
      score: 95,
      hours: 40,
      type: 'Professional Certificate'
    },
    {
      id: 2,
      title: 'Machine Learning Specialist',
      category: 'AI/ML',
      issueDate: '2024-02-20',
      expiryDate: '2027-02-20',
      credentialId: 'ML-2024-002-NP',
      issuer: 'AI Technical Teacher',
      status: 'Active',
      verificationUrl: 'https://verify.ai-teacher.com/ML-2024-002-NP',
      skills: ['Neural Networks', 'Deep Learning', 'Data Analysis', 'Python Programming'],
      description: 'Advanced certification in machine learning algorithms, neural networks, and practical AI implementation.',
      thumbnail: '/certificates/ml-cert.png',
      grade: 'A',
      score: 92,
      hours: 60,
      type: 'Specialist Certificate'
    },
    {
      id: 3,
      title: 'AWS Cloud Practitioner',
      category: 'Cloud',
      issueDate: '2024-03-10',
      expiryDate: '2027-03-10',
      credentialId: 'AWS-2024-003-NP',
      issuer: 'AI Technical Teacher',
      status: 'Active',
      verificationUrl: 'https://verify.ai-teacher.com/AWS-2024-003-NP',
      skills: ['AWS Services', 'Cloud Architecture', 'Security', 'Cost Optimization'],
      description: 'Foundation-level certification covering AWS cloud services, architecture, and best practices.',
      thumbnail: '/certificates/aws-cert.png',
      grade: 'A+',
      score: 98,
      hours: 35,
      type: 'Cloud Certificate'
    },
    {
      id: 4,
      title: 'Network Penetration Testing',
      category: 'Cybersecurity',
      issueDate: '2024-04-05',
      expiryDate: 'Never',
      credentialId: 'PEN-2024-004-NP',
      issuer: 'AI Technical Teacher',
      status: 'Active',
      verificationUrl: 'https://verify.ai-teacher.com/PEN-2024-004-NP',
      skills: ['Penetration Testing', 'Vulnerability Assessment', 'Network Security', 'Ethical Hacking'],
      description: 'Advanced hands-on certification in penetration testing methodologies and network security assessment.',
      thumbnail: '/certificates/pentest-cert.png',
      grade: 'A+',
      score: 97,
      hours: 80,
      type: 'Advanced Certificate'
    },
    {
      id: 5,
      title: 'Data Science & Analytics',
      category: 'AI/ML',
      issueDate: '2024-05-12',
      expiryDate: '2027-05-12',
      credentialId: 'DS-2024-005-NP',
      issuer: 'AI Technical Teacher',
      status: 'Active',
      verificationUrl: 'https://verify.ai-teacher.com/DS-2024-005-NP',
      skills: ['Data Analysis', 'Statistical Modeling', 'Python', 'R Programming', 'Visualization'],
      description: 'Comprehensive certification in data science methodologies, statistical analysis, and machine learning.',
      thumbnail: '/certificates/datascience-cert.png',
      grade: 'A',
      score: 94,
      hours: 55,
      type: 'Professional Certificate'
    }
  ]

  React.useEffect(() => {
    let filtered = certificates

    if (searchQuery) {
      filtered = filtered.filter(cert => 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(cert => cert.category === selectedCategory)
    }

    setFilteredCertificates(filtered)
  }, [searchQuery, selectedCategory])

  const categories = ['all', 'Cybersecurity', 'AI/ML', 'Cloud']

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
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600'
      case 'A': return 'text-blue-600'
      case 'B+': return 'text-purple-600'
      case 'B': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const handleDownload = (cert) => {
    // Simulate download functionality
    console.log(`Downloading certificate: ${cert.title}`)
    // In real app, this would trigger PDF download
  }

  const handleShare = (cert) => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `${cert.title} Certificate`,
        text: `I've earned a certificate in ${cert.title}!`,
        url: cert.verificationUrl
      })
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(cert.verificationUrl)
      alert('Verification URL copied to clipboard!')
    }
  }

  const handleVerify = (cert) => {
    window.open(cert.verificationUrl, '_blank')
  }

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏆 My Certificates</h1>
        <p className="text-gray-600">Your earned certifications and professional credentials</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
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
        </div>
      </div>

      {/* Certificates Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="bg-green-500 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{certificates.length}</p>
              <p className="text-sm text-gray-600 group-hover:text-green-500 transition-colors duration-300">Total Certificates</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="bg-blue-500 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{certificates.filter(c => c.status === 'Active').length}</p>
              <p className="text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">Active Certificates</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="bg-purple-500 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length)}%
              </p>
              <p className="text-sm text-gray-600 group-hover:text-purple-500 transition-colors duration-300">Average Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCertificates.map((certificate, index) => (
          <div 
            key={certificate.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-gold-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInFromLeft 0.5s ease-out forwards'
            }}
          >
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-yellow-500/50 group-hover:to-orange-500/50 transition-all duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <CertificateIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                      {certificate.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300">
                      {certificate.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                    {certificate.status}
                  </span>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-yellow-600 transition-colors duration-300">Issue Date</p>
                  <p className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors duration-300">
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300">Expiry Date</p>
                  <p className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                    {certificate.expiryDate === 'Never' ? 'Never' : new Date(certificate.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors duration-300">Grade</p>
                  <p className={`font-bold text-lg ${getGradeColor(certificate.grade)} group-hover:scale-110 transition-transform duration-300`}>
                    {certificate.grade} ({certificate.score}%)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">Study Hours</p>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {certificate.hours} hours
                  </p>
                </div>
              </div>

              {/* Category and Credential ID */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(certificate.category)}`}>
                  {certificate.category}
                </span>
                <p className="text-xs text-gray-500 font-mono group-hover:text-gray-600 transition-colors duration-300">
                  ID: {certificate.credentialId}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                {certificate.description}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                  🎯 Skills Covered:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(certificate)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center text-sm group/btn"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    Download
                  </button>
                  <button
                    onClick={() => handleShare(certificate)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center text-sm group/btn"
                  >
                    <Share2 className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    Share
                  </button>
                </div>
                <button
                  onClick={() => handleVerify(certificate)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center text-sm group/btn"
                >
                  <Shield className="w-4 h-4 mr-2 group-hover/btn:animate-spin" />
                  Verify
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <Link
            to="/lessons"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Start Learning
          </Link>
        </div>
      )}
    </div>
  )
}

export default Certificates