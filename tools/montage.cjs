/* Kontak-sheet: ham/üretilmiş görselleri tek JPG'de etiketli göster (Read ile bak).
 * Kullanım (site kökünden):  node montage.cjs <cikti.jpg> <dosya1> <dosya2> ...
 *   veya klasör deseni:      node montage.cjs <cikti.jpg> --dir <klasor> "<regex>"
 * Amaç: 40+ görseli tek tek Read etmeden, tek görselde gözle ayıklayıp seçmek. */
const sharp = require('sharp'), fs = require('fs'), path = require('path');
const out = process.argv[2];
let files;
if (process.argv[3] === '--dir') {
  const dir = process.argv[4], re = new RegExp(process.argv[5] || '.');
  files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f) && re.test(f)).sort().map(f => path.join(dir, f));
} else files = process.argv.slice(3);
const cols = 5, cw = 340, ch = 255;
(async () => {
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const b = await sharp(files[i]).resize(cw, ch, { fit: 'contain', background: '#333' }).png().toBuffer();
    const lbl = Buffer.from(`<svg width="${cw}" height="22"><rect width="${cw}" height="22" fill="#000"/><text x="4" y="16" fill="#0f0" font-size="14" font-family="monospace">${path.basename(files[i])}</text></svg>`);
    comps.push({ input: b, left: (i % cols) * cw, top: Math.floor(i / cols) * ch });
    comps.push({ input: lbl, left: (i % cols) * cw, top: Math.floor(i / cols) * ch });
  }
  await sharp({ create: { width: cols * cw, height: Math.ceil(files.length / cols) * ch, channels: 3, background: '#222' } })
    .composite(comps).jpeg({ quality: 76 }).toFile(out);
  console.log('ok', files.length, '->', out);
})();
