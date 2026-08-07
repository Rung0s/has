# Hotel Template — Doldurma Kılavuzu

Bu şablon **Emsa Otel** sitesinden generic'leştirildi (Vite + React 19 + Tailwind 4 + framer-motion + i18n + SEO).
Yeni bir otel için bu klasörü kopyala, sonra aşağıdaki yerleri doldur. `__BUYUK_HARF__` tokenları placeholder'dır.

Stack: `npm install` → `npm run dev` (Vite) → `npm run build` (sitemap + build).

> ⚡ **Hızlı yol / token tasarrufu:** Sıfırdan kurma. `tools/` içindeki hazır scriptleri kullan:
> `tools/prep-images.cjs` (görsel üretimi — CONFIG düzenle), `tools/montage.cjs` (foto ayıklama),
> `tools/scrape-snippets.md` (Obilet/Etstur/Maps scrape + QA snippet'leri). BookingBar/Gallery/SignatureShowcase
> şablonda HAZIR ve App.jsx'e bağlı. Tam akış: Obsidian `Projeler/Otel Sitesi Fabrikası/01 - Hızlı Kurulum`.

---

## 1) Veri dosyaları — `src/data/` (Faz 2'de scrape'ten otomatik üretilir)

| Dosya | İçerik | Kaynak |
|---|---|---|
| `client.json` | Ad, adres, telefon, WhatsApp, e-posta, sosyal, harita linki | Booking/Google profili |
| `site-config.json` | `theme` renkleri, `policies` (check-in/out, kahvaltı, evcil hayvan), `features` (olanaklar: ikon+açıklama TR/EN), `sections` sırası | Booking olanaklar listesi |
| `items.json` | Odalar dizisi (title, capacity, size, bedType, features, image, gallery, price — hepsi TR/EN) | Booking oda tipleri |
| `testimonials.json` | Misafir yorumları (TR/EN, author, kaynak) | Booking/Google yorumları |
| `blogs.json` | SEO blog yazıları (opsiyonel, `[]` bırakılabilir) | Elle / sonradan |

`features[].icon` = lucide-react ikon adı (ör: `Wifi`, `MapPin`, `Wallet`, `Droplets`, `Sparkles`, `Utensils`, `Coffee`, `ShieldCheck`, `Car`, `Wind`, `Tv`).

---

## 2) Gömülü metinler — elle değiştir (find & replace)

Bu metinler JSON'da DEĞİL, kodda gömülü. Her yeni otelde güncellenmeli.

### `index.html`  (statik SEO — en kritik)
- `<html lang="tr">` — dil
- `GTM-W6Q6MNC` → otelin Google Tag Manager ID'si (yoksa GTM bloğunu sil)
- `<meta name="description">`, `keywords`, `geo.placename` (`Maltepe, İstanbul`)
- Open Graph + Twitter: `og:url`, `og:title`, `og:description`, `og:image`, `twitter:*`
- `<title>`
- Domain her yerde: `https://emsaotel.com` / `https://www.emsaotel.com`

### `src/App.jsx` (~satır 50-55) — ana sayfa SEO
`<title>`, `description`, `keywords`, `canonical`, `og:title`, `og:description`.

### `src/pages/` — her sayfada `<title>`, `description`, `canonical`:
- `AboutPage.jsx` (27-29) + gömülü hakkımızda metni (42-43, 74-85) + görsel `/emsaotel.webp`
- `AmenitiesPage.jsx` (13-15)
- `BlogList.jsx` (16-18)
- `BlogPost.jsx` (34-37) — canonical/title base domain

### `src/components/`
- `AboutSection.jsx` — hakkımızda hikaye metni TR (54) + EN (58), görsel `/emsaotel.webp` (105), alt metinler (31, 106)
- `LocationMap.jsx` (13) — Google Maps embed URL (`hotel:` alanı)
- `RoomCard.jsx` (70, 163) — logo alt metni (`/logo.webp`)
- `Testimonials.jsx` (76) — görsel `/resepsiyon.webp` + alt

### `src/locales/tr/translation.json` + `src/locales/en/translation.json`
Aynı anahtarları iki dilde de değiştir:
- `hero.*` — slogan/başlık
- `about.title`, `about.subtitle`, `about.description`, `about.years`, `about.rate` ...
- `about_section.heading`, `about_section.description`, oran/tecrübe sayıları
- `location.*` — **otelin yakın çevre noktaları** (`marmaray_station`, `coast`, `airport`, `bagdat_avenue` vb. → otelin gerçek yakın noktaları)
- `footer.description`

---

## 3) Görseller — `public/` (Faz 3'te booking fotolarından üretilir, webp)

| Dosya | Ne |
|---|---|
| `logo.webp` | Otel logosu (mix-blend-multiply ile kullanılıyor → tercihen beyaz/şeffaf zemin) |
| `emsaotel.webp` | Dış cephe / bina görseli (About) — **yeni otel adıyla yeniden adlandır veya içeriği değiştir** |
| `hotel-view.webp` | Genel görünüm |
| `resepsiyon.webp` | Resepsiyon (Testimonials arka planı) |
| `og-image.png` | Sosyal paylaşım görseli (1200×630) |
| `hero-*` (src/assets) | Hero arka planı — `src/components/Hero.jsx` içinden import |
| `favicon*.png`, `apple-touch-icon.png` | Favicon seti |
| `rooms/*.webp` | Oda fotoğrafları — `items.json`'daki `image`/`gallery` yolları ile eşleşmeli |

Görsel dönüştürme: `node convert_images.js` (jpg/png → webp, `public/` ve `public/rooms/`).

---

## 4) Domain & SEO altyapısı
- `generate-sitemap.js` (34, 43) — domain
- `public/robots.txt` (4) — sitemap URL
- `public/sitemap.xml` — tüm `<loc>` domainleri (build'de `generate-sitemap.js` üretir)
- `vercel.json` — generic (WordPress redirect hijyeni + SPA rewrite), dokunmaya gerek yok

---

## Hızlı kontrol: kalan "emsa" var mı?
```bash
grep -rin "emsa" src index.html generate-sitemap.js public/robots.txt public/sitemap.xml
```
Sonuç boş olmalı (blogs.json hariç — o zaten yeniden yazılır).
