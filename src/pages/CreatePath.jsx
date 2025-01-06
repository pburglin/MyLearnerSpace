import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function CreatePath() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [path, setPath] = useState({
    title: '',
    description: '',
    image: '',
    items: []
  })

  const addItem = () => {
    setPath(prev => ({
      ...prev,
      items: [...prev.items, { 
        id: crypto.randomUUID(),
        title: '', 
        description: '', 
        url: '', 
        image: '' 
      }]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newPath = {
      ...path,
      id: crypto.randomUUID(),
      author: user.username,
      createdAt: new Date().toISOString(),
      rating: 0,
      ratings: {}
    }

    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    localStorage.setItem('learningPaths', JSON.stringify([...paths, newPath]))
    
    navigate(`/path/${newPath.id}`)
  }

  if (!user) {
    return <div>Please login to create learning paths</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Create Learning Path</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Path Details</h2>
          
          <div className="space-y-4">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={path.title}
                onChange={(e) => setPath(p => ({ ...p, title: e.target.value }))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={path.description}
                onChange={(e) => setPath(p => ({ ...p, description: e.target.value }))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={path.image}
                onChange={(e) => setPath(p => ({ ...p, image: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Items</h2>
          
          {path.items.map((item, index) => (
            <div key={item.id} className="card p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">Item {index + 1}</h3>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => setPath(p => ({
                      ...p,
                      items: p.items.map((it, i) => 
                        i === index ? { ...it, title: e.target.value } : it
                      )
                    }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => setPath(p => ({
                      ...p,
                      items: p.items.map((it, i) => 
                        i === index ? { ...it, description: e.target.value } : it
                      )
                    }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>URL</label>
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => setPath(p => ({
                      ...p,
                      items: p.items.map((it, i) => 
                        i === index ? { ...it, url: e.target.value } : it
                      )
                    }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={item.image}
                    onChange={(e) => setPath(p => ({
                      ...p,
                      items: p.items.map((it, i) => 
                        i === index ? { ...it, image: e.target.value } : it
                      )
                    }))}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addItem}
            className="bg-secondary text-foreground px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          >
            Add Learning Item
          </button>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-hover transition-colors"
        >
          Create Learning Path
        </button>
      </form>
    </div>
  )
}
