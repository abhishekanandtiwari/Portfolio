import { useEffect, useState } from 'react'
export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const s = () => setShow(scrollY > 700); s(); addEventListener('scroll', s, { passive: true }); return () => removeEventListener('scroll', s) }, [])
  if (!show) return null
  return <button type="button" className="to-top" aria-label="Back to top" onClick={() => scrollTo({ top: 0 })}>↑</button>
}
