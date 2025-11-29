import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from localStorage on initial load
    const savedUser = localStorage.getItem('aiTeacherUser')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Update name to Dongala Soumya
        parsedUser.name = 'Dongala Soumya'
        localStorage.setItem('aiTeacherUser', JSON.stringify(parsedUser))
        return parsedUser
      } catch (error) {
        console.error('Error parsing saved user data:', error)
      }
    }

    // Default user data
    return {
      name: 'Dongala Soumya',
      email: 'dongalasoumya@example.com',
      phone: '+91 6300472707',
      location: 'bhupalpally District, Telangana, India',
      bio: 'Passionate cybersecurity professional and lifelong learner. Interested in AI/ML applications in security.',
      joinDate: '2023-01-15',
      avatar: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=NP'
    }
  })

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aiTeacherUser', JSON.stringify(user))
  }, [user])

  const updateUser = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }))
  }

  const resetAvatar = () => {
    setUser(prev => ({
      ...prev,
      avatar: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=NP'
    }))
  }

  return (
    <UserContext.Provider value={{ user, updateUser, resetAvatar }}>
      {children}
    </UserContext.Provider>
  )
}