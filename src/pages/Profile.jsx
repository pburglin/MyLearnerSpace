import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import LearningPathCard from '../components/LearningPathCard'

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
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{profile.username}'s Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Points</h3>
          <p className="text-2xl font-bold">{profile.totalPoints}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Learner Points</h3>
          <p className="text-2xl font-bold">{profile.learnerPoints}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Author Points</h3>
          <p className="text-2xl font-bold">{profile.authorPoints}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Paths Created</h3>
          <p className="text-2xl font-bold">{profile.pathsCreated}</p>
        </div>
      </div>

      {authoredPaths.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Authored Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authoredPaths.map(path => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
