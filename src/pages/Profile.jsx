import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function Profile() {
  const { username } = useParams()
  const { calculatePoints } = useProgress()
  const [profile, setProfile] = useState(null)
  const [authoredPaths, setAuthoredPaths] = useState([])

  useEffect(() => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const userPaths = paths.filter(p => p.author === username)
    
    const { learnerPoints, authorPoints } = calculatePoints(username)
    
    setProfile({
      username,
      learnerPoints,
      authorPoints,
      totalPoints: learnerPoints + authorPoints,
      pathsCreated: userPaths.length,
      pathsCompleted: Object.values(JSON.parse(localStorage.getItem('learningProgress') || '{}'))
        .filter(progress => Object.values(progress).every(Boolean)).length
    })
    
    setAuthoredPaths(userPaths)
  }, [username, calculatePoints])

  if (!profile) return <div>Loading...</div>

  return (
    <div className="profile">
      <h1>{profile.username}'s Profile</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Points</h3>
          <p>{profile.totalPoints}</p>
        </div>
        <div className="stat-card">
          <h3>Learner Points</h3>
          <p>{profile.learnerPoints}</p>
        </div>
        <div className="stat-card">
          <h3>Author Points</h3>
          <p>{profile.authorPoints}</p>
        </div>
        <div className="stat-card">
          <h3>Paths Created</h3>
          <p>{profile.pathsCreated}</p>
        </div>
        <div className="stat-card">
          <h3>Paths Completed</h3>
          <p>{profile.pathsCompleted}</p>
        </div>
      </div>

      {authoredPaths.length > 0 && (
        <div className="authored-paths">
          <h2>Authored Learning Paths</h2>
          <div className="paths-list">
            {authoredPaths.map(path => (
              <div key={path.id} className="path-card">
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="stats">
                  <span>⭐ {path.rating?.toFixed(1) || 'No ratings'}</span>
                  <span>📅 {new Date(path.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
