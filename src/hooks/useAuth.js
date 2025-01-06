import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('learningPlatformUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username, password) => {
    const user = { username }
    localStorage.setItem('learningPlatformUser', JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('learningPlatformUser')
    setUser(null)
  }

  const register = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('learningPlatformUsers') || '[]')
    if (existingUsers.includes(username)) {
      throw new Error('Username already exists')
    }
    localStorage.setItem('learningPlatformUsers', JSON.stringify([...existingUsers, username]))
    login(username, password)
  }

  return { user, login, logout, register }
}
