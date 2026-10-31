import { useState } from 'react'
import Button from './Button.jsx'
import useTilt from '../lib/useTilt.js'

export default function ProjectCard({ project: p }) {
  const [broken, setBroken] = useState(false)
  const tilt = useTilt()
  return (
    <article className="card project" ref={tilt}>
      <div className={`shot ${p.image && !broken ? 'has' : ''}`}>
        {p.image && !broken
          ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" onError={() => setBroken(true)} />
          : <span>Screenshot placeholder<br /><small>add to public/projects/ and set image in data/projects.js</small></span>}
      </div>
      <div>
        <div className="eyebrow">{p.label}</div>
        <h3>{p.name}</h3>
        <p className="problem">{p.problem}</p>
        <p>{p.description}</p>
        <ul className="chips" aria-label="Technologies">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
        <details className="more"><summary>Key features</summary>
          <ul className="features">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
        </details>
        <div className="row">
          <Button href={p.repo} external>GitHub repo</Button>
          {p.demo && <Button href={p.demo} external variant="primary">Live demo</Button>}
        </div>
      </div>
    </article>
  )
}
