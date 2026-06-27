'use client'

import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, Code2, Target, Zap } from 'lucide-react'
import { LocaleContext } from '@/components/Providers'
import Link from 'next/link'

const gradients = ['from-cyan-500 to-sky-600', 'from-fuchsia-500 to-violet-600', 'from-emerald-500 to-teal-600']

export default function ProjectDetailClient({ project }: { project: any }) {
  const { lang } = useContext(LocaleContext)
  const isAr = lang === 'ar'
  const gradIndex = ['saudi-tourism','flower-recognition','student-performance'].indexOf(project.slug)
  const grad = gradients[gradIndex] || gradients[0]

  return (
    <main className="min-h-screen pb-16 dark:bg-[#020617]" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero banner */}
      <div className={`bg-gradient-to-r ${grad} py-20`}>
        <div className="container mx-auto px-4 lg:px-6">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> {isAr ? 'العودة للمشاريع' : 'Back to Projects'}
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide mb-4">
              {isAr ? 'مشروع أكاديمي' : 'Academic'} · {project.year}
            </span>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl leading-tight mb-4">
              {isAr ? project.titleAr : project.title}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {isAr ? project.descriptionAr : project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.4fr]">
          <div className="space-y-8">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ExternalLink size={18} className="text-cyan-500" /> {isAr ? 'نظرة عامة' : 'Project Overview'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? (project.longDescriptionAr || project.descriptionAr) : (project.longDescription || project.description)}
              </p>
            </motion.div>

            {/* Challenges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" /> {isAr ? 'التحديات' : 'Challenges'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? project.challengesAr : project.challenges}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-emerald-500" /> {isAr ? 'النتائج' : 'Results'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? project.resultsAr : project.results}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Code2 size={16} className="text-cyan-500" /> {isAr ? 'التقنيات' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-violet-500" /> {isAr ? 'معلومات المشروع' : 'Project Info'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{isAr ? 'السنة' : 'Year'}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{isAr ? 'النوع' : 'Type'}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{isAr ? 'أكاديمي' : 'Academic'}</span>
                </div>
              </div>
            </motion.div>

            {/* GitHub */}
            {project.github && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 dark:bg-white px-6 py-4 font-semibold text-white dark:text-slate-900 hover:-translate-y-0.5 transition-transform shadow-lg"
                >
                  <Github size={18} /> {isAr ? 'عرض الكود على GitHub' : 'View on GitHub'}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
