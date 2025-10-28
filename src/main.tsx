import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Details from './components/Details/Details'

/**
 * Router to manage application routes
 * 2 pages, main list and details view
 *
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="/" replace />,
    children: [
      {
        path: 'details/:id',
        element: <Details />,
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
