import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { portfolioData } from '../data/content';
import { heroContainerVariants, fadeUpVariants } from '../utils/motionVariants';
import ProfileCard from '../components/ProfileCard';
import subjectImage from '../data/images/optimized/Subject.webp';

const Hero = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { hero, personal } = portfolioData;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const currentWord = hero.typingCycle[currentTypeIndex];
    const speed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTypeIndex((prev) => (prev + 1) % hero.typingCycle.length);
        }
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTypeIndex, hero.typingCycle]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const containerVariants = heroContainerVariants;
  const itemVariants = fadeUpVariants;

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className={`${isMobile ? 'w-[380px]' : 'w-full max-w-[2000px]'} mx-auto px-6 lg:px-24`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${isMobile ? 'flex flex-col' : 'grid lg:grid-cols-2'} gap-4 items-center min-h-[calc(100vh-4rem)]`}
        >
          {/* Text Content - Left/Top Side */}
          <div className={`${isMobile ? 'order-2' : 'order-1'} space-y-8 py-8 lg:py-0 lg:pr-12 z-10`}>
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h1 
                className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl lg:text-7xl'} font-bold tracking-tight`}
                variants={itemVariants}
              >
                <span className="block relative inline-block">
                  <span className="gradient-text">{hero.headlineOne}</span>
                  {/* Gradient underline effect */}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent opacity-80" />
                </span>
                <span className={`block text-foreground ${isMobile ? 'mt-2' : 'mt-4'}`}>{hero.headlineTwo}</span>
              </motion.h1>
              
              <motion.div 
                variants={itemVariants}
                className={`text-foreground/90 ${isMobile ? 'h-6' : 'h-8'} flex items-center`}
              >
                <span className="mr-2">Specializing in</span>
                <span className={`text-primary font-medium ${isMobile ? 'min-w-[150px]' : 'min-w-[200px]'}`}>
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="text-primary"
                  >
                    |
                  </motion.span>
                </span>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className={`text-foreground/80 leading-relaxed ${isMobile ? 'max-w-sm' : 'max-w-xl'}`}
              >
                {hero.subheadline}
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary focus-ring group"
              >
                <span>{hero.primaryCta}</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.a
                href="/saragada_thrinath_basic.pdf"
                download="saragada_thrinath_basic.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary focus-ring group"
              >
                <FiDownload className="mr-2" />
                <span>{hero.secondaryCta}</span>
              </motion.a>
            </motion.div>

            {/* Social Media Links - All Versions */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 pt-4"
            >
              <span className={`${isMobile ? 'text-sm' : 'text-base'} text-foreground/60 font-medium whitespace-nowrap`}>Connect:</span>
              <div className="flex gap-2">
                <motion.a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring`}
                  aria-label="Instagram"
                >
                  <FaInstagram className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </motion.a>
                
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring`}
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </motion.a>
                
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring`}
                  aria-label="GitHub"
                >
                  <FiGithub className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* ProfileCard - Right/Bottom Side */}
          <motion.div
            variants={itemVariants}
            className={`relative ${isMobile ? 'h-[280px] pt-20' : 'h-[600px] lg:h-[700px]'} flex items-center justify-center`}
          >
            <ProfileCard
              name="Thrinath"
              title={personal.role}
              handle="thrinath"
              status="Online"
              contactText="Contact Me"
              avatarUrl={subjectImage}
              showUserInfo={false}
              enableTilt={false}
              enableMobileTilt={false}
              onContactClick={handleContactClick}
              showIcon={true}
              showBehindGlow={true}
              behindGlowColor="rgba(192, 192, 192, 0.4)"
              customInnerGradient="linear-gradient(145deg,#000000 0%,#C0C0C0 50%,#FFFFFF 100%)"
              isMobile={isMobile}
              mobileHeight="220px"
              mobileMaxHeight="250px"
              className={`${isMobile ? 'max-w-[200px]' : 'max-w-[300px]'} w-full`}
            />
          </motion.div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            style={{
              background: 'var(--hero-gradient)'
            }}
          />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;