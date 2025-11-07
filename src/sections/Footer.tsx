import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { portfolioData } from '../data/content';

const Footer = () => {
  const { footer, personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border/40 bg-card/20 backdrop-blur-sm">
      <div className="section-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold gradient-text">
                {personal.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full-stack developer crafting accessible web experiences with modern technologies.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href={`mailto:${personal.email}`}
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring"
                  aria-label="Send email"
                >
                  <FiMail className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring"
                  aria-label="LinkedIn profile"
                >
                  <FiLinkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors focus-ring"
                  aria-label="GitHub profile"
                >
                  <FiGithub className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-foreground font-medium">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ x: 4 }}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors text-left focus-ring rounded px-1 py-1"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Back to Top */}
            <div className="space-y-4">
              <h4 className="text-foreground font-medium">Navigation</h4>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded px-2 py-1"
              >
                <FiArrowUp className="w-4 h-4" />
                Back to Top
              </motion.button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {footer.note} • {new Date().getFullYear()}
            </p>
            <p className="text-xs text-muted-foreground">
              Built with React, Framer Motion & TailwindCSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;