'use client'

import React from 'react'

type Props = {
  project: {
    title: string
    description: string
    technologies: string[]
    type?: string
    image?: string
  }
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="glass p-6 rounded-xl shadow hover:shadow-2xl transition">
      <div className="h-48 bg-slate-50 rounded-md flex items-center justify-center mb-4">
        {project.image ? <img src={project.image} alt={project.title} className="object-cover h-full w-full rounded-md" /> : <div className="text-slate-400">No image</div>}
      </div>
      <h4 className="font-semibold text-lg">{project.title}</h4>
      <p className="mt-2 text-sm text-slate-600">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-slate-100 rounded-full">{t}</span>
        ))}
      </div>
    </article>
  )
}
