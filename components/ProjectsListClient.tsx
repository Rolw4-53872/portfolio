'use client'

import React, { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'

type Project = {
  title: string
  description: string
  technologies: string[]
  type?: string
  image?: string
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
      <div className="flex gap-3 mb-6">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="border p-2 rounded w-full" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All</option>
          <option value="academic">Academic</option>
          <option value="internship">Internship</option>
          <option value="ml">Machine Learning</option>
          <option value="dl">Deep Learning</option>
          <option value="bi">Business Intelligence</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}
