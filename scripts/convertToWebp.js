const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const QUALITY = 85; // Good quality setting for WebP

async function convertToWebp(filePath) {
    try {
        const fileExt = path.extname(filePath).toLowerCase();
        const fileName = path.basename(filePath, fileExt);
        const outputPath = path.join(path.dirname(filePath), `${fileName}.webp`);

        // Skip if already WebP
        if (fileExt === '.webp') {
            console.log(`Skipping ${filePath} - already WebP`);
            return;
        }

        // Skip SVG files with a message
        if (fileExt === '.svg') {
            console.log(`Skipping ${filePath} - SVG files are already optimized for web use`);
            return;
        }

        // Convert to WebP
        await sharp(filePath)
            .webp({ 
                quality: QUALITY,
                effort: 6 // Maximum compression effort
            })
            .toFile(outputPath);

        console.log(`✅ Converted ${filePath} to WebP`);
    } catch (error) {
        console.error(`❌ Error converting ${filePath}:`, error.message);
    }
}

async function processDirectory(directory) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                await processDirectory(filePath);
            } else {
                const ext = path.extname(file).toLowerCase();
                const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
                
                if (imageExts.includes(ext)) {
                    await convertToWebp(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error.message);
    }
}

// Start the conversion process
console.log('🚀 Starting image conversion to WebP...');
console.log('Note: SVG files will be skipped as they are already optimized vector graphics');
processDirectory(ASSETS_DIR)
    .then(() => console.log('✨ Conversion complete!'))
    .catch(error => console.error('Error:', error));
