import { createContext, useContext, useCallback, useState } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'rpsc_profile_v1'

function emptyProfile() {
  return {
    handle: '',
    city: 'Lagos',
    since: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
    wins: 0,
    losses: 0,
    streak: 0,
    history: [],
  }
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProfile()
    return { ...emptyProfile(), ...JSON.parse(raw) }
  } catch {
    return emptyProfile()
  }
}

function persist(profile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)) } catch { /* private mode, ignore */ }
}

export function AppProvider({ children }) {
  const [profile, setProfileState] = useState(loadProfile)
  const [authMethod, setAuthMethod] = useState(null)
  const [opponent, setOpponent] = useState(null)
  const [match, setMatch] = useState({ myMove: null, oppMove: null, iWon: false })
  const [followed, setFollowed] = useState(false)

  const updateProfile = useCallback(updater => {
    setProfileState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      persist(next)
      return next
    })
  }, [])

  const setHandle = useCallback(handle => {
    const clean = handle.charAt(0) === '@' ? handle : '@' + handle
    updateProfile(prev => ({ ...prev, handle: clean }))
  }, [updateProfile])

  const recordMatch = useCallback((oppHandle, myMove, iWon) => {
    updateProfile(prev => {
      const initial = (oppHandle || '?').replace('@', '').charAt(0).toUpperCase()
      const entry = { handle: oppHandle, move: myMove, outcome: iWon ? 'Won' : 'Lost', initial }
      return {
        ...prev,
        wins: prev.wins + (iWon ? 1 : 0),
        losses: prev.losses + (iWon ? 0 : 1),
        streak: iWon ? prev.streak + 1 : 0,
        history: [entry, ...prev.history].slice(0, 50),
      }
    })
  }, [updateProfile])

  const reset = useCallback(() => {
    const fresh = emptyProfile()
    setProfileState(fresh)
    persist(fresh)
    setOpponent(null)
    setFollowed(false)
    setMatch({ myMove: null, oppMove: null, iWon: false })
    setAuthMethod(null)
  }, [])

  const value = {
    profile, setHandle, updateProfile, recordMatch, reset,
    authMethod, setAuthMethod,
    opponent, setOpponent,
    match, setMatch,
    followed, setFollowed,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
