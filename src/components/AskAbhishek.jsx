import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site.js'
import { answer } from '../lib/knowledge.js'

const SUGGEST = ['Who is Abhishek?', 'What technologies does he work with?', 'Explain his Medicare-AI project', 'Tell me about the Predictive Autoscaling Engine', 'How can I contact him?']
const HELLO = { role: 'bot', text: 'Hi! Ask me about Abhishek’s skills, projects, interests or contact details.' }

export default function AskAbhishek() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([HELLO])
  const [val, setVal] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef(null)
  useEffect(() => { const o = () => setOpen(true); addEventListener('open-assistant', o); return () => removeEventListener('open-assistant', o) }, [])
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs, busy])

  const send = async text => {
    const q = text.trim()
    if (!q || busy) return
    if (q.length > 300) return setMsgs(m => [...m, { role: 'bot', text: 'Please keep questions under 300 characters.' }])
    const history = msgs.slice(-6)
    setMsgs(m => [...m, { role: 'user', text: q }]); setVal(''); setBusy(true)
    try {
      let reply
      if (SITE.assistantEndpoint) {
        const r = await fetch(SITE.assistantEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q, history }) })
        if (!r.ok) throw new Error()
        reply = (await r.json()).reply
        if (!reply) throw new Error()
      } else { await new Promise(r => setTimeout(r, 450)); reply = answer(q) }
      setMsgs(m => [...m, { role: 'bot', text: reply }])
    } catch { setMsgs(m => [...m, { role: 'bot', text: `The assistant is unavailable right now. You can email ${SITE.email} instead.` }]) }
    setBusy(false)
  }
  if (!open) return <button type="button" className="ask-fab" onClick={() => setOpen(true)} aria-label="Open Ask Abhishek assistant">Ask Abhishek</button>
  return (
    <div className="ask" role="dialog" aria-label="Ask Abhishek" onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
      <div className="ask-head"><b>ASK ABHISHEK</b>
        <span><button type="button" className="icon-btn" onClick={() => setMsgs([HELLO])} aria-label="Clear conversation">⟲</button>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close assistant">✕</button></span></div>
      <p className="note">{SITE.assistantEndpoint ? 'AI mode: answers are limited to this portfolio.' : 'Offline mode: answers come from this portfolio’s data, not an AI model.'}</p>
      <div className="ask-log" role="log" aria-live="polite">
        {msgs.map((m, n) => <div key={n} className={`msg ${m.role}`}>{m.text}</div>)}
        {busy && <div className="msg bot" aria-label="Assistant is typing">…</div>}
        <div ref={end} />
      </div>
      <div className="sugg">{SUGGEST.map(s => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}</div>
      <form className="ask-in" onSubmit={e => { e.preventDefault(); send(val) }}>
        <input value={val} onChange={e => setVal(e.target.value)} maxLength={300} placeholder="Ask a question…" aria-label="Your question" autoFocus />
        <button className="btn primary" type="submit" disabled={busy}>Send</button>
      </form>
    </div>
  )
}
