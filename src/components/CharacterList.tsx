import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiResponse, Character } from '../types'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

function CharacterList() {
  const { ref, inView } = useInView()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: async ({ pageParam }): Promise<ApiResponse<Character[]>> => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageParam}`
      )
      return await response.json()
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
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.pages.map((page) => (
            <Fragment key={page.info.next || 'last-page'}>
              {page.results.map((character) => (
                <div
                  className="card character-card"
                  style={{
                    background: `hsla(${character.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={character.id}
                >
                  <div className="card-image-container">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="card-image"
                    />

                    <div className="card-overlay">
                      <p className="overlay-text">{character.gender}</p>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">{character.species}</p>
                  </div>
                </div>
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
