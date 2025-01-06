import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <aside className="sidebar">
      <nav className="space-y-1">
        <Link
          to="/"
          className={`nav-item ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          🏠 Home
        </Link>
        
        <Link
          to="/search"
          className={`nav-item ${
            location.pathname === '/search' ? 'active' : ''
          }`}
        >
          🔍 Search
        </Link>
        
        {user && (
          <>
            <Link
              to="/dashboard"
              className={`nav-item ${
                location.pathname === '/dashboard' ? 'active' : ''
              }`}
            >
              📊 Dashboard
            </Link>
            
            <Link
              to="/content-management"
              className={`nav-item ${
                location.pathname === '/content-management' ? 'active' : ''
              }`}
            >
              📝 Content
            </Link>
            
            <Link
              to="/leaderboard"
              className={`nav-item ${
                location.pathname === '/leaderboard' ? 'active' : ''
              }`}
            >
              🏆 Leaderboard
            </Link>
          </>
        )}
      </nav>
    </aside>
  )
}
