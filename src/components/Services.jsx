/**
 * Services.jsx
 * 
 * Services section with 3D depth card reveals.
 * 
 * Animation Architecture:
 * - Section container: scrub-based entrance with rotateX
 * - Service cards: staggered Z-axis depth entrance
 * - Each card has independent 3D tilt hover
 * - CTA area: focus-pull effect with scale
 * - Shiny sweep effect on card hover (preserved from original)
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ShoppingCart, LayoutDashboard, Check, ArrowRight } from 'lucide-react';
import use3DTilt from '../hooks/use3DTilt';
import useMagnetic from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    iconBg: 'bg-[#3B82F6]',
    title: 'E-Commerce & Business Websites',
    description:
      'Launch a powerful, fully customized online store with a smart admin panel that gives you complete control over your business.',
    points: [
      'Custom Admin Dashboard',
      'Product & Inventory Management',
      'Order & Customer Management',
      'Role-Based Authentication & Authorization',
      'Payment Gateway Integration',
      'Secure REST API Architecture',
      'SEO-Optimized Structure',
      'Performance Optimization',
      'Clean MERN Architecture',
      'Deployment & Production Setup',
    ],
    cta: 'Build My Store',
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    iconBg: 'bg-[#8B5CF6]',
    title: 'Custom Dashboard & Web Applications',
    description:
      'Need a custom dashboard or advanced web app? I design scalable systems tailored to your workflow and business goals.',
    points: [
      'Custom Admin Dashboards',
      'Data Analytics & Reports',
      'Role-Based User Systems',
      'Real-Time Features',
      'API Development & Integration',
      'Feature Expansion (MERN Projects)',
      'Full-Stack Web Applications',
      'Database Design & Optimization',
      'Scalable System Architecture',
      'Modern UI & UX Design',
    ],
    cta: 'Discuss Your Project',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    iconBg: 'bg-[#10B981]',
    title: 'Security & Architecture Consulting',
    description:
      'Secure, scalable systems built with clean architecture and modern backend best practices.',
    points: [
      'JWT Authentication',
      'Role-Based Authorization',
      'Secure API Design',
      'Middleware Protection',
      'Data Validation',
      'Rate Limiting',
      'Database Security',
      'Structured Folder Architecture',
      'Clean Code Principles',
      'Deployment Security Setup',
    ],
    cta: 'Secure My App',
  },
];

/* ── Service card with 3D tilt ── */
const ServiceCard = ({ card, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;
  const tilt = use3DTilt({ maxTilt: 5, scale: 1.02, speed: 350 });
  const cardRef = useRef(null);

  return (
    <article
      ref={(el) => {
        cardRef.current = el;
        tilt.ref.current = el;
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={(e) => {
        tilt.onMouseLeave(e);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      className="relative mx-auto flex h-full w-full max-w-[350px] min-h-[350px] flex-col rounded-2xl p-4 text-white overflow-hidden md:max-w-[290px] lg:max-w-[340px] lg:p-5 tilt-container"
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {/* Shiny left-to-right sweep on hover */}
      <motion.div
        aria-hidden
        initial={{ x: '-110%', opacity: 0 }}
        animate={hovered ? { x: '110%', opacity: 1 } : { x: '-110%', opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.12) 52%, rgba(255,255,255,0.05) 58%, transparent 75%)',
          borderRadius: 'inherit',
        }}
      />

      {/* Icon */}
      <div className="mb-3">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${card.iconBg}`}
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
        >
          <Icon className="h-3.5 w-3.5 text-white" />
        </span>
      </div>

      {/* Title */}
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 leading-tight md:text-[11px]">
        {card.title}
      </p>

      {/* Description */}
      <p className="mb-3 text-[11px] leading-relaxed text-white/55 md:text-[12px] lg:text-[13px]">
        {card.description}
      </p>

      {/* Features */}
      <div className="mb-3">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50 md:text-[11px]">
          Features
        </p>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {card.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-1 text-[10px] leading-snug text-white/55 md:text-[11px]"
            >
              <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-[#B7FD5B]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  const ctaMagnetic = useMagnetic({ strength: 0.25 });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Container entrance with depth ──
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, rotateX: 3 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Header text ──
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Cards staggered depth entrance ──
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── CTA: focus pull effect ──
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Cards parallax on scroll ──
      gsap.to(cardsRef.current, {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="scene-section w-full px-4 py-8 sm:px-8">
      <div
        ref={containerRef}
        className="w-full rounded-tl-[24px] overflow-hidden"
        style={{
          background:
            'radial-gradient(90% 70% at 0% 0%, rgba(0, 195, 255, 0.35) 0%, rgba(0, 120, 255, 0.22) 26%, rgba(8, 18, 45, 0.14) 45%, rgba(0, 0, 0, 0) 72%), linear-gradient(180deg, rgba(4, 10, 25, 0.6) 0%, rgba(0, 0, 0, 0.28) 50%, rgba(0, 0, 0, 0.42) 100%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Main content ── */}
        <div className="border-b border-white/10 px-5 py-10 sm:px-8">
          <div ref={headerRef} className="mx-auto mb-8 max-w-3xl text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/40">
              WHAT I PROVIDE
            </p>
            <h2
              className="mb-4 text-[clamp(1.9rem,4.5vw,3.4rem)] font-black uppercase leading-[0.93]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Need a Powerful{' '}
              <span className="instrumental-font main-color">Digital Solution?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[clamp(0.82rem,1.5vw,0.9rem)] leading-relaxed text-white/60">
              I help businesses, startups, and individuals transform ideas into
              high-performing digital products — secure, pixel-perfect, and future-ready.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="mx-auto grid w-full max-w-[940px] grid-cols-1 justify-items-center gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4"
          >
            <ServiceCard card={serviceCards[0]} index={0} />
            <ServiceCard card={serviceCards[1]} index={1} />
            <ServiceCard card={serviceCards[2]} index={2} />
          </div>
        </div>

        {/* ── Bottom CTA with focus-pull effect ── */}
        <div ref={ctaRef} className="px-5 py-10 text-center sm:px-8">
          <h3 className="mb-3 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
            Ready to Turn Your{' '}
            <span className="main-color instrumental-font">Idea Into Reality?</span>
          </h3>
          <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
            Let&apos;s create something powerful, scalable, and built to last. Whether it&apos;s
            an online store, a custom dashboard, or a full-stack web application — I&apos;m here
            to build it properly.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              ref={ctaMagnetic.ref}
              onMouseMove={ctaMagnetic.onMouseMove}
              onMouseLeave={ctaMagnetic.onMouseLeave}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-3d inline-flex items-center gap-2 rounded-md bg-main px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
