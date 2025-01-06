import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthForm({ type }) {
  const { login, register } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (type === 'login') {
        await login(username, password)
      } else {
        await register(username, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-secondary rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            className="w-full"
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full"
          />
        </div>
        
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary-hover">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}
