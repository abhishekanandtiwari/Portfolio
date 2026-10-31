import { useEffect, useMemo, useRef, useState } from 'react'
import { NAV, EXTRA_NAV, SITE } from '../data/site.js'
import { toggleTheme } from '../lib/theme.js'

// Ctrl/Cmd + K (or the nav button) opens a keyboard-driven launcher.
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const input = useRef(null), opener = useRef(null)

  const cmds = useMemo(() => [
    ...[...NAV, ...EXTRA_NAV].map(([id, l]) => ({ label: `Go to ${l}`, run: () => document.getElementById(id)?.scrollIntoView() })),
    { label: 'Ask Abhishek (assistant)', run: () => dispatchEvent(new Event('open-assistant')) },
    { label: 'Open GitHub', run: () => open_(SITE.github) },
    { label: 'Open LinkedIn', run: () => open_(SITE.linkedin) },
    { label: 'Open Medium', run: () => open_(SITE.medium) },
    { label: 'Copy email address', run: () => navigator.clipboard?.writeText(SITE.email) },
    ...(SITE.resume ? [{ label: 'Download resume', run: () => open_(SITE.resume) }] : []),
    { label: 'Toggle light/dark theme', run: toggleTheme },
  ], [])
  const list = cmds.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))

  const close = () => { setOpen(false); setQ(''); setI(0); opener.current?.focus() }
  useEffect(() => {
    const key = e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); opener.current = document.activeElement; setOpen(o => !o) } }
    const ev = () => { opener.current = document.activeElement; setOpen(true) }
    addEventListener('keydown', key); addEventListener('open-palette', ev)
    return () => { removeEventListener('keydown', key); removeEventListener('open-palette', ev) }
  }, [])
  useEffect(() => { if (open) input.current?.focus() }, [open])

  const onKey = e => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI(n => Math.min(n + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI(n => Math.max(n - 1, 0)) }
    else if (e.key === 'Enter' && list[i]) { list[i].run(); close() }
  }
  if (!open) return null
  return (
    <div className="pal-back" onMouseDown={e => e.target === e.currentTarget && close()}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette">
        <input ref={input} value={q} onChange={e => { setQ(e.target.value); setI(0) }} onKeyDown={onKey} placeholder="Type a command…" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-activedescendant={list[i] ? `pal-${i}` : undefined} aria-label="Search commands" />
        <ul id="pal-list" role="listbox">
          {list.map((c, n) => <li key={c.label} id={`pal-${n}`} role="option" aria-selected={n === i} onMouseEnter={() => setI(n)} onClick={() => { c.run(); close() }}>{c.label}</li>)}
          {!list.length && <li className="none">No matching command</li>}
        </ul>
        <p className="hint">↑↓ to move · Enter to run · Esc to close</p>
      </div>
    </div>
  )
}
function open_(url) { window.open(url, '_blank', 'noopener,noreferrer') }
