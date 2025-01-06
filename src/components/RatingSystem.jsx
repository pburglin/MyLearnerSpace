import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function RatingSystem({ pathId }) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const path = paths.find(p => p.id === pathId)
    if (path) {
      setRating(path.rating || 0)
      if (user && path.ratings?.[user.username]) {
        setUserRating(path.ratings[user.username])
      }
    }
  }, [pathId, user])

  const handleRate = (newRating) => {
    if (!user) return
    
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const updatedPaths = paths.map(p => {
      if (p.id === pathId) {
        const ratings = p.ratings || {}
        ratings[user.username] = newRating
        
        // Calculate new average rating
        const ratingValues = Object.values(ratings)
        const newAverage = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
        
        return {
          ...p,
          ratings,
          rating: newAverage
        }
      }
      return p
    })
    
    localStorage.setItem('learningPaths', JSON.stringify(updatedPaths))
    setRating(newAverage)
    setUserRating(newRating)
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-2">Rate this path:</h3>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`text-2xl ${
              star <= (userRating || rating) 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
            onClick={() => handleRate(star)}
            title={`Rate ${star} star${star > 1 ? 's' : ''}`}
            disabled={!user}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Current rating: {rating.toFixed(1)} ({Object.keys(path.ratings || {}).length} ratings)
      </p>
    </div>
  )
}
