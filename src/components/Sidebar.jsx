import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X, Home, BookOpen, FlaskConical, FolderOpen, User, Trophy, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useUser } from '../contexts/UserContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Lessons', href: '/lessons', icon: BookOpen },
  { name: 'Labs', href: '/labs', icon: FlaskConical },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()
  const { user } = useUser()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Open sidebar button - shows when sidebar is closed */}
      {!open && (
        <button
          className="fixed top-20 left-2 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl rounded-full hover:shadow-3xl hover:scale-110 transition-all duration-300 ease-out hover:from-blue-600 hover:to-purple-700 group animate-pulse"
          onClick={() => setOpen(true)}
          title="Open Sidebar"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}
      
      <div className={clsx(
        "bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out flex-shrink-0 overflow-hidden relative z-50 border-r border-gray-200/50",
        open ? "w-64" : "w-0",
        // On mobile, use fixed positioning when open
        "lg:relative lg:z-auto",
        open ? "lg:static" : "",
        // Mobile positioning - start from below header on mobile, no gap on desktop
        open ? "fixed lg:static top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-auto" : ""
      )}>
      <div className="w-64 h-full flex flex-col relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 animate-gradient-x"></div>
        
        <div className="flex items-center justify-end h-12 px-4 border-b border-gray-200/50 relative z-10">
          <button
            className="p-2 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg group"
            onClick={() => setOpen(false)}
            title="Close Sidebar"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
          </button>
        </div>

        <nav className="flex-1 mt-8 overflow-y-auto relative z-10">
          <div className="px-4 space-y-3">
            {navigation.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href || 
                              (item.href !== '/' && location.pathname.startsWith(item.href))
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ease-out relative group overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                      : "text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-md hover:scale-105 backdrop-blur-sm"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: open ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                  }}
                  onClick={() => setOpen(false)}
                >
                  {/* Animated background for hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <Icon className={clsx(
                    "w-5 h-5 mr-3 transition-all duration-300 relative z-10",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500 group-hover:scale-110"
                  )} />
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  
                  {/* Animated indicator for active item */}
                  {isActive && (
                    <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-full animate-pulse"></div>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Bottom section with profile and progress */}
        <div className="mt-auto border-t border-gray-200/50 relative z-10">
          {/* Profile section */}
          <div className="p-4">
            <NavLink to="/profile" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gradient-to-r from-blue-400 to-purple-400 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">{user.name}</p>
                <p className="text-xs text-gray-500 truncate group-hover:text-purple-500 transition-colors duration-300">{user.email}</p>
              </div>
            </NavLink>
          </div>

          {/* Progress section */}
          <div className="p-4 pt-0">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-4 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer">
              {/* Animated background particles */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="font-semibold text-sm mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">🎯 Learning Progress</h3>
              
              <div className="w-full bg-white/20 rounded-full h-3 mb-3 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-white via-yellow-200 to-white h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: '65%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center relative z-10">
                <p className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">65% Complete</p>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar