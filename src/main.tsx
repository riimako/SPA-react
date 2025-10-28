import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EpisodeList from './components/EpisodeList'
import CharacterList from './components/CharacterList'
import LocationList from './components/LocationList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'characters',
        element: <CharacterList />,
      },
      {
        path: 'episodes',
        element: <EpisodeList />,
      },
      {
        path: 'locations',
        element: <LocationList />,
      },
    ],
  },
])

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
