import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { ArrowRight } from '../components/icons'

export default function Paired() {
  const navigate = useNavigate()
  const { profile, opponent } = useApp()
  const myInitial = profile.handle.replace('@', '').charAt(0).toUpperCase()
  const oppInitial = opponent ? opponent.initial : '?'

  return (
    <div className="screen" style={{ justifyContent: 'space-between', background: '#F40009', color: '#ffffff', padding: '64px 20px 28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Paired</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12 }}>
          <div style={{ aspectRatio: '1', background: '#1E1E1E', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 900 }}>
            {myInitial}
          </div>
          <span className="num" style={{ fontSize: 34 }}>VS</span>
          <div style={{ aspectRatio: '1', background: '#1E1E1E', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 900 }}>
            {oppInitial}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, borderTop: '2px solid #ffffff', paddingTop: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 900 }}>{profile.handle}</span>
          <span />
          <span style={{ fontSize: 16, fontWeight: 900, textAlign: 'right' }}>{opponent ? opponent.handle : ''}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ margin: 0, fontSize: 30, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
          Now play it<br />on the cans.
        </p>
        <button className="btn-c btn-white-red" onClick={() => navigate('/upload')}>
          <span>We're done, log the result</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
