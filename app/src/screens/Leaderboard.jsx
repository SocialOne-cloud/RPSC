import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext'
import BottomNav from '../components/BottomNav'
import MoveIcon from '../components/MoveIcon'

const CITIES = [
  { rank: '01', name: 'Mexico City', count: '2,441,908' },
  { rank: '02', name: 'Lagos', count: '1,980,552' },
  { rank: '03', name: 'Jakarta', count: '1,744,301' },
  { rank: '04', name: 'São Paulo', count: '1,602,117' },
  { rank: '05', name: 'Manila', count: '1,488,930' },
  { rank: '06', name: 'Atlanta', count: '1,203,466' },
]

const fmt = n => n.toLocaleString('en-US')
const cap = w => w.charAt(0).toUpperCase() + w.slice(1)

export default function Leaderboard() {
  const { profile } = useApp()
  const [counts, setCounts] = useState({ rock: 41208663, paper: 39914502, scissor: 28441190 })

  useEffect(() => {
    const id = setInterval(() => {
      setCounts(c => ({
        rock: c.rock + 400 + Math.floor(Math.random() * 900),
        paper: c.paper + 380 + Math.floor(Math.random() * 880),
        scissor: c.scissor + 240 + Math.floor(Math.random() * 700),
      }))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const total = counts.rock + counts.paper + counts.scissor
  const pct = n => Math.round((n / total) * 100) + '%'
  const throws = [
    { name: 'Rock', move: 'rock', count: counts.rock },
    { name: 'Paper', move: 'paper', count: counts.paper },
    { name: 'Scissor', move: 'scissor', count: counts.scissor },
  ]

  const moveTally = {}
  profile.history.forEach(h => { moveTally[h.move] = (moveTally[h.move] || 0) + 1 })
  const top = Object.keys(moveTally).sort((a, b) => moveTally[b] - moveTally[a])[0]
  const mostThrown = top
    ? `${cap(top)} ${Math.round((moveTally[top] / profile.history.length) * 100)}%`
    : '—'

  return (
    <div className="screen" style={{ background: '#1E1E1E', color: '#ffffff' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '40px 20px 0', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Thrown right now</span>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F40009' }}>Live</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #ffffff' }}>
          {throws.map((t, i) => (
            <div key={t.name} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: i === throws.length - 1 ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.22)' }}>
              <MoveIcon move={t.move} size={40} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F40009' }}>{t.name}</span>
                <span className="num" style={{ fontSize: 38, lineHeight: 1 }}>{fmt(t.count)}</span>
              </div>
              <span className="num" style={{ fontSize: 26, color: '#F40009' }}>{pct(t.count)}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>
            Cities · matches today
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CITIES.map((c, i) => (
              <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 10, alignItems: 'baseline', padding: '9px 0', borderBottom: i === CITIES.length - 1 ? 'none' : '2px solid rgba(255,255,255,0.14)' }}>
                <span className="num" style={{ fontSize: 14, color: '#F40009' }}>{c.rank}</span>
                <span style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{c.name}</span>
                <span className="num" style={{ fontSize: 14 }}>{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F40009', color: '#ffffff', padding: '16px 18px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{profile.handle}</span>
            <span className="num" style={{ fontSize: 26, lineHeight: 1 }}>{profile.wins}–{profile.losses}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Most thrown</span>
            <span className="num" style={{ fontSize: 20 }}>{mostThrown}</span>
          </div>
        </div>
      </div>
      <BottomNav dark />
    </div>
  )
}
