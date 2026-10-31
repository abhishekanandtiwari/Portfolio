import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { SITE } from '../data/site.js'

// To show real articles later, add { title, url } entries here (copy them from your Medium profile).
const ARTICLES = []

export default function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-h"><Reveal className="wrap">
      <div className="eyebrow">04 / Writing</div>
      <h2 id="writing-h">Writing to learn.</h2>
      <p className="measure">Explaining a concept is one of the best ways to understand it. I use Medium to write about what I’m learning in software, AI and machine learning.</p>
      {ARTICLES.length > 0 && <ul className="articles">{ARTICLES.map(a => <li key={a.url}><a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a></li>)}</ul>}
      <Button href={SITE.medium} external variant="primary">Read on Medium ↗</Button>
    </Reveal></section>
  )
}
