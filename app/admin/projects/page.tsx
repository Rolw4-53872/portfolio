"use client"

import React, { useEffect, useRef, useState } from 'react'

type Project = {
  title: string
  description: string
  technologies: string[]
  type?: string
  image?: string
  featured?: boolean
  hidden?: boolean
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [editing, setEditing] = useState<number | null>(null)
  const dragIndex = useRef<number | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => typeof window !== 'undefined' && !!localStorage.getItem('isAdmin'))
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('/api/data/projects')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  function requireAuth() {
    if (isAdmin) return true
    if (password === 'rola-admin') {
      localStorage.setItem('isAdmin', '1')
      localStorage.setItem('adminToken', 'rola-admin')
      setIsAdmin(true)
      return true
    }
    alert('Incorrect password')
    return false
  }

  async function saveAll() {
    if (!requireAuth()) return
    const token = localStorage.getItem('adminToken') || 'rola-admin'
    await fetch('/api/data/projects', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(projects) })
    alert('Projects saved')
  }

  function addProject() {
    const p: Project = { title: newTitle || 'New Project', description: '', technologies: [], type: 'academic', featured: false, hidden: false }
    setProjects([p, ...projects])
    setNewTitle('')
  }

  function removeIndex(i: number) {
    const copy = [...projects]
    copy.splice(i, 1)
    setProjects(copy)
  }

  function onDragStart(e: React.DragEvent, idx: number) {
    dragIndex.current = idx
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault()
    const from = dragIndex.current
    if (from == null) return
    const copy = [...projects]
    const [moved] = copy.splice(from, 1)
    copy.splice(idx, 0, moved)
    setProjects(copy)
  }

  async function saveProject(i: number) {
    if (!requireAuth()) return
    const token = localStorage.getItem('adminToken') || 'rola-admin'
    await fetch('/api/data/projects', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(projects) })
    alert('Saved')
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const copy = [...projects]
      copy[i].image = reader.result as string
      setProjects(copy)
    }
    reader.readAsDataURL(file)
  }

  if (loading) return <div className="p-6">Loading...</div>

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Admin — Projects (Login)</h2>
        <div className="mt-6">
          <input className="border p-2" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="mt-3">
            <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => requireAuth()}>Login</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Admin — Projects</h2>
      <div className="mt-4 flex gap-3">
        <input className="border p-2" placeholder="New project title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={addProject}>Add</button>
        <button className="px-4 py-2" onClick={saveAll}>Save All</button>
      </div>

      <ul className="mt-6 space-y-3">
        {projects.map((p, i) => (
          <li key={i} draggable onDragStart={(e) => onDragStart(e, i)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, i)} className="glass p-4 rounded">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-4">
                <div className="w-28 h-20 bg-slate-50 rounded overflow-hidden">
                  {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="text-slate-400 p-2">No image</div>}
                </div>
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-600">{p.type}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => removeIndex(i)}>Delete</button>
                <button className="px-3 py-1 border rounded" onClick={() => setEditing(i)}>Edit</button>
              </div>
            </div>

            {editing === i && (
              <div className="mt-4 space-y-2">
                <label>Title</label>
                <input className="border p-2 w-full" value={p.title} onChange={(e) => { const copy = [...projects]; copy[i].title = e.target.value; setProjects(copy) }} />

                <label>Description</label>
                <textarea className="border p-2 w-full" value={p.description} onChange={(e) => { const copy = [...projects]; copy[i].description = e.target.value; setProjects(copy) }} />

                <label>Technologies (comma separated)</label>
                <input className="border p-2 w-full" value={p.technologies.join(', ')} onChange={(e) => { const copy = [...projects]; copy[i].technologies = e.target.value.split(',').map(s=>s.trim()); setProjects(copy) }} />

                <label>Type</label>
                <select className="border p-2" value={p.type} onChange={(e) => { const copy = [...projects]; copy[i].type = e.target.value; setProjects(copy) }}>
                  <option value="academic">Academic</option>
                  <option value="internship">Internship</option>
                  <option value="ml">Machine Learning</option>
                  <option value="dl">Deep Learning</option>
                  <option value="bi">Business Intelligence</option>
                </select>

                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={!!p.featured} onChange={(e) => { const copy = [...projects]; copy[i].featured = e.target.checked; setProjects(copy) }} /> Featured</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={!!p.hidden} onChange={(e) => { const copy = [...projects]; copy[i].hidden = e.target.checked; setProjects(copy) }} /> Hidden</label>
                </div>

                <div>
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={(e) => onImageChange(e, i)} />
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => { saveProject(i); setEditing(null) }}>Save</button>
                  <button className="px-4 py-2 border rounded" onClick={() => setEditing(null)}>Close</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
