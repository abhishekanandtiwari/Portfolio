import { useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { SITE } from '../data/site.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validate = f => ({
  ...(f.name.trim() ? {} : { name: 'Please enter your name.' }),
  ...(EMAIL_RE.test(f.email) ? {} : { email: 'Please enter a valid email address.' }),
  ...(f.message.trim().length >= 10 ? {} : { message: 'Message should be at least 10 characters.' }),
})

export default function Contact() {
  const [copy, setCopy] = useState('Copy email')
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({})
  const [st, setSt] = useState(null)
  const form = useRef(null)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(SITE.email); setCopy('Copied ✓') } catch { setCopy('Copy failed') }
    setTimeout(() => setCopy('Copy email'), 1800)
  }
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    const v = validate(f); setErr(v); setSt(null)
    if (Object.keys(v).length) { form.current.querySelector(`[name=${Object.keys(v)[0]}]`)?.focus(); return }
    if (SITE.formEndpoint) { // real delivery through your form service (e.g. Formspree)
      try {
        const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
        if (!r.ok) throw new Error()
        setSt({ ok: true, msg: 'Thanks! Your message was sent.' }); setF({ name: '', email: '', message: '' })
      } catch { setSt({ ok: false, msg: `Sending failed. Please email ${SITE.email} directly.` }) }
    } else { // no backend configured: hand the message to the visitor's email app, honestly
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Portfolio message from ${f.name}`)}&body=${encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`)}`
      setSt({ ok: true, msg: 'Your email app should open with the message ready. It is only sent when you press Send there.' })
    }
  }
  const field = (k, label, props = {}) => (
    <div className="field"><label htmlFor={`c-${k}`}>{label}</label>
      {k === 'message' ? <textarea id="c-message" name="message" rows="5" value={f.message} onChange={set('message')} aria-invalid={!!err.message} aria-describedby="e-message" />
        : <input id={`c-${k}`} name={k} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={`e-${k}`} {...props} />}
      <span className="err" id={`e-${k}`}>{err[k]}</span></div>
  )
  return (
    <section id="contact" className="contact" aria-labelledby="contact-h"><Reveal className="wrap">
      <div className="eyebrow">05 / Contact</div>
      <h2 id="contact-h">HAVE A PROBLEM WORTH SOLVING?</h2>
      <p className="measure">I’m always interested in learning, building useful software, and exploring new ideas. If you have an interesting project or opportunity, let’s connect.</p>
      <div className="row center">
        <Button href={`mailto:${SITE.email}`} variant="primary">Email me</Button>
        <button type="button" className="btn" onClick={copyEmail} aria-live="polite">{copy}</button>
        <Button href={SITE.github} external>GitHub ↗</Button>
        <Button href={SITE.linkedin} external>LinkedIn ↗</Button>
        <Button href={SITE.medium} external>Medium ↗</Button>
      </div>
      <form className="card cform" ref={form} onSubmit={submit} noValidate>
        {field('name', 'Name', { autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
        {field('message', 'Message')}
        <button className="btn primary" type="submit">Send message</button>
        <p role="status" className={st ? (st.ok ? 'ok' : 'bad') : ''}>{st?.msg}</p>
      </form>
    </Reveal></section>
  )
}
