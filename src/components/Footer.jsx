import { NAV, SITE } from '../data/site.js'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div><a className="logo" href="#home" aria-label="Back to top">AT</a> <span className="muted">{SITE.name} · © {new Date().getFullYear()}</span>
          <p className="muted small">Built with curiosity. Always learning.</p></div>
        <nav aria-label="Footer">
          {NAV.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={SITE.medium} target="_blank" rel="noopener noreferrer">Medium</a>
        </nav>
      </div>
    </footer>
  )
}
