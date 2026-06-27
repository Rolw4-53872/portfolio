'use client'

import React, { useContext } from 'react'
import { LocaleContext } from './Providers'

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useContext(LocaleContext)

  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="text-lg font-semibold">ROLA ALSULAMI</div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang('en')} className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-slate-100' : ''}`}>EN</button>
          <button onClick={() => setLang('ar')} className={`px-3 py-1 rounded ${lang === 'ar' ? 'bg-slate-100' : ''}`}>AR</button>
          <button onClick={toggleTheme} className="px-3 py-1 rounded">{theme === 'dark' ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </header>
  )
}
