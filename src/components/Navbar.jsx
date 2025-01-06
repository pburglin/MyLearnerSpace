import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar({ toggleTheme, user, logout }) {
  return (
    <nav className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="button"
        >
          Toggle Theme
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to={`/profile/${user.username}`} className="button">
              👤 Profile
            </Link>
            <button 
              onClick={logout}
              className="button bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="button">
              🔑 Login
            </Link>
            <Link to="/register" className="button">
              📝 Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
