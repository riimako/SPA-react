import { useState } from 'react'
import CharacterList from '../CharacterList/CharacterList'
import Filters from '../Filters/Filters'

function HomePage() {
  const [sortBy, setSortBy] = useState('')
  return (
    <>
      <Filters
        currentSort={sortBy}
        onSearchChange={() => console.log('test')}
        onSortChange={(sortBy) => {
          setSortBy(sortBy)
        }}
      />
      <CharacterList sortBy={sortBy} />
    </>
  )
}

export default HomePage
