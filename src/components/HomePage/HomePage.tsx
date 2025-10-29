import { createContext, useState } from 'react'
import CharacterList from '../CharacterList/CharacterList'
import Filters from '../Filters/Filters'
import { FiltersType } from '../../types'

export const FiltersContext = createContext<{
  sortBy: string
  filters: FiltersType
}>({
  sortBy: '',
  filters: {
    name: '',
    status: '',
    species: '',
    gender: '',
  },
})

function HomePage() {
  const [sortBy, setSortBy] = useState('')
  const [filterValues, setFilterValues] = useState<FiltersType>({
    name: '',
    status: '',
    species: '',
    gender: '',
  })
  return (
    <FiltersContext value={{ filters: filterValues, sortBy }}>
      <Filters
        onSearchChange={(value) => {
          setFilterValues((prev) => ({
            ...prev,
            name: value,
          }))
        }}
        onSortChange={(sortBy) => {
          setSortBy(sortBy)
        }}
        onFilterChange={(key, value) => {
          setFilterValues((prev) => ({
            ...prev,
            [key]: value,
          }))
        }}
      />
      <CharacterList />
    </FiltersContext>
  )
}

export default HomePage
