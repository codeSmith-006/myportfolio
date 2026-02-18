import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Skill data with CDN SVG icons ─── */
const skillCategories = {
    Frontend: [
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Responsive Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" },
    ],
    Backend: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "JWT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg" },
        { name: "Stripe", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg" },
    ],
    Tools: [
        { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg" },
        { name: "Firebase Console", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
};

const categories = Object.keys(skillCategories);

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

const Skills = () => {
    const [ref, inView] = useInView();
    const [active, setActive] = useState("Frontend");

    return (
        <section id="skills" className="w-full px-4 sm:px-8 py-8">

            {/* Outer border — matches About section */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="w-full border-t border-l border-white/20 overflow-hidden"
                style={{ minHeight: "80vh" }}
            >

                {/* ── Top: heading + description ── */}
                <div className="text-center px-6 pt-14 pb-10 border-b border-white/10">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}
                    >
                        What I work with
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 0.95, textTransform: "uppercase", margin: "0 0 20px 0" }}
                    >
                        MY{" "}
                        <span className="main-color instrumental-font">SKILLS</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(0.85rem, 2vw, 1rem)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}
                    >
                        Technologies and tools I use to build scalable, responsive, and
                        production-ready web applications.
                    </motion.p>
                </div>

                {/* ── Body: vertical label + grid ── */}
                <div className="flex">

                    {/* Vertical "Skills" label — left accent */}
                    <div
                        className="hidden h-[50vh] sm:flex flex-col items-center justify-center"
                        style={{ width: "48px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.1)", padding: "32px 0" }}
                    >
                        {/* Accent bar */}
                        <div style={{ width: "2px", height: "40px", background: "#B7FD5B", marginBottom: "12px", borderRadius: "2px" }} />
                        <span
                            style={{
                                writingMode: "vertical-rl",
                                transform: "rotate(180deg)",
                                fontSize: "11px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.4)",
                                fontWeight: 600,
                            }}
                        >
                            Skills
                        </span>
                        <div style={{ width: "2px", height: "40px", background: "#B7FD5B", marginTop: "12px", borderRadius: "2px" }} />
                    </div>

                    {/* Main content */}
                    <div style={{ flex: 1, minWidth: 0, padding: "clamp(20px, 4vw, 48px)", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {/* Tab filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="flex gap-2 mb-10 flex-wrap"
                            style={{ justifyContent: "center" }}
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    style={{
                                        padding: "8px 22px",
                                        borderRadius: "999px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        border: active === cat ? "1px solid #B7FD5B" : "1px solid rgba(255,255,255,0.15)",
                                        background: active === cat ? "#B7FD5B" : "transparent",
                                        color: active === cat ? "#000" : "rgba(255,255,255,0.6)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>

                        {/* Skill cards grid */}
                        {/* Skill cards grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 130px))",
                                    gap: "16px",
                                    width: "100%",
                                    justifyContent: "center",   // ✅ centers the grid
                                    justifyItems: "center",
                                }}
                            >
                                {skillCategories[active].map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.07, duration: 0.35 }}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "4px",
                                            padding: "28px 16px 20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "14px",
                                            cursor: "default",
                                            transition: "border-color 0.2s",
                                            width: "100%",
                                        }}
                                        onMouseEnter={e =>
                                        (e.currentTarget.style.borderColor =
                                            "rgba(183,253,91,0.35)")
                                        }
                                        onMouseLeave={e =>
                                        (e.currentTarget.style.borderColor =
                                            "rgba(255,255,255,0.1)")
                                        }
                                    >
                                        {/* Logo */}
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            style={{
                                                width: "52px",
                                                height: "52px",
                                                objectFit: "contain",
                                                filter:
                                                    skill.name === "Express.js" ||
                                                        skill.name === "Git & GitHub"
                                                        ? "invert(1)"
                                                        : "none",
                                            }}
                                        />

                                        {/* Name */}
                                        <span
                                            style={{
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                color: "rgba(255,255,255,0.75)",
                                                textAlign: "center",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                    </div>

                </div>

            </motion.div>
        </section>
    );
};

export default Skills;
