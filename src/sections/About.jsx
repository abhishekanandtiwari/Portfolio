import Reveal from '../components/Reveal.jsx'
import { SITE } from '../data/site.js'

const INTERESTS = [
  ['Software Engineering', 'Designing and shipping working applications end to end.'],
  ['AI & Machine Learning', 'Using data and models to support better decisions.'],
  ['Web Development', 'Building responsive, accessible interfaces.'],
  ['Data Structures & Algorithms', 'Choosing the right structure for the problem in front of me.'],
]
const EDU = [['College', 'college'], ['Degree', 'degree'], ['Expected graduation', 'graduationYear']]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h"><Reveal className="wrap">
      <div className="eyebrow">01 / About</div>
      <h2 id="about-h">Learning by building practical things.</h2>
      <p className="measure">I’m a Computer Science Engineering student who enjoys building practical applications and learning through real projects.</p>
      <div className="grid">{INTERESTS.map(([t, d], i) => <div className="card" key={t}><div className="eyebrow">0{i + 1}</div><h3>{t}</h3><p>{d}</p></div>)}</div>
      <dl className="edu">{EDU.map(([label, key]) => (
        <div key={key}><dt>{label}</dt><dd className={SITE.education[key] ? '' : 'todo'}>{SITE.education[key] || `[Add your ${label.toLowerCase()} in data/site.js]`}</dd></div>
      ))}</dl>
    </Reveal></section>
  )
}
