// Theme helpers. The initial theme is applied in index.html before first paint (no flash).
export const getTheme = () => document.documentElement.dataset.theme || 'dark'
export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  try { localStorage.setItem('theme', next) } catch { /* storage unavailable: theme still applies for this visit */ }
  dispatchEvent(new Event('themechange'))
}
