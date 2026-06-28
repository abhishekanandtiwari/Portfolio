// ─────────────────────────────────────────
//  SCRIPT.JS  — Builds the page from data
// ─────────────────────────────────────────


/* ── 1. STATS ── */
function buildStats() {
  const container = document.getElementById('stats-container');
  container.innerHTML = DATA.stats.map(s => `
    <div class="stat-card">
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}


/* ── 2. SKILLS ── */
function buildSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = DATA.skills.map(s => `
    <div class="skill-chip">
      <span>${s.icon}</span> ${s.name}
    </div>
  `).join('');
}


/* ── 3. PROJECTS ── */
function buildProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = DATA.projects.map(p => `
    <div class="project-card">
      <div class="project-year">${p.year}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}


/* ── 4. TIMELINE ── */
function buildTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = DATA.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot" ${item.dotColor ? `style="background:${item.dotColor}"` : ''}></div>
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-title">${item.title}</div>
      <div class="timeline-org">${item.org}</div>
      <ul class="timeline-desc">
        ${item.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}


/* ── 5. EDUCATION ── */
function buildEducation() {
  const container = document.getElementById('edu-container');
  container.innerHTML = DATA.education.map(edu => {

    if (edu.type === 'btech') {
      return `
        <div class="edu-card">
          <div class="edu-degree">${edu.degree}</div>
          <div class="edu-school">${edu.school}</div>
          <div class="edu-year">${edu.year}</div>
          <div class="edu-spi">
            ${edu.spi.map(s => `
              <div class="spi-item">
                <span>${s.sem}</span>
                <span class="spi-val">${s.val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (edu.type === 'school') {
      return `
        <div class="edu-card" style="display:flex;flex-direction:column;gap:1rem;">
          ${edu.entries.map((e, i) => `
            <div ${i > 0 ? 'class="edu-divider"' : ''}>
              <div class="edu-degree">${e.degree}</div>
              <div class="edu-school">${e.school}</div>
              <div class="edu-year">${e.year}</div>
              <div class="edu-pct">${e.pct}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

  }).join('');
}


/* ── 6. CONTACT ── */
function buildContact() {
  const container = document.getElementById('contact-container');
  container.innerHTML = DATA.contact.map(c => `
    <a href="${c.href}" class="contact-chip" target="_blank">
      ${c.icon} ${c.label}
    </a>
  `).join('');
}


/* ── 7. SCROLL REVEAL ANIMATION ── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ── RUN EVERYTHING ── */
document.addEventListener('DOMContentLoaded', () => {
  buildStats();
  buildSkills();
  buildProjects();
  buildTimeline();
  buildEducation();
  buildContact();
  initScrollReveal();
});