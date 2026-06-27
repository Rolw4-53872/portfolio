"use client"

import React, { useEffect, useState } from 'react'

type Cert = {
  title: string
  issuer?: string
  date?: string
  description?: string
  file?: string
}

export default function AdminCerts() {
  const [certs, setCerts] = useState<Cert[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => typeof window !== 'undefined' && !!localStorage.getItem('isAdmin'))
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetch('/api/data/certifications')
      .then((r) => r.json())
      .then((data) => {
        setCerts(data)
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
    await fetch('/api/data/certifications', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(certs) })
    alert('Saved')
  }

  function addCert() {
    if (!newTitle) return
    setCerts([{ title: newTitle }, ...certs])
    setNewTitle('')
  }

  function removeIndex(i: number) {
    const copy = [...certs]
    copy.splice(i, 1)
    setCerts(copy)
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const copy = [...certs]
      copy[i].file = reader.result as string
      setCerts(copy)
    }
    reader.readAsDataURL(file)
  }

  if (loading) return <div className="p-6">Loading...</div>

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Admin — Certifications (Login)</h2>
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
      <h2 className="text-2xl font-bold">Admin — Certifications</h2>

      <div className="mt-4 flex gap-2">
        <input className="border p-2" placeholder="New certification title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={addCert}>Add</button>
        <button className="px-4 py-2" onClick={saveAll}>Save All</button>
      </div>

      <div className="mt-6 space-y-3">
        {certs.map((c, i) => (
          <div key={i} className="glass p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-slate-600">{c.issuer} — {c.date}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => removeIndex(i)}>Delete</button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <input className="border p-2 w-full" placeholder="Issuer" value={c.issuer || ''} onChange={(e) => { const copy = [...certs]; copy[i].issuer = e.target.value; setCerts(copy) }} />
              <input className="border p-2 w-full" placeholder="Date" value={c.date || ''} onChange={(e) => { const copy = [...certs]; copy[i].date = e.target.value; setCerts(copy) }} />
              <textarea className="border p-2 w-full" placeholder="Description" value={c.description || ''} onChange={(e) => { const copy = [...certs]; copy[i].description = e.target.value; setCerts(copy) }} />
              <div>
                <label className="block">Upload file (PDF/Image)</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => onFileChange(e, i)} />
                {c.file && <div className="mt-2 text-sm text-slate-600">File uploaded</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
