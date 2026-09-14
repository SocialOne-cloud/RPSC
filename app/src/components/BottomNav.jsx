import { useLocation, useNavigate } from 'react-router-dom'
import { PlayIcon, BoardIcon, ProfileIcon } from './icons'

const PLAY_PATHS = ['/home', '/pair', '/paired', '/upload', '/result']

export default function BottomNav({ dark = false }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const playActive = PLAY_PATHS.includes(pathname)

  const items = [
    { key: 'play', label: 'Play', path: '/home', active: playActive, icon: <PlayIcon /> },
    { key: 'board', label: 'Leaderboard', path: '/board', active: pathname === '/board', icon: <BoardIcon /> },
    { key: 'profile', label: 'Profile', path: '/profile', active: pathname === '/profile', icon: <ProfileIcon /> },
  ]

  return (
    <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: dark ? '#000000' : '#1E1E1E', flex: 'none' }}>
      {items.map(item => (
        <button
          key={item.key}
          className={`btn-c nav-btn ${item.active ? 'nav-on' : dark ? 'nav-off-black' : 'nav-off'}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
