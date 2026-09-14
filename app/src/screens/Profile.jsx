import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const navigate = useNavigate()
  const { profile, reset } = useApp()
  const initial = profile.handle.replace('@', '').charAt(0).toUpperCase() || '?'

  function doReset() {
    reset()
    navigate('/')
  }

  return (
    <div className="screen" style={{ background: '#ffffff', color: '#1E1E1E' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '44px 20px 20px', gap: 24, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, background: '#F40009', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, flex: 'none' }}>
            {initial}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>{profile.handle}</span>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6664' }}>
              Record {profile.wins}–{profile.losses} · Streak {profile.streak}
            </span>
          </div>
        </div>

        <div style={{ height: 2, background: '#1E1E1E' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, overflow: 'auto' }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F40009' }}>Match log</span>
          {profile.history.length ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {profile.history.map((h, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '34px 1fr auto', gap: 10, alignItems: 'center', padding: '12px 0', borderBottom: '2px solid #e2dfde' }}>
                  <div style={{ width: 34, height: 34, background: '#1E1E1E', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>
                    {h.initial}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase' }}>{h.handle} · {h.move}</span>
                  <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F40009' }}>{h.outcome}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#6b6664' }}>No matches yet — go play one.</p>
          )}
        </div>

        <button className="btn-c btn-dark" style={{ fontSize: 14, padding: '18px 20px' }} onClick={doReset}>
          <span>Reset profile</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
