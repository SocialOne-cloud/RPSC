import { useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppProvider, useApp } from './state/AppContext'
import { joinPairing } from './lib/pairing'
import { usesHashRouter } from './lib/url'
import Landing from './screens/Landing'
import Register from './screens/Register'
import Home from './screens/Home'
import Pair from './screens/Pair'
import Paired from './screens/Paired'
import Upload from './screens/Upload'
import Result from './screens/Result'
import Leaderboard from './screens/Leaderboard'
import Profile from './screens/Profile'

function RequireProfile({ children }) {
  const { profile } = useApp()
  if (!profile.handle) return <Navigate to="/" replace />
  return children
}

function JoinRoute() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { profile, setOpponent } = useApp()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!profile.handle) {
      navigate(`/register?next=${encodeURIComponent('/join/' + code)}`, { replace: true })
      return
    }
    let cancelled = false
    joinPairing(code, profile.handle)
      .then(hostHandle => {
        if (cancelled) return
        setOpponent({ handle: hostHandle, initial: hostHandle.replace('@', '').charAt(0).toUpperCase() })
        navigate('/paired', { replace: true })
      })
      .catch(err => { if (!cancelled) setError(err.message) })
    return () => { cancelled = true }
  }, [code, profile.handle, navigate, setOpponent])

  if (error) {
    return (
      <div className="screen" style={{ background: '#ffffff', color: '#1E1E1E', padding: '72px 20px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>{error}</p>
        <button className="btn-c btn-dark" style={{ maxWidth: 240 }} onClick={() => navigate('/home')}>
          <span>Back home</span>
        </button>
      </div>
    )
  }

  return (
    <div className="screen" style={{ background: '#1E1E1E', color: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{ fontWeight: 800, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pairing…</p>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<RequireProfile><Home /></RequireProfile>} />
      <Route path="/pair" element={<RequireProfile><Pair /></RequireProfile>} />
      <Route path="/join/:code" element={<JoinRoute />} />
      <Route path="/paired" element={<RequireProfile><Paired /></RequireProfile>} />
      <Route path="/upload" element={<RequireProfile><Upload /></RequireProfile>} />
      <Route path="/result" element={<RequireProfile><Result /></RequireProfile>} />
      <Route path="/board" element={<RequireProfile><Leaderboard /></RequireProfile>} />
      <Route path="/profile" element={<RequireProfile><Profile /></RequireProfile>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const Router = usesHashRouter ? HashRouter : BrowserRouter
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}
