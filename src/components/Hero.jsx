import { useEffect, useState } from "react";
import { motion } from "motion/react";

const profiles = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
  "https://i.pravatar.cc/40?img=5",
];

const words = ["Fullstack Developer", "Designer"];

const Hero = () => {
  const [filled, setFilled] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="home"
      className="
        relative overflow-hidden
        flex flex-col items-center
        mt-32 sm:mt-36 md:mt-44 lg:mt-48
        px-4
        max-w-full
        max-h-screen
      "
      initial="hidden"
      animate="show"
    >
      {/* ── Trusted / review section ── */}
      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3"
      >
        {/* Avatars */}
        <div className="flex -space-x-3 group">
          {profiles.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="
                h-9 w-9 sm:h-10 sm:w-10
                rounded-full border-2 border-black
                transition-all duration-300
                group-hover:-translate-x-1
                hover:-translate-y-1 hover:scale-110
                hover:z-10
              "
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
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-500 ${filled && "fill-white"
                  }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  animation: filled ? "star-bounce 0.6s ease-out" : "none",
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
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.25 }}
        className="text-center flex flex-col items-center"
      >
        {/* Heading */}
        <h1
          className="
            font-bold
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            mt-6 leading-tight
          "
        >
          Hi, I'm{" "}
          <span className="instrumental-font main-color">Ryan Rehan</span>
        </h1>

        {/* Cycling role */}
        <div className="mt-3 text-xl sm:text-2xl md:text-3xl text-white/70 h-10 flex items-center justify-center gap-2">
          <span>A passionate</span>
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="font-semibold main-color instrumental-font"
          >
            {words[currentWordIndex]}
          </motion.span>
        </div>

        {/* Description */}
        <p
          className="
            mt-6
            text-base sm:text-lg md:text-xl
            font-medium text-white/80
            max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl
          "
        >
          Fresher skilled in React, Node.js, MongoDB, and Firebase, focused on
          building responsive web applications. Open to remote international
          internships to contribute skills and gain teamwork experience.
        </p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="
            flex flex-col sm:flex-row
            items-center gap-4
            mt-10 sm:mt-14
          "
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="
              w-full sm:w-auto
              rounded-xl
              px-6 sm:px-8 py-3 sm:py-3.5
              text-sm sm:text-base
              font-medium bg-main text-black
              transition-all duration-300
              hover:-translate-y-0.5
            "
          >
            View Projects
          </button>

          <a href="/Resume.pdf" download>
            <button
              className="
                w-full sm:w-auto
                rounded-xl
                px-6 sm:px-8 py-3 sm:py-3.5
                text-sm sm:text-base
                font-medium text-white/90
                bg-white/5
                border border-white/15
                backdrop-blur-md
                transition-all duration-300
                hover:bg-white/10 hover:border-white/25
                hover:-translate-y-0.5
              "
            >
              Download Resume
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.6 }}
        className="mt-16 flex flex-col items-center"
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2 tracking-widest uppercase">Scroll down</span>
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
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
