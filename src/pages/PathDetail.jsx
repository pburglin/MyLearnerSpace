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
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{path.title}</h1>
          <img 
            src={path.image} 
            alt={path.title} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-lg mb-8">{path.description}</p>

          <h2 className="text-2xl font-bold mb-4">Learning Items</h2>
          <div className="space-y-4">
            {path.items.map((item, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="mb-4">{item.description}</p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Go to Resource
                </a>
              </div>
            ))}
          </div>
        </div>

        {user && (
          <div>
            <ProgressTracker
              path={path}
              progress={progress}
              onUpdate={updateProgress}
            />
          </div>
        )}
      </div>
    </div>
  )
}
