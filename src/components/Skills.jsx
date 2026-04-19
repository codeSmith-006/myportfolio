/**
 * Skills.jsx
 * 
 * Skills section with scroll-scrubbed 3D card reveals.
 * 
 * Animation Architecture:
 * - Section heading: scrub-based fade-up on scroll
 * - Skill cards: staggered scale + Z-axis entrance with 3D tilt on hover
 * - Category tabs: smooth transition with depth feedback
 * - Cards grid has subtle parallax offset
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import use3DTilt from '../hooks/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

/* ─── Skill data with CDN SVG icons ─── */
const skillCategories = {
    Frontend: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Responsive Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg' },
    ],
    Backend: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Firebase Firestore', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        { name: 'JWT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
        { name: 'Stripe', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg' },
    ],
    Tools: [
        { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Antigravity', icon: 'https://cdn.simpleicons.org/raycast/ffffff' },
        { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor/ffffff' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
        { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg' },
        { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
        { name: 'Render', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/render/render-original.svg' },
        { name: 'Firebase Console', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    ],
};

const categories = Object.keys(skillCategories);

// Individual skill card with 3D tilt
const SkillCard = ({ skill, index }) => {
    const tilt = use3DTilt({ maxTilt: 8, scale: 1.04, speed: 300 });

    const invertIcons = ['Express.js', 'Git & GitHub', 'Next.js', 'Vercel', 'Framer'];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ delay: index * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="tilt-container"
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '28px 16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                cursor: 'default',
                width: '100%',
                transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(183,253,91,0.35)')}
        >
            <img
                src={skill.icon}
                alt={skill.name}
                loading="lazy"
                style={{
                    width: '52px',
                    height: '52px',
                    objectFit: 'contain',
                    filter: invertIcons.includes(skill.name) ? 'invert(1)' : 'none',
                }}
            />
            <span
                style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.75)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                }}
            >
                {skill.name}
            </span>
        </motion.div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const tabsRef = useRef(null);
    const gridContainerRef = useRef(null);
    const [active, setActive] = useState('Frontend');

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            // ── Header scroll-reveal with depth ──
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 50, rotateX: 4 },
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

            // ── Tab filter and grid entrance — slightly delayed ──
            gsap.fromTo(
                tabsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // ── Grid container parallax ──
            gsap.to(gridContainerRef.current, {
                y: -15,
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
        <section ref={sectionRef} id="skills" className="scene-section w-full px-4 sm:px-8 py-8">
            <div className="w-full border-t border-l border-white/20 overflow-hidden">
                {/* ── Top: heading + description ── */}
                <div ref={headerRef} className="text-center px-6 pt-14 pb-10 border-b border-white/10">
                    <p
                        style={{
                            fontSize: '11px',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.4)',
                            marginBottom: '12px',
                        }}
                    >
                        What I work with
                    </p>
                    <h2
                        style={{
                            fontWeight: 900,
                            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                            lineHeight: 0.95,
                            textTransform: 'uppercase',
                            margin: '0 0 20px 0',
                        }}
                    >
                        MY <span className="main-color instrumental-font">SKILLS</span>
                    </h2>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.55)',
                            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                            maxWidth: '560px',
                            margin: '0 auto',
                            lineHeight: 1.7,
                        }}
                    >
                        Technologies and tools I use to build scalable, responsive, and
                        production-ready web applications.
                    </p>
                </div>

                {/* ── Body: vertical label + grid ── */}
                <div className="flex items-stretch">
                    {/* Vertical "Skills" label — left accent */}
                    <div
                        className="hidden sm:flex flex-col items-center justify-center self-stretch"
                        style={{
                            width: '48px',
                            flexShrink: 0,
                            borderRight: '1px solid rgba(255,255,255,0.1)',
                            padding: '32px 0',
                        }}
                    >
                        <div style={{ width: '2px', height: '40px', background: '#B7FD5B', marginBottom: '12px', borderRadius: '2px' }} />
                        <span
                            style={{
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.4)',
                                fontWeight: 600,
                            }}
                        >
                            Skills
                        </span>
                        <div style={{ width: '2px', height: '40px', background: '#B7FD5B', marginTop: '12px', borderRadius: '2px' }} />
                    </div>

                    {/* Main content */}
                    <div
                        ref={gridContainerRef}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            padding: 'clamp(20px, 4vw, 48px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Tab filter */}
                        <div ref={tabsRef} className="flex gap-2 mb-10 flex-wrap" style={{ justifyContent: 'center' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    className="btn-3d"
                                    style={{
                                        padding: '8px 22px',
                                        borderRadius: '999px',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        border: active === cat ? '1px solid #B7FD5B' : '1px solid rgba(255,255,255,0.15)',
                                        background: active === cat ? '#B7FD5B' : 'transparent',
                                        color: active === cat ? '#000' : 'rgba(255,255,255,0.6)',
                                        transition: 'all 0.25s ease',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Skill cards grid with 3D tilt on each card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 130px))',
                                    gap: '16px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                }}
                            >
                                {skillCategories[active].map((skill, i) => (
                                    <SkillCard key={skill.name} skill={skill} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
