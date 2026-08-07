import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  path.join(__dirname, 'public', 'rooms'),
  path.join(__dirname, 'public'),
];

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    console.log(`Converting: ${filePath} -> ${webpPath}`);
    
    try {
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      // Delete original
      fs.unlinkSync(filePath);
      console.log(`Deleted original: ${filePath}`);
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err);
    }
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      await convertImage(fullPath);
    } else if (stat.isDirectory()) {
      await processDirectory(fullPath);
    }
  }
}

async function run() {
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log('Finished converting images to WebP.');
}

run();
