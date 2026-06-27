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
      <h2 className="text-3xl font-bold">Projects</h2>
      <ProjectsListClient initial={projects} />
    </main>
  )
}
