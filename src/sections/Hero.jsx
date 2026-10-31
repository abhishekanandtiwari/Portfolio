import { useEffect, useState } from 'react'
import Button from '../components/Button.jsx'
import Constellation from '../components/Constellation.jsx'
import Typing from '../components/Typing.jsx'
import { SITE } from '../data/site.js'

const ROLES = ['Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Data Structures & Algorithms']
const greet = h => (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening')

export default function Hero() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t) }, [])
  return (
    <section id="home" className="hero" aria-labelledby="hero-h">
      <Constellation />
      <div className="floaters" aria-hidden="true"><span>{'{ }'}</span><span>{'</>'}</span><span>λ</span><span>01</span><span>Σ</span></div>
      <div className="wrap hero-in">
        <p className="greet">{greet(now.getHours())} · your local time {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <span className="tag">// SOFTWARE ENGINEERING · AI · ML</span>
        {SITE.availability && <span className="status"><i aria-hidden="true" />{SITE.availability}</span>}
        <h1 id="hero-h">I build software that <span className="grad">solves real problems.</span></h1>
        <p className="roles">Exploring <Typing words={ROLES} /><span className="caret" aria-hidden="true" /></p>
        <p className="lead">I’m Abhishek Anand Tiwari, a Computer Science Engineering student exploring software engineering, artificial intelligence, and machine learning. I enjoy turning complex problems into useful, well-designed software.</p>
        <div className="row">
          <Button href="#projects" variant="primary">Explore My Work →</Button>
          <Button href="#contact">Contact Me</Button>
          <Button href={SITE.resume} download placeholder="add resume PDF">Download Resume</Button>
          <Button href={SITE.github} external>GitHub ↗</Button>
          <Button href={SITE.linkedin} external>LinkedIn ↗</Button>
        </div>
      </div>
      <a className="scroll-ind" href="#about" aria-label="Scroll to About"><i /></a>
    </section>
  )
}
