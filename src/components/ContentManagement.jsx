import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import PathEditor from './PathEditor'

export default function ContentManagement() {
  const { user } = useAuth()
  const [paths, setPaths] = useState([])
  const [selectedPath, setSelectedPath] = useState(null)

  useEffect(() => {
    if (user) {
      const storedPaths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
      const userPaths = storedPaths.filter(p => p.author === user.username)
      setPaths(userPaths)
    }
  }, [user])

  const handleSave = (updatedPath) => {
    const updatedPaths = paths.map(p => 
      p.id === updatedPath.id ? updatedPath : p
    )
    setPaths(updatedPaths)
    localStorage.setItem('learningPaths', JSON.stringify(updatedPaths))
  }

  return (
    <div className="content-management">
      <h1>Content Management</h1>
      
      <div className="path-list">
        {paths.map(path => (
          <div key={path.id} className="path-item">
            <h3>{path.title}</h3>
            <button onClick={() => setSelectedPath(path)}>Edit</button>
          </div>
        ))}
      </div>

      {selectedPath && (
        <div className="editor-container">
          <h2>Editing: {selectedPath.title}</h2>
          <PathEditor path={selectedPath} onSave={handleSave} />
        </div>
      )}
    </div>
  )
}
