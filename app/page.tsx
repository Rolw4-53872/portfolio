import React from 'react'
import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'
const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

async function loadFeaturedCerts() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    const raw = await fs.promises.readFile(path.join(dataDir, 'certifications.json'), 'utf-8')
    const certs = JSON.parse(raw)
    return certs.filter((c: any) => c.featured)
  } catch (e) {
    return []
  }
}

export default async function Home() {
  const featured = await loadFeaturedCerts()

  return (
    <main className="min-h-screen container mx-auto px-6">
      <Hero />

      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Featured Certifications</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((c: any, i: number) => (
              <div key={i} className="glass p-4 rounded">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-slate-600">{c.issuer} — {c.date}</div>
                {c.file && <a className="text-primary underline mt-2 inline-block" href={c.file} target="_blank" rel="noreferrer">View</a>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
