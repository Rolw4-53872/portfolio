import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const allowed = ['projects','internship','skills','experience','profile','contact']
const dataDir = path.join(process.cwd(), 'data')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query as { name: string }
  if (!allowed.includes(name)) return res.status(404).json({ error: 'Not found' })
  const filePath = path.join(dataDir, `${name}.json`)
  if (req.method === 'GET') {
    try {
      const raw = await fs.promises.readFile(filePath, 'utf-8')
      const parsed = JSON.parse(raw)

      // allow admin to fetch full data when providing valid token
      const adminToken = process.env.ADMIN_TOKEN || 'rola-admin'
      const token = (req.headers['x-admin-token'] as string) || ''
      if (token === adminToken) return res.status(200).json(parsed)

      // For arrays (projects, certifications, etc.) filter out hidden items
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((it: any) => !it.hidden)
        return res.status(200).json(filtered)
      }

      // For profile object: hide potentially sensitive fields (cv, photo) for non-admin
      if (typeof parsed === 'object' && parsed !== null) {
        const copy = { ...parsed }
        if (copy.cv) delete copy.cv
        if (copy.photo) delete copy.photo
        return res.status(200).json(copy)
      }

      return res.status(200).json(parsed)
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read' })
    }
  }

  if (req.method === 'POST') {
    // require admin token header for writes
    const adminToken = process.env.ADMIN_TOKEN || 'rola-admin'
    const token = (req.headers['x-admin-token'] as string) || ''
    if (token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
      const body = req.body
      await fs.promises.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8')
      return res.status(200).json({ ok: true })
    } catch (e) {
      return res.status(500).json({ error: 'Failed to write' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
