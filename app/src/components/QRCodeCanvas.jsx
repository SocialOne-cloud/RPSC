import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function QRCodeCanvas({ value, size = 260 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !value) return
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#1E1E1E', light: '#00000000' },
    })
  }, [value, size])

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
}
