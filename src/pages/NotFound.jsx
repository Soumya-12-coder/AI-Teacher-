import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, BookOpen, FlaskConical, FolderOpen } from 'lucide-react'

const NotFound = () => {
  const quickLinks = [
    { name: 'Dashboard', href: '/', icon: Home, description: 'Return to your dashboard' },
    { name: 'Lessons', href: '/lessons', icon: BookOpen, description: 'Browse available lessons' },
    { name: 'Labs', href: '/labs', icon: FlaskConical, description: 'Explore hands-on labs' },
    { name: 'Projects', href: '/projects', icon: FolderOpen, description: 'View project opportunities' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page not found
          </h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Or try these popular sections:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-blue-700">
                      {link.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {link.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Still can't find what you're looking for?{' '}
            <button className="text-blue-600 hover:text-blue-700 underline">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound