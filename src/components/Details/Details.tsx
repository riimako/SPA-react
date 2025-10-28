import { Navigate, useNavigate, useParams } from 'react-router'
import './details.css'
import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query'
import { Character, Episode, Location } from '../../types'
import { useState } from 'react'
import ActiveTabContent from './ActiveTabContent'

function Details() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('locations')

  const isValidId = id && !isNaN(Number(id))

  if (!isValidId) {
    return <Navigate to="/" replace />
  }

  const {
    isPending: charPending,
    isError,
    data: character,
    error,
  } = useQuery<Character>({
    queryKey: ['detail', id],
    queryFn: async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      )
      return await response.json()
    },
  })
  const episodeUrls = character?.episode || []
  const locationUrls = Array.from(
    new Set(
      [character?.origin?.url, character?.location?.url].filter(
        (url) => url
      ) as string[]
    )
  )

  const episodeResults = useQueries<Episode[]>({
    queries: episodeUrls.map((url) => {
      const episodeId = url.split('/').pop()

      return {
        queryKey: ['episode', episodeId, id],
        queryFn: async () => {
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(`Failed to fetch episode at ${url}`)
          }
          return await response.json()
        },
        enabled: episodeUrls.length > 0,
      }
    }),
  })

  const locationResults = useQueries<Location[]>({
    queries: locationUrls.map((url) => {
      const locationId = url.split('/').pop()
      return {
        queryKey: ['location', locationId, id],
        queryFn: async () => {
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(`Failed to fetch location at ${url}`)
          }
          return await response.json()
        },
        enabled: locationUrls.length > 0,
      }
    }),
  })

  if (charPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className="profile-wrapper">
      <button
        onClick={() => {
          navigate('/')
        }}
        className="back-to-list-button"
      >
        &larr; Volver al Listado
      </button>
      <div className="profile-container">
        <header className="profile-header">
          <img
            src={character.image}
            alt={`Profile ${character.name}`}
            className="profile-image"
          />
          <div className="profile-info">
            <h1 className="profile-name">{character.name}</h1>
            <p className="profile-title">{character.gender}</p>
            <p className="profile-specie">{character.species}</p>
            <p className="profile-specie">{character.status}</p>
          </div>
        </header>

        <nav className="profile-tabs">
          <button
            onClick={() => setActiveTab('locations')}
            className={
              activeTab === 'locations' ? 'tab-button active' : 'tab-button'
            }
          >
            Locations
          </button>
          <button
            onClick={() => setActiveTab('episodes')}
            className={
              activeTab === 'episodes' ? 'tab-button active' : 'tab-button'
            }
          >
            Episodes
          </button>
        </nav>

        <ActiveTabContent
          episodeResults={episodeResults as UseQueryResult<Episode>[]}
          activeTab={activeTab}
          locationResults={locationResults as UseQueryResult<Location>[]}
        />
      </div>
    </div>
  )
}

export default Details
