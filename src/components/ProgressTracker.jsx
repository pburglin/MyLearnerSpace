import { useState } from 'react'

export default function ProgressTracker({ path, progress, onUpdate }) {
  const totalItems = path.items.length
  const completedItems = Object.values(progress[path.id] || {}).filter(Boolean).length

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${(completedItems / totalItems) * 100}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {completedItems}/{totalItems} items completed
        </div>
      </div>

      <div className="space-y-2">
        {path.items.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={!!progress[path.id]?.[item.id]}
              onChange={(e) => onUpdate(path.id, item.id, e.target.checked)}
              className="mr-2"
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
