'use client'

import React, { useContext } from 'react'
import { LocaleContext } from './Providers'
import { Sun, Moon, Github, Linkedin } from 'lucide-react'

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useContext(LocaleContext)

  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">ROLA ALSULAMI</div>
          <div className="text-sm text-slate-500">Data Science Student</div>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-slate-600 hover:text-slate-800"><Github size={16} /></a>
          <a href="#" className="text-slate-600 hover:text-slate-800"><Linkedin size={16} /></a>

          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-3 py-1 rounded bg-slate-100">{lang === 'en' ? 'AR' : 'EN'}</button>

          <button onClick={toggleTheme} className="p-2 rounded bg-slate-100">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}
