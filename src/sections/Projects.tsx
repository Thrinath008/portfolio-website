import { motion } from 'framer-motion';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section-container">
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
          {projects.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.cards.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              year={project.year}
              description={project.description}
              tags={project.tags}
              links={project.links}
              impactPoints={project.impactPoints}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;