import { motion } from 'motion/react';
import { fadeUp, stagger } from '../animations/variants';

const services = [
  {
    title: 'Short-form Content',
    description: 'High-quality reels, TikToks, and YouTube Shorts that capture attention and drive engagement.',
  },
  {
    title: 'Long-form Editing',
    description: 'Professional podcast and video editing with cinematic storytelling that keeps viewers watching.',
  },
  {
    title: 'Content Strategy',
    description: 'Data-driven strategies that maximize reach, engagement, and conversion across all platforms.',
  },
  {
    title: 'Distribution',
    description: 'Multi-platform distribution management to ensure your content reaches the right audience.',
  },
];

const Services = () => {
  return (
    <section id="services">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        Services
      </motion.h2>

      <motion.div
        className="service-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
