import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // TODO: Fetch user data
    setUser({
      username,
      points: 100,
      completedPaths: 5,
      createdPaths: 2
    })
  }, [username])

  if (!user) return <div>Loading...</div>

  return (
    <div className="profile">
      <h1>{user.username}'s Profile</h1>
      <div className="stats">
        <div className="stat">
          <h3>Points</h3>
          <p>{user.points}</p>
        </div>
        <div className="stat">
          <h3>Completed Paths</h3>
          <p>{user.completedPaths}</p>
        </div>
        <div className="stat">
          <h3>Created Paths</h3>
          <p>{user.createdPaths}</p>
        </div>
      </div>
    </div>
  )
}
