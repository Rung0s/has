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
const PORT = 4183;

const ROUTES = ['/', '/termal', '/hamam', '/odalar', '/konum', '/kurumsal', '/sss', '/imkanlar', '/hakkimizda', '/iletisim', '/bloglar'];

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

if (!chromePath) {
  console.error('Prerender atlandı: Chrome bulunamadı. CHROME_PATH ile yol verin.');
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
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
    // framer-motion whileInView içerikleri DOM'da; yine de kısa bir yerleşme payı bırak
    await new Promise((r) => setTimeout(r, 400));

    const html = await page.content();
    const outDir = route === '/' ? DIST : path.join(DIST, route.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`prerendered ${route} -> ${path.relative(DIST, path.join(outDir, 'index.html'))}`);
    await page.close();
  }

  await browser.close();
  server.close();
};

run().catch((err) => {
  console.error('Prerender hatası:', err.message);
  server.close();
  process.exit(1);
});
