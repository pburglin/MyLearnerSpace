import { useEffect, useState } from 'react'
import LearningPathCard from '../components/LearningPathCard'

export default function Home() {
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const storedPaths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    setPaths(storedPaths)
  }, [])

  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Learning Platform
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map(path => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>
    </main>
  )
}
