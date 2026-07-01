import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import Achievements from '@/sections/Achievements';
import Certifications from '@/sections/Certifications';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
