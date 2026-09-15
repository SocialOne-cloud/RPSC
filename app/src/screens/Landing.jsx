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
        <h1 className="headline" style={{ margin: 0, fontSize: 54, fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          Rock.<br />Paper.<br />Scissor.
          <br />
          <span className="script" style={{ fontSize: 60, lineHeight: 1 }}>Coke</span>
        </h1>

        <div style={{ position: 'relative', width: 198, height: 198, margin: '0 auto' }}>
          <div className="orbit-group" style={{ position: 'absolute', inset: 0 }}>
            {[
              { Icon: FistIcon, top: 46, left: 99 },
              { Icon: PalmIcon, top: 152, left: 46 },
              { Icon: PeaceIcon, top: 152, left: 152 },
            ].map(({ Icon, top, left }, i) => (
              <div key={i} style={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)' }}>
                <div className="orbit-counter">
                  <IconCircle size={92}>
                    <Icon size={50} />
                  </IconCircle>
                </div>
              </div>
            ))}
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
