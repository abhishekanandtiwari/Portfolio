// Serverless endpoint (Vercel-style). The API key stays on the server and is never sent to the browser.
import { SITE } from '../src/data/site.js'
import { PROJECTS } from '../src/data/projects.js'
import { SKILLS } from '../src/data/skills.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return res.status(503).json({ error: 'Assistant not configured' })
  const { message, history = [] } = req.body || {}
  if (typeof message !== 'string' || !message.trim() || message.length > 300) return res.status(400).json({ error: 'Invalid message' })
  const facts = JSON.stringify({ name: SITE.name, email: SITE.email, links: { github: SITE.github, linkedin: SITE.linkedin, medium: SITE.medium }, education: SITE.education, skills: SKILLS,
    projects: PROJECTS.map(({ name, problem, description, tech, features, repo, demo }) => ({ name, problem, description, tech, features, repo, demo })) })
  let past = (Array.isArray(history) ? history : []).slice(-6).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.text || '').slice(0, 500) }))
  while (past.length && past[0].role !== 'user') past.shift()
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: process.env.ASSISTANT_MODEL || 'claude-haiku-5-5', max_tokens: 400,
      system: `You are "Ask Abhishek", the assistant on Abhishek Anand Tiwari's portfolio. Answer ONLY from FACTS below. If something is null or not in FACTS, say it has not been shared yet; never invent details. Politely decline questions unrelated to the portfolio. Be concise.\nFACTS: ${facts}`,
      messages: [...past, { role: 'user', content: message.trim() }] }),
  })
  if (!r.ok) return res.status(502).json({ error: 'Upstream error' })
  const d = await r.json()
  res.json({ reply: (d.content || []).filter(c => c.type === 'text').map(c => c.text).join('') })
}
