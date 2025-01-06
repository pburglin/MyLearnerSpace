import { useState, useEffect, useCallback } from 'react'
import { config } from '../config'

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
        learnerPoints += completedItems * config.points.perItem
        
        // Points for completed paths
        if (completedItems === path.items.length) {
          learnerPoints += config.points.perPathCompletion
        }
      }
    })

    // Calculate author points
    paths.filter(p => p.author === username).forEach(path => {
      // Points for publishing path
      authorPoints += config.points.authorPerPublication
      
      // Points based on others' progress
      const pathProgress = progress[path.id] || {}
      const completedItems = Object.values(pathProgress).filter(Boolean).length
      
      // Points for completed items
      authorPoints += completedItems * config.points.authorPerItemCompletion
      
      // Points for completed paths
      if (completedItems === path.items.length) {
        authorPoints += config.points.authorPerPathCompletion
      }
    })

    return { learnerPoints, authorPoints }
  }, [])

  return { progress, updateProgress, calculatePoints }
}
