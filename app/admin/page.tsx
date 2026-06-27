"use client"

import React, { useEffect, useState } from 'react'

export default function AdminPage() {
  const [profile, setProfile] = useState<any>({ name: '', title: '', location: '', banner: '', social: {}, internship: {} })
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any>({})
  const [contact, setContact] = useState<any>({})
  const [internships, setInternships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/data/profile').then((r) => r.json()),
      fetch('/api/data/projects').then((r) => r.json()),
      fetch('/api/data/skills').then((r) => r.json()),
      fetch('/api/data/contact').then((r) => r.json()),
      fetch('/api/data/internship').then((r) => r.json())
    ]).then(([profileData, projectsData, skillsData, contactData, internshipData]) => {
      setProfile(profileData)
      setProjects(projectsData)
      setSkills(skillsData)
      setContact(contactData)
      setInternships(internshipData)
      setLoading(false)
    })
  }, [])

  async function saveSection(name: string, payload: any) {
    const res = await fetch(`/api/data/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': 'rola-admin' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setMessage(data.ok ? `${name} saved successfully.` : 'Unable to save.')
  }

  function handleUpload(file: File | null, target: 'banner' | 'cv' | 'projectImage' | 'photo', index?: number) {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const value = reader.result as string
      if (target === 'banner') setProfile({ ...profile, banner: value })
      if (target === 'cv') setProfile({ ...profile, cv: value })
      if (target === 'projectImage' && typeof index === 'number') {
        const next = [...projects]
        next[index].image = value
        setProjects(next)
      }
    }
    reader.readAsDataURL(file)
  }

  if (loading) return <div className="container mx-auto px-6 py-16 text-slate-600">Loading dashboard...</div>

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Admin Dashboard</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Manage your portfolio without editing code.</h2>
          </div>
          {message ? <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">{message}</div> : null}
        </div>

        <div className="mt-8 space-y-8">
          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Profile & About</h3>
              <button onClick={() => saveSection('profile', profile)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Profile</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Name</label><input placeholder="Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Title</label><input placeholder="Title" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Location</label><input placeholder="Location" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Email</label><input placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.social?.email || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, email: e.target.value } })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">GitHub</label><input placeholder="GitHub URL" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.social?.github || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, github: e.target.value } })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">LinkedIn</label><input placeholder="LinkedIn URL" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={profile.social?.linkedin || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, linkedin: e.target.value } })} /></div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Hero Banner Image</label><input aria-label="Upload hero banner" type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files?.[0] || null, 'banner')} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Upload CV</label><input aria-label="Upload CV" type="file" onChange={(e) => handleUpload(e.target.files?.[0] || null, 'cv')} /></div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Projects</h3>
              <button onClick={() => { setProjects([...projects, { title: 'New Project', description: '', technologies: [], type: 'academic', status: 'In Progress', category: 'Academic' }]); setMessage('Project draft added.') }} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add Project</button>
            </div>
            <div className="mt-6 space-y-4">
              {projects.map((project, index) => (
                <div key={`${project.title}-${index}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">{project.title || `Project ${index + 1}`}</h4>
                    <button onClick={() => { const next = projects.filter((_, i) => i !== index); setProjects(next); setMessage('Project removed.') }} className="text-sm font-medium text-rose-600">Delete</button>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.title || ''} onChange={(e) => { const next = [...projects]; next[index].title = e.target.value; setProjects(next) }} placeholder="Project title" />
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.category || ''} onChange={(e) => { const next = [...projects]; next[index].category = e.target.value; setProjects(next) }} placeholder="Category" />
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.status || ''} onChange={(e) => { const next = [...projects]; next[index].status = e.target.value; setProjects(next) }} placeholder="Status" />
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.type || ''} onChange={(e) => { const next = [...projects]; next[index].type = e.target.value; setProjects(next) }} placeholder="type" />
                  </div>
                  <textarea className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3" value={project.description || ''} onChange={(e) => { const next = [...projects]; next[index].description = e.target.value; setProjects(next) }} placeholder="Description" rows={3} />
                  <input className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3" value={(project.technologies || []).join(', ')} onChange={(e) => { const next = [...projects]; next[index].technologies = e.target.value.split(',').map((item: string) => item.trim()).filter(Boolean); setProjects(next) }} placeholder="Technologies (comma separated)" />
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.github || ''} onChange={(e) => { const next = [...projects]; next[index].github = e.target.value; setProjects(next) }} placeholder="GitHub URL" />
                    <input className="rounded-2xl border border-slate-200 px-4 py-3" value={project.liveDemo || ''} onChange={(e) => { const next = [...projects]; next[index].liveDemo = e.target.value; setProjects(next) }} placeholder="Live demo URL" />
                  </div>
                  <div className="mt-4"><label className="mb-2 block text-sm font-medium text-slate-700">Project image</label><input aria-label="Upload project image" type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files?.[0] || null, 'projectImage', index)} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end"><button onClick={() => saveSection('projects', projects)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Projects</button></div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Skills</h3>
              <button onClick={() => saveSection('skills', skills)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Skills</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Object.entries(skills).map(([category, items]: [string, any]) => (
                <div key={category} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700 capitalize">{category.replace(/_/g, ' ')}</label>
                  <textarea aria-label={`${category} skills`} className="w-full rounded-2xl border border-slate-200 px-4 py-3" rows={3} value={(items as string[]).join(', ')} onChange={(e) => setSkills({ ...skills, [category]: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Contact & Social Links</h3>
              <button onClick={() => saveSection('contact', contact)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Contact</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Email</label><input placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={contact.email || ''} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Phone</label><input placeholder="Phone" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={contact.phone || ''} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Location</label><input placeholder="Location" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={contact.location || ''} onChange={(e) => setContact({ ...contact, location: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">GitHub</label><input placeholder="GitHub URL" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={contact.github || ''} onChange={(e) => setContact({ ...contact, github: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">LinkedIn</label><input placeholder="LinkedIn URL" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={contact.linkedin || ''} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} /></div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Internship Projects</h3>
              <button onClick={() => { setInternships([...internships, { name: 'New Internship Project', description: '', technologies: [], status: 'Completed' }]); setMessage('Internship project draft added.') }} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add Internship</button>
            </div>
            <div className="mt-6 space-y-4">
              {internships.map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={item.name || ''} onChange={(e) => { const next = [...internships]; next[index].name = e.target.value; setInternships(next) }} placeholder="Name" />
                  <textarea className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3" value={item.description || ''} onChange={(e) => { const next = [...internships]; next[index].description = e.target.value; setInternships(next) }} rows={3} placeholder="Description" />
                  <input className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3" value={(item.technologies || []).join(', ')} onChange={(e) => { const next = [...internships]; next[index].technologies = e.target.value.split(',').map((x) => x.trim()).filter(Boolean); setInternships(next) }} placeholder="Technologies" />
                  <div className="mt-4 flex items-center justify-between">
                    <input className="w-40 rounded-2xl border border-slate-200 px-4 py-3" value={item.status || ''} onChange={(e) => { const next = [...internships]; next[index].status = e.target.value; setInternships(next) }} placeholder="Status" />
                    <button onClick={() => saveSection('internship', internships)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Internships</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
