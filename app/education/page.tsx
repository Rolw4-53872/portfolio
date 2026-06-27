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
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-600">Education</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Academic foundation supporting practical problem-solving and applied analytics.</h2>
      </section>
      <div className="mt-8 space-y-6">
        {items.map((it: any, i: number) => (
          <div key={i} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xl font-semibold text-slate-900">{it.institution}</div>
                <div className="mt-1 text-slate-600">{it.degree} — {it.from}–{it.to}</div>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{it.from} — {it.to}</div>
            </div>
            {it.description && <p className="mt-5 text-slate-600">{it.description}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
