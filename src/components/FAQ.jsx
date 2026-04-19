/**
 * FAQ.jsx
 * 
 * FAQ section with scroll-triggered staggered accordion reveals.
 * 
 * Animation Architecture:
 * - Section header: depth entrance
 * - Each accordion item: staggered slide-up with subtle depth
 * - Container has gentle parallax drift
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: 'What technologies do you use for development?',
    answer:
      'I primarily work with the MERN stack (MongoDB, Express, React, Node.js) to build scalable, modern web applications. I also implement secure APIs, authentication systems, and optimized database architecture.',
  },
  {
    question: 'Do you build fully customized solutions?',
    answer:
      'Yes. Every project is built from scratch based on your specific business needs. No templates, no shortcuts - fully customized design and architecture.',
  },
  {
    question: 'Will I get an admin panel to manage my website?',
    answer:
      'Absolutely. I build powerful admin dashboards where you can manage products, users, content, analytics, and more - with full control over your platform.',
  },
  {
    question: 'Is the website secure?',
    answer:
      'Security is a priority. I implement authentication, role-based authorization, secure APIs, data validation, and best practices to protect your application.',
  },
  {
    question: 'Can you upgrade or add features to my existing project?',
    answer:
      'Yes. Whether it\'s improving performance, adding new features, or restructuring your backend - I can enhance and scale your existing MERN project.',
  },
  {
    question: 'Do you provide ongoing support after delivery?',
    answer:
      'Yes. I provide post-launch support, bug fixes, performance optimization, and future feature development if needed.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines depend on complexity. A business website may take 1-2 weeks, while a full web application can take 3-6 weeks.',
  },
  {
    question: 'Do you help with deployment and hosting?',
    answer:
      'Yes. I handle deployment, production setup, environment configuration, and ensure your project runs smoothly on hosting platforms.',
  },
  {
    question: 'Will my website be mobile responsive?',
    answer:
      'Absolutely. Every project is fully responsive and optimized for mobile, tablet, and desktop devices.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Simple. Reach out through the contact form or schedule a discussion. We\'ll define your requirements, timeline, and project roadmap.',
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Header depth entrance ──
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40, rotateX: 3 },
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

      // ── Accordion items staggered entrance ──
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll('[data-accordion-item]');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25, x: -10 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Subtle parallax drift ──
      gsap.to(accordionRef.current, {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="scene-section w-full border-b mb-10 md:mb-20 px-4 py-8 sm:px-8">
      <div className="w-full overflow-hidden">
        <div ref={headerRef} className="px-6 pt-7 pb-7 text-center">
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '12px',
            }}
          >
            FAQ
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
            FREQUENTLY ASKED{' '}
            <span className="main-color instrumental-font">QUESTIONS</span>
          </h2>
        </div>

        <div
          ref={accordionRef}
          className="mx-auto w-full max-w-4xl px-5 py-4 sm:px-8 sm:py-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={`item-${idx + 1}`}
                className="border-white/10"
                data-accordion-item
              >
                <AccordionTrigger className="text-base font-semibold text-white hover:no-underline sm:text-lg">
                  <span className="flex items-center gap-3 text-left">
                    <span className="text-[#B7FD5B]">{String(idx + 1).padStart(2, '0')}</span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-2 text-sm leading-relaxed text-white/70 sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
