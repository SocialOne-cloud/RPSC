import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import MoveIcon from '../components/MoveIcon'
import IconCircle from '../components/IconCircle'
import BottomNav from '../components/BottomNav'
import { RefreshIcon } from '../components/icons'

const BEAT_LINE = {
  rock: 'Rock crushed scissor.',
  paper: 'Paper covered rock.',
  scissor: 'Scissor cut paper.',
}

const cap = w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : '')

export default function Result() {
  const navigate = useNavigate()
  const { profile, opponent, match, followed, setFollowed } = useApp()

  const winnerHandle = match.iWon ? profile.handle : (opponent ? opponent.handle : '@opponent')
  const winMove = match.iWon ? match.myMove : match.oppMove
  const oppHandle = opponent ? opponent.handle : '@opponent'

  function follow() {
    setFollowed(true)
    const igUser = oppHandle.replace('@', '')
    window.open(`https://instagram.com/${igUser}`, '_blank', 'noopener')
  }

  return (
    <div className="screen" style={{ background: '#F40009', color: '#ffffff' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 24px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Winner</span>
          <span className="num" style={{ fontSize: 52, lineHeight: 0.88 }}>{winnerHandle}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, borderTop: '2px solid #ffffff', borderBottom: '2px solid #ffffff', padding: '22px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <IconCircle size={104}>
              <MoveIcon move={match.myMove} size={56} />
            </IconCircle>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{match.iWon ? 'Won' : 'Lost'}</span>
              <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{cap(match.myMove)} · {profile.handle}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <IconCircle size={104}>
              <MoveIcon move={match.oppMove} size={56} />
            </IconCircle>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{match.iWon ? 'Lost' : 'Won'}</span>
              <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{cap(match.oppMove)} · {oppHandle}</span>
            </div>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: 26, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>
          {BEAT_LINE[winMove]}
        </p>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn-c btn-white-red" onClick={() => navigate('/pair')}>
            <span>Rematch</span>
            <RefreshIcon />
          </button>
          <button className="btn-c btn-ghost-white" style={{ fontSize: 15 }} onClick={follow}>
            <span>{followed ? `Following ${oppHandle}` : `Follow ${oppHandle} on Instagram`}</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
