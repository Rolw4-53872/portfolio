import { notFound } from 'next/navigation'
import projects from '@/src/data/projects'
import ProjectDetailClient from './ProjectDetailClient'

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
