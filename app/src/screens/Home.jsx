import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import BottomNav from '../components/BottomNav'
import { ArrowRight } from '../components/icons'

export default function Home() {
  const navigate = useNavigate()
  const { profile } = useApp()
  const initial = profile.handle.replace('@', '').charAt(0).toUpperCase() || '?'

  return (
    <div className="screen" style={{ background: '#F40009', color: '#ffffff' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '44px 20px 24px', gap: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, background: '#1E1E1E', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, flex: 'none' }}>
            {initial}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{profile.handle}</span>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85 }}>
              {profile.city} · Since {profile.since}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '2px solid #ffffff', borderBottom: '2px solid #ffffff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '18px 0 20px' }}>
            <span className="num" style={{ fontSize: 54, lineHeight: 0.85 }}>{String(profile.wins).padStart(2, '0')}</span>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Wins</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '18px 0 20px 16px', boxShadow: 'inset 2px 0 0 #ffffff' }}>
            <span className="num" style={{ fontSize: 54, lineHeight: 0.85 }}>{String(profile.losses).padStart(2, '0')}</span>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Losses</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '18px 0 20px 16px', boxShadow: 'inset 2px 0 0 #ffffff' }}>
            <span className="num" style={{ fontSize: 54, lineHeight: 0.85 }}>{profile.streak}</span>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Streak</span>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <button className="btn-c btn-white-red" style={{ padding: '34px 20px', fontSize: 27, letterSpacing: '-0.02em' }} onClick={() => navigate('/pair')}>
          <span>Start a match</span>
          <ArrowRight size={28} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85 }}>
            Last three opponents
          </span>
          {profile.history.length ? (
            <div style={{ display: 'flex', gap: 8 }}>
              {profile.history.slice(0, 3).map((h, i) => (
                <div key={i} style={{ width: 44, height: 44, background: '#1E1E1E', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900 }}>
                  {h.initial}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, opacity: 0.85 }}>Play your first match to fill this in.</p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
