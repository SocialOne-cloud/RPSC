import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { ArrowRight } from '../components/icons'
import MoveIcon from '../components/MoveIcon'
import coke from '../assets/coke-tight.png'

const ICON = 104
const GAP = 14
const BOX = ICON * 2 + GAP

// Rock on top, paper and scissor below — positions are icon centres inside BOX.
const ORBIT = [
  { move: 'rock', top: ICON / 2, left: BOX / 2 },
  { move: 'paper', top: ICON + GAP + ICON / 2, left: ICON / 2 },
  { move: 'scissor', top: ICON + GAP + ICON / 2, left: ICON + GAP + ICON / 2 },
]

export default function Landing() {
  const navigate = useNavigate()
  const { profile } = useApp()

  return (
    <div className="screen" style={{ justifyContent: 'space-between', background: '#F40009', color: '#ffffff', padding: '56px 20px 28px' }}>
      <div>
        <h1 className="disp" style={{ margin: 0, fontSize: 'clamp(48px, 16vw, 68px)', lineHeight: 0.84 }}>
          Rock.<br />Paper.<br />Scissor.
        </h1>
        <img src={coke} alt="Coke" style={{ display: 'block', width: 152, height: 'auto', marginTop: 10 }} />
      </div>

      <div style={{ position: 'relative', width: BOX, height: BOX, margin: '0 auto', maxWidth: '100%' }}>
        <div className="orbit-group" style={{ position: 'absolute', inset: 0 }}>
          {ORBIT.map(({ move, top, left }) => (
            <div key={move} style={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)' }}>
              <div className="orbit-counter">
                <MoveIcon move={move} size={ICON} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>
          Scan your opponent. Play. Log the win.
        </p>
        <button className="btn-c btn-onwhite-black" onClick={() => navigate('/register')}>
          <span>Create profile</span>
          <ArrowRight />
        </button>
        <button
          className="btn-c btn-ghost-white"
          onClick={() => navigate(profile.handle ? '/home' : '/register')}
        >
          <span>I already have one</span>
        </button>
      </div>
    </div>
  )
}
