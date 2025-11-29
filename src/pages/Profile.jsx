import React, { useState, useRef } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit, Trophy, BookOpen, Award, Target, Camera, Upload } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Profile = () => {
  const { user, updateUser, resetAvatar } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState(user)
  const [imageUploading, setImageUploading] = useState(false)
  const fileInputRef = useRef(null)

  const stats = [
    { label: 'Lessons Completed', value: '23', icon: BookOpen },
    { label: 'Labs Finished', value: '12', icon: Trophy },
    { label: 'Projects Done', value: '5', icon: Target },
    { label: 'Certificates', value: '3', icon: Award }
  ]

  const achievements = [
    { name: 'First Lesson', description: 'Completed your first lesson', date: '2023-01-20', icon: '🎓' },
    { name: 'Lab Master', description: 'Finished 10 practical labs', date: '2023-03-15', icon: '🧪' },
    { name: 'Project Pioneer', description: 'Completed first project', date: '2023-04-10', icon: '🚀' },
    { name: 'Security Expert', description: 'Earned cybersecurity certificate', date: '2023-05-22', icon: '🔒' }
  ]

  const recentActivity = [
    { type: 'lesson', title: 'Introduction to Cybersecurity', date: '2023-06-01', progress: 100 },
    { type: 'lab', title: 'Penetration Testing Lab', date: '2023-05-28', progress: 75 },
    { type: 'project', title: 'Security Dashboard', date: '2023-05-25', progress: 45 },
    { type: 'lesson', title: 'Machine Learning Basics', date: '2023-05-20', progress: 90 }
  ]

  const handleSave = () => {
    // Update the global user state with the temporary profile data
    updateUser(tempProfile)
    setIsEditing(false)
    // Here you would typically save to API
  }

  const handleCancel = () => {
    // Reset temporary profile to current user data
    setTempProfile(user)
    setIsEditing(false)
  }

  const handleEdit = () => {
    // Set temporary profile data when starting to edit
    setTempProfile(user)
    setIsEditing(true)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if it's an image file
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, GIF, etc.)')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB')
        return
      }

      setImageUploading(true)

      // Create a FileReader to read the file
      const reader = new FileReader()
      reader.onload = (e) => {
        // Update the temporary profile with the uploaded image
        setTempProfile(prev => ({
          ...prev,
          avatar: e.target.result
        }))
        setImageUploading(false)
      }
      reader.onerror = () => {
        alert('Error reading the file. Please try again.')
        setImageUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = () => {
    setTempProfile(prev => ({
      ...prev,
      avatar: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=NP'
    }))
  }

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={isEditing ? tempProfile.avatar : user.avatar}
                    alt={isEditing ? tempProfile.name : user.name}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
                  />
                  {imageUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                  {isEditing && (
                    <button
                      onClick={handleChangePhotoClick}
                      className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200 group"
                    >
                      <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <div className="mt-2 flex flex-col space-y-1">
                    <button
                      onClick={handleChangePhotoClick}
                      disabled={imageUploading}
                      className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    >
                      {imageUploading ? 'Uploading...' : 'Change Photo'}
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      disabled={imageUploading}
                      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {user.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {user.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {user.location}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user.bio}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 relative z-10 group-hover:text-purple-600 transition-colors duration-300">Recent Activity</h2>
            <div className="space-y-4 relative z-10">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden group/item"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromLeft 0.5s ease-out forwards'
                  }}
                >
                  {/* Activity hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/30 to-blue-100/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 group-hover/item:scale-125 ${
                      activity.type === 'lesson' ? 'bg-blue-500 group-hover/item:bg-gradient-to-r group-hover/item:from-blue-500 group-hover/item:to-purple-500' :
                      activity.type === 'lab' ? 'bg-green-500 group-hover/item:bg-gradient-to-r group-hover/item:from-green-500 group-hover/item:to-blue-500' :
                      activity.type === 'project' ? 'bg-purple-500 group-hover/item:bg-gradient-to-r group-hover/item:from-purple-500 group-hover/item:to-pink-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover/item:text-purple-600 transition-colors duration-300">{activity.title}</h3>
                      <p className="text-sm text-gray-600 group-hover/item:text-purple-500 transition-colors duration-300">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right relative z-10">
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-purple-600 transition-colors duration-300">{activity.progress}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 group-hover/item:from-purple-600 group-hover/item:to-pink-600 relative overflow-hidden"
                        style={{ width: `${activity.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-green-500/50 group-hover:to-blue-500/50 transition-all duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 relative z-10 group-hover:text-green-600 transition-colors duration-300">Learning Stats</h2>
            <div className="space-y-4 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden group/item"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInFromLeft 0.5s ease-out forwards'
                    }}
                  >
                    {/* Stat hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-blue-100/30 to-yellow-100/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover/item:bg-gradient-to-r group-hover/item:from-green-500 group-hover/item:to-blue-500 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-12">
                        <Icon className="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors duration-300 group-hover/item:scale-125" />
                      </div>
                      <span className="text-sm text-gray-600 group-hover/item:text-green-600 transition-colors duration-300 group-hover/item:font-medium">{stat.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 group-hover/item:text-transparent group-hover/item:bg-gradient-to-r group-hover/item:from-green-600 group-hover/item:to-blue-600 group-hover/item:bg-clip-text transition-all duration-300 group-hover/item:scale-110">{stat.value}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-yellow-500/50 group-hover:to-orange-500/50 transition-all duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 relative z-10 group-hover:text-yellow-600 transition-colors duration-300">🏆 Achievements</h2>
            <div className="space-y-3 relative z-10">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50/50 hover:to-orange-50/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden group/item"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromLeft 0.5s ease-out forwards'
                  }}
                >
                  {/* Achievement hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 via-orange-100/30 to-purple-100/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="text-3xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300 relative z-10">{achievement.icon}</div>
                  <div className="flex-1 relative z-10">
                    <h3 className="font-semibold text-gray-900 group-hover/item:text-yellow-600 transition-colors duration-300 group-hover/item:scale-105 transform origin-left">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 group-hover/item:text-orange-600 transition-colors duration-300">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1 group-hover/item:text-purple-500 transition-colors duration-300 group-hover/item:font-medium">{achievement.date}</p>
                  </div>
                  
                  {/* Achievement sparkle effect */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400/20 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:animate-pulse"></div>
                </div>
              ))}
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
        </div>
      </div>
    </div>
  )
}

export default Profile