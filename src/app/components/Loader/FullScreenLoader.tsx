'use client'
import { useEffect } from 'react'
import PulsingGridLoader from './PulsingGridLoader'

export default function FullScreenLoader({
  show,
  title = 'Загрузка...',
}: { show: boolean; title?: string }) {
  useEffect(() => {
    document.documentElement.style.overflow = show ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-black/85 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* размер адаптивно от ширины экрана */}
        <PulsingGridLoader className="w-[clamp(120px,40vw,220px)] h-[clamp(120px,40vw,220px)]" />
        <span className="text-xs md:text-sm tracking-[0.2em] text-white/70 text-center">{title}</span>
      </div>
    </div>
  )
}