import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      // even snappier stagger
      staggerChildren: 0.03,
      delayChildren: 0.04
    }
  }
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // quicker spring for fast but smooth motion
      type: 'spring' as const,
      stiffness: 240,
      damping: 28
    }
  }
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 24
    }
  }
};

export const heroContainerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      // tighter stagger for hero
      staggerChildren: 0.04,
      delayChildren: 0.06
    }
  }
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 28
    }
  }
};