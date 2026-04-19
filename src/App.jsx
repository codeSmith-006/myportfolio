/**
 * App.jsx
 * 
 * Root component with 3D scroll scene architecture.
 * - Perspective container creates the 3D space
 * - GSAP ScrollTrigger powers scroll-linked animations
 * - Each section lives on its own depth layer
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollEngine from './hooks/useScrollEngine';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useScrollEngine();
  const sceneRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Parallax depth system ──
      // Background elements move slower (further away)
      // Text elements move at normal speed (closer to camera)
      // This creates the illusion of 3D depth on scroll

      const depthLayers = document.querySelectorAll('[data-depth]');
      depthLayers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const speed = depth * 50; // Parallax intensity

        gsap.to(layer, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.closest('section') || layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      {/* 3D Scene Container — perspective creates the depth space */}
      <div
        ref={sceneRef}
        className="scene-container"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          overflowX: 'hidden',
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Education />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
