import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {education.title}
        </motion.h2>

        <div className="space-y-8">
          {education.entries.map((entry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                x: 4,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 top-1 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              
              <div className="card-interactive p-6 bg-gradient-to-br from-card/80 to-card/40">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {entry.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <FiMapPin className="w-4 h-4" />
                      <span className="text-sm">{entry.org}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiCalendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{entry.period}</span>
                  </div>
                </div>
                
                {entry.details && entry.details.length > 0 && (
                  <div className="space-y-2">
                    {entry.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-muted-foreground">
                        • {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;