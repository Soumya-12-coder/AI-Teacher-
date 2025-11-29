import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, FlaskConical, FolderOpen, Trophy, Clock, TrendingUp, Users, Award } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  
  const stats = [
    { name: 'Lessons Completed', value: '23', icon: BookOpen, color: 'bg-blue-500', path: '/lessons', filter: 'completed' },
    { name: 'Labs Finished', value: '12', icon: FlaskConical, color: 'bg-green-500', path: '/labs', filter: 'finished' },
    { name: 'Projects Done', value: '5', icon: FolderOpen, color: 'bg-purple-500', path: '/projects', filter: 'completed' },
    { name: 'Certificates', value: '3', icon: Award, color: 'bg-orange-500', path: '/certificates', filter: 'all' },
  ]

  const handleStatClick = (path, filter) => {
    navigate(path, { state: { filter } })
  }

  const recentLessons = [
    { id: 1, title: 'Introduction to Cybersecurity', duration: '45 min', progress: 100, category: 'Cybersecurity' },
    { id: 2, title: 'Machine Learning Basics', duration: '1h 20 min', progress: 65, category: 'AI/ML' },
    { id: 3, title: 'AWS Cloud Fundamentals', duration: '2h 15 min', progress: 30, category: 'Cloud' },
  ]

  const upcomingLabs = [
    { id: 1, title: 'Penetration Testing Lab', difficulty: 'Intermediate', duration: '2 hours' },
    { id: 2, title: 'Neural Network Implementation', difficulty: 'Advanced', duration: '3 hours' },
    { id: 3, title: 'Docker Container Security', difficulty: 'Beginner', duration: '1 hour' },
  ]

  return (
    <div className="animate-slide-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey? You're doing great!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index} 
              onClick={() => handleStatClick(stat.path, stat.filter)}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-2 interactive-shadow"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'bounceIn 0.6s ease-out forwards'
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating particles effect */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-2xl relative overflow-hidden`}>
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 bg-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"></div>
                  <Icon className="w-6 h-6 text-white relative z-10 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300" />
                </div>
              </div>
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all duration-1000"></div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Lessons */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 border-b border-gray-200 relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <Link to="/lessons" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all lessons
                </Link>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="space-y-4">
                {recentLessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className="group flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'slideInFromLeft 0.5s ease-out forwards'
                    }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-12 h-12 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    
                    <div className="flex-1 relative z-10">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-105 transform origin-left">{lesson.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center group-hover:text-blue-500 transition-colors duration-300">
                          <Clock className="w-4 h-4 mr-1 group-hover:animate-spin" />
                          {lesson.duration}
                        </span>
                        <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          {lesson.category}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 group-hover:from-blue-600 group-hover:to-pink-600 relative overflow-hidden"
                            style={{ width: `${lesson.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 group-hover:text-blue-500 transition-colors duration-300">{lesson.progress}% complete</p>
                      </div>
                    </div>
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Continue</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Labs */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Labs</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingLabs.map((lab, index) => (
                  <div 
                    key={lab.id} 
                    className="group border-l-4 border-green-500 pl-4 py-3 rounded-r-xl hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInFromLeft 0.4s ease-out forwards'
                    }}
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-blue-100/30 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particle */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    
                    <div className="relative z-10">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300 group-hover:scale-105 transform origin-left">{lab.title}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          {lab.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 group-hover:text-green-500 transition-colors duration-300 group-hover:font-medium">{lab.duration}</span>
                      </div>
                    </div>
                    
                    {/* Hover accent line */}
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                  </div>
                ))}
              </div>
              <Link
                to="/labs"
                className="block w-full mt-6 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="relative z-10 font-medium">View All Labs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Learning Streak</h3>
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">7 Days</div>
            <p className="text-orange-100 text-sm">Keep it up! You're on fire! 🔥</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/lessons"
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-700 font-medium">Start New Lesson</span>
                <BookOpen className="w-5 h-5 text-blue-700" />
              </Link>
              <Link
                to="/projects"
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-purple-700 font-medium">Create Project</span>
                <FolderOpen className="w-5 h-5 text-purple-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard