import { useAuth } from '../hooks/useAuth'
import LearningPathForm from '../components/LearningPathForm'

export default function CreatePath() {
  const { user } = useAuth()

  const handleSubmit = (path) => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const newPath = {
      ...path,
      id: crypto.randomUUID(),
      author: user.username,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('learningPaths', JSON.stringify([...paths, newPath]))
    alert('Learning path created successfully!')
  }

  if (!user) {
    return <div>Please login to create learning paths</div>
  }

  return (
    <div>
      <h1>Create Learning Path</h1>
      <LearningPathForm onSubmit={handleSubmit} />
    </div>
  )
}
