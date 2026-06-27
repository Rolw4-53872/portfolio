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
      return res.status(200).json(JSON.parse(raw))
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read' })
    }
  }

  if (req.method === 'POST') {
    // simple admin write endpoint
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
