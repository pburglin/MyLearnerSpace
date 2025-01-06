import { useState } from 'react'

export default function LearningPathForm({ onSubmit }) {
  const [path, setPath] = useState({
    title: '',
    description: '',
    image: '',
    items: []
  })

  const addItem = () => {
    setPath(prev => ({
      ...prev,
      items: [...prev.items, { title: '', description: '', url: '', image: '' }]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(path)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Learning Path</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={path.title}
          onChange={(e) => setPath(p => ({ ...p, title: e.target.value }))}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={path.description}
          onChange={(e) => setPath(p => ({ ...p, description: e.target.value }))}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="url"
          value={path.image}
          onChange={(e) => setPath(p => ({ ...p, image: e.target.value }))}
        />
      </div>

      <h3>Learning Items</h3>
      {path.items.map((item, index) => (
        <div key={index} className="learning-item">
          <h4>Item {index + 1}</h4>
          <div>
            <label>Title:</label>
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
          <div>
            <label>Description:</label>
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
          <div>
            <label>URL:</label>
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
          <div>
            <label>Image URL:</label>
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
      ))}
      <button type="button" onClick={addItem}>Add Learning Item</button>
      <button type="submit">Create Path</button>
    </form>
  )
}
