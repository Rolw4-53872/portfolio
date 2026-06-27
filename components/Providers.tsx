'use client'

import React, { createContext, useEffect, useState } from 'react'

type LocaleCtx = {
  lang: string
  theme: 'light' | 'dark'
  setLang: (l: string) => void
  toggleTheme: () => void
}

export const LocaleContext = createContext<LocaleCtx>({ lang: 'en', theme: 'light', setLang: () => {}, toggleTheme: () => {} })

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState('en')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored) setLangState(stored)
    if (storedTheme === 'dark') setTheme('dark')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', lang)
  }, [lang])

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function setLang(l: string) {
    setLangState(l)
  }

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <LocaleContext.Provider value={{ lang, theme, setLang, toggleTheme }}>{children}</LocaleContext.Provider>
  )
}
