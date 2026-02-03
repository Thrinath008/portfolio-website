import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/content';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const allNavItems = [
    { id: 'hero', label: 'Home' },

    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  // Filter nav items based on device
  const filteredNavItems = isMobile
    ? allNavItems.filter(item => item.id !== 'about')
    : allNavItems;

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = filteredNavItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredNavItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/60'
          : 'bg-transparent'
        }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold gradient-text focus-ring"
          >
            {portfolioData.personal.name.split(' ')[0]}
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors focus-ring ${activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/SaragadaThrinath_CV.pdf"
            download="SaragadaThrinath_CV.pdf"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary focus-ring"
          >
            Download CV
          </motion.a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-4 pb-4">
          {filteredNavItems.filter(item => ['projects', 'education', 'contact'].includes(item.id)).map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileTap={{ scale: 0.95 }}
              className={`text-xs font-medium transition-colors focus-ring px-2 py-1 rounded ${activeSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
