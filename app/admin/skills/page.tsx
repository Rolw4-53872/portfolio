"use client"

import React, { useEffect, useState } from 'react'

type Skills = Record<string, string[]>

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skills>({})
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean>(() => typeof window !== 'undefined' && !!localStorage.getItem('isAdmin'))
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('/api/data/skills')
      .then((r) => r.json())
      .then((data) => {
        setSkills(data)
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
    await fetch('/api/data/skills', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(skills) })
    alert('Saved')
  }

  function addCategory() {
    if (!newCategory) return
    setSkills({ ...skills, [newCategory]: [] })
    setNewCategory('')
  }

  function removeCategory(cat: string) {
    const copy = { ...skills }
    delete copy[cat]
    setSkills(copy)
  }

  function addSkill(cat: string, name: string) {
    const copy = { ...skills }
    copy[cat] = [...(copy[cat] || []), name]
    setSkills(copy)
  }

  function removeSkill(cat: string, idx: number) {
    const copy = { ...skills }
    copy[cat] = copy[cat].filter((_, i) => i !== idx)
    setSkills(copy)
  }

  if (loading) return <div className="p-6">Loading...</div>

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Admin — Skills (Login)</h2>
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
      <h2 className="text-2xl font-bold">Admin — Skills</h2>

      <div className="mt-4">
        <div className="flex gap-2">
          <input className="border p-2" placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button className="px-4 py-2 bg-primary text-white rounded" onClick={addCategory}>Add Category</button>
          <button className="px-4 py-2" onClick={saveAll}>Save All</button>
        </div>

        <div className="mt-6 space-y-4">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="glass p-4 rounded">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{cat}</h3>
                <button className="px-2 py-1 border rounded" onClick={() => removeCategory(cat)}>Delete Category</button>
              </div>

              <div className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {items.map((it, i) => (
                    <li key={i} className="px-3 py-1 bg-slate-100 rounded flex items-center gap-2">
                      <span>{it}</span>
                      <button className="text-sm" onClick={() => removeSkill(cat, i)}>x</button>
                    </li>
                  ))}
                </ul>

                <AddSkillForm onAdd={(name) => addSkill(cat, name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function AddSkillForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [val, setVal] = useState('')
  return (
    <div className="mt-3 flex gap-2">
      <input className="border p-2" placeholder="Skill name" value={val} onChange={(e) => setVal(e.target.value)} />
      <button className="px-3 py-1 bg-slate-200 rounded" onClick={() => { if (val) { onAdd(val); setVal('') } }}>Add</button>
    </div>
  )
}
