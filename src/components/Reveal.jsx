import { useEffect, useRef, useState } from 'react'
// Fades children in once when scrolled into view (CSS handles reduced motion).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.08 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`rv ${seen ? 'v' : ''} ${className}`} {...rest}>{children}</Tag>
}
