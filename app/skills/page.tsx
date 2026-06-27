import React from 'react'
import fs from 'fs'
import path from 'path'
import SkillCards from '../../components/SkillCards'

async function loadSkills() {
  const dataDir = path.join(process.cwd(), 'data')
  const raw = await fs.promises.readFile(path.join(dataDir, 'skills.json'), 'utf-8')
  return JSON.parse(raw)
}

export default async function SkillsPage() {
  const skills = await loadSkills()
  return (
    <main className="container mx-auto px-6 py-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-600">Skills</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">A modern toolkit built for analytics, machine learning, and BI.</h2>
        <p className="mt-3 text-slate-600">This collection highlights the technical foundations and professional strengths that support my projects and internship work.</p>
      </section>
      <div className="mt-8">
        <SkillCards data={skills} />
      </div>
    </main>
  )
}
