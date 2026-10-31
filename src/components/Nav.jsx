import { useEffect, useState } from 'react'
import { NAV } from '../data/site.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 20)
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? scrollY / max : 0)
    }
    onScroll(); addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    const esc = e => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('keydown', esc); io.disconnect() }
  }, [])

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="wrap nav" aria-label="Primary">
          <a className="logo" href="#home" aria-label="Abhishek Anand Tiwari, home">AT</a>
          <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
          <div id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'on' : ''}`} aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <button type="button" className="icon-btn kbd" aria-label="Open command palette (Ctrl+K)" onClick={() => dispatchEvent(new Event('open-palette'))}>⌘K</button>
            <ThemeToggle />
            <a className="btn primary" href="#contact" onClick={() => setOpen(false)}>Let’s Connect</a>
          </div>
        </nav>
      </header>
    </>
  )
}
