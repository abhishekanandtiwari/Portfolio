import { useEffect, useState } from 'react'
const KEY = 'gh-repos-v1', TTL = 10 * 60 * 1000 // cache public data for 10 minutes to stay under rate limits
export default function useGithub(user) {
  const [s, setS] = useState({ status: 'loading', repos: [], error: '' })
  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && c.user === user && Date.now() - c.t < TTL) return setS({ status: 'ok', repos: c.repos, error: '' }) } catch { /* ignore bad cache */ }
      try {
        const r = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, { signal: ac.signal, headers: { Accept: 'application/vnd.github+json' } })
        if (r.status === 403 || r.status === 429) throw new Error('GitHub’s public API rate limit was reached. Please try again later.')
        if (!r.ok) throw new Error(`GitHub returned an error (${r.status}).`)
        const repos = await r.json()
        try { sessionStorage.setItem(KEY, JSON.stringify({ user, t: Date.now(), repos })) } catch { /* storage full/unavailable */ }
        setS({ status: 'ok', repos, error: '' })
      } catch (e) { if (e.name !== 'AbortError') setS({ status: 'error', repos: [], error: e.message || 'Could not reach GitHub.' }) }
    })()
    return () => ac.abort()
  }, [user])
  return s
}
