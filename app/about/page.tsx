import React from 'react'
import fs from 'fs'
import path from 'path'
import SkillCards from '../../components/SkillCards'

async function loadData() {
  const dataDir = path.join(process.cwd(), 'data')
  const profileRaw = await fs.promises.readFile(path.join(dataDir, 'profile.json'), 'utf-8')
  const skillsRaw = await fs.promises.readFile(path.join(dataDir, 'skills.json'), 'utf-8')
  const certsRaw = await fs.promises.readFile(path.join(dataDir, 'certifications.json'), 'utf-8').catch(() => '[]')
  return { profile: JSON.parse(profileRaw), skills: JSON.parse(skillsRaw), certifications: JSON.parse(certsRaw) }
}

export default async function About() {
  const { profile, skills, certifications } = await loadData()

  const featuredCerts = (certifications || []).filter((c: any) => c.featured)

  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">About</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-lg">
          <h3 className="font-semibold text-xl">{profile.name}</h3>
          <p className="mt-3 text-slate-600">{profile.title}</p>
          <p className="mt-4 text-slate-700">I am passionate about Data Science, Data Analytics, Machine Learning, Artificial Intelligence and Business Intelligence. Currently completing my internship at Dama Holding Company.</p>
        </div>

        <div>
          <SkillCards data={skills} />
        </div>
      </div>

      {featuredCerts.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Featured Certifications</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCerts.map((c: any, i: number) => (
              <div key={i} className="glass p-4 rounded">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-slate-600">{c.issuer} — {c.date}</div>
                {c.file && <a className="text-primary underline mt-2 inline-block" href={c.file} target="_blank" rel="noreferrer">View</a>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
