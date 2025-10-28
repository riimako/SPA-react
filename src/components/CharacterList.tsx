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

  console.log({ data })
  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.pages.map((page) => (
            <Fragment key={page.info.next || 'last-page'}>
              {page.results.map((character) => (
                <p
                  style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '10rem 1rem',
                    background: `hsla(${character.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={character.id}
                >
                  <img src={character.image}></img>
                  {character.name}
                </p>
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
