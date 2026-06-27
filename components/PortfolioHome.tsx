'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, BarChart3, Brain, Briefcase, CalendarDays, Cpu, Download,
  ExternalLink, GraduationCap, Mail, MapPin, MessageSquare, Phone,
  Sparkles, TrendingUp, Database, LayoutGrid, BadgeCheck, Github,
  Linkedin, Layers, Globe, Heart, ChevronUp, Code2, Target,
  Lightbulb, Users, Zap, BookOpen, Award, Star
} from 'lucide-react'
import { LocaleContext } from './Providers'

type Props = {
  profile: any
  projects: any[]
  skills: Record<string, string[]>
  experience: any[]
  education: any[]
  internships: any[]
  contact: any
  volunteer: any[]
  languages: any[]
}

const categoryMeta: Record<string, { icon: React.ReactNode; accent: string; label: string; labelAr: string }> = {
  programming:        { icon: <Code2 size={18} />,       accent: 'from-cyan-500 to-blue-600',     label: 'Programming',          labelAr: 'البرمجة' },
  data_science:       { icon: <TrendingUp size={18} />,  accent: 'from-sky-500 to-indigo-600',    label: 'Data Science',         labelAr: 'علم البيانات' },
  machine_learning:   { icon: <Brain size={18} />,       accent: 'from-fuchsia-500 to-violet-600',label: 'Machine Learning',     labelAr: 'تعلم الآلة' },
  deep_learning:      { icon: <Layers size={18} />,      accent: 'from-amber-500 to-orange-600',  label: 'Deep Learning',        labelAr: 'التعلم العميق' },
  business_intelligence: { icon: <BarChart3 size={18} />,accent: 'from-emerald-500 to-teal-600', label: 'Business Intelligence', labelAr: 'ذكاء الأعمال' },
  visualization:      { icon: <Sparkles size={18} />,    accent: 'from-rose-500 to-pink-600',     label: 'Visualization',        labelAr: 'التصور البياني' },
  database:           { icon: <Database size={18} />,    accent: 'from-indigo-500 to-sky-600',    label: 'Database',             labelAr: 'قواعد البيانات' },
  tools:              { icon: <LayoutGrid size={18} />,   accent: 'from-slate-500 to-slate-700',   label: 'Tools',                labelAr: 'الأدوات' },
  soft_skills:        { icon: <MessageSquare size={18} />,accent: 'from-violet-500 to-purple-600', label: 'Soft Skills',          labelAr: 'المهارات الشخصية' }
}

function useCountUp(target: number, inView: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(start + (target - start) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, inView])
  return value
}

function AnimatedCounter({ value, suffix = '', inView }: { value: number; suffix?: string; inView: boolean }) {
  const count = useCountUp(value, inView)
  return <span>{count}{suffix}</span>
}

