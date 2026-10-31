import { useEffect, useMemo, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { bubbleSteps, bsearchSteps, rand } from '../lib/algos.js'

const INFO = {
  bubble: ['Bubble Sort', 'Time O(n²) worst/average, O(n) best with early exit · Space O(1)', 'Repeatedly compares neighbours and swaps them if out of order; the largest value “bubbles” to the end each pass.'],
  bsearch: ['Binary Search', 'Time O(log n) · Space O(1) · requires a sorted array', 'Checks the middle element and discards the half that cannot contain the target.'],
}
export default function Playground() {
  const [algo, setAlgo] = useState('bsearch')
  const [base, setBase] = useState(() => rand(12))
  const [target, setTarget] = useState(42)
  const [i, setI] = useState(0), [play, setPlay] = useState(false), [speed, setSpeed] = useState(700)
  const steps = useMemo(() => algo === 'bubble' ? bubbleSteps(base) : bsearchSteps([...base].sort((a, b) => a - b), target), [algo, base, target])
  const s = steps[Math.min(i, steps.length - 1)]
  useEffect(() => { if (!play) return; if (i >= steps.length - 1) return setPlay(false); const t = setTimeout(() => setI(n => n + 1), speed); return () => clearTimeout(t) }, [play, i, speed, steps.length])
  const reset = () => { setPlay(false); setI(0) }
  const pick = a => { setAlgo(a); reset() }
  const fresh = () => { const b = rand(12); setBase(b); setTarget(b[Math.floor(Math.random() * b.length)]); reset() }
  const cls = n => algo === 'bubble'
    ? (s.hl.includes(n) ? 'hl' : n >= s.arr.length - s.done ? 'ok' : '')
    : (s.found === n ? 'ok' : n === s.mid ? 'hl' : n >= s.lo && n <= s.hi ? 'in' : 'out')
  const [title, cx, desc] = INFO[algo]
  return (
    <section id="playground" aria-labelledby="pg-h"><Reveal className="wrap">
      <div className="eyebrow">04 / Playground</div>
      <h2 id="pg-h">Algorithm playground</h2>
      <p className="measure">Step through classic algorithms. This runs entirely in your browser on random sample data; no code you type is ever executed.</p>
      <div className="filters" role="group" aria-label="Choose algorithm">
        {Object.entries(INFO).map(([k, v]) => <button key={k} type="button" aria-pressed={algo === k} onClick={() => pick(k)}>{v[0]}</button>)}
      </div>
      <div className="card lab">
        <div className="bars" role="img" aria-label={`${title} visualisation. ${s.note}`}>
          {s.arr.map((v, n) => <div key={n} className={`bar ${cls(n)}`} style={{ height: `${20 + v * 1.5}px` }}><span>{v}</span></div>)}
        </div>
        <p className="step">Step {Math.min(i, steps.length - 1) + 1}/{steps.length}: {s.note}</p>
        <div className="row">
          <button type="button" className="btn primary" onClick={() => (i >= steps.length - 1 ? (setI(0), setPlay(true)) : setPlay(p => !p))}>{play ? 'Pause' : 'Play'}</button>
          <button type="button" className="btn" onClick={() => { setPlay(false); setI(n => Math.max(n - 1, 0)) }}>← Back</button>
          <button type="button" className="btn" onClick={() => { setPlay(false); setI(n => Math.min(n + 1, steps.length - 1)) }}>Step →</button>
          <button type="button" className="btn" onClick={reset}>Reset</button>
          <button type="button" className="btn" onClick={fresh}>New array</button>
          <label className="ctl">Speed <input type="range" min="150" max="1200" step="50" value={1350 - speed} onChange={e => setSpeed(1350 - +e.target.value)} aria-label="Animation speed" /></label>
          {algo === 'bsearch' && <label className="ctl">Target <input type="number" min="1" max="99" value={target} onChange={e => { setTarget(Math.min(99, Math.max(1, +e.target.value || 1))); reset() }} aria-label="Search target" /></label>}
        </div>
        <p className="note"><b>{title}:</b> {desc}<br />{cx}</p>
      </div>
    </Reveal></section>
  )
}
