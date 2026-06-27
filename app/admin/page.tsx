"use client"

import React, { useEffect, useState } from 'react'

export default function AdminPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data/profile')
      .then((r) => r.json())
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  async function save() {
    await fetch('/api/data/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
    alert('Saved')
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Admin Dashboard (Profile)</h2>
      <div className="mt-6">
        <label className="block">Name</label>
        <input className="border p-2 w-full" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

        <label className="block mt-4">Title</label>
        <input className="border p-2 w-full" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded" onClick={save}>Save</button>
        </div>
      </div>
    </main>
  )
}
