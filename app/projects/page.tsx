import React from 'react'
import fs from 'fs'
import path from 'path'
import ProjectsListClient from '../../components/ProjectsListClient'

async function loadProjects() {
  const dataDir = path.join(process.cwd(), 'data')
  const raw = await fs.promises.readFile(path.join(dataDir, 'projects.json'), 'utf-8')
  return JSON.parse(raw)
}

export default async function ProjectsPage() {
  const projects = await loadProjects()
  return (
    <main className="container mx-auto px-6 py-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Projects</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Curated case studies that reflect technical depth and business value.</h2>
      </section>
      <ProjectsListClient initial={projects} />
    </main>
  )
}
