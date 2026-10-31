import { useEffect, useRef } from 'react'
// Soft ambient light that follows the pointer (fine pointers only, no reduced motion).
export default function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    let raf = 0
    const move = e => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { ref.current?.style.setProperty('--mx', e.clientX + 'px'); ref.current?.style.setProperty('--my', e.clientY + 'px') }) }
    addEventListener('pointermove', move)
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return <><div className="bg-grid" aria-hidden="true" /><div className="glow" ref={ref} aria-hidden="true" /></>
}
