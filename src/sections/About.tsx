import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';

const About = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="section-container">
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
          {about.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {about.bio}
            </p>
            
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <FiCheck className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground leading-relaxed">{highlight}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="card-interactive p-8 bg-gradient-to-br from-card/80 to-card/40"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Current Focus
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Web Development</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cloud & DevOps</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Security</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;