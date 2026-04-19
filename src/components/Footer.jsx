/**
 * Footer.jsx
 * 
 * Footer with GSAP scroll-triggered entrance.
 * Magnetic "Back to Top" button.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const btnMagnetic = useMagnetic({ strength: 0.25 });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="scene-section w-full px-4 sm:px-8 py-8">
      <div ref={contentRef} className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-left">
            <p className="text-white/75 text-sm">© 2026 Ryan Rehan. All rights reserved.</p>
            <p className="text-white/45 text-xs mt-1">Built with React and Tailwind CSS</p>
          </div>

          <button
            ref={btnMagnetic.ref}
            onMouseMove={btnMagnetic.onMouseMove}
            onMouseLeave={btnMagnetic.onMouseLeave}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-3d px-4 py-2 bg-main rounded-md text-sm font-semibold text-black hover:opacity-90 transition-opacity"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
