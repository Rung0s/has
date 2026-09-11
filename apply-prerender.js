/**
 * Depodaki prerender çıktısını (prerendered/) build sonrası dist'e uygular.
 *
 * Neden: Vercel build ortamında Chrome/Chromium bulunmuyor, bu yüzden prerender.js
 * orada çalışmıyordu ve /hamam, /termal gibi rotalar AI tarayıcılarına boş SPA
 * kabuğu olarak gidiyordu. Prerender'ı yerelde çalıştırıp çıktıyı depoya alıyoruz;
 * bu script her build'de o HTML'leri dist'e kopyalar ve içindeki asset
 * referanslarını yeni build'in hash'leriyle değiştirir.
 *
 * Akış:  npm run build  ->  vite build  ->  prerender.js (Chrome varsa tazeler)
 *                                        ->  apply-prerender.js (depodakini uygular)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const STORE = path.join(__dirname, 'prerendered');

const assetRefs = (html) => ({
  js: [...html.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1]),
  css: [...html.matchAll(/href="(\/assets\/[^"]+\.css)"/g)].map((m) => m[1]),
});

const walk = (dir, base = '') => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(full, rel));
    else if (entry.name === 'index.html' || entry.name === '404.html') out.push({ full, rel });
  }
  return out;
};

if (!fs.existsSync(STORE)) {
  console.log('apply-prerender: prerendered/ yok, atlanıyor.');
  process.exit(0);
}
if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('apply-prerender: dist/index.html yok, önce vite build çalışmalı.');
  process.exit(1);
}

const fresh = assetRefs(fs.readFileSync(path.join(DIST, 'index.html'), 'utf8'));
const pages = walk(STORE);
let applied = 0;

for (const page of pages) {
  let html = fs.readFileSync(page.full, 'utf8');
  const old = assetRefs(html);

  // Eski build'in asset hash'lerini bu build'inkilerle değiştir
  old.js.forEach((ref, i) => {
    if (fresh.js[i] && ref !== fresh.js[i]) html = html.split(ref).join(fresh.js[i]);
  });
  old.css.forEach((ref, i) => {
    if (fresh.css[i] && ref !== fresh.css[i]) html = html.split(ref).join(fresh.css[i]);
  });

  const target = path.join(DIST, page.rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  applied += 1;
}

console.log(`apply-prerender: ${applied} sayfa dist'e uygulandı.`);
