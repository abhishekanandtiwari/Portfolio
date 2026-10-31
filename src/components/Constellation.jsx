import { useEffect, useRef } from 'react'
// Lightweight canvas node network. Pointer repels nodes; pauses off-screen; static if reduced motion.
export default function Constellation() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, nodes = [], visible = true, raf
    const m = { x: -999, y: -999 }
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2)
      W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0)
      nodes = Array.from({ length: W < 640 ? 24 : 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }))
    }
    const draw = () => {
      x.clearRect(0, 0, W, H)
      if (!reduce) for (const a of nodes) {
        a.x += a.vx; a.y += a.vy
        if (a.x < 0 || a.x > W) a.vx *= -1
        if (a.y < 0 || a.y > H) a.vy *= -1
        const dx = a.x - m.x, dy = a.y - m.y, d = Math.hypot(dx, dy)
        if (d < 120) { a.x += dx / d * 1.2; a.y += dy / d * 1.2 }
      }
      nodes.forEach((a, i) => {
        x.fillStyle = 'rgba(34,211,238,.8)'; x.beginPath(); x.arc(a.x, a.y, 1.8, 0, 6.3); x.fill()
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) { x.strokeStyle = `rgba(45,212,191,${.25 * (1 - d / 130)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
        }
      })
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }
    const move = e => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top }
    const leave = () => { m.x = m.y = -999 }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) { cancelAnimationFrame(raf); draw() } })
    size(); draw(); io.observe(c)
    const onResize = () => { size(); if (reduce) draw() }
    addEventListener('resize', onResize)
    const host = c.parentElement
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', onResize); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave) }
  }, [])
  return <canvas ref={ref} className="constellation" aria-hidden="true" />
}
