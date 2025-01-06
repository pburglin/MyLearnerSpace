// ... previous imports
import AuthForm from './components/AuthForm'
import CreatePath from './pages/CreatePath'

function App() {
  const { user, logout } = useAuth()
  // ... existing theme state

  return (
    <div data-theme={theme}>
      <Navbar toggleTheme={toggleTheme} user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/create-path" element={<CreatePath />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
      </Routes>
    </div>
  )
}
