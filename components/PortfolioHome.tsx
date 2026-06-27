'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BarChart3, Brain, BriefcaseBusiness, CalendarDays, Cpu, ExternalLink, GraduationCap, Mail, MapPin, MessageSquareMore, Phone, Sparkles, TrendingUp, Database, LayoutGrid, BadgeCheck, Github, Linkedin, BookOpen, Compass, Layers3 } from 'lucide-react'
import ProjectCard from './ProjectCard'

type Props = {
  profile: any
  projects: any[]
  skills: Record<string, string[]>
  experience: any[]
  education: any[]
  internships: any[]
  contact: any
}

const categoryMeta: Record<string, { icon: React.ReactNode; accent: string }> = {
  programming: { icon: <Cpu size={18} />, accent: 'from-cyan-500 to-blue-600' },
  machine_learning: { icon: <Brain size={18} />, accent: 'from-fuchsia-500 to-violet-600' },
  deep_learning: { icon: <Layers3 size={18} />, accent: 'from-amber-500 to-orange-600' },
  business_intelligence: { icon: <BarChart3 size={18} />, accent: 'from-emerald-500 to-teal-600' },
  visualization: { icon: <TrendingUp size={18} />, accent: 'from-rose-500 to-pink-600' },
  database: { icon: <Database size={18} />, accent: 'from-indigo-500 to-sky-600' },
  tools: { icon: <LayoutGrid size={18} />, accent: 'from-slate-600 to-slate-800' },
  soft_skills: { icon: <MessageSquareMore size={18} />, accent: 'from-violet-500 to-purple-600' }
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(Math.floor(start + (value - start) * progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])

  return <span>{display}{suffix}</span>
}

