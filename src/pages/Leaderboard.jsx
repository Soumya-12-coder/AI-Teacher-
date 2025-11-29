import React, { useState, useEffect } from 'react'
import { Trophy, Medal, Crown, TrendingUp, Award, Star, Target, Calendar } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Leaderboard = () => {
  const { user } = useUser()
  const [timeframe, setTimeframe] = useState('all-time')
  const [category, setCategory] = useState('overall')
  const [leaderboardData, setLeaderboardData] = useState([])

  useEffect(() => {
    // Mock leaderboard data - in real app, this would come from API
    const mockData = [
      {
        id: 1,
        name: 'Dongala Soumya',
        avatar: user.avatar,
        score: 2850,
        lessonsCompleted: 45,
        labsCompleted: 28,
        projectsCompleted: 12,
        badges: ['Security Expert', 'AI Enthusiast', 'Cloud Master'],
        streak: 15,
        rank: 1,
        isCurrentUser: true
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=SJ',
        score: 2720,
        lessonsCompleted: 42,
        labsCompleted: 25,
        projectsCompleted: 11,
        badges: ['Cybersecurity Pro', 'Lab Expert'],
        streak: 12,
        rank: 2,
        isCurrentUser: false
      },
      {
        id: 3,
        name: 'Michael Chen',
        avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=MC',
        score: 2680,
        lessonsCompleted: 38,
        labsCompleted: 30,
        projectsCompleted: 8,
        badges: ['Machine Learning Expert', 'Code Ninja'],
        streak: 18,
        rank: 3,
        isCurrentUser: false
      },
      {
        id: 4,
        name: 'Emma Rodriguez',
        avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=ER',
        score: 2540,
        lessonsCompleted: 35,
        labsCompleted: 22,
        projectsCompleted: 10,
        badges: ['Cloud Architect', 'DevOps Master'],
        streak: 8,
        rank: 4,
        isCurrentUser: false
      },
      {
        id: 5,
        name: 'David Kim',
        avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=DK',
        score: 2420,
        lessonsCompleted: 32,
        labsCompleted: 20,
        projectsCompleted: 9,
        badges: ['Data Scientist', 'Analytics Expert'],
        streak: 6,
        rank: 5,
        isCurrentUser: false
      },
      {
        id: 6,
        name: 'Lisa Thompson',
        avatar: 'https://via.placeholder.com/40x40/EC4899/FFFFFF?text=LT',
        score: 2380,
        lessonsCompleted: 30,
        labsCompleted: 18,
        projectsCompleted: 8,
        badges: ['Frontend Master', 'UI/UX Designer'],
        streak: 4,
        rank: 6,
        isCurrentUser: false
      },
      {
        id: 7,
        name: 'James Wilson',
        avatar: 'https://via.placeholder.com/40x40/06B6D4/FFFFFF?text=JW',
        score: 2290,
        lessonsCompleted: 28,
        labsCompleted: 16,
        projectsCompleted: 7,
        badges: ['Backend Developer', 'API Expert'],
        streak: 9,
        rank: 7,
        isCurrentUser: false
      },
      {
        id: 8,
        name: 'Anna Martinez',
        avatar: 'https://via.placeholder.com/40x40/84CC16/FFFFFF?text=AM',
        score: 2180,
        lessonsCompleted: 26,
        labsCompleted: 14,
        projectsCompleted: 6,
        badges: ['Mobile Developer', 'React Native Pro'],
        streak: 3,
        rank: 8,
        isCurrentUser: false
      }
    ]

    setLeaderboardData(mockData)
  }, [timeframe, category, user])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600'
      default:
        return 'bg-gray-100'
    }
  }

  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaderboard = leaderboardData.slice(3)

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you stack up against other learners</p>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="overall">Overall Score</option>
              <option value="lessons">Lessons Completed</option>
              <option value="labs">Labs Completed</option>
              <option value="projects">Projects Completed</option>
              <option value="streak">Learning Streak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8 hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-yellow-500/50 group-hover:to-orange-500/50 transition-all duration-500"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center relative z-10 group-hover:text-yellow-600 transition-colors duration-300">🏆 Top Performers</h2>
        
        <div className="flex items-end justify-center space-x-4 relative z-10">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="text-center group/podium hover:scale-110 transition-transform duration-300">
              <div className="relative mb-4">
                <img
                  src={topThree[1].avatar}
                  alt={topThree[1].name}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-gray-300 group-hover/podium:border-silver-400 transition-all duration-300 group-hover/podium:scale-110"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center group-hover/podium:scale-125 group-hover/podium:animate-pulse transition-all duration-300">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-4 h-24 flex flex-col justify-center group-hover/podium:from-gray-200 group-hover/podium:to-gray-300 transition-all duration-300">
                <h3 className="font-semibold text-gray-900 group-hover/podium:text-gray-700 transition-colors duration-300">{topThree[1].name}</h3>
                <p className="text-sm text-gray-600 group-hover/podium:text-gray-500 transition-colors duration-300">{topThree[1].score} points</p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div className="text-center group/podium hover:scale-115 transition-transform duration-300">
              <div className="relative mb-4">
                <img
                  src={topThree[0].avatar}
                  alt={topThree[0].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-400 group-hover/podium:border-yellow-500 transition-all duration-300 group-hover/podium:scale-110"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover/podium:scale-125 group-hover/podium:animate-pulse transition-all duration-300">
                  <Crown className="w-4 h-4 text-white group-hover/podium:scale-125 transition-transform duration-300" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-4 h-32 flex flex-col justify-center text-white group-hover/podium:from-yellow-500 group-hover/podium:to-yellow-700 transition-all duration-300">
                <h3 className="font-semibold group-hover/podium:scale-105 transition-transform duration-300">{topThree[0].name}</h3>
                <p className="text-sm opacity-90 group-hover/podium:opacity-100 transition-opacity duration-300">{topThree[0].score} points</p>
                {topThree[0].isCurrentUser && (
                  <p className="text-xs opacity-80 mt-1 group-hover/podium:animate-bounce">That's you! 🎉</p>
                )}
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="text-center group/podium hover:scale-110 transition-transform duration-300">
              <div className="relative mb-4">
                <img
                  src={topThree[2].avatar}
                  alt={topThree[2].name}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-amber-400 group-hover/podium:border-amber-500 transition-all duration-300 group-hover/podium:scale-110"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center group-hover/podium:scale-125 group-hover/podium:animate-pulse transition-all duration-300">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl p-4 h-24 flex flex-col justify-center group-hover/podium:from-amber-200 group-hover/podium:to-amber-300 transition-all duration-300">
                <h3 className="font-semibold text-gray-900 group-hover/podium:text-amber-700 transition-colors duration-300">{topThree[2].name}</h3>
                <p className="text-sm text-gray-600 group-hover/podium:text-amber-600 transition-colors duration-300">{topThree[2].score} points</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Full Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(user.rank)}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.isCurrentUser && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.badges.slice(0, 2).map((badge, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{user.score}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">{user.lessonsCompleted} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{user.labsCompleted} labs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">{user.projectsCompleted} projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">{user.streak} day streak</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">#1</div>
            <div className="text-sm opacity-90">Current Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">2,850</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard