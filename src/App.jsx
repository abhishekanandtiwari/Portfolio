import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import BackToTop from './components/BackToTop.jsx'
import AskAbhishek from './components/AskAbhishek.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import GitHubDashboard from './sections/GitHubDashboard.jsx'
import Skills from './sections/Skills.jsx'
import Playground from './sections/Playground.jsx'
import Terminal from './sections/Terminal.jsx'
import Writing from './sections/Writing.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <CursorGlow />
      <Nav />
      <main id="main"><Hero /><About /><Projects /><GitHubDashboard /><Skills /><Playground /><Terminal /><Writing /><Contact /></main>
      <Footer />
      <BackToTop />
      <AskAbhishek />
      <CommandPalette />
    </>
  )
}
