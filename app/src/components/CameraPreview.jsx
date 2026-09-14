import { useEffect, useRef, useState } from 'react'

export default function CameraPreview({ children }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
      .catch(err => setError(err.message || 'Camera unavailable'))

    return () => {
      cancelled = true
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, overflow: 'hidden' }}>
      <video ref={videoRef} muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 10 }}>{children}</div>
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: error ? '#F40009' : 'rgba(255,255,255,0.75)', zIndex: 1 }}>
        {error ? 'Camera blocked' : 'Camera'}
      </span>
    </div>
  )
}
