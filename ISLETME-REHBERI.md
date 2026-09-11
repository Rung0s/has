# Has Termal Otel — İşletme Tarafı Yapılacaklar

Sitede kodla yapılabilecek her şey tamamlandı. Aşağıdakiler otel tarafında (hesap, çekim,
telefon) yapılması gereken, doğrudan getirisi olan işler. Sıra, getiriye göre.

---

## 1. Siteyi yayına alma (en kritik)

Bugün `www.hashotel.com` eski barındırmada (Apache) duruyor ve kök adreste webmail arayüzü
dönüyor. Yeni site GitHub'da (`Rung0s/has`) ve Vercel projesi (`has-termal-hotel`) bağlı.

Yapılacaklar:
1. Alan adının DNS kayıtlarını Vercel'e yönlendir (Vercel > Project > Domains ekranındaki
   A / CNAME kayıtları).
2. `www` ve kök alan adının ikisini de ekle, kök → `www` yönlendirmesi açık olsun.
3. **Önemli:** Vercel'in kendi build ortamında Chrome olmadığı için `prerender.js` orada
   atlanır. AI tarayıcılarının (ChatGPT, Perplexity, Claude) sayfaları okuyabilmesi için
   yayınları şu şekilde alın:
   ```bash
   npm i -g vercel
   npm run build
   vercel deploy --prebuilt --prod
   ```
   Böylece 19 sayfa statik HTML olarak yayınlanır.
4. Eski sitedeki adresler için 301 yönlendirme listesi çıkarılmalı (varsa `/iletisim.html`
   gibi eski dosya adları).

## 2. Google Search Console doğrulaması

DNS TXT yöntemi başarısız oldu. En hızlısı HTML etiketi yöntemi:
Search Console > Mülk ekle > URL öneki > HTML etiketi → verilen
`<meta name="google-site-verification" content="...">` değerini bana ilet, `index.html`'e
ekleyip yayına alalım. Doğrulandıktan sonra Site Haritaları ekranına `sitemap.xml` yazın.

Ayrıca Bing Webmaster Tools'a da aynı siteyi ekleyin (Copilot görünürlüğü Bing indeksinden
besleniyor).

## 3. Has Hamam için ayrı Google Business Profile

Şu an hamamın kendi Maps kaydı yok; "Eskişehir hamam" aramasında harita paketinde
görünmüyorsunuz. Bu, sitedeki en büyük tek kazanç fırsatı.

- Kategori: **Hamam / Turkish bath** (birincil), ikincil: Spa, Masaj salonu
- İşletme adı: **Has Hamam**
- Adres: Deliklitaş Mah. Hamamyolu Cad. No:7, Odunpazarı / Eskişehir
- Telefon: 0530 433 85 87
- Web sitesi: `https://www.hashotel.com/hamam`
- Açıklama (kopyalayıp yapıştırın):
  > Has Hamam, Eskişehir Odunpazarı'nda Hamamyolu Caddesi No:7'de, Has Termal Otel binası
  > içinde ayrı girişiyle hizmet veren geleneksel bir Türk hamamıdır. Göbek taşı, kese ve
  > köpük masajı sunar; kurnaları 42°C sıcaklığındaki termomineral suyla beslenir. Otelde
  > konaklamayan misafirler de gelebilir. Salı günleri hanım misafirlere ayrılmıştır.
- Hizmetler: Kese, Köpük masajı, Masaj, Termal kurna kullanımı
- Çalışma saatleri ve kadın/erkek günleri mutlaka girilsin.

## 4. Otelin Google Business Profile'ını besleme

