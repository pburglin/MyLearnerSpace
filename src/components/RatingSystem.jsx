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
    <div className="rating-system">
      <h3>Rate this path:</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`star ${star <= (userRating || rating) ? 'active' : ''}`}
            onClick={() => handleRate(star)}
            title={`Rate ${star} star${star > 1 ? 's' : ''}`}
            disabled={!user}
          >
            ⭐
          </button>
        ))}
      </div>
      <p>Current rating: {rating.toFixed(1)}</p>
    </div>
  )
}
