// Pure step generators for the playground (testable without a browser).
export const rand = (n, max = 99) => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * max))
export function bubbleSteps(a) {
  const x = [...a], s = [{ arr: [...x], hl: [], done: 0, note: 'Start' }]
  for (let i = 0; i < x.length - 1; i++) for (let j = 0; j < x.length - 1 - i; j++) {
    s.push({ arr: [...x], hl: [j, j + 1], done: i, note: `Compare ${x[j]} and ${x[j + 1]}` })
    if (x[j] > x[j + 1]) { [x[j], x[j + 1]] = [x[j + 1], x[j]]; s.push({ arr: [...x], hl: [j, j + 1], done: i, note: `Swap → ${x[j]}, ${x[j + 1]}` }) }
  }
  s.push({ arr: [...x], hl: [], done: x.length, note: 'Sorted' }); return s
}
export function bsearchSteps(a, t) {
  const s = []; let lo = 0, hi = a.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    s.push({ arr: a, lo, hi, mid, note: `lo=${lo}, hi=${hi}, mid=${mid}: ${a[mid]} ${a[mid] === t ? '=' : a[mid] < t ? '<' : '>'} ${t}` })
    if (a[mid] === t) { s.push({ arr: a, lo, hi, mid, found: mid, note: `Found ${t} at index ${mid}` }); return s }
    if (a[mid] < t) lo = mid + 1; else hi = mid - 1
  }
  s.push({ arr: a, lo: 0, hi: -1, note: `${t} is not in the array` }); return s
}
