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
      <h2 className="text-3xl font-bold">Skills</h2>
      <p className="mt-2 text-slate-600">Categorized technical and soft skills.</p>
      <div className="mt-6">
        <SkillCards data={skills} />
      </div>
    </main>
  )
}