1527 yorumluk güçlü bir profil var ama yönetilmiyor. Aylık rutin:
- Haftada 1 fotoğraf (oda, kahvaltı, hamam, dış cephe)
- Ürünler/Hizmetler: Termal havuz, Has Hamam, Kurumsal konaklama, Aile Suit Oda
- Soru-Cevap bölümüne sitedeki SSS sorularını kendiniz sorup cevaplayın
- Web sitesi bağlantısını UTM'li kullanın:
  `https://www.hashotel.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- Yorumların tamamına cevap yazın (özellikle olumsuzlara, savunmasız ve çözüm odaklı).

## 5. Yorum toplama akışı

- Resepsiyonda QR kodlu küçük bir kart: "Google'da değerlendirin".
- Çıkıştan 2 saat sonra WhatsApp'tan tek cümlelik mesaj + yorum linki.
- Hedef: ayda +25 yorum, 4.2 olan puanı 4.5 bandına taşımak. Harita sıralamasında
  puan ve yorum tazeliği doğrudan etkili.

## 6. Fotoğraf çekimi (yarım gün)

Sitedeki en büyük içerik açığı görsel. Çekim listesi:
- **Termal havuz** (şu an sitede havuz fotoğrafı yok — metinler havuzdan bahsediyor,
  bu tutarsızlık giderilmeli)
- Hamam sıcaklık bölümü ve göbek taşı (mevcut tek kare soyunmalık ağırlıklı)
- Kahvaltı masası, açık büfe detayları
- Her oda tipinden 2 kare + banyo (jakuzili odadan ayrı kare)
- Resepsiyon, giriş, gece dış cephe
- Dikey (9:16) 8-10 kısa klip → Reels/Shorts için

## 7. Fiyat bilgisi

`/fiyatlar` sayfası hazır ve rakam girilene kadar "arayın" diyor.
Rakamları verirseniz `src/data/site-config.json` > `pricing` alanına işleyip yayınlıyorum:
- Hamam: giriş, kese, kese+köpük, masaj
- Odalar: oda tipi başına gecelik başlangıç fiyatı
"Eskişehir hamam fiyatları" araması yüksek hacimli; rakam yayınlamak sıralamada ve
AI yanıtlarında ciddi fark yaratır.

## 8. GA4 ölçüm kimliği

`analytics.google.com` üzerinden bir GA4 mülkü açıp ölçüm kimliğini (G-XXXXXXXXXX)
iletin; `src/data/site-config.json` > `analytics.ga4` alanına yazıyorum. Site şu an
WhatsApp tıklaması, telefon tıklaması, harita tıklaması ve rezervasyon talebi olaylarını
otomatik gönderecek şekilde hazır — kimlik girilene kadar hiçbir script yüklenmiyor.

## 9. Dış otorite ve alıntı kaynakları

- Eskişehir gezi bloglarına ve yerel haber sitelerine **50. yıl** hikâyesiyle tanıtım
  metni gönderin (Hamamyolu Caddesi'nin adını aldığı hamam geleneği iyi bir açı).
- TripAdvisor, Booking, Otelz gibi profillerde ad-adres-telefon bilgisini birebir aynı
  yazın (0530 433 85 87 ve Deliklitaş Mah. Hamamyolu Cad. No:7).
- YouTube'a "Türk hamamında kese nasıl yapılır" gibi 2-3 dakikalık video; açıklamaya
  site linki. AI asistanları video metnini okuyor.

## 10. Aylık takip rutini

- Search Console: tıklama/gösterim, en çok gösterilen sorgular, kapsam hataları
- GA4: WhatsApp ve telefon tıklama sayısı, en çok dönüşüm getiren sayfa
- AI görünürlük testi: 20 hedef sorguyu ChatGPT, Perplexity ve Google'da 3'er kez sorup
  "kaç seferde anıldık" oranını not edin. Örnek sorgular:
  - "Eskişehir'de termal otel önerir misin"
  - "Eskişehir şehir merkezinde hamam nerede var"
  - "Odunpazarı'na yakın otel"
  - "Eskişehir'de kaplıcası olan otel"
- İçerik ritmi: ayda 2 blog + 1 sayfa güncelleme (fiyat, sezon, seans saatleri)

---

## Teyit bekleyen bilgiler

1. **Termal havuz hâlâ hizmette mi?** Sitede havuz metinleri duruyor ama fotoğraf yok.
2. **Kaplıca, termal havuzdan ayrı bir bölüm mü?** Metinler ikisini ayrı sayıyor.
3. Hamam ve oda fiyatları
4. Hamamın güncel seans saatleri (kadın/erkek günleri, açılış-kapanış)
