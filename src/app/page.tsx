'use client'
import { useEffect, useState } from 'react'
import Hero from './components/Hero/Hero'
import FullScreenLoader from './components/Loader/FullScreenLoader'

export default function Page() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200) // простая задержка
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <FullScreenLoader show={loading} />
      <main className="bg-black">
        <Hero />
      </main>
    </>
  )
}