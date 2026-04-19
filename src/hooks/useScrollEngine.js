/**
 * useScrollEngine.js
 * 
 * Central scroll animation engine that integrates:
 * - Lenis smooth scrolling
 * - GSAP ScrollTrigger
 * - Reduced motion detection
 * - Performance-optimized RAF loop
 */

import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Detect reduced motion preference
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useScrollEngine = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Skip smooth scrolling if user prefers reduced motion
    const reducedMotion = prefersReducedMotion();

    const lenis = new Lenis({
      duration: reducedMotion ? 0.3 : 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smooth: !reducedMotion,
      smoothTouch: false, // Disable on touch for performance
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker for the RAF loop (better performance than manual RAF)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial layout
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Helper to create scroll-triggered animations
  const createScrollAnimation = useCallback((element, animation, triggerOptions = {}) => {
    if (prefersReducedMotion()) {
      // For reduced motion, just show the element immediately
      gsap.set(element, { opacity: 1, clearProps: 'transform' });
      return null;
    }

    return gsap.fromTo(element, animation.from, {
      ...animation.to,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none none',
        ...triggerOptions,
      },
    });
  }, []);

  return { lenisRef, createScrollAnimation };
};

export default useScrollEngine;
export { prefersReducedMotion };
