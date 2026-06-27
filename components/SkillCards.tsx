'use client'

import React from 'react'
import { motion } from 'framer-motion'

type Props = { data: Record<string, string[]> }

export default function SkillCards({ data }: Props) {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(data).map(([cat, items]) => (
          <motion.div key={cat} whileHover={{ scale: 1.02 }} className="glass p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg capitalize">{cat.replace('_', ' ')}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items.map((it) => (
                <li key={it} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
