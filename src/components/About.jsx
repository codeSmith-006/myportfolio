/**
 * About.jsx
 * 
 * Layered parallax About section with GSAP ScrollTrigger.
 * 
 * Animation Architecture:
 * - Section fades in with Z-axis depth movement (scrub-based)
 * - Left text panel: staggered reveal with parallax
 * - Right image: slides in from depth with scale
 * - Marquee interests bar: delayed entrance
 * - Image has subtle 3D tilt on hover
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from 'react-fast-marquee';
import use3DTilt from '../hooks/use3DTilt';
import './border.css';

gsap.registerPlugin(ScrollTrigger);

const interests = [
    'Backend Development',
    'Strong Logic',
    'Problem Solving',
    'Scalable Software',
    'Microservices',
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Open Source',
    'Machine Learning',
    'Photography',
];

const About = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const descRef = useRef(null);
    const marqueeRef = useRef(null);
    const imageRef = useRef(null);

    // 3D tilt on the image container
    const imageTilt = use3DTilt({ maxTilt: 4, scale: 1.01 });

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            // ── Container entrance — emerges from deeper Z ──
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 60, rotateX: 3 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // ── Left panel text — staggered depth reveal ──
            const leftElements = [labelRef.current, headingRef.current, descRef.current, marqueeRef.current].filter(Boolean);

            leftElements.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 30 + i * 5, x: -15 },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: 0.7,
                        delay: 0.15 + i * 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            // ── Right image — slides from deeper Z with scale ──
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: 50, scale: 0.92, rotateY: -4 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.9,
                    delay: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // ── Scroll-linked parallax within section ──
            // Text moves slightly faster than image (closer to camera)
            gsap.to(headingRef.current, {
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            });

            gsap.to(imageRef.current, {
                y: 15,
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
        <section ref={sectionRef} id="about" className="scene-section w-full px-4 sm:px-8 py-8">
            {/* Outer border — flex-col on mobile, flex-row on lg+ */}
            <div
                ref={containerRef}
                className="relative w-full border border-white/30 rounded-tl-[24px] flex flex-col lg:flex-row overflow-hidden glow-accent"
                style={{
                    minHeight: '70vh',
                    background:
                        'radial-gradient(90% 70% at 0% 0%, rgba(0, 195, 255, 0.35) 0%, rgba(0, 120, 255, 0.22) 26%, rgba(8, 18, 45, 0.14) 45%, rgba(0, 0, 0, 0) 72%), linear-gradient(180deg, rgba(4, 10, 25, 0.6) 0%, rgba(0, 0, 0, 0.28) 50%, rgba(0, 0, 0, 0.42) 100%)',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* ══════════════════════════════
            LEFT panel
        ══════════════════════════════ */}
                <div
                    className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/20"
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: 'clamp(28px, 6vw, 56px)',
                        gap: '24px',
                    }}
                    data-depth="-0.2"
                >
                    {/* Label */}
                    <p
                        ref={labelRef}
                        style={{
                            fontSize: '11px',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.4)',
                            margin: 0,
                        }}
                    >
                        About
                    </p>

                    {/* Big heading */}
                    <h2
                        ref={headingRef}
                        style={{
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            fontSize: 'clamp(2.8rem, 10vw, 7rem)',
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        WHO IS
                        <br />
                        <span className="main-color instrumental-font">RYAN?</span>
                    </h2>

                    {/* Description */}
                    <p
                        ref={descRef}
                        style={{
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                            lineHeight: 1.7,
                            maxWidth: '380px',
                            margin: 0,
                        }}
                    >
                        A CSE student &amp; fullstack developer who uses React, Node.js,
                        MongoDB &amp; Firebase to build scalable web apps — focused on clean
                        logic, strong backends, and interfaces that just work.
                    </p>

                    {/* Spacer — pushes marquee to bottom (only meaningful on desktop) */}
                    <div className="hidden lg:block" style={{ flex: 1 }} />

                    {/* Marquee */}
                    <div ref={marqueeRef} style={{ overflow: 'hidden' }}>
                        <p
                            style={{
                                fontSize: '10px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: '10px',
                            }}
                        >
                            Interests
                        </p>
                        <Marquee
                            gradient
                            gradientColor="#000000"
                            gradientWidth={50}
                            speed={35}
                            pauseOnHover
                        >
                            {interests.map((item) => (
                                <span
                                    key={item}
                                    style={{
                                        margin: '0 10px',
                                        padding: '5px 14px',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: 'rgba(255,255,255,0.6)',
                                        borderRadius: '999px',
                                        whiteSpace: 'nowrap',
                                        display: 'inline-block',
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* ══════════════════════════════
            RIGHT panel — image with 3D tilt
        ══════════════════════════════ */}
                <div
                    ref={imageRef}
                    className="w-full lg:w-[45%] flex items-center justify-center"
                    style={{
                        flexShrink: 0,
                        padding: 'clamp(20px, 4vw, 40px)',
                    }}
                    data-depth="0.15"
                >
                    {/* 3D tilt container */}
                    <div
                        ref={imageTilt.ref}
                        onMouseMove={imageTilt.onMouseMove}
                        onMouseLeave={imageTilt.onMouseLeave}
                        className="corner-box tilt-container"
                    >
                        {/* Black inner border frame */}
                        <div style={{ border: '4px solid #000', overflow: 'hidden' }}>
                            <img
                                src="https://i.ibb.co.com/VptzdL3N/Rehan.jpg"
                                alt="Ryan Rehan"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'clamp(280px, 50vw, 480px)',
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    display: 'block',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