function SectionLabel({ children, color = 'text-cyan-600 dark:text-cyan-400' }: { children: React.ReactNode; color?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.35em] ${color}`}>{children}</p>
  )
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const }
  }
}

export default function PortfolioHome({ profile, projects, skills, experience, education, internships, contact, volunteer, languages }: Props) {
  const { lang } = useContext(LocaleContext)
  const isAr = lang === 'ar'

  const statsRef = React.useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  const stats = useMemo(() => [
    { label: isAr ? 'مشروع أكاديمي' : 'Academic Projects', value: 3, suffix: '+' },
    { label: isAr ? 'مشروع تدريبي' : 'Internship Projects', value: 4, suffix: '+' },
    { label: isAr ? 'مهارة تقنية' : 'Technical Skills', value: Object.values(skills || {}).flat().length, suffix: '+' },
    { label: isAr ? 'أداة وتقنية' : 'Tools & Technologies', value: 20, suffix: '+' }
  ], [skills, isAr])

  const roles = isAr
    ? ['طالبة علم بيانات', 'محللة بيانات', 'تعلم الآلة', 'ذكاء اصطناعي', 'ذكاء الأعمال']
    : ['Data Science Student', 'Data Analyst', 'Machine Learning', 'Deep Learning', 'AI & Business Intelligence']

  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(t)
  }, [roles.length])

  return (
    <main className="min-h-screen pb-16 dark:bg-[#020617]" dir={isAr ? 'rtl' : 'ltr'}>

      {/* ─── HERO ─── */}
      <section id="home" className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="orb absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/8 blur-[80px]" />
          <div className="orb absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 dark:bg-violet-600/8 blur-[80px]" style={{ animationDelay: '4s' }} />
          <div className="orb absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-fuchsia-500/8 dark:bg-fuchsia-600/6 blur-[80px]" style={{ animationDelay: '8s' }} />
        </div>

        <div className="container relative mx-auto px-4 lg:px-6 py-24 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 dark:border-cyan-500/20 bg-cyan-50/80 dark:bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-700 dark:text-cyan-300 backdrop-blur mb-6">
                <Sparkles size={14} className="text-cyan-500" />
                {isAr ? 'علم البيانات • التحليل • الذكاء الاصطناعي • ذكاء الأعمال' : 'Data Science • Analytics • AI • Business Intelligence'}
              </div>

              {/* Name */}
              <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-[5rem] leading-none mb-4">
                {isAr ? (
                  <>رولا <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 bg-clip-text text-transparent">السلمي</span></>
                ) : (
                  <>ROLA <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 bg-clip-text text-transparent">ALSULAMI</span></>
                )}
              </h1>

              {/* Animated role */}
              <div className="h-9 mb-6 overflow-hidden">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl font-semibold text-slate-600 dark:text-slate-300"
                >
                  {roles[roleIndex]}
                </motion.div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium mb-1">
                  <GraduationCap size={16} className="text-cyan-500" />
                  <span>{isAr ? 'طالبة علم بيانات — جامعة أم القرى' : 'Data Science Student at Umm Al-Qura University'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                  <Briefcase size={16} className="text-violet-500" />
                  <span>{isAr ? 'متدربة علم بيانات — شركة داما القابضة' : 'Data Science Intern at Dama Holding Company'}</span>
                </div>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
                {isAr
                  ? 'بناء حلول بيانات ذكية تحوّل البيانات الخام إلى قيمة أعمال حقيقية.'
                  : 'Building Intelligent Data Solutions That Turn Raw Data into Business Value.'}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Python', 'SQL', 'Power BI', 'PyTorch', 'Scikit-learn'].map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-12">
                <a
                  href={profile.cvPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all"
                >
                  <Download size={16} /> {isAr ? 'تحميل السيرة الذاتية' : 'Download CV'}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:-translate-y-0.5 transition-all"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:-translate-y-0.5 transition-all"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:-translate-y-0.5 transition-all"
                >
                  <Mail size={16} /> {isAr ? 'تواصل معي' : 'Contact Me'}
                </a>
              </div>

              {/* Stats row */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-4 text-center hover:-translate-y-1 transition-transform">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/20 dark:border-slate-700/50 bg-slate-900 dark:bg-slate-800/80 p-7 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-1">
                      {isAr ? 'لمحة سريعة' : 'Profile Snapshot'}
                    </p>
                    <h2 className="text-xl font-semibold text-white">
                      {isAr ? 'رولا السلمي' : 'Rola Alsulami'}
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 p-3 text-cyan-300 border border-cyan-500/20">
                    <Brain size={22} />
                  </div>
                </div>

                <div className="space-y-2.5 mb-6 text-sm">
                  {[
                    { icon: <Briefcase size={14} className="text-cyan-400" />, text: isAr ? 'متدربة علم بيانات @ داما القابضة' : 'Data Science Intern @ Dama Holding Company' },
                    { icon: <GraduationCap size={14} className="text-cyan-400" />, text: isAr ? 'جامعة أم القرى، بكالوريوس علم البيانات' : 'Umm Al-Qura University, BSc Data Science' },
                    { icon: <MapPin size={14} className="text-cyan-400" />, text: isAr ? 'مكة المكرمة، المملكة العربية السعودية' : 'Makkah, Saudi Arabia' },
                    { icon: <Mail size={14} className="text-cyan-400" />, text: contact?.email || 'contact@rolaalsulami.com' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-slate-300">
                      {item.icon}<span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {['Python', 'SQL', 'Power BI', 'PyTorch'].map((tool) => (
                    <div key={tool} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center text-sm font-medium text-slate-200">
                      {tool}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-400">
                    {isAr ? 'متاحة للفرص المهنية' : 'Open to opportunities'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-slow hidden md:flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600">
          <span className="text-xs tracking-widest uppercase">{isAr ? 'تمرير' : 'Scroll'}</span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-400 to-transparent dark:from-slate-600" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>{isAr ? 'عني' : 'About Me'}</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'طالبة علم بيانات شغوفة بتحويل البيانات إلى قيمة.' : 'A Data Science student passionate about transforming data into value.'}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp(0.05)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400 mb-5">
              <BadgeCheck size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">
                {isAr ? 'المقدمة المهنية' : 'Professional Introduction'}
              </span>
            </div>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
              {isAr
                ? 'أنا طالبة علم بيانات في جامعة أم القرى، شغوفة بتحويل البيانات الخام إلى رؤى قيّمة. خلال تدريبي في شركة داما القابضة، عملت على مشاريع حقيقية في تحليل البيانات وذكاء الأعمال وتطوير قواعد البيانات.'
                : 'I am a Data Science student at Umm Al-Qura University with a passion for turning raw data into valuable insights. During my internship at Dama Holding Company, I worked on real-world projects in data analytics, business intelligence, and database development.'}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Target size={16} />, title: isAr ? 'الهدف المهني' : 'Career Goal', body: isAr ? 'بناء حلول بيانات ذكية تدعم قرارات الأعمال.' : 'Build intelligent data solutions that drive confident business decisions.' },
                { icon: <Lightbulb size={16} />, title: isAr ? 'التركيز الحالي' : 'Current Focus', body: isAr ? 'الذكاء الاصطناعي وذكاء الأعمال والتحليل التنبؤي.' : 'AI, Business Intelligence, predictive analytics, and deep learning.' },
                { icon: <Zap size={16} />, title: isAr ? 'نقاط القوة' : 'Strengths', body: isAr ? 'حل المشكلات، التواصل، والتعلم المستمر.' : 'Analytical thinking, problem solving, and continuous learning.' },
                { icon: <Users size={16} />, title: isAr ? 'الأسلوب' : 'Approach', body: isAr ? 'الجمع بين العمق التقني وسرد القصص الواضح.' : 'Blend technical depth with clear storytelling and business context.' }
              ].map(({ icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
                    {icon} <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div {...fadeUp(0.1)} className="rounded-[2rem] border border-slate-700/50 dark:border-slate-600/30 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-7 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Star size={18} className="text-cyan-300" />
                <h3 className="text-lg font-semibold">{isAr ? 'اهتماماتي الرئيسية' : 'Key Interests'}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(isAr
                  ? ['تحليل البيانات', 'تعلم الآلة', 'الذكاء الاصطناعي', 'ذكاء الأعمال', 'التعلم العميق', 'تصور البيانات', 'رؤية الحاسوب']
                  : ['Data Analytics', 'Machine Learning', 'Artificial Intelligence', 'Business Intelligence', 'Deep Learning', 'Data Visualization', 'Computer Vision']
                ).map((item) => (
                  <span key={item} className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-colors">{item}</span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="rounded-[2rem] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 p-7 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
              <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400 mb-5">
                <CalendarDays size={18} />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{isAr ? 'الرحلة المهنية' : 'Journey'}</h3>
              </div>
              <ol className="space-y-4 relative before:absolute before:left-[7px] dark:before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                {[
                  { year: isAr ? '2023' : '2023', event: isAr ? 'بدأت رحلتي في علم البيانات بجامعة أم القرى' : 'Started Data Science journey at Umm Al-Qura University' },
                  { year: isAr ? '2024' : '2024', event: isAr ? 'مشاريع أكاديمية في تحليل البيانات والتعلم العميق' : 'Academic projects in data analysis & deep learning' },
                  { year: isAr ? '2025' : '2025', event: isAr ? 'مشروع تعلم الآلة لتنبؤ الأداء الأكاديمي' : 'ML project: Predicting student academic performance' },
                  { year: isAr ? 'فبراير 2026' : 'Feb 2026', event: isAr ? 'متدربة علم بيانات في شركة داما القابضة' : 'Data Science Intern at Dama Holding Company' },
                  { year: isAr ? 'الآن' : 'Now', event: isAr ? 'تطوير حلول الذكاء الاصطناعي وذكاء الأعمال' : 'Building applied AI & BI solutions' }
                ].map(({ year, event }) => (
                  <li key={year + event} className="flex gap-4 ps-6">
                    <div className="absolute start-0 mt-1.5 h-3.5 w-3.5 rounded-full bg-cyan-500 border-2 border-white dark:border-slate-900" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{year}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{event}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <SectionLabel color="text-violet-600 dark:text-violet-400">{isAr ? 'المهارات' : 'Skills'}</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? 'قدرات تقنية وتحليلية شاملة.' : 'Comprehensive technical & analytical capabilities.'}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              {isAr ? 'يجمع مجموعتي من المهارات بين التنفيذ التقني وفهم الأعمال.' : 'A skill stack that blends technical execution with business understanding.'}
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(skills || {}).map(([category, items], index) => {
              const meta = categoryMeta[category]
              return (
                <motion.div
                  key={category}
                  {...fadeUp(index * 0.04)}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="skill-card rounded-[1.5rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-6 shadow-md shadow-slate-200/60 dark:shadow-slate-900/40 transition-shadow"
                >
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${meta?.accent || 'from-slate-600 to-slate-800'} p-3 text-white shadow-lg mb-4`}>
                    {meta?.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {isAr ? meta?.labelAr : meta?.label || category.replace(/_/g, ' ')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {items.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-200 dark:hover:border-cyan-700 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(96, 72 + index * 3)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${meta?.accent || 'from-slate-600 to-slate-800'}`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section id="featured" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400 mb-3">{isAr ? 'المشاريع المميزة' : 'Featured Projects'}</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{isAr ? 'أبرز المشاريع' : 'Featured Projects'}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">{isAr ? 'أبرز المشاريع الأكاديمية التي أعكس من خلالها مهاراتي التقنية.' : 'Highlighted academic projects showcasing my technical skills and analytical capabilities.'}</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project: any, index: number) => {
              const colors = ['from-cyan-500 to-sky-600', 'from-fuchsia-500 to-violet-600', 'from-emerald-500 to-teal-600']
              const grad = colors[index] || colors[0]
              return (
                <motion.div
                  key={project.title}
                  {...fadeUp(index * 0.07)}
                  whileHover={{ y: -8 }}
                  className="group rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${grad}`} />
                  <div className="p-6">
                    <div className={`inline-flex rounded-xl bg-gradient-to-br ${grad} p-3 text-white shadow-lg mb-4`}>
                      {index === 0 ? <TrendingUp size={20} /> : index === 1 ? <Brain size={20} /> : <Target size={20} />}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{isAr ? 'أكاديمي' : 'Academic'} · {project.year}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-3 leading-tight line-clamp-2">
                      {isAr ? project.titleAr : project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {isAr ? project.descriptionAr : project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && <span className="text-xs text-slate-400">+{project.technologies.length - 4}</span>}
                    </div>
                    <div className="flex gap-2">
                      <a href={`/projects/${project.slug}/`} className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${grad} px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform`}>
                        <ExternalLink size={14} /> {isAr ? 'التفاصيل' : 'View Details'}
                      </a>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5 transition-all">
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ACADEMIC PROJECTS ─── */}
      <section id="projects" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>{isAr ? 'المشاريع الأكاديمية' : 'Academic Projects'}</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'دراسات حالة تجمع بين العمق التحليلي وسرد القصص.' : 'Case studies that blend analytical depth with clear storytelling.'}
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            {isAr ? 'مشاريع أكاديمية تطبيقية تغطي التحليل والتعلم الآلي والتعلم العميق.' : 'Applied academic projects covering analytics, machine learning, and deep learning.'}
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              {...fadeUp(index * 0.07)}
              className="group rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-slate-900/40 hover:shadow-2xl transition-shadow"
            >
              {/* Header bar with gradient */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${index === 0 ? 'from-cyan-500 to-sky-600' : index === 1 ? 'from-fuchsia-500 to-violet-600' : 'from-emerald-500 to-teal-600'}`} />

              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 rounded-2xl bg-gradient-to-br ${index === 0 ? 'from-cyan-500 to-sky-600' : index === 1 ? 'from-fuchsia-500 to-violet-600' : 'from-emerald-500 to-teal-600'} p-4 text-white shadow-lg w-fit`}>
                    {index === 0 ? <TrendingUp size={24} /> : index === 1 ? <Brain size={24} /> : <Target size={24} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        {isAr ? 'أكاديمي' : 'Academic'} · {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{project.description}</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4">
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                          {isAr ? 'التحديات' : 'Challenges'}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{project.challenges}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4">
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                          {isAr ? 'النتائج' : 'Results'}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{project.results}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-900 hover:-translate-y-0.5 transition-transform"
                        >
                          <Github size={15} /> {isAr ? 'كود المصدر' : 'View Code'}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 cursor-not-allowed">
                          <Github size={15} /> {isAr ? 'قريباً' : 'GitHub Soon'}
                        </span>
                      )}
                      {project.slug && (
                        <a
                          href={`/projects/${project.slug}/`}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:-translate-y-0.5 transition-all"
                        >
                          <ExternalLink size={15} /> {isAr ? 'تفاصيل المشروع' : 'View Details'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── INTERNSHIP PROJECTS ─── */}
      <section id="internships" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <SectionLabel color="text-emerald-600 dark:text-emerald-400">
              {isAr ? 'مشاريع التدريب المهني' : 'Professional Internship Projects'}
            </SectionLabel>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? 'عمل مهني حقيقي لدعم القرارات التنفيذية.' : 'Real professional work designed for executive decision-making.'}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              {isAr
                ? 'هذه المشاريع تعكس عملي في شركة داما القابضة. لا يتم مشاركة الكود المصدري أو المعلومات السرية.'
                : 'These projects reflect my work at Dama Holding Company. No source code or confidential information is shared.'}
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {internships.map((item, index) => (
              <motion.div
                key={item.name}
                {...fadeUp(index * 0.06)}
                whileHover={{ y: -5 }}
                className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-7 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/40 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className={`h-2 w-2 rounded-full ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      <span className={`text-sm font-semibold ${item.status === 'Completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {isAr ? (item.status === 'Completed' ? 'مكتمل' : 'قيد التطوير') : item.status}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 p-2.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <BarChart3 size={18} />
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 text-sm">{item.description}</p>

                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                    {isAr ? 'التقنيات المستخدمة' : 'Technologies'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(item.technologies || []).map((tech: string) => (
                      <span key={tech} className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs text-slate-700 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 px-4 py-3 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <span>🔒</span>
                  {isAr ? 'هذا المشروع سري — لا يتم مشاركة الكود أو البيانات.' : 'Confidential project — no source code or data is shared.'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel color="text-amber-600 dark:text-amber-400">{isAr ? 'الخبرة' : 'Experience'}</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'مسيرة مهنية نابعة من تحليل حقيقي وأثر ملموس.' : 'A career rooted in real-world analytics and business impact.'}
          </h2>
        </motion.div>

        <div className="space-y-5">
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              {...fadeUp(index * 0.06)}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/40"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white shadow-lg flex-shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.position}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{item.company}</p>
                  </div>
                </div>
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {isAr ? 'فبراير 2026 — الحاضر' : `${item.from} — ${item.to}`}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {['Data Analysis', 'Power BI', 'SQL', 'Dashboard Development', 'Business Intelligence', 'Database Design', 'Machine Learning'].map((skill) => (
                  <span key={skill} className="rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section id="education" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <SectionLabel color="text-fuchsia-600 dark:text-fuchsia-400">{isAr ? 'التعليم' : 'Education'}</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? 'أساس أكاديمي مقرون بتعلم تطبيقي.' : 'Academic grounding paired with applied, hands-on learning.'}
            </h2>
          </motion.div>

          <div className="space-y-5">
            {education.map((item, index) => (
              <motion.div
                key={item.institution}
                {...fadeUp(index * 0.06)}
                className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/40"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 p-3 text-white shadow-lg flex-shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.institution}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">{item.degree}</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {item.from} — {item.to}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{item.description}</p>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
                    {isAr ? 'المقررات ذات الصلة' : 'Relevant Coursework'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Data Science', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Database Systems', 'Statistics', 'Data Visualization'].map((course) => (
                      <span key={course} className="rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-100 dark:border-fuchsia-800/30 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-400">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOLUNTEER ─── */}
      <section id="volunteer" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel color="text-rose-600 dark:text-rose-400">{isAr ? 'التطوع' : 'Volunteer Experience'}</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'إسهام في خدمة المجتمع.' : 'Contributing to community and social impact.'}
          </h2>
        </motion.div>

        <div className="space-y-5">
          {volunteer.map((item, index) => (
            <motion.div
              key={item.role}
              {...fadeUp(index * 0.06)}
              className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/40"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-3 text-white shadow-lg flex-shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                    <p className="text-rose-600 dark:text-rose-400 font-semibold">{item.organization}</p>
                  </div>
                </div>
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {item.from} — {item.to}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section id="languages" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <SectionLabel color="text-sky-600 dark:text-sky-400">{isAr ? 'اللغات' : 'Languages'}</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? 'تواصل متعدد اللغات.' : 'Multilingual communication.'}
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                {...fadeUp(index * 0.07)}
                whileHover={{ y: -5 }}
                className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-7 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/40 text-center"
              >
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-4 text-white shadow-lg mb-4">
                  <Globe size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {isAr ? lang.nameAr : lang.name}
                </h3>
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-4">
                  {isAr ? lang.levelAr : lang.level}
                </p>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{lang.proficiency}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL INTERESTS ─── */}
      <section id="interests" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 mb-3">{isAr ? 'الاهتمامات التقنية' : 'Technical Interests'}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'اهتمامات البحث والتطوير التقني.' : 'Research & Technical Interests.'}
          </h2>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {(isAr ? [
            'تعلم الآلة', 'التعلم العميق', 'الذكاء الاصطناعي', 'ذكاء الأعمال',
            'أنظمة التوصية', 'رؤية الحاسوب', 'تصور البيانات', 'التحليل التنبؤي',
            'هندسة البيانات', 'نماذج اللغة الكبيرة (LLMs)'
          ] : [
            'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Business Intelligence',
            'Recommendation Systems', 'Computer Vision', 'Data Visualization', 'Predictive Analytics',
            'Data Engineering', 'Large Language Models (LLMs)'
          ]).map((interest, i) => (
            <motion.span
              key={interest}
              {...fadeUp(i * 0.04)}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-full border border-indigo-200 dark:border-indigo-700/50 bg-indigo-50 dark:bg-indigo-900/20 px-5 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 cursor-default"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ─── CURRENT FOCUS ─── */}
      <section id="current-focus" className="bg-slate-50/80 dark:bg-slate-900/40 py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-400 mb-3">{isAr ? 'التركيز الحالي' : 'Current Focus'}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? 'ما أعمل عليه الآن.' : 'Currently Working On.'}
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { title: isAr ? 'نظام التوصية' : 'Recommendation System', status: isAr ? 'قيد التطوير' : 'In Progress', color: 'amber', icon: <Brain size={18} /> },
              { title: isAr ? 'تطبيقات الذكاء الاصطناعي' : 'AI Applications', status: isAr ? 'نشط' : 'Active', color: 'cyan', icon: <Cpu size={18} /> },
              { title: isAr ? 'لوحات ذكاء الأعمال' : 'BI Dashboards', status: isAr ? 'نشط' : 'Active', color: 'emerald', icon: <BarChart3 size={18} /> },
              { title: isAr ? 'تحليل البيانات' : 'Data Analytics', status: isAr ? 'نشط' : 'Active', color: 'violet', icon: <TrendingUp size={18} /> },
              { title: isAr ? 'تعلم الآلة' : 'Machine Learning', status: isAr ? 'نشط' : 'Active', color: 'rose', icon: <Target size={18} /> },
            ] as { title: string; status: string; color: string; icon: React.ReactNode }[]).map(({ title, status, color, icon }, i) => {
              const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
                amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-800/30', dot: 'bg-amber-500' },
                cyan: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-100 dark:border-cyan-800/30', dot: 'bg-cyan-500' },
                emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-800/30', dot: 'bg-emerald-500' },
                violet: { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-100 dark:border-violet-800/30', dot: 'bg-violet-500' },
                rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-800/30', dot: 'bg-rose-500' },
              }
              const c = colorMap[color]
              return (
                <motion.div
                  key={title}
                  {...fadeUp(i * 0.06)}
                  whileHover={{ y: -5 }}
                  className="rounded-[1.5rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-6 shadow-md"
                >
                  <div className={`inline-flex rounded-xl ${c.bg} border ${c.border} p-3 ${c.text} mb-4`}>
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${c.dot} ${status.includes('Progress') || status.includes('قيد') ? 'animate-pulse' : ''}`} />
                    <span className={`text-xs font-semibold ${c.text}`}>{status}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="container mx-auto px-4 lg:px-6 py-24">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>{isAr ? 'التواصل' : 'Contact'}</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {isAr ? 'لنبني شيئاً معاً.' : "Let's build something meaningful together."}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-[2rem] border border-slate-700/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-3">
              {isAr ? 'معلومات التواصل' : 'Contact Info'}
            </p>
            <h3 className="text-2xl font-semibold mb-3">
              {isAr ? 'أنا متاحة لفرص التعاون.' : "I'm open to collaboration."}
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
              {isAr
                ? 'مهتمة بعلم البيانات والتحليل وذكاء الأعمال والذكاء الاصطناعي التطبيقي.'
                : "I'm interested in data science, analytics, BI, and AI applications that create real value."}
            </p>

            <div className="space-y-3 text-sm mb-8">
              {[
                { icon: <Mail size={15} className="text-cyan-400" />, label: contact?.email || 'contact@rolaalsulami.com', href: `mailto:${contact?.email || ''}` },
                { icon: <Phone size={15} className="text-cyan-400" />, label: contact?.phone || '+966-5XX-XXXXXX', href: `tel:${contact?.phone || ''}` },
                { icon: <MapPin size={15} className="text-cyan-400" />, label: isAr ? 'مكة المكرمة، المملكة العربية السعودية' : (contact?.location || 'Makkah, Saudi Arabia'), href: undefined }
              ].map(({ icon, label, href }) => (
                href ? (
                  <a key={label} href={href} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3 hover:bg-white/10 transition-colors">
                    {icon} <span className="text-slate-300">{label}</span>
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
                    {icon} <span className="text-slate-300">{label}</span>
                  </div>
                )
              ))}
            </div>

            <div className="flex gap-3">
              <a href={contact?.github || 'https://github.com'} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                <Github size={18} />
              </a>
              <a href={contact?.linkedin || 'https://linkedin.com'} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${contact?.email || ''}`} className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/60 p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/40"
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              {isAr ? 'أرسل رسالة' : 'Send a message'}
            </h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors"
                  placeholder={isAr ? 'الاسم' : 'Name'}
                />
                <input
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors"
                  placeholder={isAr ? 'البريد الإلكتروني' : 'Email'}
                  type="email"
                />
              </div>
              <input
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors"
                placeholder={isAr ? 'الموضوع' : 'Subject'}
              />
              <textarea
                rows={5}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors resize-none"
                placeholder={isAr ? 'رسالتك' : 'Your message'}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                {isAr ? 'إرسال الرسالة' : 'Send Message'} <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="container mx-auto px-4 lg:px-6 pb-8 pt-8">
        <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 p-8 shadow-xl backdrop-blur">
          <div className="grid gap-8 mb-8 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ROLA ALSULAMI</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isAr ? 'علم البيانات • التحليل • تعلم الآلة • ذكاء الأعمال' : 'Data Science • Analytics • ML • BI'}
              </p>
              <div className="flex gap-2">
                <a href="https://github.com/Rolw4-53872" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 dark:border-slate-700 p-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Github size={15} /></a>
                <a href="https://www.linkedin.com/in/rola-alsulami-012044306/" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 dark:border-slate-700 p-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Linkedin size={15} /></a>
                <a href="mailto:rolwalsulami@gmail.com" className="rounded-full border border-slate-200 dark:border-slate-700 p-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Mail size={15} /></a>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">{isAr ? 'روابط سريعة' : 'Quick Links'}</h4>
              <ul className="space-y-2 text-sm">
                {(isAr
                  ? [['#home','الرئيسية'],['#about','عني'],['#skills','المهارات'],['#featured','المشاريع المميزة'],['#experience','الخبرة'],['#education','التعليم'],['#contact','التواصل']]
                  : [['#home','Home'],['#about','About'],['#skills','Skills'],['#featured','Featured Projects'],['#experience','Experience'],['#education','Education'],['#contact','Contact']]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            {/* Projects */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">{isAr ? 'المشاريع' : 'Projects'}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/projects/saudi-tourism/" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'السياحة الداخلية السعودية' : 'Saudi Tourism Analysis'}</a></li>
                <li><a href="/projects/flower-recognition/" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'التعرف على الزهور' : 'Flower Recognition'}</a></li>
                <li><a href="/projects/student-performance/" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الأداء الأكاديمي' : 'Student Performance'}</a></li>
                <li><a href="/resume/" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'السيرة الذاتية' : 'Resume'}</a></li>
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">{isAr ? 'التواصل' : 'Contact'}</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="mailto:rolwalsulami@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">rolwalsulami@gmail.com</a></li>
                <li><a href="https://github.com/Rolw4-53872" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/rola-alsulami-012044306/" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="/assets/files/Rola_Alsulami_CV.pdf" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'تحميل CV' : 'Download CV'}</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-700/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-500">© 2026 Rola Alsulami. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              {isAr ? 'للأعلى' : 'Back to Top'} <ChevronUp size={14} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
