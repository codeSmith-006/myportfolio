import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import './Sytles/hero.css'

const navItems = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Education", href: "education" },
  { name: "Contact", href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const whatsappUrl = "https://wa.me/8801722414475";

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

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
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
          ${scrolled ? "bg-black/70 backdrop-blur-2xl" : ""}
        `}
      >
        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-bold">
          S
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-white/80">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`relative hover:text-white transition-colors duration-200 ${activeSection === item.href ? "text-white" : ""
                }`}
            >
              {item.name}
              {activeSection === item.href && (
                <motion.span
                  layoutId="activeDesktop"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-main"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}

          <button
            onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
            className="ml-2 rounded-full px-4 py-2 bg-main text-black font-medium"
          >
            Book a call
          </button>
        </div>
      </motion.nav>

      {/* ================= MOBILE TOP BAR ================= */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          flex md:hidden items-center justify-between
          px-5 py-4
          backdrop-blur-xl bg-black/60
          border-b border-white/10
        `}
      >
        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-bold">
          S
        </div>

        {/* Hamburger */}
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
            {/* Top */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-bold">
                S
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="mt-12 flex flex-col gap-6 px-6 text-lg text-white/80">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left transition-colors duration-200 ${activeSection === item.href ? "text-main font-medium" : "hover:text-white"
                    }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="absolute bottom-8 left-6 right-6">
              <button
                onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
                className="w-full rounded-xl bg-main py-4 font-medium text-black"
              >
                Book a call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
