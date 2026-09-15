import { FistIcon, PalmIcon, PeaceIcon } from './HandIcon'

export default function MoveIcon({ move, size = 96 }) {
  if (move === 'paper') return <PalmIcon size={size} />
  if (move === 'rock') return <FistIcon size={size} />
  return <PeaceIcon size={size} />
}
