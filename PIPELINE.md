# Otel Sitesi Fabrikası — Faz Faz Akış

Her otel için tekrarlanan, her fazın sonunda onay beklenen akış. Şablon: `hotel-template/`.
Çalışma verisi: `hotels/<slug>/`. Bitmiş site: `sites/<slug>/` (şablon klonu).

| Faz | Ne yapılır | Çıktı | Denetim |
|---|---|---|---|
| **1 — Çekme** | ETS/Agoda/Tatilbudur/Obilet linkleri tarayıcıda açılır; ad, adres, telefon, oda tipleri, olanaklar, check-in/out, puan, foto URL'leri toplanır | `hotels/<slug>/raw-scrape.json` | ✋ Ham veri gösterilir |
| **2 — Normalize** | Ham veri → 5 JSON şeması (TR/EN). Çelişkili/eksik alanlar `⚠ DOĞRULANMALI` işaretlenir | `hotels/<slug>/data/*.json` | ✋ Şema + eksikler |
| **3 — Görsel** | Foto URL'leri indirilir → webp → `public/` + `public/rooms/` | webp dosyalar | ✋ Görsel seti |
| **4 — Klonla & Bağla** | `hotel-template` → `sites/<slug>/`; data yazılır; gömülü metinler (FILL-GUIDE §2) değiştirilir; tema ayarlanır | Çalışan proje | — |
| **5 — Önizleme & QA** | `npm i && npm run dev`; tarayıcıda masaüstü + mobil kontrol; `grep -rin emsa` boş | Önizleme + ekran görüntüsü | ✋ Görsel onay |
| **6 — Deploy** | Vercel/Netlify; domain + sitemap + robots | Canlı URL | ✋ Yayın onayı |

### Kural (Emsa dış-kaynak denetiminden)
Booking sitelerinde çelişkili olan alanlar (evcil hayvan, transfer, kahvaltı, fiyat, check-in) **müşteriden onaylanmadan siteye yazılmaz** — `⚠ DOĞRULANMALI` olarak işaretlenir.
