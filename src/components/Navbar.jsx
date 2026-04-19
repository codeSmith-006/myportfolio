/**
 * Navbar.jsx
 * 
 * Sticky navigation with scroll progress indicator.
 * 
 * Animation Architecture:
 * - Initial entrance: slides down from above
 * - Active section indicator: spring-animated underline
 * - Scroll progress bar: GSAP-driven, synced to scroll position
 * - Mobile menu: smooth overlay with staggered link entrance
 * - "Book a call" button: magnetic hover effect
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../hooks/useMagnetic';
import './Sytles/hero.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Services', href: 'services' },
  { name: 'Projects', href: 'projects' },
  { name: 'Education', href: 'education' },
  { name: 'FAQ', href: 'faq' },
  { name: 'Contact', href: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progressRef = useRef(null);
  const whatsappUrl = 'https://wa.me/8801722414475';

  // Magnetic effect on CTA
  const ctaMagnetic = useMagnetic({ strength: 0.2 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Detect which section is in view
      const current = navItems.find(({ href }) => {
        const el = document.getElementById(href);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current.href);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll progress bar ──
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Initialize at 0
    gsap.set(progressRef.current, { scaleX: 0 });
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div ref={progressRef} className="scroll-progress" />

      {/* ================= DESKTOP NAV ================= */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          hidden md:flex items-center gap-4
          rounded-full px-5 py-3
          border border-white/10
          backdrop-blur-xl
          bg-black/50
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          ${scrolled ? 'bg-black/70 backdrop-blur-2xl' : ''}
        `}
      >
        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-white/80">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`relative hover:text-white transition-colors duration-200 ${activeSection === item.href ? 'text-white' : ''
                }`}
            >
              {item.name}
              {activeSection === item.href && (
                <motion.span
                  layoutId="activeDesktop"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-main"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ================= MOBILE TOP BAR ================= */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          flex md:hidden items-center justify-end
          px-5 py-4
          backdrop-blur-xl bg-black/60
          border-b border-white/10
        `}
      >
        <button onClick={() => setMenuOpen(true)} className="text-white text-xl">
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-60 bg-black text-white"
          >
            <div className="flex items-center justify-end px-5 py-4">
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-6 px-6 text-lg text-white/80">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left transition-colors duration-200 ${activeSection === item.href
                      ? 'text-main font-medium'
                      : 'hover:text-white'
                    }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating CTA with magnetic effect ── */}
      <button
        ref={ctaMagnetic.ref}
        onMouseMove={ctaMagnetic.onMouseMove}
        onMouseLeave={ctaMagnetic.onMouseLeave}
        onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
        className="btn-3d fixed bottom-4 right-4 z-50 rounded-full bg-main text-black font-medium px-4 py-2 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] md:bottom-6 md:right-6 md:px-5 md:py-3 md:text-base"
      >
        Book a call
      </button>
    </>
  );
};

export default Navbar;
