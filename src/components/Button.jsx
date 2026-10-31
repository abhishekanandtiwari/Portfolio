// Renders a link-button, or a dashed disabled placeholder when href is missing.
export default function Button({ href, variant = '', external = false, download = false, children, placeholder = 'add URL' }) {
  if (!href) return <span className={`btn ${variant}`} role="link" aria-disabled="true">{children} · {placeholder}</span>
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <a className={`btn ${variant}`} href={href} download={download || undefined} {...ext}>{children}</a>
}
