import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects } = portfolioData;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeed = 1; // pixels per frame for smoother scrolling
  const animationFrameRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isHovering || !scrollContainerRef.current) return;

    const autoScroll = () => {
      if (scrollContainerRef.current && !isHovering) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // Smooth infinite scroll
        scrollPositionRef.current += scrollSpeed;
        
        // Reset to start when reaching the end
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainerRef.current.scrollLeft = scrollPositionRef.current;
      }
      
      animationFrameRef.current = requestAnimationFrame(autoScroll);
    };

    animationFrameRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrolling, isHovering]);

  // Handle hover on individual cards
  const handleCardMouseEnter = () => {
    setIsHovering(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovering(false);
  };

  // Handle container hover
  const handleContainerMouseEnter = () => {
    setIsHovering(true);
  };

  const handleContainerMouseLeave = () => {
    setIsHovering(false);
  };

  // Manual scroll control
  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  // Duplicate cards for infinite scroll effect
  const duplicatedCards = [...projects.cards, ...projects.cards];

  return (
    <section id="projects" className="section-container md:px-10 px-0 md:py-24 py-16">
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

        {/* Scroll Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleAutoScroll}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            {isAutoScrolling ? '⏸ Pause' : '▶ Play'} Auto-Scroll
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-auto overflow-y-hidden scrollbar-hide"
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setTimeout(() => setIsHovering(false), 1000)}
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          <div className="flex gap-6 pb-4 md:px-0 px-0" style={{ width: 'max-content' }}>
            {duplicatedCards.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                variants={itemVariants}
                className="w-[350px] sm:w-[400px] flex-shrink-0"
                style={{ minWidth: '350px' }}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                onTouchStart={() => setIsHovering(true)}
                onTouchEnd={() => setTimeout(() => setIsHovering(false), 1000)}
              >
                <ProjectCard
                  name={project.name}
                  year={project.year}
                  description={project.description}
                  tags={project.tags}
                  links={project.links}
                  impactPoints={project.impactPoints}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors ${isAutoScrolling && !isHovering ? 'bg-primary/60 animate-pulse' : 'bg-primary/20'}`}></div>
          <div className={`w-2 h-2 rounded-full transition-colors ${isAutoScrolling && !isHovering ? 'bg-primary/40 animate-pulse delay-75' : 'bg-primary/20'}`}></div>
          <div className={`w-2 h-2 rounded-full transition-colors ${isAutoScrolling && !isHovering ? 'bg-primary/20 animate-pulse delay-150' : 'bg-primary/20'}`}></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;