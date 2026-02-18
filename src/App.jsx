import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Process from "./components/Process";
import Results from "./components/Results";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HeroTexture from "./components/HeroTexture";

function App() {
  useLenis();

  return (
    <>
      {/* <div className=''>
        {" "}
        <HeroTexture></HeroTexture>
      </div> */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      {/* <Services /> */}
      {/* <Process /> */}
      {/* <Results /> */}
      {/* <FAQ /> */}
      <Footer />
    </>
  );
}

export default App;
