import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer id="footer" className="w-full px-4 sm:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="w-full  bg-black"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-left">
            <p className="text-white/75 text-sm">© 2025 Ryan Rehan. All rights reserved.</p>
            <p className="text-white/45 text-xs mt-1">Built with React and Tailwind CSS</p>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 bg-main rounded-md text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Back to Top
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
