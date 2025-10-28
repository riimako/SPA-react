import { useNavigate } from 'react-router'
import { Character } from '../../types'
import './card.css'

function Card({ character }: { character: Character }) {
  const navigate = useNavigate()
  return (
    <div
      className="card character-card"
      style={{
        background: `hsla(${character.id * 30}, 60%, 80%, 1)`,
      }}
      onClick={() => navigate(`/details/${character.id}`)}
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
  )
}

export default Card
