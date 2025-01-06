import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'

export default function PathDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { progress, updateProgress } = useProgress()
  const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
  const path = paths.find(p => p.id === id)

  if (!path) {
    return <div>Path not found</div>
  }

  return (
    <div className="path-detail">
      <h1>{path.title}</h1>
      <img src={path.image} alt={path.title} />
      <p>{path.description}</p>
      
      {user && (
        <ProgressTracker
          path={path}
          progress={progress}
          onUpdate={updateProgress}
        />
      )}

      <h2>Learning Items</h2>
      <div className="items-list">
        {path.items.map((item, index) => (
          <div key={index} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Go to Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
