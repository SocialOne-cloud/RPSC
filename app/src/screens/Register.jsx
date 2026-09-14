import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import { ArrowRight, InstagramIcon, PhoneIcon } from '../components/icons'

export default function Register() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setHandle, authMethod, setAuthMethod } = useApp()
  const [input, setInput] = useState('')

  const canSubmit = input.trim().replace('@', '').length >= 2

  function lockIn() {
    if (!canSubmit) return
    setHandle(input.trim())
    const next = params.get('next')
    navigate(next || '/home')
  }

  return (
    <div className="screen" style={{ background: '#ffffff', color: '#1E1E1E', padding: '56px 20px 28px', gap: 26 }}>
      <h2 style={{ margin: 0, fontSize: 38, fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
        Get<br />in.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          className={`btn-c ${authMethod === 'ig' ? 'btn-active-red' : 'btn-dark'}`}
          onClick={() => setAuthMethod('ig')}
        >
          <span>Continue with Instagram</span>
          <InstagramIcon />
        </button>
        <button
          className={`btn-c ${authMethod === 'phone' ? 'btn-active-red' : 'btn-dark'}`}
          onClick={() => setAuthMethod('phone')}
        >
          <span>Continue with mobile number</span>
          <PhoneIcon />
        </button>
      </div>
      <div style={{ height: 2, background: '#1E1E1E' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor="handle" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F40009' }}>
          Choose a handle
        </label>
        <input
          id="handle"
          className="field"
          placeholder="@"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lockIn()}
        />
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: '#6b6664' }}>
          Handles are public on the leaderboard.
        </p>
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn-c btn-red" style={{ padding: '28px 20px', fontSize: 20 }} disabled={!canSubmit} onClick={lockIn}>
        <span>Lock it in</span>
        <ArrowRight size={22} />
      </button>
    </div>
  )
}
