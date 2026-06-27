'use client'

import React, { useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LocaleContext } from './Providers'
import { Sun, Moon, Github, Linkedin, Menu } from 'lucide-react'

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' }
]

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useContext(LocaleContext)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

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
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { threshold: [0.3, 0.6] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/70 py-3 shadow-lg shadow-slate-200/60 backdrop-blur-xl' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 text-sm font-bold text-white">RA</div>
          <div>
            <div className="text-base font-semibold tracking-[0.2em] text-slate-900">ROLA</div>
            <div className="text-xs text-slate-500">Data Science Portfolio</div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const key = item.href.replace('/#', '')
            const currentPath = pathname || '/'
            const isActive = currentPath === '/' ? active === key : currentPath.startsWith(item.href.replace('/#', '/'))
            return (
              <a key={item.label} href={item.href} className={`text-sm font-medium transition ${isActive ? 'text-cyan-600' : 'text-slate-600 hover:text-slate-900'}`}>
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub" className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-600 transition hover:text-cyan-600"><Github size={16} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn" className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-600 transition hover:text-cyan-600"><Linkedin size={16} /></a>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Switch language" className="rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700">{lang === 'en' ? 'AR' : 'EN'}</button>
          <button onClick={toggleTheme} aria-label="Toggle color theme" className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-700">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button aria-label="Open navigation menu" className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-700 md:hidden"><Menu size={16} /></button>
        </div>
      </div>
    </header>
  )
}
