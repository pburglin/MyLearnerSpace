import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [filters, setFilters] = useState({
    sortBy: 'recent',
    minRating: 0,
    author: ''
  })

  const handleSearch = () => {
    const paths = JSON.parse(localStorage.getItem('learningPaths') || '[]')
    
    let filtered = paths.filter(path => {
      const matchesQuery = path.title.toLowerCase().includes(query.toLowerCase()) ||
        path.description.toLowerCase().includes(query.toLowerCase()) ||
        path.items.some(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        )
      
      const matchesRating = path.rating >= filters.minRating
      const matchesAuthor = filters.author ? path.author === filters.author : true
      
      return matchesQuery && matchesRating && matchesAuthor
    })

    // Sorting
    if (filters.sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (filters.sortBy === 'popular') {
      // TODO: Implement popularity sorting
    }

    setResults(filtered)
  }

  return (
    <div className="search-container">
      <div className="search-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search learning paths..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filters">
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(f => ({ ...f, sortBy: e.target.value }))}
        >
          <option value="recent">Most Recent</option>
          <option value="rating">Highest Rating</option>
          <option value="popular">Most Popular</option>
        </select>

        <select
          value={filters.minRating}
          onChange={(e) => setFilters(f => ({ ...f, minRating: Number(e.target.value) }))}
        >
          <option value={0}>Any Rating</option>
          <option value={1}>1+ Stars</option>
          <option value={2}>2+ Stars</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <input
          type="text"
          value={filters.author}
          onChange={(e) => setFilters(f => ({ ...f, author: e.target.value }))}
          placeholder="Filter by author..."
        />
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
