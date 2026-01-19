import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './src/data/images';
const outputDir = './src/data/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter(file => 
  /\.(jpg|jpeg|png|gif)$/i.test(file) && !file.startsWith('.')
);

console.log(`Found ${imageFiles.length} images to optimize...`);

// Process each image
imageFiles.forEach(async (file) => {
  const inputPath = path.join(inputDir, file);
  const outputName = file.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  const outputPath = path.join(outputDir, outputName);
  
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`\nProcessing: ${file}`);
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    
    // Determine optimal dimensions based on usage
    let width, height;
    const isProfileImage = file.includes('Subject') || file.includes('profile');
    const isGalleryImage = file.includes('IMG_');
    
    if (isProfileImage) {
      // Profile images: max 400px
      width = 400;
      height = 400;
    } else if (isGalleryImage) {
      // Gallery images: max 800px width, maintain aspect ratio
      width = 800;
    } else {
      // Other images: max 1200px
      width = 1200;
    }
    
    // Process and optimize image
    await sharp(inputPath)
      .resize(width, height, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    
    // Get file sizes
    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(outputPath);
    const compressionRatio = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    
    console.log(`✓ Converted to: ${outputName}`);
    console.log(`New size: ${optimizedStats.size / 1024}KB`);
    console.log(`Compression: ${compressionRatio}%`);
    
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\nImage optimization started...');