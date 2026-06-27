import React from 'react'
import fs from 'fs'
import path from 'path'

async function loadEducation() {
  const dataDir = path.join(process.cwd(), 'data')
  const raw = await fs.promises.readFile(path.join(dataDir, 'education.json'), 'utf-8')
  return JSON.parse(raw)
}

export default async function EducationPage() {
  const items = await loadEducation()
  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Education</h2>
      <div className="mt-6 space-y-4">
        {items.map((it: any, i: number) => (
          <div key={i} className="glass p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{it.institution}</div>
                <div className="text-sm text-slate-600">{it.degree} — {it.from}–{it.to}</div>
              </div>
            </div>
            {it.description && <p className="mt-3 text-slate-700">{it.description}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
