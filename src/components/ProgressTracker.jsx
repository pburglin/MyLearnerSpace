import { useState } from 'react'

export default function ProgressTracker({ path, progress, onUpdate }) {
  const totalItems = path.items.length
  const completedItems = Object.values(progress[path.id] || {}).filter(Boolean).length

  return (
    <div className="progress-tracker">
      <h3>Progress: {completedItems}/{totalItems}</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${(completedItems / totalItems) * 100}%` }}
        />
      </div>
      <div className="items-list">
        {path.items.map((item, index) => (
          <div key={index} className="item">
            <label>
              <input
                type="checkbox"
                checked={!!progress[path.id]?.[item.id]}
                onChange={(e) => onUpdate(path.id, item.id, e.target.checked)}
              />
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
