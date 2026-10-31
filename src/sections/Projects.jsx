import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { FILTERS, PROJECTS } from '../data/projects.js'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const shown = PROJECTS.filter(p => (filter === 'all' || p.category === filter) &&
    (!term || [p.name, p.description, p.label, ...p.tech].join(' ').toLowerCase().includes(term)))
  return (
    <section id="projects" aria-labelledby="projects-h"><Reveal className="wrap">
      <div className="eyebrow">02 / Projects</div>
      <h2 id="projects-h">Featured work</h2>
      <div className="tools">
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map(([k, l]) => <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>)}
        </div>
        <label className="search"><span className="sr">Search projects by name or technology</span>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by technology, e.g. Python" /></label>
      </div>
      <p className="sr" role="status">{shown.length} project{shown.length === 1 ? '' : 's'} shown</p>
      <div className="plist">{shown.map(p => <ProjectCard key={p.id} project={p} />)}</div>
      {!shown.length && <p className="muted">No projects match. Try another keyword or category.</p>}
    </Reveal></section>
  )
}
