/**
 * Education.jsx
 * 
 * Education section with scroll-driven timeline reveal.
 * 
 * Animation Architecture:
 * - Section header: depth entrance with rotateX
 * - Timeline line: draws itself as user scrolls (scaleY 0→1)
 * - Education cards: slide in from the side with depth
 * - Timeline node: scales in with bounce
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educations = [
  {
    id: 1,
    degree: 'BSc in Computer Science and Engineering',
    institution: 'Patuakhali Science and Technology University',
    location: 'Patuakhali, Bangladesh',
    period: '2024 - 2028',
    description: [
      'Pursuing undergraduate degree in Computer Science and Engineering',
      'Focus on software development, algorithms, and data structures',
      'Active member of PSTU CSE Club',
    ],
    icon: '',
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Header depth entrance ──
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50, rotateX: 3 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Timeline line: draws itself on scroll ──
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 50%',
              scrub: 0.8,
            },
          }
        );
      }

      // ── Education cards: slide in with depth ──
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isEven = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? -40 : 40, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            delay: 0.1 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Timeline nodes: scale in with bounce ──
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.2 + i * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="scene-section w-full border-b px-4 sm:px-8 pt-8">
      <div className="w-full overflow-hidden" style={{ minHeight: '70vh' }}>
        <div ref={headerRef} className="text-center px-6 pt-14 pb-10 border-white/10">
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '12px',
            }}
          >
            Academic Journey
          </p>

          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 7vw, 5rem)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: '0 0 18px 0',
            }}
          >
            EDUCATION{' '}
            <span className="main-color instrumental-font">BACKGROUND</span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              maxWidth: '660px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            My current academic path focused on software engineering fundamentals,
            computer science theory, and real-world development practice.
          </p>
        </div>

        <div ref={timelineRef} className="px-5 sm:px-8 py-10">
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line that draws itself on scroll */}
            <div
              ref={lineRef}
              className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/15 sm:-translate-x-1/2"
              style={{ transformOrigin: 'top center' }}
            />

            <div className="space-y-8">
              {educations.map((edu, index) => (
                <div
                  key={edu.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8"
                >
                  <div className={`hidden sm:block ${index % 2 === 0 ? 'order-1' : 'order-2'}`} />

                  <div className={index % 2 === 0 ? 'sm:order-2' : 'sm:order-1'}>
                    <div className="rounded-md border border-white/10 bg-white/[0.02] p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                      <p className="inline-flex items-center gap-2 text-sm text-[#B7FD5B] mb-4">
                        <Building className="h-4 w-4" />
                        {edu.institution}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-5 text-xs text-white/55 uppercase tracking-[0.08em]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {edu.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {edu.location}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {edu.description.map((item, i) => (
                          <li key={`${edu.id}-${i}`} className="text-sm text-white/70 leading-relaxed">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div
                    ref={(el) => (nodeRefs.current[index] = el)}
                    className="absolute left-1 top-6 sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full border border-[#B7FD5B]/70 bg-black text-sm"
                  >
                    {edu.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
