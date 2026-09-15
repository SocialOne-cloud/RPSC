import rock from '../assets/rock.png'
import paper from '../assets/paper.png'
import scissor from '../assets/scissor.png'

const SRC = { rock, paper, scissor }

// The supplied assets are red discs with the white ring already baked in, so
// on the red ground only the ring and the hand read. No CSS ring here — adding
// one doubles it up against the artwork's own.
export default function MoveIcon({ move, size = 104 }) {
  return (
    <img
      src={SRC[move] || SRC.rock}
      alt={move || 'move'}
      style={{
        width: size,
        height: size,
        display: 'block',
        flex: 'none',
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  )
}
