import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiResponse, Character, FiltersType } from '../../types'
import { Fragment, useContext, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Card from '../Card/Card'
import './characterList.css'
import { FiltersContext } from '../HomePage/HomePage'
import { objectToQueryString } from './query-string'

function CharacterList() {
  const { ref, inView } = useInView()
  const { filters, sortBy } = useContext(FiltersContext)

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters', filters],
    queryFn: async ({ pageParam }): Promise<ApiResponse<Character[]>> => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageParam}&${objectToQueryString(filters)}`
      )
      if (response.status === 404) {
        // API returned 404 Not Found when no items match the filters
        return {
          info: { next: '', prev: '', pages: 0, count: 0 },
          results: [],
        }
      }

      return response.json()
    },
    initialPageParam: 0,
    getNextPageParam: (data) =>
      data?.info.next
        ? Number(new URL(data.info.next).searchParams.get('page'))
        : undefined,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  
  return (
    <div className="card-grid">
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : data?.pages[0].results.length === 0 ? (
        <p>No characters found matching the filters.</p>
      ) : (
        <>
          {data.pages.map((page) => (
            <Fragment key={page.info.next || 'last-page'}>
              {page.results
                .sort((a, b) => {
                  if (sortBy === 'name-asc') {
                    return a.name.localeCompare(b.name)
                  } else if (sortBy === 'name-desc') {
                    return a.name.localeCompare(b.name) * -1
                  } else {
                    if (a.id < b.id) return -1
                    if (a.id > b.id) return 1
                    return 0
                  }
                })
                .map((character) => (
                  <Card key={character.id} character={character} />
                ))}
            </Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load Newer'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
    </div>
  )
}

export default CharacterList
