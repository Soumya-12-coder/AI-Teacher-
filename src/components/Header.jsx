import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, User, Settings, LogOut, Award, BookOpen, Clock, X, ChevronDown } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Header = ({ setSidebarOpen }) => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You completed 5 cybersecurity labs in a row',
      time: '2 hours ago',
      unread: true,
      icon: Award,
      action: '/profile'
    },
    {
      id: 2,
      type: 'lesson',
      title: 'New Lesson Available',
      message: 'Advanced Machine Learning Techniques is now available',
      time: '1 day ago',
      unread: true,
      icon: BookOpen,
      action: '/lessons'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Daily Goal Reminder',
      message: 'You have 30 minutes left to complete your daily goal',
      time: '2 days ago',
      unread: false,
      icon: Clock,
      action: '/dashboard'
    }
  ])

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read if unread
    if (notification.unread) {
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, unread: false } : n
        )
      )
    }
    
    // Close the dropdown
    setShowNotifications(false)
    
    // Navigate to the relevant page
    if (notification.action) {
      navigate(notification.action)
    }
    
    // Optional: Show feedback (could be replaced with toast notification)
    console.log(`Clicked on notification: ${notification.title}`)
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all duration-300">
              <span className="text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">AI</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              Tech Teacher
            </span>
          </Link>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons, labs, projects..."
              className="pl-12 pr-4 py-3 border border-gray-300/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white/90 hover:shadow-md focus:shadow-lg w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              className={`relative p-3 rounded-full transition-all duration-300 group ${showNotifications ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 hover:shadow-md hover:scale-110'}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 group-hover:animate-bounce" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999] max-h-96 overflow-hidden" 
                   style={{
                     position: 'absolute',
                     right: '0',
                     top: '100%',
                     marginTop: '0.5rem',
                     zIndex: 9999
                   }}>
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors ${
                          notification.unread ? 'bg-blue-50 hover:bg-blue-100' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'achievement' ? 'bg-yellow-100' :
                            notification.type === 'lesson' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              notification.type === 'achievement' ? 'text-yellow-600' :
                              notification.type === 'lesson' ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="px-4 py-3 border-t border-gray-200">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    onClick={() => {
                      setShowNotifications(false)
                      navigate('/profile') // Navigate to profile where notifications might be managed
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={profileRef}>
            <button
              className={`flex items-center space-x-3 rounded-2xl p-3 transition-all duration-300 group ${showProfileMenu ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg' : 'hover:bg-gray-50 hover:shadow-md hover:scale-105'}`}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{user.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-purple-500 transition-colors duration-300">Student</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gradient-to-r from-blue-400 to-purple-400 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:rotate-180 transition-all duration-300" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  
                  <Link
                    to="/leaderboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Award className="w-4 h-4 mr-3" />
                    Leaderboard
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header