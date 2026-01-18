import { motion } from 'framer-motion';
import { portfolioData } from '../data/content';
import { containerVariants, itemVariants } from '../utils/motionVariants';
import DomeGallery from '../components/DomeGallery';

const Gallery = () => {
  const { gallery } = portfolioData;

  return (
    <section id="gallery" className="relative min-h-screen flex items-center justify-center bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full h-full"
      >
        <motion.div 
          variants={itemVariants}
          className="absolute top-8 left-0 right-0 z-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            {gallery.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            Drag to explore • Click to view
          </p>
        </motion.div>

        <div className="w-full h-[100vh] relative">
          <DomeGallery
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            images={gallery.images}
            overlayBlurColor="#0B0B0C"
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;