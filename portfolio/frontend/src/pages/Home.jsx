import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Education from '../sections/Education.jsx';
import GithubActivity from '../sections/GithubActivity.jsx';
import Contact from '../sections/Contact.jsx';

export default function Home() {
  useEffect(() => {
    document.title = 'Priyanshi Trivedi | Software Engineer Portfolio';
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
