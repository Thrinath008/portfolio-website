import { motion } from 'framer-motion';
import { FiCalendar, FiBriefcase } from 'react-icons/fi';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {experience.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {experience.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="card-interactive p-6 bg-gradient-to-br from-card/80 to-card/40"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FiBriefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.role}
                  </h3>
                  <p className="text-primary font-medium mb-2">{item.org}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiCalendar className="w-4 h-4" />
                    <span className="text-sm">{item.period}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {item.bullets.map((bullet, bulletIndex) => (
                  <motion.div
                    key={bulletIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1 + bulletIndex * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;