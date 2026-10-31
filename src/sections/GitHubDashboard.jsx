import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import useGithub from '../lib/useGithub.js'
import { SITE } from '../data/site.js'
import { PROJECTS } from '../data/projects.js'

const user = SITE.github.split('/').filter(Boolean).pop()

export default function GitHubDashboard() {
  const { status, repos, error } = useGithub(user)
  const [q, setQ] = useState('')
  const stats = useMemo(() => {
    const langs = {}; repos.forEach(r => r.language && (langs[r.language] = (langs[r.language] || 0) + 1))
    return { stars: repos.reduce((a, r) => a + r.stargazers_count, 0), forks: repos.reduce((a, r) => a + r.forks_count, 0), langs: Object.entries(langs).sort((a, b) => b[1] - a[1]) }
  }, [repos])
  const shown = repos.filter(r => `${r.name} ${r.description || ''} ${r.language || ''}`.toLowerCase().includes(q.toLowerCase()))
  const max = stats.langs[0]?.[1] || 1
  return (
    <section id="github" aria-labelledby="gh-h"><Reveal className="wrap">
      <div className="eyebrow">03 / GitHub</div>
      <h2 id="gh-h">Live from GitHub</h2>
      <p className="measure">Public data fetched from the GitHub API for <a href={SITE.github} target="_blank" rel="noopener noreferrer">{user}</a>. Nothing here is hand-written.</p>
      {status === 'loading' && <p role="status" className="muted">Loading repositories…</p>}
      {status === 'error' && <div className="card" role="alert"><p>{error}</p>
        <p>Meanwhile, here are the projects from this portfolio:</p>
        <ul className="features">{PROJECTS.map(p => <li key={p.id}>{p.name}</li>)}</ul>
        <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">Open GitHub profile ↗</a></div>}
      {status === 'ok' && <>
        <div className="grid stats">
          {[['Public repos', repos.length], ['Stars', stats.stars], ['Forks', stats.forks], ['Languages', stats.langs.length]].map(([l, v]) => <div className="card" key={l}><div className="big">{v}</div><div className="eyebrow">{l}</div></div>)}
        </div>
        {stats.langs.length > 0 && <div className="card langs"><div className="eyebrow">Language distribution (by repo count)</div>
          {stats.langs.map(([l, n]) => <div className="lang" key={l}><span>{l}</span><i style={{ width: `${(n / max) * 100}%` }} /><b>{n}</b></div>)}</div>}
        <label className="search"><span className="sr">Search repositories</span><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search repositories…" /></label>
        {!repos.length && <p className="muted">No public repositories found yet.</p>}
        {repos.length > 0 && !shown.length && <p className="muted">No repositories match “{q}”.</p>}
        <div className="grid repos">{shown.map(r => (
          <a key={r.id} className="card repo" href={r.html_url} target="_blank" rel="noopener noreferrer">
            <h3>{r.name}{r.fork ? ' (fork)' : ''}</h3><p>{r.description || 'No description.'}</p>
            <div className="meta">{r.language && <span>{r.language}</span>}<span>★ {r.stargazers_count}</span><span>⑂ {r.forks_count}</span><span>Updated {new Date(r.pushed_at).toLocaleDateString()}</span></div>
          </a>))}</div>
      </>}
    </Reveal></section>
  )
}
