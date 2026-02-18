import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";

const interests = [
    "Backend Development",
    "Strong Logic",
    "Problem Solving",
    "Scalable Software",
    "Microservices",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Open Source",
    "Machine Learning",
    "Photography",
];

function useInView(threshold = 0.1) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

const About = () => {
    const [ref, inView] = useInView();

    return (
        <section id="about" className="w-full px-4 sm:px-8 py-8">

            {/* Outer border — flex-col on mobile, flex-row on lg+ */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="w-full border border-white/20 flex flex-col lg:flex-row overflow-hidden"
                style={{ minHeight: "80vh" }}
            >

                {/* ══════════════════════════════
            LEFT panel
        ══════════════════════════════ */}
                <div
                    className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/20 bg-black"
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "clamp(28px, 6vw, 56px)",
                        gap: "24px",
                    }}
                >
                    {/* Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)",
                            margin: 0,
                        }}
                    >
                        About
                    </motion.p>

                    {/* Big heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.25, duration: 0.65 }}
                        style={{
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: "-0.02em",
                            fontSize: "clamp(2.8rem, 10vw, 7rem)",
                            textTransform: "uppercase",
                            margin: 0,
                        }}
                    >
                        WHO IS<br />
                        <span className="main-color instrumental-font">RYAN?</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                            lineHeight: 1.7,
                            maxWidth: "380px",
                            margin: 0,
                        }}
                    >
                        A CSE student &amp; fullstack developer who uses React, Node.js,
                        MongoDB &amp; Firebase to build scalable web apps — focused on
                        clean logic, strong backends, and interfaces that just work.
                    </motion.p>

                    {/* Spacer — pushes marquee to bottom (only meaningful on desktop) */}
                    <div className="hidden lg:block" style={{ flex: 1 }} />

                    {/* Marquee */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            marginBottom: "10px",
                        }}>
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
                                        margin: "0 10px",
                                        padding: "5px 14px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "rgba(255,255,255,0.6)",
                                        borderRadius: "999px",
                                        whiteSpace: "nowrap",
                                        display: "inline-block",
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </Marquee>
                    </motion.div>
                </div>

                {/* ══════════════════════════════
            RIGHT panel — image
        ══════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                    className="w-full lg:w-[45%] bg-black flex items-center justify-center"
                    style={{
                        flexShrink: 0,
                        padding: "clamp(20px, 4vw, 40px)",
                    }}
                >
                    {/* White border frame */}
                    <div style={{ width: "100%", border: "2px solid rgba(255,255,255,0.8)", padding: "12px" }}>
                        {/* Black inner border frame */}
                        <div style={{ border: "4px solid #000", overflow: "hidden" }}>
                            <img
                                src="https://i.ibb.co.com/VptzdL3N/Rehan.jpg"
                                alt="Ryan Rehan"
                                style={{
                                    width: "100%",
                                    height: "clamp(280px, 50vw, 480px)",
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default About;
