import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LearningPathCard from './LearningPathCard'

export default function AuthorDashboard() {
  const { user } = useAuth()
  const [authoredPaths, setAuthoredPaths] = useState([])

  useEffect(() => {
    if (user) {
      const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
      const userPaths = paths.filter(p => p.author === user.username)
      setAuthoredPaths(userPaths)
    }
  }, [user])

  if (!user) {
    return <div>Please login to view your author dashboard</div>
  }

  return (
    <div className="dashboard">
      <h1>Your Author Dashboard</h1>
      
      <div className="stats">
        <div className="stat">
          <h3>Published Paths</h3>
          <p>{authoredPaths.length}</p>
        </div>
      </div>

      <div className="authored-paths">
        <h2>Your Learning Paths</h2>
        <div className="paths-grid">
          {authoredPaths.map(path => (
            <LearningPathCard key={path.id} path={path} editable />
          ))}
        </div>
      </div>
    </div>
  )
}
