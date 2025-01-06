import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import LearningPathCard from '../components/LearningPathCard'

export default function LearnerDashboard() {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [enrolledPaths, setEnrolledPaths] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
      const userProgress = Object.keys(progress)
      const enrolled = paths.filter(p => userProgress.includes(p.id))
      setEnrolledPaths(enrolled)
      setLoading(false)
    }
  }, [progress, user])

  if (!user) {
    return <div>Please login to view your dashboard</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Enrolled Paths</h3>
          <p className="text-2xl font-bold">{enrolledPaths.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Completed Items</h3>
          <p className="text-2xl font-bold">
            {Object.values(progress).flatMap(p => Object.values(p)).filter(Boolean).length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledPaths.map(path => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  )
}
