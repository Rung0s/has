import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// These are the actual routes in our React app
const routes = [
  '/',
  '/odalar',
  '/hakkimizda',
  '/bloglar',
  '/iletisim',
  '/imkanlar'
];

// Add dynamic routes here (like blogs)
const blogsDataPath = path.join(__dirname, 'src', 'data', 'blogs.json');
try {
  if (fs.existsSync(blogsDataPath)) {
    const blogs = JSON.parse(fs.readFileSync(blogsDataPath, 'utf8'));
    blogs.forEach(b => {
      routes.push(`/blog/${b.id}`);
    });
  }
} catch (err) {
  console.error("Could not read blogs.json:", err);
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://www.hashotel.com${route}</loc>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

const robotsContent = `User-agent: *
Allow: /

Sitemap: https://www.hashotel.com/sitemap.xml
`;

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);

console.log('Successfully generated sitemap.xml and robots.txt');
