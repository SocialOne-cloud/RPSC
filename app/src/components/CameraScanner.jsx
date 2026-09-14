import { useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'

export default function CameraScanner({ active, onDetect }) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const streamRef = useRef(null)
  const firedRef = useRef(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!active) return undefined
    firedRef.current = false
    setError(null)
    let cancelled = false
    const canvas = document.createElement('canvas')

    function tick() {
      const video = videoRef.current
      if (video && video.readyState === video.HAVE_ENOUGH_DATA && !firedRef.current) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(frame.data, frame.width, frame.height)
        if (code && code.data) {
          firedRef.current = true
          onDetect(code.data)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

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
        tick()
      })
      .catch(err => setError(err.message || 'Camera unavailable'))

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [active, onDetect])

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <video ref={videoRef} muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ width: '62%', aspectRatio: '1', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)', position: 'relative', zIndex: 1 }} />
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: error ? '#F40009' : 'rgba(255,255,255,0.75)', zIndex: 1 }}>
        {error ? 'Camera blocked' : 'Hold steady'}
      </span>
    </div>
  )
}
