import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { itemVariants } from '../utils/motionVariants';

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectCardProps {
  name: string;
  year: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  impactPoints: string[];
  index: number;
}

const ProjectCard = ({ 
  name, 
  year, 
  description, 
  tags, 
  links, 
  impactPoints, 
  index 
}: ProjectCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="card-interactive p-8 bg-gradient-to-br from-card/80 to-card/40 group h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
              {year}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1 + tagIndex * 0.05,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Impact Points */}
      <div className="space-y-2 mb-6">
        {impactPoints.map((point, pointIndex) => (
          <motion.div
            key={pointIndex}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1 + pointIndex * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="flex items-start gap-2"
          >
            <FiArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-ring rounded-lg px-3 py-2 border border-border/40 hover:border-primary/40"
          >
            {link.label === 'GitHub' && <FiGithub className="w-4 h-4" />}
            {link.label !== 'GitHub' && <FiExternalLink className="w-4 h-4" />}
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
