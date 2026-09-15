import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { ArrowRight } from '../components/icons'
import { FistIcon, PalmIcon, PeaceIcon } from '../components/HandIcon'
import IconCircle from '../components/IconCircle'

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
            <div className="spin-cw" style={{ display: 'flex' }}>
              <FistIcon size={50} />
            </div>
          </IconCircle>
          <div style={{ display: 'flex', gap: 14 }}>
            <IconCircle size={92}>
              <div className="spin-ccw" style={{ display: 'flex' }}>
                <PalmIcon size={50} />
              </div>
            </IconCircle>
            <IconCircle size={92}>
              <div className="spin-cw" style={{ display: 'flex', animationDuration: '9.5s' }}>
                <PeaceIcon size={50} />
              </div>
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
