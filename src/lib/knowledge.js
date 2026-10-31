// Single source of truth for the terminal and the offline "Ask Abhishek" mode.
// Everything is derived from the data files, so nothing here can drift from the portfolio.
import { SITE } from '../data/site.js'
import { PROJECTS } from '../data/projects.js'
import { SKILLS } from '../data/skills.js'

export const INTERESTS = ['Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Data Structures & Algorithms']
export const ABOUT = `${SITE.name} is a Computer Science Engineering student exploring ${INTERESTS.join(', ')}.`
export const SKILL_TEXT = Object.entries(SKILLS).map(([g, l]) => `${g}: ${l.join(', ')}`).join('\n')
export const CONTACT_TEXT = `Email: ${SITE.email}\nGitHub: ${SITE.github}\nLinkedIn: ${SITE.linkedin}\nMedium: ${SITE.medium}`
export const PROJECT_LIST = PROJECTS.map(p => `${p.name}: ${p.tech.join(', ')}`).join('\n')
export const projectText = p => `${p.name}: ${p.description}\nProblem: ${p.problem}\nTech: ${p.tech.join(', ')}\nRepo: ${p.repo || 'link not added yet'}`
export const EDU_TEXT = () => {
  const e = SITE.education
  return e.college || e.degree || e.graduationYear
    ? `College: ${e.college || 'not added yet'}\nDegree: ${e.degree || 'not added yet'}\nGraduation: ${e.graduationYear || 'not added yet'}`
    : 'Education details have not been added to this portfolio yet, so I won’t guess them.'
}
const STOP = ['engine', 'based']
export function answer(q) {
  const t = q.toLowerCase()
  const proj = PROJECTS.find(p => p.name.toLowerCase().split(/[\s-]+/).some(w => w.length >= 6 && !STOP.includes(w) && t.includes(w)))
  if (proj) return projectText(proj)
  if (/contact|email|reach|hire|linkedin|medium|github/.test(t)) return CONTACT_TEXT
  if (/educat|college|universit|degree|graduat|study/.test(t)) return EDU_TEXT()
  if (/skill|technolog|language|know|stack|tool/.test(t)) return SKILL_TEXT
  if (/project|built|build|work/.test(t)) return PROJECT_LIST
  if (/interest|passion/.test(t)) return `Interests: ${INTERESTS.join(', ')}.`
  if (/who|about|yourself|abhishek/.test(t)) return ABOUT
  return 'I only know what is on this portfolio: about, skills, projects, interests, education and contact details. Try one of those.'
}
