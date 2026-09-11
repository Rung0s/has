/**
 * Prerender: SPA çıktısını her rota için statik HTML'e çevirir.
 *
 * Neden: Google JS'i render eder ama GPTBot / PerplexityBot / ClaudeBot çoğunlukla etmez.
 * Prerender olmadan bu botlar boş bir <div id="root"> görür ve siteyi kaynak gösteremez.
 *
 * Chrome zaten sistemde kurulu olduğu için puppeteer-core kullanılır (indirme yok).
 * Chrome yolu CHROME_PATH ortam değişkeniyle geçersiz kılınabilir.
 */
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const STORE = path.join(__dirname, 'prerendered');
const PORT = 4183;

const ROUTES = ['/', '/termal', '/hamam', '/odalar', '/konum', '/kurumsal', '/sss', '/rezervasyon', '/fiyatlar', '/imkanlar', '/hakkimizda', '/iletisim', '/bloglar'];

const blogsPath = path.join(__dirname, 'src', 'data', 'blogs.json');
if (fs.existsSync(blogsPath)) {
  JSON.parse(fs.readFileSync(blogsPath, 'utf8')).forEach((b) => ROUTES.push(`/blog/${b.id}`));
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chromePath = CHROME_CANDIDATES.find((p) => {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
});

// Sistem Chrome'u yoksa puppeteer'ın indirdiği Chromium kullanılır (Vercel build ortamı).
// Yerelde sistem Chrome'u kullanılır. Bulunamazsa prerender atlanır ve
// apply-prerender.js depodaki prerendered/ çıktısını uygular (Vercel yolu).
const executablePath = chromePath;
if (!executablePath || !fs.existsSync(executablePath)) {
  console.error('Prerender atlandı: kullanılabilir Chrome/Chromium bulunamadı.');
  process.exit(0);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html');
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

const run = async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
    // framer-motion whileInView içerikleri DOM'da; yine de kısa bir yerleşme payı bırak
    await new Promise((r) => setTimeout(r, 400));

    const html = await page.content();
    const rel = route === '/' ? '' : route.replace(/^\//, '');
    for (const base of [DIST, STORE]) {
      const outDir = rel ? path.join(base, rel) : base;
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }
    const outDir = rel ? path.join(DIST, rel) : DIST;
    console.log(`prerendered ${route} -> ${path.relative(DIST, path.join(outDir, 'index.html'))}`);
    await page.close();
  }

  // 404 sayfası: Vercel bilinmeyen yollarda dist/404.html'i servis eder
  const nf = await browser.newPage();
  await nf.goto(`http://localhost:${PORT}/bulunmayan-sayfa-404`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 300));
  const nfHtml = await nf.content();
  fs.writeFileSync(path.join(DIST, '404.html'), nfHtml);
  fs.writeFileSync(path.join(STORE, '404.html'), nfHtml);
  console.log('prerendered 404 -> 404.html');
  await nf.close();

  await browser.close();
  server.close();
};

run().catch((err) => {
  console.error('Prerender hatası:', err.message);
  server.close();
  process.exit(1);
});
