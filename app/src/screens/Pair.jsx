import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import QRCodeCanvas from '../components/QRCodeCanvas'
import CameraScanner from '../components/CameraScanner'
import { createPairing, subscribeToPairing, joinPairing, joinByHandle, parsePairingCode } from '../lib/pairing'
import { buildJoinUrl } from '../lib/url'
import { firebaseEnabled } from '../firebase'

const CODE_TTL = 120

export default function Pair() {
  const navigate = useNavigate()
  const { profile, setOpponent } = useApp()
  const [tab, setTab] = useState('mine')
  const [code, setCode] = useState(null)
  const [clock, setClock] = useState(CODE_TTL)
  const [pairError, setPairError] = useState(null)
  const [scanKey, setScanKey] = useState(0)
  const [manualOpen, setManualOpen] = useState(false)
  const [manualHandle, setManualHandle] = useState('')
  const [manualBusy, setManualBusy] = useState(false)
  const unsubRef = useRef(null)

  const startPairing = useCallback(async () => {
    if (!firebaseEnabled) {
      setPairError('Live pairing needs Firebase set up — see app/README.md.')
      return
    }
    try {
      const newCode = await createPairing(profile.handle)
      setCode(newCode)
      setClock(CODE_TTL)
      setPairError(null)
      if (unsubRef.current) unsubRef.current()
      unsubRef.current = subscribeToPairing(newCode, data => {
        if (data && data.status === 'paired' && data.guestHandle) {
          setOpponent({ handle: data.guestHandle, initial: data.guestHandle.replace('@', '').charAt(0).toUpperCase() })
          navigate('/paired')
        }
      })
    } catch (err) {
      setPairError(err.message)
    }
  }, [profile.handle, navigate, setOpponent])

  useEffect(() => {
    startPairing()
    return () => { if (unsubRef.current) unsubRef.current() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!code) return undefined
    const id = setInterval(() => {
      setClock(c => {
        if (c <= 1) {
          startPairing()
          return CODE_TTL
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [code, startPairing])

  const qrValue = code ? buildJoinUrl(code) : ''

  const handleDetect = useCallback(async text => {
    const found = parsePairingCode(text)
    if (!found) {
      setPairError('That QR code isn’t a match code.')
      setScanKey(k => k + 1)
      return
    }
    try {
      const hostHandle = await joinPairing(found, profile.handle)
      setOpponent({ handle: hostHandle, initial: hostHandle.replace('@', '').charAt(0).toUpperCase() })
      navigate('/paired')
    } catch (err) {
      setPairError(err.message)
      setScanKey(k => k + 1)
    }
  }, [profile.handle, navigate, setOpponent])

  async function submitManualHandle() {
    if (!manualHandle.trim()) return
    setManualBusy(true)
    setPairError(null)
    try {
      const hostHandle = await joinByHandle(manualHandle.trim(), profile.handle)
      setOpponent({ handle: hostHandle, initial: hostHandle.replace('@', '').charAt(0).toUpperCase() })
      navigate('/paired')
    } catch (err) {
      setPairError(err.message)
    } finally {
      setManualBusy(false)
    }
  }

  return (
    <div className="screen" style={{ background: '#ffffff', color: '#1E1E1E', padding: '44px 0 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '2px solid #1E1E1E', borderBottom: '2px solid #1E1E1E', margin: '0 0 26px' }}>
        <button className={`btn-c ${tab === 'mine' ? 'tab-active' : 'tab-inactive'}`} onClick={() => setTab('mine')}>
          <span>My code</span>
        </button>
        <button className={`btn-c ${tab === 'scan' ? 'tab-active' : 'tab-inactive'}`} onClick={() => setTab('scan')}>
          <span>Scan</span>
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
        {tab === 'mine' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h2 className="headline" style={{ margin: 0, fontSize: 32, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
              Let them<br />scan you.
            </h2>
            <div style={{ boxShadow: 'inset 0 0 0 2px #1E1E1E', padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {qrValue ? <QRCodeCanvas value={qrValue} /> : <div style={{ width: '100%', aspectRatio: '1' }} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 18, fontWeight: 900 }}>{profile.handle}</span>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F40009' }}>
                Code live {Math.floor(clock / 60)}:{String(clock % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}

        {tab === 'scan' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="headline" style={{ margin: 0, fontSize: 32, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
              Scan your<br />opponent.
            </h2>
            <CameraScanner key={scanKey} active={tab === 'scan'} onDetect={handleDetect} />
          </div>
        )}

        {pairError && (
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#F40009' }}>{pairError}</p>
        )}

        <div style={{ flex: 1 }} />

        {manualOpen ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              className="field"
              style={{ fontSize: 16, padding: 14 }}
              placeholder="@theirhandle"
              value={manualHandle}
              onChange={e => setManualHandle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitManualHandle()}
            />
            <button className="btn-c btn-dark" style={{ padding: '14px 20px', fontSize: 13 }} disabled={manualBusy} onClick={submitManualHandle}>
              <span>{manualBusy ? 'Looking…' : 'Pair with this handle'}</span>
            </button>
          </div>
        ) : (
          <button className="btn-c btn-underline" onClick={() => setManualOpen(true)}>
            <span>Enter their handle instead</span>
          </button>
        )}
      </div>
    </div>
  )
}
