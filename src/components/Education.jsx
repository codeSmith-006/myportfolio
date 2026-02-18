import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Building } from "lucide-react";

const educations = [
  {
    id: 1,
    degree: "BSc in Computer Science and Engineering",
    institution: "Patuakhali Science and Technology University",
    location: "Patuakhali, Bangladesh",
    period: "2024 - 2028",
    description: [
      "Pursuing undergraduate degree in Computer Science and Engineering",
      "Focus on software development, algorithms, and data structures",
      "Active member of PSTU CSE Club",
    ],
    icon: "",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const Education = () => {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="w-full px-4 sm:px-8 py-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full  overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center px-6 pt-14 pb-10 border-b border-white/10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "12px",
            }}
          >
            Academic Journey
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              margin: "0 0 18px 0",
            }}
          >
            EDUCATION{" "}
            <span className="main-color instrumental-font">BACKGROUND</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.55 }}
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              maxWidth: "660px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            My current academic path focused on software engineering fundamentals,
            computer science theory, and real-world development practice.
          </motion.p>
        </div>

        <div className="px-5 sm:px-8 py-10">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/15 sm:-translate-x-1/2" />

            <div className="space-y-8">
              {educations.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + index * 0.15, duration: 0.45 }}
                  className="relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8"
                >
                  <div className={`hidden sm:block ${index % 2 === 0 ? "order-1" : "order-2"}`} />

                  <div className={index % 2 === 0 ? "sm:order-2" : "sm:order-1"}>
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

                  <div className="absolute left-1 top-6 sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full border border-[#B7FD5B]/70 bg-black text-sm">
                    {edu.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
