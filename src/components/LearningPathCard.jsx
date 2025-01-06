import { Link } from 'react-router-dom'

export default function LearningPathCard({ path }) {
  return (
    <div className="card animate-fade-in">
      <img 
        src={path.image || '/placeholder.jpg'} 
        alt={path.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{path.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ⭐ {path.rating?.toFixed(1) || 'No ratings'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              👤 {path.author}
            </span>
          </div>
          <Link 
            to={`/path/${path.id}`}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
          >
            View Path
          </Link>
        </div>
      </div>
    </div>
  )
}
