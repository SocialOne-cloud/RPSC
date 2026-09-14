export default function MoveIcon({ move, size = 96 }) {
  if (move === 'paper') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="#ffffff" stroke="#F40009" strokeWidth="2.5">
        <path d="M8 14h22l10 10v20H8z" />
        <path d="M30 14v10h10" fill="#F40009" stroke="none" />
        <path d="M30 14v10h10" />
      </svg>
    )
  }
  if (move === 'rock') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="#ffffff">
        <path d="M10 30l4-12 10-6 12 4 4 12-6 10H16z" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="4">
      <path d="M14 8l18 24M34 8L16 32" />
      <circle cx="13" cy="38" r="5" />
      <circle cx="35" cy="38" r="5" />
    </svg>
  )
}
