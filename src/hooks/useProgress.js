import { useState, useEffect, useCallback } from 'react'

export function useProgress() {
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const storedProgress = localStorage.getItem('learningProgress')
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress))
    }
  }, [])

  const updateProgress = (pathId, itemId, completed) => {
    const newProgress = {
      ...progress,
      [pathId]: {
        ...(progress[pathId] || {}),
        [itemId]: completed
      }
    }
    localStorage.setItem('learningProgress', JSON.stringify(newProgress))
    setProgress(newProgress)
  }

  const calculatePoints = useCallback((username) => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
    
    let learnerPoints = 0
    let authorPoints = 0

    // Calculate learner points
    Object.entries(progress).forEach(([pathId, items]) => {
      const completedItems = Object.values(items).filter(Boolean).length
      const path = paths.find(p => p.id === pathId)
      
      if (path) {
        // Points for completed items
        learnerPoints += completedItems * 1
        
        // Points for completed paths
        if (completedItems === path.items.length) {
          learnerPoints += 10
        }
      }
    })

    // Calculate author points
    paths.filter(p => p.author === username).forEach(path => {
      // Points for publishing path
      authorPoints += 10
      
      // Points based on others' progress
      const pathProgress = progress[path.id] || {}
      const completedItems = Object.values(pathProgress).filter(Boolean).length
      
      // Points for completed items
      authorPoints += completedItems * 1
      
      // Points for completed paths
      if (completedItems === path.items.length) {
        authorPoints += 3
      }
    })

    return { learnerPoints, authorPoints }
  }, [])

  return { progress, updateProgress, calculatePoints }
}
