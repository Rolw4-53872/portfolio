import React from 'react'
import fs from 'fs'
import path from 'path'
import PortfolioHome from '../components/PortfolioHome'

async function loadPageData() {
  const dataDir = path.join(process.cwd(), 'data')
  const readJson = async (file: string) => {
    try {
      const raw = await fs.promises.readFile(path.join(dataDir, file), 'utf-8')
      return JSON.parse(raw)
    } catch {
      return []
    }
  }

  const [profile, projects, skills, experience, education, internships, contact] = await Promise.all([
    readJson('profile.json'),
    readJson('projects.json'),
    readJson('skills.json'),
    readJson('experience.json'),
    readJson('education.json'),
    readJson('internship.json'),
    readJson('contact.json')
  ])

  return { profile, projects, skills, experience, education, internships, contact }
}

export default async function Home() {
  const data = await loadPageData()

  return <PortfolioHome {...data} />
}
