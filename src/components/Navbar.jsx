import { Link } from 'react-router-dom'

export default function Navbar({ toggleTheme, user, logout }) {
  return (
    <nav>
      <div className="container">
        <Link to="/">Learning Platform</Link>
        <div className="nav-right">
          <button onClick={toggleTheme}>Toggle Theme</button>
          <Link to="/search" title="Search learning paths">
            🔍 Search
          </Link>
          <Link to="/leaderboard" title="View leaderboard">
            🏆 Leaderboard
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" title="Your dashboard">
                📊 Dashboard
              </Link>
              <Link to="/author-dashboard" title="Author dashboard">
                ✍️ Author Dashboard
              </Link>
              <Link to="/create-path" title="Create new learning path">
                ➕ Create Path
              </Link>
              <Link to={`/profile/${user.username}`} title="Your profile">
                👤 Profile
              </Link>
              <button onClick={logout} title="Logout">
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" title="Login">
                🔑 Login
              </Link>
              <Link to="/register" title="Register">
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
