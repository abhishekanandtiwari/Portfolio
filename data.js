// ─────────────────────────────────────────
//  DATA.JS  — Edit all your content here
// ─────────────────────────────────────────

const DATA = {

  // ── ABOUT STATS ──
  stats: [
    { num: "8.19", label: "Latest Semester SPI (Sem 3)" },
    { num: "3+",   label: "Python Projects Built" },
    { num: "1",    label: "Government Utility Patent" }
  ],

  // ── SKILLS ──
  skills: [
    { icon: "🐍", name: "Python" },
    { icon: "🤖", name: "Machine Learning" },
    { icon: "🧮", name: "Scikit-learn" },
    { icon: "📊", name: "Data Analysis" },
    { icon: "🔤", name: "NLP / Text Processing" },
    { icon: "📈", name: "EDA" },
    { icon: "🔁", name: "Classification & Regression" },
    { icon: "🔧", name: "Model Evaluation" },
    { icon: "🗂️", name: "Data Preprocessing" },
    { icon: "⚙️", name: "C Programming" },
    { icon: "💻", name: " GitHub" },
    { icon: "🧠", name: "AI Concepts" },
    { icon: "🌐", name: "Web Scraping" }
  ],

  // ── PROJECTS ──
  projects: [
    {
      year: "2026",
      title: "AI Chatbot — Intent Recognition",
      desc: "Built a conversational AI chatbot using Python and Scikit-learn for intent classification. Features chat history tracking, spell correction, and real-time interaction with improved accuracy via text preprocessing.",
      tags: ["Python", "Scikit-learn", "NLP", "ML"]
    },
    {
      year: "2025",
      title: "E-commerce Price Analyzer",
      desc: "A Python tool that extracts and compares product prices across e-commerce platforms. Performs data cleaning and processing to uncover pricing trends and generate actionable shopping insights.",
      tags: ["Python", "Web Scraping", "Data Analysis"]
    },
    {
      year: "2025",
      title: "Naval Ravikant ASCII Art Generator",
      desc: "A pure-Python script rendering a portrait using nested loops and character patterns — zero external libraries. Demonstrates mastery of iterative logic, control structures, and creative coding.",
      tags: ["Python", "Algorithms", "Creative Coding"]
    },
    {
      year: "2025",
      title: "GameZone – Interactive Gaming Platform",
      desc: "Developed a modern multi-game web platform using HTML, CSS, and JavaScript, integrating interactive browser games with a responsive interface, smooth navigation, and optimized user experience across devices.",
      tags: ["HTML", "CSS", "JavaScript", "Frontend Development"]
    }
  ],

  // ── EXPERIENCE TIMELINE ──
  timeline: [
    {
      date: "Oct 2025 – Dec 2025",
      title: "Virtual Internship — AI & Machine Learning",
      org: "Remote / Online Program",
      dotColor: "",   // leave empty for default accent color
      points: [
        "Built a strong foundation in core AI and ML concepts.",
        "Implemented classification and regression models using Python.",
        "Conducted exploratory data analysis and preprocessing pipelines.",
        "Evaluated model performance using standard metrics."
      ]
    },
    {
      date: "2024 – Present",
      title: "B.Tech Computer Science — 2nd Year",
      org: "Rungta College of Engineering & Technology, Bhilai",
      dotColor: "#22d3ee",
      points: [
        "Consistently maintained 7.6–8.2 SPI across three semesters.",
        "Led academic project development in Python and Machine Learning.",
        "Certified via CodingSpoon for applied programming skills."
      ]
    }
  ],

  // ── EDUCATION ──
  education: [
    {
      type: "btech",   // special card with SPI table
      degree: "B.Tech — Computer Science",
      school: "Rungta College Of Engineering And Technology, Bhilai, Chhattisgarh",
      year: "2024 – 2028 · Currently 4th Sem",
      spi: [
        { sem: "Sem 1", val: "8.08 / 10" },
        { sem: "Sem 2", val: "7.68 / 10" },
        { sem: "Sem 3", val: "8.19 / 10" }
      ]
    },
    {
      type: "school",  // two entries stacked
      entries: [
        { degree: "Class 12th", school: "Gurukul Vidyapeeth, Hajipur, Bihar", year: "2024", pct: "65.2%" },
        { degree: "Class 10th", school: "Guru Vashishtha Vidyayan, Hajipur, Bihar", year: "2022", pct: "80.8%" }
      ]
    }
  ],

  // ── CONTACT LINKS ──
  // Replace href values with your real URLs
  contact: [
    { icon: "✉️", label: "Email Me",       href: "mailto:abhishekanandtiwari2006@gmail.com" },
    { icon: "💼", label: "LinkedIn",        href: "https://www.linkedin.com/in/abhishek-anand-tiwari-3076ab327/" },
    { icon: "🐙", label: "GitHub",          href: "https://github.com/abhishekanandtiwari" },
    { icon: "📞", label: "+91 9241033070",  href: "tel:+919241033070" },        
    { icon: "✍️", label: "Medium",         href: "https://medium.com/@abhishekanandtiwari2006"}
  ]

};