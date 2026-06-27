export interface Profile {
  name: string
  nameAr: string
  title: string
  titleAr: string
  bio: string
  bioAr: string
  location: string
  locationAr: string
  email: string
  github: string
  linkedin: string
  cvPath: string
}

export interface Project {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  longDescription: string
  longDescriptionAr: string
  technologies: string[]
  challenges: string
  challengesAr: string
  results: string
  resultsAr: string
  github: string
  year: string
  slug?: string
}

export interface InternshipProject {
  name: string
  nameAr: string
  status: 'Completed' | 'In Progress'
  statusAr: string
  description: string
  descriptionAr: string
  technologies: string[]
}

export interface Skills {
  [key: string]: string[]
  programming: string[]
  data_science: string[]
  machine_learning: string[]
  deep_learning: string[]
  business_intelligence: string[]
  visualization: string[]
  database: string[]
  tools: string[]
  soft_skills: string[]
}

export interface Experience {
  position: string
  positionAr: string
  company: string
  companyAr: string
  from: string
  to: string
  description: string
  descriptionAr: string
  skills: string[]
}

export interface Education {
  institution: string
  institutionAr: string
  degree: string
  degreeAr: string
  from: string
  to: string
  description: string
  descriptionAr: string
  coursework: string[]
}

export interface Volunteer {
  role: string
  roleAr: string
  organization: string
  organizationAr: string
  from: string
  to: string
  description: string
  descriptionAr: string
}

export interface Language {
  name: string
  nameAr: string
  level: string
  levelAr: string
  proficiency: number
}

export interface Contact {
  email: string
  github: string
  linkedin: string
  location: string
  locationAr: string
}
