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
import { useAuth } from './hooks/useAuth'

export default function App() {
  const [theme, setTheme] = useState('light')
  const { user, logout } = useAuth()

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

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
      </Routes>
    </div>
  )
}
