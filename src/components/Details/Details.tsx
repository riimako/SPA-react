import { Navigate, useParams } from 'react-router'

function Details() {
  const { id } = useParams<{ id: string }>()

  const isValidId = id && !isNaN(Number(id))

  if (!isValidId) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <h2>Página de Detalles</h2>
      <p>Mostrando detalles para el ID: **{id}**</p>
    </div>
  )
}

export default Details
