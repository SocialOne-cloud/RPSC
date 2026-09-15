import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import CameraPreview from '../components/CameraPreview'
import { UploadIcon } from '../components/icons'

const MOVES = ['rock', 'paper', 'scissor']
const BEATS = { rock: 'scissor', paper: 'rock', scissor: 'paper' }

// A white ring backed by a thin dark halo so it reads on any scene. Note: no
// full-bleed scrim here — two overlapping spread shadows paint over each other
// and the first guide comes out dimmer than the second.
const RING = '0 0 0 3px rgba(255,255,255,0.95), 0 0 0 5px rgba(0,0,0,0.28)'

function LidGuide() {
  return (
    <div
      style={{
        width: '34%',
        aspectRatio: '1',
        borderRadius: '50%',
        boxShadow: RING,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '42%', aspectRatio: '1', borderRadius: '50%', boxShadow: RING }} />
    </div>
  )
}

export default function Upload() {
  const navigate = useNavigate()
  const { opponent, setMatch, recordMatch } = useApp()
  const [uploading, setUploading] = useState(false)

  function playMatch() {
    const mine = MOVES[Math.floor(Math.random() * 3)]
    let theirs = MOVES[Math.floor(Math.random() * 3)]
    if (theirs === mine) theirs = BEATS[mine]
    const iWon = BEATS[mine] === theirs

    setUploading(true)
    setTimeout(() => {
      setMatch({ myMove: mine, oppMove: theirs, iWon })
      recordMatch(opponent ? opponent.handle : '@opponent', mine, iWon)
      setUploading(false)
      navigate('/result')
    }, 700)
  }

  return (
    <div className="screen" style={{ justifyContent: 'space-between', background: '#ffffff', color: '#1E1E1E', padding: '56px 20px 28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="disp" style={{ margin: 0, fontSize: 'clamp(36px, 12vw, 50px)' }}>
          Both lids<br />in frame.
        </h2>
        <CameraPreview>
          <LidGuide />
          <LidGuide />
        </CameraPreview>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: '#6b6664' }}>
          One photo proves the match. We read the lids, not your faces.
        </p>
      </div>
      <button className="btn-c btn-red" style={{ padding: '30px 20px', fontSize: 22 }} disabled={uploading} onClick={playMatch}>
        <span>{uploading ? 'Reading lids…' : 'Upload'}</span>
        <UploadIcon />
      </button>
    </div>
  )
}
