"use client"

import React, { useEffect, useState } from 'react'

export default function AdminProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => typeof window !== 'undefined' && !!localStorage.getItem('isAdmin'))
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('/api/data/profile')
      .then((r) => r.json())
      .then((data) => {
        setProfile(data)
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

  async function save() {
    if (!requireAuth()) return
    const token = localStorage.getItem('adminToken') || 'rola-admin'
    await fetch('/api/data/profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(profile) })
    alert('Profile saved')
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfile({ ...profile, photo: reader.result })
    reader.readAsDataURL(file)
  }

  function onCVChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfile({ ...profile, cv: reader.result })
    reader.readAsDataURL(file)
  }

  if (loading) return <div className="p-6">Loading...</div>

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Admin — Profile (Login)</h2>
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
      <h2 className="text-2xl font-bold">Admin — Profile</h2>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="glass p-4 rounded">
          <label className="block">Name</label>
          <input className="border p-2 w-full" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

          <label className="block mt-3">Title</label>
          <input className="border p-2 w-full" value={profile.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />

          <label className="block mt-3">Location</label>
          <input className="border p-2 w-full" value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />

          <label className="block mt-3">Email</label>
          <input className="border p-2 w-full" value={profile.social?.email || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, email: e.target.value } })} />

          <label className="block mt-3">GitHub</label>
          <input className="border p-2 w-full" value={profile.social?.github || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, github: e.target.value } })} />

          <label className="block mt-3">LinkedIn</label>
          <input className="border p-2 w-full" value={profile.social?.linkedin || ''} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, linkedin: e.target.value } })} />
        </div>

        <div className="glass p-4 rounded">
          <h3 className="font-semibold">Internship</h3>
          <label className="block mt-2">Company</label>
          <input className="border p-2 w-full" value={profile.internship?.company || ''} onChange={(e) => setProfile({ ...profile, internship: { ...profile.internship, company: e.target.value } })} />

          <label className="block mt-2">Position</label>
          <input className="border p-2 w-full" value={profile.internship?.position || ''} onChange={(e) => setProfile({ ...profile, internship: { ...profile.internship, position: e.target.value } })} />

          <label className="block mt-2">From</label>
          <input className="border p-2 w-full" value={profile.internship?.from || ''} onChange={(e) => setProfile({ ...profile, internship: { ...profile.internship, from: e.target.value } })} />

          <label className="block mt-2">To</label>
          <input className="border p-2 w-full" value={profile.internship?.to || ''} onChange={(e) => setProfile({ ...profile, internship: { ...profile.internship, to: e.target.value } })} />

          <label className="block mt-2">Description</label>
          <textarea className="border p-2 w-full" value={profile.internship?.description || ''} onChange={(e) => setProfile({ ...profile, internship: { ...profile.internship, description: e.target.value } })} />
        </div>
      </div>

      <div className="mt-6 glass p-4 rounded">
        <h3 className="font-semibold">Media</h3>
        <div className="mt-3">
          <label>Profile Photo</label>
          <div className="mt-2 flex items-center gap-4">
            <div className="w-28 h-28 bg-slate-50 rounded overflow-hidden">
              {profile.photo ? <img src={profile.photo} alt="photo" className="w-full h-full object-cover" /> : <div className="text-slate-400 p-2">No photo</div>}
            </div>
            <input type="file" accept="image/*" onChange={onImageChange} />
          </div>
        </div>

        <div className="mt-4">
          <label>Upload CV (PDF)</label>
          <div className="mt-2">
            <input type="file" accept="application/pdf" onChange={onCVChange} />
            {profile.cv && <div className="mt-2 text-sm text-slate-600">CV uploaded</div>}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={save}>Save Profile</button>
      </div>
    </main>
  )
}
