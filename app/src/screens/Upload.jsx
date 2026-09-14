import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'
import CameraPreview from '../components/CameraPreview'
import { UploadIcon } from '../components/icons'

const MOVES = ['rock', 'paper', 'scissor']
const BEATS = { rock: 'scissor', paper: 'rock', scissor: 'paper' }

function LidGuide() {
  return (
    <div style={{ width: '34%', aspectRatio: '1', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '42%', aspectRatio: '1', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%' }} />
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
        <h2 style={{ margin: 0, fontSize: 34, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
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
