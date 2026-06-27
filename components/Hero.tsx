 'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  return (
    <section className="mt-6">
      <div className="hero-bg rounded-xl overflow-hidden shadow-lg">
        <div className="hero-overlay" />
        <div className="container mx-auto px-6 py-20 hero-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="glass-soft p-8 rounded-2xl">
                <h1 className="hero-title font-bold text-white">ROLA ALSULAMI</h1>
                <p className="mt-3 text-lg text-slate-100">Data Science Student • Data Analyst • Machine Learning • AI</p>

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
                  <span className="px-3 py-1 bg-white/10 rounded-full">Python</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">SQL</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">Power BI</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full">PyTorch</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <a className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" href="#">Download CV</a>
                  <a className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition" href="#">Contact Me</a>
                  <a className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition" href="/projects">Projects</a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="p-6">
                <div className="rounded-xl bg-white/6 p-6">
                  <h4 className="text-white font-semibold">Highlighted Skills</h4>
                  <ul className="mt-3 text-slate-100">
                    <li>Python • SQL • Power BI • PyTorch</li>
                    <li className="mt-2">Data Cleaning • EDA • Feature Engineering</li>
                    <li className="mt-2">Modeling • Evaluation • Deployment</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
