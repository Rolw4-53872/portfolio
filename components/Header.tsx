'use client'

import React, { useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LocaleContext } from './Providers'
import { Sun, Moon, Github, Linkedin, Menu, X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItemsEn = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#internships', label: 'Internship' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
]

const navItemsAr = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#about', label: 'عني' },
  { href: '#skills', label: 'المهارات' },
  { href: '#projects', label: 'المشاريع' },
  { href: '#internships', label: 'التدريب' },
  { href: '#experience', label: 'الخبرة' },
  { href: '#contact', label: 'التواصل' }
]

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useContext(LocaleContext)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = lang === 'ar' ? navItemsAr : navItemsEn

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { threshold: [0.2, 0.5] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 py-3 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/50'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
              RA
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-[0.25em] text-slate-900 dark:text-white">ROLA ALSULAMI</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Data Science Portfolio</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const key = item.href.replace('#', '')
              const isActive = active === key
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-cyan-500 transition-all" />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/assets/files/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Download size={12} /> CV
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label="Switch language"
              className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-2 text-slate-700 dark:text-slate-300 lg:hidden"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[60px] inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-xl lg:hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/assets/files/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white"
              >
                <Download size={14} /> Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
