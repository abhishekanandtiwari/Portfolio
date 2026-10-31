import { useEffect, useState } from 'react'
import { getTheme, toggleTheme } from '../lib/theme.js'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme())
  useEffect(() => { const s = () => setTheme(getTheme()); addEventListener('themechange', s); return () => removeEventListener('themechange', s) }, [])
  return <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? '☀' : '☾'}</button>
}
