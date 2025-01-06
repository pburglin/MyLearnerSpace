import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = () => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    const filtered = paths.filter(path => 
      path.title.toLowerCase().includes(query.toLowerCase()) ||
      path.description.toLowerCase().includes(query.toLowerCase()) ||
      path.items.some(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    )
    setResults(filtered)
  }

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search learning paths..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map(path => (
            <div key={path.id} className="result-item">
              <Link to={`/path/${path.id}`}>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="stats">
                  <span>⭐ {path.rating?.toFixed(1) || 'No ratings'}</span>
                  <span>👤 {path.author}</span>
                  <span>📅 {new Date(path.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
