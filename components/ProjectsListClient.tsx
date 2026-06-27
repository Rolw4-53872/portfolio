'use client'

import React, { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'

type Project = {
  title: string
  description: string
  technologies: string[]
  type?: string
  image?: string
  category?: string
  status?: string
}

export default function ProjectsListClient({ initial }: { initial: Project[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return initial.filter((p) => {
      if (filter !== 'all' && p.type !== filter) return false
      if (!query) return true
      const q = query.toLowerCase()
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.join(' ').toLowerCase().includes(q)
    })
  }, [initial, query, filter])

  return (
    <section className="py-8">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Filter the portfolio</h3>
            <p className="mt-2 text-sm text-slate-600">Search by project name, topic, or technology stack.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 sm:w-72" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500">
              <option value="all">All</option>
              <option value="academic">Academic</option>
              <option value="internship">Internship</option>
              <option value="ml">Machine Learning</option>
              <option value="dl">Deep Learning</option>
              <option value="bi">Business Intelligence</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}
