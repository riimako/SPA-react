interface LocationInfo {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown' | string
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | string
  origin: LocationInfo
  location: LocationInfo
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface ApiResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T
}

export interface FiltersType {
  name: string
  status: string
  species: string
  gender: string
}
