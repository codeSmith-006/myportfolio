/**
 * Hero.jsx
 * 
 * Cinematic hero section with GSAP scroll-driven reveal.
 * 
 * Animation Architecture:
 * - Initial load: staggered fade-up with Z-axis movement
 * - On scroll: elements parallax at different depths
 * - Scroll indicator pulses with depth-aware motion
 * - CTA buttons have 3D press feedback
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../hooks/useMagnetic';
import './Sytles/hero.css';

gsap.registerPlugin(ScrollTrigger);

const profiles = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
  'https://i.pravatar.cc/40?img=4',
  'https://i.pravatar.cc/40?img=5',
];

const words = ['Fullstack Developer', 'Designer'];

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const trustRef = useRef(null);

  const [filled, setFilled] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Magnetic effect on CTA button
  const ctaMagnetic = useMagnetic({ strength: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setFilled(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Cinematic entrance timeline ──
      // Elements emerge from depth (translateZ) with staggered timing
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        trustRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 50, rotateX: 8 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );

      // ── Scroll-driven parallax exit ──
      // As user scrolls past hero, elements drift apart at different speeds
      // creating a "camera moving through" effect
      gsap.to(headingRef.current, {
        y: -80,
        opacity: 0.3,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(descRef.current, {
        y: -50,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to(trustRef.current, {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 0.5,
        },
      });

      gsap.to(scrollIndicatorRef.current, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '50% top',
          scrub: 0.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="scene-section relative overflow-hidden flex flex-col items-center mt-32 sm:mt-36 md:mt-44 lg:mt-48 px-4 max-w-full max-h-screen"
    >
      {/* ── Trusted / review section ── */}
      <div
        ref={trustRef}
        className="relative z-10 flex items-center gap-3"
        data-depth="-0.3"
      >
        {/* Avatars */}
        <div className="flex -space-x-3 group">
          {profiles.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-black transition-all duration-300 group-hover:-translate-x-1 hover:-translate-y-1 hover:scale-110 hover:z-10"
              loading="lazy"
            />
          ))}
        </div>

        {/* Stars + text */}
        <div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-500 ${filled && 'fill-white'
                  }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  animation: filled ? 'star-bounce 0.6s ease-out' : 'none',
                }}
              >
                <path
                  strokeWidth="1.5"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24
                     l-7.19-.61L12 2 9.19 8.63 2 9.24
                     l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[#484848] font-medium">
            Trusted by 20+ brands &amp; creators
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Heading — closest depth layer (near camera) */}
        <h1
          ref={headingRef}
          className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 leading-tight depth-near"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Hi, I'm{' '}
          <span className="instrumental-font main-color">Ryan Rehan</span>
        </h1>

        {/* Description — mid depth */}
        <p
          ref={descRef}
          className="mt-6 text-base sm:text-lg md:text-xl font-medium text-white/80 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl depth-mid"
        >
          Full-stack developer skilled in React, Next.js, Node.js, MongoDB, and
          Firebase, with hands-on experience building real-world web applications
          including authentication systems, e-commerce features, and
          performance-optimized deployments.
        </p>

        {/* CTA buttons with 3D press effect */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 sm:mt-14"
        >
          <button
            ref={ctaMagnetic.ref}
            onMouseMove={ctaMagnetic.onMouseMove}
            onMouseLeave={ctaMagnetic.onMouseLeave}
            onClick={() => scrollToSection('projects')}
            className="btn-3d w-full sm:w-auto rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium bg-main text-black"
          >
            View Projects
          </button>

          <a href="/Resume.pdf" download>
            <button className="btn-3d w-full sm:w-auto rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white/90 bg-white/5 border border-white/15 backdrop-blur-md hover:bg-white/10 hover:border-white/25">
              Download Resume
            </button>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 mt-16 flex flex-col items-center"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors scroll-bounce"
        >
          <span className="text-sm mb-2 tracking-widest uppercase">
            Scroll down
          </span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
