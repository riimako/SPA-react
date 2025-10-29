import { Link } from 'react-router'
import './card.css'
import { Character } from '../../types'

const Card = ({ character }: { character: Character }) => {
  const detailPath = `/details/${character.id}`

  return (
    <Link to={detailPath} className="user-card-link">
      <div className="user-card">
        <div className="card-avatar-container">
          <img
            src={character.image}
            alt={`Photo ${character.name}`}
            className="card-avatar"
          />
        </div>
        <div className="card-info">
          <h3 className="card-name">{character.name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default Card
