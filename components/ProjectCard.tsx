'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Sparkles } from 'lucide-react'

type Props = {
  project: {
    title: string
    description: string
    technologies: string[]
    type?: string
    image?: string
    category?: string
    status?: string
    github?: string
    liveDemo?: string
    problem?: string
    objectives?: string
    methodology?: string
    tools?: string[]
    challenges?: string
    results?: string
    lessonsLearned?: string
    screenshots?: string[]
    architectureDiagram?: string
  }
}

export default function ProjectCard({ project }: Props) {
  const [open, setOpen] = useState(false)
  const category = project.category || (project.type === 'academic' ? 'Academic' : 'Professional')
  const status = project.status || 'Completed'

  return (
    <>
      <motion.article whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-white to-violet-500/20">
          {project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-slate-400"><Sparkles size={28} /></div>}
          <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 backdrop-blur">{category}</div>
          <div className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">{status}</div>
        </div>

        <div className="p-6">
          <h4 className="text-xl font-semibold text-slate-900">{project.title}</h4>
          <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"><Github size={15} /> GitHub</a>
            ) : null}
            {project.liveDemo ? (
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"><ExternalLink size={15} /> Live Demo</a>
            ) : null}
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"><ArrowRight size={15} /> View Details</button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur">
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Case Study</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{project.title}</h3>
                </div>
                <button onClick={() => setOpen(false)} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">Close</button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ['Problem', project.problem || 'The project addressed a real-world challenge in data analysis, modeling, or business intelligence.'],
                  ['Objectives', project.objectives || 'To uncover patterns, build a useful solution, and communicate results clearly.'],
                  ['Methodology', project.methodology || 'The work combined data cleaning, analysis, modeling, visualization, and evaluation.'],
                  ['Tools', (project.tools || project.technologies || []).join(', ')]
                ].map(([title, content]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="font-semibold text-slate-900">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Challenges</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{project.challenges || 'The work required balancing technical accuracy with clarity and usability.'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="font-semibold text-slate-900">Results</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{project.results || 'The project delivered a strong practical outcome and a clear analytical narrative.'}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-900">Lessons Learned</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">{project.lessonsLearned || 'The experience strengthened both technical execution and communication around data-driven decisions.'}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
