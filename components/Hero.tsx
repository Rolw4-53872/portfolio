use client'

import React from 'react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  return (
    <section className="pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="glass p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold">ROLA ALSULAMI</h1>
            <p className="mt-2 text-xl text-slate-600">Data Science Student • Data Analyst • Machine Learning</p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
              <span className="px-3 py-1 bg-slate-100 rounded-full">Python</span>
              <span className="px-3 py-1 bg-slate-100 rounded-full">SQL</span>
              <span className="px-3 py-1 bg-slate-100 rounded-full">Power BI</span>
              <span className="px-3 py-1 bg-slate-100 rounded-full">PyTorch</span>
            </div>

            <div className="mt-6 flex gap-3">
              <a className="px-4 py-2 bg-primary text-white rounded-lg shadow" href="#">Download CV</a>
              <a className="px-4 py-2 border border-slate-200 rounded-lg" href="#">Contact Me</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="p-8 rounded-2xl">
            <div className="h-80 bg-gradient-to-br from-slate-100 to-white rounded-xl shadow-lg flex items-center justify-center">
              <p className="text-slate-400">Animated hero / illustration placeholder</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
