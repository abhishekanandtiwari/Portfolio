import { useRef, useState, useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import { SITE } from '../data/site.js'
import { ABOUT, SKILL_TEXT, CONTACT_TEXT, PROJECT_LIST, EDU_TEXT } from '../lib/knowledge.js'

const go = (url, name) => { window.open(url, '_blank', 'noopener,noreferrer'); return `Opening ${name}…\n${url}` }
const COMMANDS = {
  help: () => 'Commands: ' + Object.keys(COMMANDS).join(', '),
  about: () => ABOUT, whoami: () => `${SITE.name}, CSE student`, skills: () => SKILL_TEXT, projects: () => PROJECT_LIST,
  education: EDU_TEXT, contact: () => CONTACT_TEXT,
  github: () => go(SITE.github, 'GitHub'), linkedin: () => go(SITE.linkedin, 'LinkedIn'), medium: () => go(SITE.medium, 'Medium'),
  resume: () => SITE.resume ? go(SITE.resume, 'resume') : 'Resume not added yet. Put the PDF in public/resume/ and set it in data/site.js.',
  clear: () => null,
}
const Line = ({ text }) => text.split('\n').map((l, i) => {
  const m = l.match(/^([A-Za-z ]+): (.*)$/)
  return <div key={i}>{m ? <><span className="k">{m[1]}:</span> {m[2]}</> : l}</div>
})

export default function Terminal() {
  const [log, setLog] = useState([{ cmd: 'help', out: COMMANDS.help() }])
  const [val, setVal] = useState('')
  const [hist, setHist] = useState([]); const [pos, setPos] = useState(-1)
  const end = useRef(null), input = useRef(null)
  useEffect(() => { const b = end.current?.parentElement; if (b) b.scrollTop = b.scrollHeight }, [log])
  const run = e => {
    e.preventDefault()
    const c = val.trim().toLowerCase(); if (!c) return
    const f = COMMANDS[c], out = f ? f() : `command not found: ${c}. Type help.`
    setHist(h => [...h, c]); setPos(-1); setVal('')
    setLog(l => out === null ? [] : [...l, { cmd: c, out }])
  }
  const key = e => {
    if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); const p = pos < 0 ? hist.length - 1 : Math.max(pos - 1, 0); setPos(p); setVal(hist[p]) }
    else if (e.key === 'ArrowDown' && pos >= 0) { e.preventDefault(); const p = pos + 1; if (p >= hist.length) { setPos(-1); setVal('') } else { setPos(p); setVal(hist[p]) } }
    else if (e.key === 'Tab') { e.preventDefault(); const m = Object.keys(COMMANDS).filter(k => k.startsWith(val.toLowerCase())); if (val && m.length) setVal(m[0]) }
  }
  return (
    <section id="terminal" aria-labelledby="term-h"><Reveal className="wrap">
      <div className="eyebrow">05 / Terminal</div>
      <h2 id="term-h">Explore from the command line</h2>
      <div className="term" onClick={() => input.current?.focus()}>
        <div className="term-body" role="log" aria-live="polite" aria-label="Terminal output">
          {log.map((l, i) => <div key={i}><div><span className="ps">$</span> <span className="cmd">{l.cmd}</span></div><Line text={l.out} /></div>)}
          <div ref={end} />
        </div>
        <form onSubmit={run} className="term-in"><span className="ps" aria-hidden="true">$</span>
          <input ref={input} value={val} onChange={e => setVal(e.target.value)} onKeyDown={key} aria-label="Terminal command" autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" placeholder="type a command, e.g. skills" /></form>
      </div>
      <p className="note">↑/↓ history · Tab completes · try <code>help</code></p>
    </Reveal></section>
  )
}
