import type { Metadata } from 'next'
import ResumeClient from './ResumeClient'
import profile from '@/src/data/profile'
import education from '@/src/data/education'
import experience from '@/src/data/experience'
import skills from '@/src/data/skills'
import projects from '@/src/data/projects'
import volunteer from '@/src/data/volunteer'
import languages from '@/src/data/languages'

export const metadata: Metadata = {
  title: 'Resume — Rola Alsulami',
  description: 'Professional resume of Rola Alsulami — Data Science Student & Intern',
}

export default function ResumePage() {
  return <ResumeClient profile={profile} education={education} experience={experience} skills={skills} projects={projects} volunteer={volunteer} languages={languages} />
}
