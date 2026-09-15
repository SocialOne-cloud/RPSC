import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { ArrowRight } from '../components/icons'
import { FistIcon, PalmIcon, PeaceIcon } from '../components/HandIcon'

function IconCircle({ children, size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        boxShadow: 'inset 0 0 0 3px #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
      }}
    >
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { profile } = useApp()

  return (
    <div className="screen" style={{ justifyContent: 'space-between', background: '#F40009', color: '#ffffff', padding: '56px 20px 28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h1 className="headline" style={{ margin: 0, fontSize: 52, fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Rock.<br />Paper.<br />Scissor.
          <br />
          <span className="script" style={{ fontSize: 60, lineHeight: 1 }}>Coke</span>
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <IconCircle size={92}>
            <FistIcon size={50} />
          </IconCircle>
          <div style={{ display: 'flex', gap: 14 }}>
            <IconCircle size={92}>
              <PalmIcon size={50} />
            </IconCircle>
            <IconCircle size={92}>
              <PeaceIcon size={50} />
            </IconCircle>
          </div>
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
