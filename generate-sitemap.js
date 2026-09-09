import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE = 'https://www.hashotel.com';
const today = new Date().toISOString().split('T')[0];

// Öncelik sırası SEO hedefine göre: termal + hamam ana para sayfaları
const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/termal', priority: '0.95', changefreq: 'weekly' },
  { path: '/hamam', priority: '0.95', changefreq: 'weekly' },
  { path: '/odalar', priority: '0.9', changefreq: 'weekly' },
  { path: '/imkanlar', priority: '0.8', changefreq: 'weekly' },
  { path: '/hakkimizda', priority: '0.7', changefreq: 'monthly' },
  { path: '/iletisim', priority: '0.7', changefreq: 'monthly' },
  { path: '/bloglar', priority: '0.6', changefreq: 'weekly' },
];

const blogsDataPath = path.join(__dirname, 'src', 'data', 'blogs.json');
try {
  if (fs.existsSync(blogsDataPath)) {
    const blogs = JSON.parse(fs.readFileSync(blogsDataPath, 'utf8'));
    blogs.forEach((b) => routes.push({ path: `/blog/${b.id}`, priority: '0.6', changefreq: 'monthly' }));
  }
} catch (err) {
  console.error('Could not read blogs.json:', err);
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// AI arama motorlarının tarayıcıları açıkça izinli — engellenirse ChatGPT/Perplexity/Gemini kaynak gösteremez.
const robotsContent = `User-agent: *
Allow: /

# AI arama & asistan tarayıcıları (alıntılanabilmek için açık)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const llmsTxt = `# Has Termal Otel & Has Hamam — Eskişehir

> Eskişehir Odunpazarı'nda, şehir merkezinde (Hamamyolu Cad. No:7) 1980'lerden beri hizmet veren termal
> otel ve Türk hamamı. Kapalı termal havuz (~36 °C), kaplıca ve Has Hamam; 48 odanın tamamında özel
> banyo, seçili odalarda jakuzi. Konaklamalara açık büfe kahvaltı dâhildir (08:00–10:00), talep hâlinde
> kahvaltısız (sadece oda) fiyat da verilir.

## Temel bilgiler
- İşletme: Has Termal Otel (Kültür ve Turizm Bakanlığı işletme belgeli aile işletmesi)
- Hamam: Has Hamam — otel binası içinde, ayrı girişli; otelde konaklamayan misafirlere de açık
- Adres: Deliklitaş Mah. Hamamyolu Cad. No:7, Odunpazarı / Eskişehir (26010)
- Koordinat: 39.7740076, 30.5193447
- Telefon / WhatsApp: 0530 433 85 87 · Sabit: 0222 221 40 30
- E-posta: bilgi@hashotel.com
- Google Maps: https://www.google.com/maps?cid=8005378905937380123
- Puan: Google üzerinde ortalama 4.2 / 5

## Termal su
- Kaynak sıcaklığı 42 °C, pH 7,3, radyoaktivite 21,7
- Kapalı havuzda kullanım sıcaklığı ≈ 36 °C
- Geleneksel olarak romatizma, bel ve sırt ağrıları, kırık-çıkık sonrası rahatlama, böbrek taşı
  şikâyetlerinde tercih edilir

## Hizmetler
- Kapalı termal havuz, kaplıca, Türk hamamı (Has Hamam), kese, köpük masajı, masaj
- Kafeterya / kahvaltı salonu; grup ve kurumsal toplantılar için uygun
- Salı günleri hamam ve kaplıca yalnızca hanım misafirlere; diğer günler bay misafirlere
- Oda tipleri: Standart (2 kişilik double), İki ayrı yataklı (2 kişilik), 3 kişilik (2+1), Aile Suit Oda (3–4 kişi)
- Seçili odalarda jakuzili banyo (diğerlerinde küvet/duş); tüm odalarda klima, uydu TV, minibar, ücretsiz Wi-Fi
- Giriş 14:00, çıkış 12:00; otopark mevcut; evcil hayvan kabul edilmez

## Sayfalar
- [Ana sayfa](${SITE}/): otel tanıtımı, müsaitlik sorgulama, Has Hamam bölümü
- [Termal & Kaplıca](${SITE}/termal): su analizi, havuz, kaplıca
- [Has Hamam](${SITE}/hamam): hamam ritüeli, hizmetler, seans düzeni, konum
- [Odalar](${SITE}/odalar): oda tipleri ve donanım
- [İmkanlar](${SITE}/imkanlar): tesis olanakları
- [Hakkımızda](${SITE}/hakkimizda): 45 yıllık işletme hikâyesi
- [İletişim](${SITE}/iletisim): adres, telefon, harita
`;

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);

console.log('Generated sitemap.xml, robots.txt, llms.txt');
