import React, { useContext, useState } from 'react'
import './filters.css'
import { FiltersType } from '../../types'
import { FiltersContext } from '../HomePage/HomePage'

interface FiltersProps {
  onSearchChange: (searchText: string) => void
  onSortChange: (sortBy: string) => void
  onFilterChange: (
    key: 'status' | 'species' | 'type' | 'gender',
    value: string
  ) => void
}

const Filters = ({
  onSearchChange,
  onSortChange,
  onFilterChange,
}: FiltersProps) => {
  const { filters, sortBy } = useContext(FiltersContext)
  const [nameFilter, setNameFilter] = useState(filters.name ?? '')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    onFilterChange(name as any, value)
  }
  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        onChange={(e) => {
          setNameFilter(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchChange(nameFilter)
          }
        }}
        onBlur={(e) => onSearchChange(e.target.value)}
        value={nameFilter}
      />

      <div className="specific-filters">
        <select
          name="species"
          className="filter-select"
          onChange={handleSelectChange}
          value={filters.species}
        >
          <option value="">Specie (All)</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>

        <select
          name="status"
          className="filter-select"
          onChange={handleSelectChange}
          value={filters.status}
        >
          <option value="">Status (All)</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          name="gender"
          className="filter-select"
          onChange={handleSelectChange}
          value={filters.gender}
        >
          <option value="">Gender (All)</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="sort-control">
        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
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
