import { useEffect, useState } from 'react'
// Types through the given words. Shows them as a static line under reduced motion.
export default function Typing({ words }) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const [text, setText] = useState(reduce ? words.join(' · ') : '')
  useEffect(() => {
    if (reduce) return
    let w = 0, c = 0, del = false, id
    const tick = () => {
      const full = words[w]; c += del ? -1 : 1; setText(full.slice(0, c))
      let d = del ? 35 : 70
      if (!del && c === full.length) { del = true; d = 1400 } else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300 }
      id = setTimeout(tick, d)
    }
    id = setTimeout(tick, 600)
    return () => clearTimeout(id)
  }, [words, reduce])
  return <><span className="sr">{words.join(', ')}</span><span className="typing" aria-hidden="true">{text}</span></>
}
