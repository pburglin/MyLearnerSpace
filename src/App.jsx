import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import { useAuth } from './hooks/useAuth'

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  const { user, logout } = useAuth()

  return (
    <div data-theme={theme}>
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
      </Routes>
    </div>
  )
}
