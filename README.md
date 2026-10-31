# Abhishek Anand Tiwari — The Digital Frontier

React + Vite portfolio. Only two runtime dependencies (react, react-dom).

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # production build in dist/
    npm run preview   # serve the build locally

## Where to edit
- `src/data/site.js`: links, email, resume path, college/degree/graduation year
- `src/data/projects.js`: repo/demo/screenshot per project, features
- `src/data/skills.js`: skill groups
- `src/sections/Writing.jsx`: add real Medium articles to ARTICLES
- Resume: copy PDF into `public/resume/`, then set `resume` in site.js

## Deploy
Push to a public GitHub repo, then import it on Vercel/Netlify (build: `npm run build`, output: `dist`).
After deploy, add `og:url` and `og:image` in `index.html`.
