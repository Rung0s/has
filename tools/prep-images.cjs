/* ============================================================================
 * OTEL FABRİKASI — GENEL GÖRSEL HAZIRLAMA (yeniden kullanılabilir)
 * Kullanım:  siteyi klonla → bu dosyayı site köküne kopyala →
 *            SADECE aşağıdaki CONFIG bloğunu düzenle → `node prep-images.cjs`
 * Üretir: hero-*, about-*, signature-*, rooms/*, gallery/*, logo(.webp/-dark),
 *         favicon seti, apple-touch-icon, og-image.
 * Gerektirir: sharp (template devDep'inde var). Site klasörü içinden çalıştır.
 * ==========================================================================*/
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/* ========================= >>> HER OTELDE DÜZENLE <<< =====================*/
const CONFIG = {
  SRC: 'C:/Users/songu/.gemini/antigravity-ide/scratch/hotels/__SLUG__/img-raw/', // ham görsel klasörü
  primaryHex: '#0c1b1f',   // koyu marka rengi (logo-dark + favicon zemini + og overlay)
  accentSoftHex: '#5cc0b3',// og alt yazı rengi
  logoFile: 'logo2.png',   // ham logo (beyaz/şeffaf tercih)
  // hero dikey (split), about, imza hizmetler, odalar, galeri — DOSYA ADLARINI eşle:
  hero:   ['om-06.jpg', 'om-10.jpg', 'om-01.jpg'],
  about:  ['om-08.jpg', 'galeri-12.jpg'],            // [yatay about-1, dikey about-2]
  signature: ['galeri-10.jpg', 'om-07.jpg', 'galeri-8.jpg'], // config.signature sırası
  rooms: {                                            // key = items.json id kökü
    business: ['room-business.jpg', 'om-13.jpg', 'om-18.jpg'],
    superior: ['room-superior.jpg', 'om-19.jpg', 'om-25.jpg'],
    deluxe:   ['room-deluxe.jpg', 'om-12.jpg', 'om-31.jpg'],
    triple:   ['room-triple.jpg', 'om-22.jpg', 'om-43.jpg'],
    grand:    ['room-grandsuite.jpg', 'om-35.jpg', 'om-44.jpg'],
  },
  gallery: ['om-01.jpg','om-05.jpg','om-06.jpg','om-07.jpg','om-08.jpg','om-09.jpg',
            'om-10.jpg','galeri-10.jpg','om-19.jpg','om-25.jpg','om-41.jpg','om-43.jpg'],
  ogBg: 'om-06.jpg',
  ogLine1: "Şehrin Merkezinde Konforlu Konaklama",
  ogLine2: "OTELİN 3 ÖNE ÇIKAN ÖZELLİĞİ",
};
/* ==========================================================================*/

const OUT = path.join(__dirname, 'public');
const s = (f) => sharp(path.join(CONFIG.SRC, f));
const ensure = (d) => fs.mkdirSync(d, { recursive: true });
const cover = (src, dest, w, h, q = 82) =>
  s(src).resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: q }).toFile(path.join(OUT, dest));
const inside = (src, dest, w, h, q = 80) =>
  s(src).resize(w, h, { fit: 'inside', withoutEnlargement: false }).webp({ quality: q }).toFile(path.join(OUT, dest));
const hex = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16) });

(async () => {
  ensure(OUT); ensure(path.join(OUT, 'rooms')); ensure(path.join(OUT, 'gallery'));

  for (let i = 0; i < CONFIG.hero.length; i++) await cover(CONFIG.hero[i], `hero-${i + 1}.webp`, 1400, 1600);
  await cover(CONFIG.about[0], 'about-1.webp', 1200, 900);
  await cover(CONFIG.about[1], 'about-2.webp', 900, 1200, 88);

  const sigNames = ['signature-hamam.webp', 'signature-otopark.webp', 'signature-salon.webp'];
  for (let i = 0; i < CONFIG.signature.length; i++) await cover(CONFIG.signature[i], sigNames[i] || `signature-${i}.webp`, 900, 700, 88);

  for (const [key, files] of Object.entries(CONFIG.rooms))
    for (let i = 0; i < files.length; i++) await cover(files[i], `rooms/${key}-${i + 1}.webp`, 1200, 900);

  for (let i = 0; i < CONFIG.gallery.length; i++) await inside(CONFIG.gallery[i], `gallery/g${i + 1}.webp`, 1200, 1200);

  /* LOGO: beyaz/şeffaf orijinal + koyu varyant (açık zemin/navbar) */
  const P = hex(CONFIG.primaryHex);
  const logoBuf = await s(CONFIG.logoFile).trim({ threshold: 5 }).toBuffer();
  await sharp(logoBuf).resize({ width: 640 }).webp({ quality: 92 }).toFile(path.join(OUT, 'logo.webp'));
  const { data, info } = await sharp(logoBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const dark = Buffer.from(data);
  for (let i = 0; i < dark.length; i += 4) if (dark[i + 3] > 0) { dark[i] = P.r; dark[i + 1] = P.g; dark[i + 2] = P.b; }
  await sharp(dark, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: 640 }).webp({ quality: 92 }).toFile(path.join(OUT, 'logo-dark.webp'));

  /* FAVICON: logonun üst amblemi (üst %55), koyu kare zemin */
  const meta = await sharp(logoBuf).metadata();
  const glyph = await sharp(logoBuf).extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.55) }).trim({ threshold: 5 }).toBuffer();
  for (const size of [48, 192, 512]) {
    const inner = await sharp(glyph).resize(Math.round(size * 0.62), Math.round(size * 0.62), { fit: 'inside' }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: CONFIG.primaryHex } })
      .composite([{ input: inner, gravity: 'center' }]).png()
      .toFile(path.join(OUT, size === 48 ? 'favicon-48x48.png' : size === 192 ? 'favicon-192x192.png' : 'favicon.png'));
  }
  const inner180 = await sharp(glyph).resize(112, 112, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: CONFIG.primaryHex } })
    .composite([{ input: inner180, gravity: 'center' }]).png().toFile(path.join(OUT, 'apple-touch-icon.png'));

  /* OG 1200x630 */
  const bg = await s(CONFIG.ogBg).resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([{ input: Buffer.from([0, 0, 0, 150]), raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: 'over' }]).toBuffer();
  const logoOg = await sharp(logoBuf).resize({ width: 430 }).toBuffer();
  const caption = Buffer.from(
    `<svg width="1200" height="120" xmlns="http://www.w3.org/2000/svg">
      <text x="600" y="46" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="40">${CONFIG.ogLine1}</text>
      <text x="600" y="98" text-anchor="middle" fill="${CONFIG.accentSoftHex}" font-family="Arial, sans-serif" font-size="27" letter-spacing="4">${CONFIG.ogLine2}</text>
    </svg>`);
  await sharp(bg).composite([{ input: logoOg, top: 140, left: 385 }, { input: caption, top: 400, left: 0 }])
    .png().toFile(path.join(OUT, 'og-image.png'));

  console.log('görseller hazır ✔');
})();
