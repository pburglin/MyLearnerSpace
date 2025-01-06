import { Link } from 'react-router-dom'

export default function Navbar({ toggleTheme, user, logout }) {
  return (
    <nav className="shadow-lg">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Learning Platform
        </Link>
        
        <div className="nav-right">
          <button 
            onClick={toggleTheme}
            className="bg-secondary text-foreground px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          >
            Toggle Theme
          </button>
          
          <Link to="/search" className="hover:text-primary">
            🔍 Search
          </Link>
          
          <Link to="/leaderboard" className="hover:text-primary">
            🏆 Leaderboard
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-primary">
                📊 Dashboard
              </Link>
              <Link to="/content-management" className="hover:text-primary">
                📝 Content
              </Link>
              <Link to="/create-path" className="hover:text-primary">
                ➕ Create
              </Link>
              <Link to={`/profile/${user.username}`} className="hover:text-primary">
                👤 Profile
              </Link>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">
                🔑 Login
              </Link>
              <Link to="/register" className="hover:text-primary">
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
