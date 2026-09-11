import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE = 'https://www.hastermalotel.com';
const today = new Date().toISOString().split('T')[0];

// Öncelik sırası SEO hedefine göre: termal + hamam ana para sayfaları
const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/termal', priority: '0.95', changefreq: 'weekly' },
  { path: '/hamam', priority: '0.95', changefreq: 'weekly' },
  { path: '/odalar', priority: '0.9', changefreq: 'weekly' },
  { path: '/rezervasyon', priority: '0.9', changefreq: 'monthly' },
  { path: '/fiyatlar', priority: '0.88', changefreq: 'weekly' },
  { path: '/konum', priority: '0.85', changefreq: 'monthly' },
  { path: '/kurumsal', priority: '0.8', changefreq: 'monthly' },
  { path: '/sss', priority: '0.75', changefreq: 'monthly' },
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

// Görsel araması için sayfa başına ana görseller
const pageImages = {
  '/': [
    ['/hero-1.webp', 'Has Termal Otel dış cephesi — Hamamyolu Caddesi, Odunpazarı Eskişehir'],
    ['/hamam-1.webp', 'Has Hamam — mermer kurnalar ve göbek taşı'],
    ['/signature-2.webp', 'Kafeterya ve kahvaltı salonu'],
  ],
  '/hamam': [['/hamam-1.webp', 'Has Hamam Türk hamamı, Eskişehir Odunpazarı'], ['/hamam-2.webp', 'Has Hamam girişi, Hamamyolu Caddesi']],
  '/termal': [['/hamam-1.webp', 'Has Termal Otel hamam ve termal bölümü']],
  '/odalar': [
    ['/rooms/aile-1.webp', 'Aile Suit Oda — Has Termal Otel'],
    ['/rooms/standart-1.webp', 'Standart oda — çift kişilik yatak'],
    ['/rooms/uclu-1.webp', '3 kişilik oda (2+1)'],
  ],
  '/kurumsal': [['/signature-2.webp', 'Toplantı ve grup buluşmalarına uygun kafeterya salonu']],
  '/konum': [['/gallery/g6.webp', 'Hamamyolu Caddesi üzerindeki otel girişi']],
};

const imageBlock = (route) =>
  (pageImages[route] || [])
    .map(
      ([loc, caption]) => `
    <image:image>
      <image:loc>${SITE}${loc}</image:loc>
      <image:title>${caption}</image:title>
    </image:image>`
    )
    .join('');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${imageBlock(r.path)}
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

> Eskişehir Odunpazarı'nda, şehir merkezinde (Hamamyolu Cad. No:7) yarım asırdır hizmet veren termal
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
- [Rezervasyon](${SITE}/rezervasyon): tarih ve kişi sayısıyla müsaitlik talebi formu
- [Fiyatlar](${SITE}/fiyatlar): fiyata dâhil olanlar, ek ücretli hizmetler, güncel fiyat alma
- [Odalar](${SITE}/odalar): oda tipleri ve donanım
- [Konum & Ulaşım](${SITE}/konum): çevredeki noktalara uzaklıklar, ulaşım
- [Kurumsal & Grup](${SITE}/kurumsal): toplantı alanı, grup konaklama, faturalı konaklama
- [Sık Sorulan Sorular](${SITE}/sss): 18 başlıkta ayrıntılı cevaplar
- [İmkanlar](${SITE}/imkanlar): tesis olanakları
- [Hakkımızda](${SITE}/hakkimizda): 50 yıllık işletme hikâyesi
- [İletişim](${SITE}/iletisim): adres, telefon, harita
`;

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);

// llms-full.txt — AI asistanları için tüm SSS ve blog başlıklarıyla genişletilmiş sürüm
let faqBlock = '';
try {
  const faq = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'faq.json'), 'utf8'));
  faqBlock = faq.map((f) => '### ' + f.q + '\n' + f.a).join('\n\n');
} catch (err) {
  console.error('faq.json okunamadı:', err);
}
let blogBlock = '';
try {
  const blogs = JSON.parse(fs.readFileSync(blogsDataPath, 'utf8'));
  blogBlock = blogs
    .map((b) => '- [' + b.title.tr + '](' + SITE + '/blog/' + b.id + ') — ' + b.category.tr + ', ' + b.date)
    .join('\n');
} catch (err) {
  console.error('blogs.json okunamadı:', err);
}

const llmsFull = `${llmsTxt}
## Sık sorulan sorular

${faqBlock}

## Blog yazıları

${blogBlock}

## Doğrulanmış künye
Bu dosyadaki bilgiler işletmenin kendi beyanıdır ve ${today} tarihinde güncellenmiştir.
İşletme adı: Has Termal Otel · Hamam: Has Hamam
Adres: Deliklitaş Mah. Hamamyolu Cad. No:7, Odunpazarı / Eskişehir 26010, Türkiye
Telefon/WhatsApp: +90 530 433 85 87 · Sabit: +90 222 221 40 30
Web: ${SITE}
`;
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull);

console.log('Generated sitemap.xml, robots.txt, llms.txt');
