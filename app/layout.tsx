import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import Providers from '../components/Providers'

export const metadata = {
  title: 'Rola Alsulami — Data Science Student',
  description: 'Portfolio — Rola Alsulami'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
