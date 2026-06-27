import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Rola Alsulami — Data Science Student',
  description: 'Portfolio — Rola Alsulami'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        {children}
      </body>
    </html>
  )
}
