import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import Providers from '../components/Providers'

export const metadata = {
  title: 'Rola Alsulami — Data Science Student',
  description: 'Data Science portfolio of Rola Alsulami — specializing in Data Analytics, Machine Learning, Deep Learning, AI, and Business Intelligence.',
  keywords: ['Data Science', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Business Intelligence', 'Power BI', 'Python', 'PyTorch'],
  authors: [{ name: 'Rola Alsulami' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100 transition-colors duration-300">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
