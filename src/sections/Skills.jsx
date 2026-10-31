import Reveal from '../components/Reveal.jsx'
import { SKILLS } from '../data/skills.js'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h"><Reveal className="wrap">
      <div className="eyebrow">03 / Skills</div>
      <h2 id="skills-h">Tools I work with</h2>
      <div className="grid">{Object.entries(SKILLS).map(([g, list]) => (
        <div className="card" key={g}><div className="eyebrow">{g}</div><ul className="chips">{list.map(s => <li key={s}>{s}</li>)}</ul></div>
      ))}</div>
    </Reveal></section>
  )
}
