import { useState } from 'react'

export default function PathEditor({ path, onSave }) {
  const [editedPath, setEditedPath] = useState(path)

  const handleChange = (field, value) => {
    setEditedPath(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleItemChange = (index, field, value) => {
    setEditedPath(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedPath)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={editedPath.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={editedPath.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="url"
          value={editedPath.image}
          onChange={(e) => handleChange('image', e.target.value)}
        />
      </div>

      <h3>Learning Items</h3>
      {editedPath.items.map((item, index) => (
        <div key={index} className="learning-item">
          <h4>Item {index + 1}</h4>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleItemChange(index, 'title', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              required
            />
          </div>
          <div>
            <label>URL:</label>
            <input
              type="url"
              value={item.url}
              onChange={(e) => handleItemChange(index, 'url', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="url"
              value={item.image}
              onChange={(e) => handleItemChange(index, 'image', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button type="submit">Save Changes</button>
    </form>
  )
}
