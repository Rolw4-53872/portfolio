import React from 'react'
import PortfolioHome from '../components/PortfolioHome'
import profile from '../src/data/profile'
import projects from '../src/data/projects'
import skills from '../src/data/skills'
import experience from '../src/data/experience'
import education from '../src/data/education'
import internships from '../src/data/internshipProjects'
import contact from '../src/data/contact'
import volunteer from '../src/data/volunteer'
import languages from '../src/data/languages'

export default function Home() {
  return (
    <PortfolioHome
      profile={profile}
      projects={projects}
      skills={skills}
      experience={experience}
      education={education}
      internships={internships}
      contact={contact}
      volunteer={volunteer}
      languages={languages}
    />
  )
}
