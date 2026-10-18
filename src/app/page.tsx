import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SkipLink from "./components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