export default function PortfolioHome({ profile, projects, skills, experience, education, internships, contact }: Props) {
  const featuredProject = projects[0] || null
  const stats = useMemo(() => [
    { label: 'Projects', value: projects.length || 7, suffix: '+' },
    { label: 'Skills', value: Object.values(skills || {}).flat().length || 20, suffix: '+' },
    { label: 'Technologies', value: 12, suffix: '+' },
    { label: 'Internship Projects', value: internships.length || 4, suffix: '+' }
  ], [projects.length, skills, internships.length])

  return (
    <main className="min-h-screen pb-16">
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.2),transparent_35%)]" />
        <div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="container relative mx-auto px-6 py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-sm font-medium text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur">
                <Sparkles size={16} className="text-cyan-600" />
                Data Science • Analytics • AI • BI
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                ROLA <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">ALSULAMI</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Building AI solutions, interactive dashboards, and data-driven applications that transform complex data into meaningful business decisions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">Data Science Student</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">Data Analyst</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">Machine Learning</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">Artificial Intelligence</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 shadow-sm">Business Intelligence</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#projects" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700">
                  Explore Projects <ArrowRight size={16} />
                </Link>
                <a href="/assets/files/cv.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-3 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600">
                  Download CV <ExternalLink size={16} />
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Projects Completed', value: '7' },
                  { label: 'Internship Projects', value: '4' },
                  { label: 'Academic Projects', value: '3' },
                  { label: 'Current Role', value: 'Data Science Intern' }
                ].map((item) => (
                  <motion.div key={item.label} whileHover={{ y: -4, scale: 1.01 }} className="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-lg shadow-slate-200/70 backdrop-blur">
                    <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/60 bg-slate-900/90 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Profile Snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{profile?.name || 'Rola Alsulami'}</h2>
                  </div>
                  <div className="rounded-full bg-white/10 p-3 text-cyan-300">
                    <Brain size={20} />
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <BriefcaseBusiness size={16} className="text-cyan-300" />
                    <span>{profile?.internship?.position || 'Data Science Intern'} @ {profile?.internship?.company || 'Dama Holding Company'}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <MapPin size={16} className="text-cyan-300" />
                    <span>{contact?.location || profile?.location || 'Makkah, Saudi Arabia'}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <Mail size={16} className="text-cyan-300" />
                    <span>{contact?.email || profile?.social?.email || 'rola@example.com'}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['Python', 'SQL', 'Power BI', 'PyTorch'].map((tool) => (
                    <div key={tool} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm font-medium text-slate-200">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">About Me</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">A thoughtful data professional with a sharp product mindset.</h2>
          </div>
          <p className="max-w-2xl text-slate-600">I combine analytical rigor with design thinking to build experiences that are both insightful and user-friendly.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="flex items-center gap-3 text-cyan-600">
              <BadgeCheck size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">Professional Introduction</span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              I am a data science student and aspiring analyst focused on delivering measurable impact through data storytelling, machine learning, and business intelligence. My work spans exploratory analysis, thoughtful visualization, and end-to-end application development.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Career Objective', 'Create data products that turn complex information into confident business action.'],
                ['Current Focus', 'AI, BI, predictive analytics, and interactive dashboards.'],
                ['Strengths', 'Problem solving, communication, and rapid prototyping.'],
                ['Approach', 'Combine technical depth with clear storytelling.']
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-3">
                <Compass size={20} className="text-cyan-300" />
                <h3 className="text-xl font-semibold">Quick Facts</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>• Bachelor of Data Science candidate at Umm Al-Qura University</li>
                <li>• Strong foundation in Python, SQL, Power BI, and ML</li>
                <li>• Experience building dashboards, models, and analytics solutions</li>
                <li>• Interested in AI-powered decision intelligence and BI</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
              <div className="flex items-center gap-3 text-violet-600">
                <CalendarDays size={20} />
                <h3 className="text-xl font-semibold text-slate-900">Timeline</h3>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  ['2023', 'Started academic journey in Data Science'],
                  ['2026', 'Data Science Intern at Dama Holding Company'],
                  ['Now', 'Building applied AI and BI solutions']
                ].map(([year, event]) => (
                  <li key={year} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <div>
                      <div className="font-semibold text-slate-900">{year}</div>
                      <div className="text-sm text-slate-600">{event}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-600">Skills</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Professional capabilities shaped for modern data teams.</h2>
          </div>
          <p className="max-w-2xl text-slate-600">The skill stack blends technical execution with business understanding, making the work both practical and strategic.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(skills || {}).map(([category, items], index) => (
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6, scale: 1.01 }} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${categoryMeta[category]?.accent || 'from-slate-600 to-slate-800'} p-3 text-white`}>
                {categoryMeta[category]?.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold capitalize text-slate-900">{category.replace(/_/g, ' ')}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.slice(0, 8).map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{item}</span>
                ))}
              </div>
              <div className="mt-5 h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full bg-gradient-to-r ${categoryMeta[category]?.accent || 'from-slate-600 to-slate-800'}`} style={{ width: `${Math.min(95, 80 + index * 3)}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Selected Projects</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Case studies that blend analytical depth with polished storytelling.</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">View all projects <ArrowRight size={16} /></Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl shadow-slate-300/70">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">Featured Project</div>
              <h3 className="mt-4 text-3xl font-semibold">{featuredProject?.title || 'Saudi Arabia Domestic Tourism Analysis & Visualization'}</h3>
              <p className="mt-4 max-w-2xl text-slate-300">{featuredProject?.description || 'A comprehensive analytics experience that pairs geographic insights with interactive storytelling to reveal tourism patterns across the kingdom.'}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(featuredProject?.technologies || ['Python', 'Power BI', 'SQL']).map((tech: string) => (
                  <span key={tech} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">{tech}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-2 text-cyan-300"><TrendingUp size={18} /> <span className="font-semibold">Outcome Highlights</span></div>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li>• Delivered a polished dashboard narrative for stakeholders</li>
                <li>• Combined analysis, visualization, and domain context</li>
                <li>• Built a strong template for future BI-led storytelling</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="internships" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Internship Projects</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Professional work designed for executive decision-making.</h2>
          </div>
          <p className="max-w-2xl text-slate-600">These projects reflect practical business analytics work and cross-functional problem solving.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {internships.map((item, index) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm font-medium text-emerald-600">{item.status}</p>
                </div>
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600"><BarChart3 size={18} /></div>
              </div>
              <p className="mt-4 text-slate-600">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(item.technologies || []).map((tech: string) => (
                  <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Experience</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">A growing career rooted in real-world analytics and business impact.</h2>
        </div>
        <div className="space-y-6">
          {experience.map((item, index) => (
            <motion.div key={item.company} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.position}</h3>
                  <p className="mt-1 text-slate-600">{item.company}</p>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{item.from} — {item.to}</div>
              </div>
              <p className="mt-5 text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="education" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-600">Education</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Academic grounding paired with applied, hands-on learning.</h2>
        </div>
        <div className="space-y-6">
          {education.map((item, index) => (
            <motion.div key={item.institution} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.institution}</h3>
                  <p className="mt-1 text-slate-600">{item.degree}</p>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{item.from} — {item.to}</div>
              </div>
              <p className="mt-5 text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="stats" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-8 shadow-xl shadow-slate-200/70">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/70 p-6 text-center shadow-sm">
                <div className="text-3xl font-black text-slate-900"><Counter value={stat.value} suffix={stat.suffix} /></div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Tech Stack</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">The tools I use to build thoughtful, production-ready solutions.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Python', 'SQL', 'Power BI', 'PyTorch', 'Pandas', 'Scikit-learn', 'Jupyter', 'GitHub'].map((tool, index) => (
            <motion.div key={tool} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} whileHover={{ y: -5, scale: 1.01 }} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2 text-slate-700"><Cpu size={16} /></div>
                <div className="font-semibold text-slate-900">{tool}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="timeline" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-600">Project Timeline</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">A timeline of academic and internship-driven growth.</h2>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <ol className="space-y-6">
            {[
              ['2024', 'Academic project: Flower Recognition with Deep Learning'],
              ['2025', 'Academic project: Predicting Student Performance with Machine Learning'],
              ['2026', 'Internship project: Executive Performance Dashboard'],
              ['2026', 'Internship project: Hajj Analytics Dashboard']
            ].map(([year, item]) => (
              <li key={year + item} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-cyan-500" />
                <div>
                  <div className="font-semibold text-slate-900">{year}</div>
                  <div className="text-slate-600">{item}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="journey" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">My Journey</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">From university learning to professional problem solving.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            { title: 'University', body: 'Building core fundamentals in statistics, programming, and analytics.' },
            { title: 'Internship', body: 'Applying techniques to business-driven dashboards and insights.' },
            { title: 'Projects', body: 'Turning ideas into polished solutions with code, visuals, and impact.' },
            { title: 'Future Goals', body: 'Pursuing more roles in applied AI, BI, and intelligent products.' }
          ].map((stage, index) => (
            <motion.div key={stage.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
              <div className="flex items-center gap-2 text-cyan-600"><GraduationCap size={18} /> <span className="font-semibold">{stage.title}</span></div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{stage.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="certifications" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/70">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Certifications</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">No certifications yet.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">This section is polished and ready for future credentials and professional milestones.</p>
        </div>
      </section>

      <section id="contact" className="container mx-auto px-6 py-20 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300/70">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold">Let’s create something meaningful together.</h2>
            <p className="mt-4 text-slate-300">I’m interested in data science, analytics, BI, and AI applications that create measurable value.</p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <a href={`mailto:${contact?.email || 'rola@example.com'}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"><Mail size={16} className="text-cyan-300" /> {contact?.email || 'rola@example.com'}</a>
              <a href={`tel:${contact?.phone || '+966-5XX-XXXXXX'}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"><Phone size={16} className="text-cyan-300" /> {contact?.phone || '+966-5XX-XXXXXX'}</a>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><MapPin size={16} className="text-cyan-300" /> {contact?.location || 'Makkah, Saudi Arabia'}</div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a href={contact?.github || '#'} className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:text-cyan-300"><Github size={18} /></a>
              <a href={contact?.linkedin || '#'} className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:text-cyan-300"><Linkedin size={18} /></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <h3 className="text-2xl font-semibold text-slate-900">Send a message</h3>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Name" />
                <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Email" />
              </div>
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Subject" />
              <textarea rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Your message" />
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">Send Message <ArrowRight size={16} /></button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="container mx-auto px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-200/70 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">ROLA ALSULAMI</h3>
              <p className="mt-2 text-slate-600">Data Science • Analytics • Machine Learning • Business Intelligence</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <a href="#home" className="transition hover:text-cyan-600">Home</a>
              <a href="#about" className="transition hover:text-cyan-600">About</a>
              <a href="#projects" className="transition hover:text-cyan-600">Projects</a>
              <a href="#contact" className="transition hover:text-cyan-600">Contact</a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 Rola Alsulami. All rights reserved.</div>
            <a href="#home" className="inline-flex items-center gap-2 font-semibold text-slate-700 transition hover:text-cyan-600">Back to Top <ArrowRight size={16} /></a>
          </div>
        </div>
      </footer>
    </main>
  )
}
