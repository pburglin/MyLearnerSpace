import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'

export default function Leaderboard() {
  const { user } = useAuth()
  const { calculatePoints } = useProgress()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const users = JSON.parse(localStorage.getItem('learningPlatformUsers') || '[]')
    
    const leaderboardData = users.map(username => {
      const { learnerPoints, authorPoints } = calculatePoints(username)
      return {
        username,
        totalPoints: learnerPoints + authorPoints,
        learnerPoints,
        authorPoints
      }
    }).sort((a, b) => b.totalPoints - a.totalPoints)

    setLeaderboard(leaderboardData)
  }, [calculatePoints])

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Points</th>
            <th>Learner Points</th>
            <th>Author Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.username} className={user?.username === entry.username ? 'current-user' : ''}>
              <td>{index + 1}</td>
              <td>
                <a href={`/profile/${entry.username}`}>{entry.username}</a>
              </td>
              <td>{entry.totalPoints}</td>
              <td>{entry.learnerPoints}</td>
              <td>{entry.authorPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
