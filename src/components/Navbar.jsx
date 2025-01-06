// ... previous imports
import { Link } from 'react-router-dom'

export default function Navbar({ toggleTheme, user, logout }) {
  return (
    <nav>
      <div className="container">
        <Link to="/">Learning Platform</Link>
        <div className="nav-right">
          <button onClick={toggleTheme}>Toggle Theme</button>
          {user ? (
            <>
              <Link to="/create-path">Create Path</Link>
              <Link to={`/profile/${user.username}`}>Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
