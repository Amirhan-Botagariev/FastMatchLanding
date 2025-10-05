'use client'
import { useEffect, useRef } from 'react'

export default function PulsingGridLoader({
  className = '',
}: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const roRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setupSize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setupSize()
    roRef.current = new ResizeObserver(setupSize)
    roRef.current.observe(canvas)

    let lastTime = 0
    let time = 0
    const gridSize = 5
    const spacing = 15
    const breathingSpeed = 0.5
    const colorPulseSpeed = 1.0

    const animate = (ts: number) => {
      if (!lastTime) lastTime = ts
      const dt = ts - lastTime
      lastTime = ts
      time += dt * 0.001

      const rect = canvas.getBoundingClientRect()
      const W = rect.width
      const H = rect.height
      const cx = W / 2
      const cy = H / 2

      ctx.clearRect(0, 0, W, H)

      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fill()

      const breathing = Math.sin(time * breathingSpeed) * 0.2 + 1.0

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (r === 2 && c === 2) continue

          const baseX = (c - 2) * spacing
          const baseY = (r - 2) * spacing
          const dist = Math.hypot(baseX, baseY)
          const maxD = (spacing * Math.SQRT2 * (gridSize - 1)) / 2
          const nDist = dist / maxD
          const ang = Math.atan2(baseY, baseX)

          const radial = Math.sin((time - nDist) * Math.PI * 2) * 4
          const x = cx + baseX * breathing + Math.cos(ang) * radial
          const y = cy + baseY * breathing + Math.sin(ang) * radial

          const baseSize = 1.5 + (1 - nDist) * 1.5
          const pulse = Math.sin(time * 2 + nDist * 5) * 0.6 + 1
          const size = baseSize * pulse

          const blue = Math.sin(time * colorPulseSpeed + nDist * 3) * 0.3 + 0.3
          const white = 1 - blue
          const rCol = Math.floor(255 * white + 200 * blue)
          const gCol = Math.floor(255 * white + 220 * blue)
          const bCol = 255
          const op = 0.5 + Math.sin(time * 1.5 + ang * 3) * 0.2 + nDist * 0.3

          // лёгкие связи
          if (r > 0 && c > 0 && r < gridSize - 1 && c < gridSize - 1) {
            const neigh = [
              { rr: r - 1, cc: c },
              { rr: r, cc: c + 1 },
              { rr: r + 1, cc: c },
              { rr: r, cc: c - 1 },
            ]
            for (const n of neigh) {
              if (n.rr === 2 && n.cc === 2) continue
              const nx = cx + (n.cc - 2) * spacing * breathing
              const ny = cy + (n.rr - 2) * spacing * breathing
              const lo = 0.1 + Math.sin(time * 1.5 + Math.hypot(c - n.cc, r - n.rr) * 2) * 0.05
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(nx, ny)
              ctx.strokeStyle = `rgba(255,255,255,${lo})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rCol},${gCol},${bCol},${op})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      roRef.current?.disconnect()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* контейнер управляет размерами; канвас подстраивается */}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}