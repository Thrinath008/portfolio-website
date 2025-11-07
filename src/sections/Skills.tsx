import { motion } from 'framer-motion';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants, cardVariants } from '../utils/motionVariants';

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="section-container">
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
          {skills.title}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.groups.map((group, groupIndex) => (
            <motion.div
              key={group.heading}
              variants={cardVariants}
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="card-interactive p-6 bg-gradient-to-br from-card/80 to-card/40"
            >
              <h3 className="text-lg font-semibold mb-4 text-foreground border-b border-border/40 pb-2">
                {group.heading}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: groupIndex * 0.1 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;