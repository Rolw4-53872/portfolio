import React from 'react'
import fs from 'fs'
import path from 'path'

async function loadCerts() {
  const dataDir = path.join(process.cwd(), 'data')
  const raw = await fs.promises.readFile(path.join(dataDir, 'certifications.json'), 'utf-8')
  return JSON.parse(raw)
}

export default async function CertificationsPage() {
  const certs = await loadCerts()
  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Certifications</h2>
      <p className="mt-2 text-slate-600">Professional and academic certifications.</p>

      <div className="mt-6 grid gap-4">
        {certs.length === 0 && <div className="glass p-6 rounded">No certifications added yet.</div>}

        {certs.map((c: any, i: number) => (
          <div key={i} className="glass p-6 rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-slate-600">{c.issuer} — {c.date}</div>
              </div>
              {c.file && <a className="text-primary underline" href={c.file} target="_blank" rel="noreferrer">View</a>}
            </div>
            {c.description && <p className="mt-3 text-slate-700">{c.description}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
