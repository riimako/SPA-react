import React from 'react'
import './filters.css'

interface ListControlsProps {
  onSearchChange: (searchText: string) => void
  onSortChange: (sortBy: string) => void
  currentSort: string
}

const Filters: React.FC<ListControlsProps> = ({
  onSearchChange,
  onSortChange,
  currentSort,
}) => {
  return (
    <div className="list-controls-container">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="search-input"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="sort-control">
        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  )
}

export default Filters
