import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import LessonViewer from './pages/LessonViewer'
import Labs from './pages/Labs'
import LabViewer from './pages/LabViewer'
import Projects from './pages/Projects'
import ProjectViewer from './pages/ProjectViewer'
import Certificates from './pages/Certificates'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="lessons/:lessonId" element={<LessonViewer />} />
            <Route path="labs" element={<Labs />} />
            <Route path="labs/:labId" element={<LabViewer />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectViewer />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile" element={<Profile />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App