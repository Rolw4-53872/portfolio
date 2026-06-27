'use client'

import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Download, GraduationCap, Briefcase, Code2, FolderOpen, Heart, Globe, ArrowLeft, Github } from 'lucide-react'
import { LocaleContext } from '@/components/Providers'
import Link from 'next/link'

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const }
  }
}

export default function ResumeClient({ profile, education, experience, skills, projects, volunteer, languages }: any) {
  const { lang } = useContext(LocaleContext)
  const isAr = lang === 'ar'

  return (
    <main className="min-h-screen pb-16 dark:bg-[#020617]" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Header */}
        <motion.div {...fadeUp()} className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-4">
              <ArrowLeft size={16} /> {isAr ? 'العودة للرئيسية' : 'Back to Portfolio'}
            </Link>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">{isAr ? 'السيرة الذاتية' : 'Resume'}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{isAr ? 'رولا السلمي — طالبة علم بيانات ومتدربة' : 'Rola Alsulami — Data Science Student & Intern'}</p>
          </div>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all"
          >
            <Download size={16} /> {isAr ? 'تحميل CV' : 'Download CV'}
          </a>
        </motion.div>

        <div className="space-y-8">
          {/* Education */}
          <motion.section {...fadeUp(0.05)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 p-3 text-white">
                <GraduationCap size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'التعليم' : 'Education'}</h2>
            </div>
            {education.map((item: any) => (
              <div key={item.institution} className="border-l-2 border-fuchsia-500 pl-4 mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">{item.institution}</h3>
                <p className="text-fuchsia-600 dark:text-fuchsia-400 text-sm font-medium">{item.degree}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.from} — {item.to}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </motion.section>

          {/* Experience */}
          <motion.section {...fadeUp(0.1)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white">
                <Briefcase size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'الخبرة' : 'Experience'}</h2>
            </div>
            {experience.map((item: any) => (
              <div key={item.company} className="border-l-2 border-amber-500 pl-4 mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">{item.position}</h3>
                <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">{item.company}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.from} — {item.to}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </motion.section>

          {/* Skills */}
          <motion.section {...fadeUp(0.15)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3 text-white">
                <Code2 size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'المهارات' : 'Skills'}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(skills).map(([cat, items]: [string, any]) => (
                <div key={cat} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2 capitalize">{cat.replace(/_/g, ' ')}</h3>
                  <div className="flex flex-wrap gap-1">
                    {items.map((skill: string) => (
                      <span key={skill} className="rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800/30 px-2 py-0.5 text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section {...fadeUp(0.2)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white">
                <FolderOpen size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'المشاريع الأكاديمية' : 'Academic Projects'}</h2>
            </div>
            {projects.map((proj: any) => (
              <div key={proj.title} className="border-l-2 border-emerald-500 pl-4 mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.technologies.map((t: string) => (
                    <span key={t} className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-xs">{t}</span>
                  ))}
                </div>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-cyan-600 dark:text-cyan-400 hover:underline">
                    <Github size={12} /> GitHub
                  </a>
                )}
              </div>
            ))}
          </motion.section>

          {/* Volunteer */}
          <motion.section {...fadeUp(0.25)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-3 text-white">
                <Heart size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'التطوع' : 'Volunteer'}</h2>
            </div>
            {volunteer.map((v: any) => (
              <div key={v.role} className="border-l-2 border-rose-500 pl-4 mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">{v.role}</h3>
                <p className="text-rose-600 dark:text-rose-400 text-sm font-medium">{v.organization}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{v.from} — {v.to}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{v.description}</p>
              </div>
            ))}
          </motion.section>

          {/* Languages */}
          <motion.section {...fadeUp(0.3)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-3 text-white">
                <Globe size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isAr ? 'اللغات' : 'Languages'}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {languages.map((l: any) => (
                <div key={l.name} className="text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{isAr ? l.nameAr : l.name}</p>
                  <p className="text-sky-600 dark:text-sky-400 text-sm">{isAr ? l.levelAr : l.level}</p>
                  <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" style={{ width: `${l.proficiency}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{l.proficiency}%</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  )
}
