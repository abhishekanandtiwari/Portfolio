import { useEffect, useRef } from 'react'
// Subtle 3D tilt toward the pointer. Disabled for reduced motion and touch devices.
export default function useTilt(max = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    const move = e => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
      el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [max])
  return ref
}
