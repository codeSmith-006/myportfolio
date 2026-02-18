import { motion } from 'motion/react';
import { fadeUp, stagger } from '../animations/variants';

const stats = [
  { number: '10M+', label: 'Total Views Generated' },
  { number: '500+', label: 'Videos Produced' },
  { number: '50+', label: 'Brands Scaled' },
  { number: '3x', label: 'Average Growth Rate' },
];

const Results = () => {
  return (
    <section id="results">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        Results That Speak
      </motion.h2>

      <motion.div
        className="results-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} className="result-stat" variants={fadeUp}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Results;
