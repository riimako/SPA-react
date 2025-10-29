import { InfiniteData } from '@tanstack/react-query'
import { ApiResponse, Character } from '../../types'

interface ErrorControlProps {
  status: string
  error: Error | null
  data: InfiniteData<ApiResponse<Character[]>, unknown> | undefined
}
function ErrorControl({ status, error, data }: ErrorControlProps) {
  if (status === 'success' && data?.pages[0].results.length === 0) {
    return <p>No characters found matching the filters.</p>
  }
  if (status === 'error') {
    return <p>Error: {error?.message}</p>
  }
  if (status === 'pending') {
    return <p>Loading...</p>
  }
  return null
}

export default ErrorControl
