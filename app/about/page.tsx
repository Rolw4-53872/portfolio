import React from 'react'
import fs from 'fs'
import path from 'path'
import SkillCards from '../../components/SkillCards'

async function loadData() {
  const dataDir = path.join(process.cwd(), 'data')
  const profileRaw = await fs.promises.readFile(path.join(dataDir, 'profile.json'), 'utf-8')
  const skillsRaw = await fs.promises.readFile(path.join(dataDir, 'skills.json'), 'utf-8')
  return { profile: JSON.parse(profileRaw), skills: JSON.parse(skillsRaw) }
}

export default async function About() {
  const { profile, skills } = await loadData()

  return (
    <main className="container mx-auto px-6 py-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">About</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">A data-focused professional shaping insights through analytics and AI.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">{profile.name}</h3>
            <p className="mt-2 text-slate-600">{profile.title}</p>
            <p className="mt-4 text-slate-700">I am passionate about Data Science, Data Analytics, Machine Learning, Artificial Intelligence, and Business Intelligence. My work focuses on turning data into meaningful stories, reliable dashboards, and practical AI-driven decisions.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
            <h3 className="text-xl font-semibold">Career Objective</h3>
            <p className="mt-3 text-slate-300">To build intelligent solutions that help organizations make faster, better, and more confident decisions.</p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <SkillCards data={skills} />
      </div>
    </main>
  )
}
