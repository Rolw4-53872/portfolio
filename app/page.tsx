import React from 'react'
import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto px-6">
      <Hero />
    </main>
  )
}
