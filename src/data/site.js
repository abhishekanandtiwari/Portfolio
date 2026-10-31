// Central profile data. `null` = not supplied yet; the UI shows a clear placeholder.
export const SITE = {
  name: 'Abhishek Anand Tiwari',
  github: 'https://github.com/abhishekanandtiwari',
  linkedin: 'https://www.linkedin.com/in/abhishek-anand-tiwari-3076ab327/',
  medium: 'https://medium.com/@abhishekanandtiwari2006',
  email: 'abhishekanandtiwari2006@gmail.com',
  // After adding your PDF to public/resume/, set e.g. '/resume/Abhishek-Anand-Tiwari-Resume.pdf'
  resume: '/resume/Abhishek-Anand-Tiwari-Resume.pdf',
  // Optional: short text shown as an availability badge in the hero, e.g. 'Open to internships'. null = hidden.
  availability: null,
  // Optional: a form service URL (e.g. Formspree). null = the contact form opens the visitor's email app instead.
  formEndpoint: null,
  // Optional: URL of the serverless assistant (see api/ask.js), e.g. '/api/ask'. null = offline answers from portfolio data.
  assistantEndpoint: null,
  education: { college: null, degree: null, graduationYear: null },
}
export const NAV = [['home', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'], ['writing', 'Writing'], ['contact', 'Contact']]

// Extra sections reachable from the command palette (kept out of the header to avoid crowding it).
export const EXTRA_NAV = [['github', 'GitHub'], ['playground', 'Playground'], ['terminal', 'Terminal']]
