import { motion } from 'motion/react';
import { fadeUp, stagger } from '../animations/variants';

const steps = [
  {
    title: 'Discovery Call',
    description: 'We learn about your brand, audience, and goals to create a tailored content strategy.',
  },
  {
    title: 'Content Creation',
    description: 'Our team produces high-quality content that aligns with your brand and resonates with your audience.',
  },
  {
    title: 'Review & Refine',
    description: 'Collaborate with us to perfect every detail before publishing. Your vision, our execution.',
  },
  {
    title: 'Launch & Scale',
    description: 'We distribute your content across platforms and continuously optimize for maximum impact.',
  },
];

const Process = () => {
  return (
    <section id="process">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        Our Process
      </motion.h2>

      <motion.div
        className="process-steps"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {steps.map((step, index) => (
          <motion.div key={index} className="process-step" variants={fadeUp}>
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Process;
