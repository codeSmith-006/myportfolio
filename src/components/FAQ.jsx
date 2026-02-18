import { motion } from 'motion/react';
import { fadeUp, stagger } from '../animations/variants';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does it take to produce content?',
    answer: 'Turnaround time depends on the project scope. Short-form content typically takes 3-5 days, while long-form projects take 7-10 days. Rush delivery is available.',
  },
  {
    question: 'What platforms do you specialize in?',
    answer: 'We specialize in all major platforms including YouTube, Instagram, TikTok, LinkedIn, and Twitter. Each piece of content is optimized for its specific platform.',
  },
  {
    question: 'Do you provide raw footage or just edited content?',
    answer: 'We provide fully edited, publish-ready content. Raw footage and project files can be included in premium packages upon request.',
  },
  {
    question: 'Can you help with content strategy and planning?',
    answer: 'Absolutely! Our content strategists work with you to develop a comprehensive content calendar, identify trending topics, and optimize for maximum reach and engagement.',
  },
  {
    question: 'What makes your service different?',
    answer: 'We combine creative excellence with data-driven insights. Every piece of content is crafted to perform, not just look good. Plus, we handle distribution and optimization post-launch.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        className="faq-list"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            variants={fadeUp}
            onClick={() => toggleFAQ(index)}
            whileHover={{ scale: 1.01 }}
          >
            <div className="faq-question">{faq.question}</div>
            <motion.div
              className="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? 'auto' : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              {openIndex === index && <p style={{ marginTop: '12px' }}>{faq.answer}</p>}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQ;
