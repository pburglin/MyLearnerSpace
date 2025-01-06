import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CreatePath from './pages/CreatePath'
import AuthForm from './components/AuthForm'
import Navbar from './components/Navbar'
import Leaderboard from './components/Leaderboard'
import PathDetail from './pages/PathDetail'
import Search from './components/Search'
import LearnerDashboard from './pages/LearnerDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import ContentManagement from './components/ContentManagement'
import { useAuth } from './hooks/useAuth'
import { config } from './config'
import Sidebar from './components/Sidebar'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || config.defaultTheme
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div data-theme={theme} className="main-layout">
      <Sidebar />
      
      <div className="main-content">
        <Navbar toggleTheme={toggleTheme} user={user} logout={logout} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/create-path" element={<CreatePath />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/register" element={<AuthForm type="register" />} />
          <Route path="/path/:id" element={<PathDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
          <Route path="/content-management" element={<ContentManagement />} />
        </Routes>
      </div>
    </div>
  )
}
