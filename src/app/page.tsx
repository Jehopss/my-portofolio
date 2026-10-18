import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Motion from "./components/Motion";
import SkipLink from "./components/SkipLink";
import Tools from "./components/Tools";
import Viewer from "./components/Viewer";
import Work from "./components/Work";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Hero />
      <main id="main" tabIndex={-1} className="outline-none">
        <Work />
        <About />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <Viewer />
      <Motion />
    </>
  );
}
