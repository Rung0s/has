# Otel Fabrikası — Hazır Tarayıcı Snippet'leri (kopyala-çalıştır)

In-app tarayıcıda (`mcp__Claude_Browser__javascript_tool`, `action:javascript_exec`) çalıştır.
Her otelde SIFIRDAN türetme — buradan al. Faz 1'i tek tur browser ile bitirmek için sıra:
**Obilet → Etstur (Galeri aç) → Google Maps → resmi site (varsa).**

## 1) Obilet otel sayfası — açıklama + politika + özet + ilk yorumlar
`get_page_text` yeter (tüm metni verir). Foto için:
```js
Array.from(new Set(Array.from(document.images).map(i=>i.src)
 .filter(s=>s.includes('cloudfront')&&/product/.test(s)))).slice(0,60)
```
> Obilet CDN deseni: `d3m404n3ahyqc3.cloudfront.net/images/product/1/2/0/2/2/{ID}/{slug}_{ID}.jpg` —
> ID'ler ARDIŞIK; görünen ID aralığını curl'le indir. Komşu-otel/placeholder sızabilir → montaj+gözle ayıkla.
"Tüm Tesis Özelliklerini Göster" / "Tüm yorumları göster" tıkla:
```js
var x='Tüm yorumları göster';var e=[...document.querySelectorAll('a,button,span,div')].filter(n=>n.textContent.trim()===x);e.length&&e[e.length-1].click();'n='+e.length
```

## 2) Etstur — GALERİ görselleri (EN İYİ kaynak, odamax CDN, yüksek çöz.)
Sayfada `Galeri (NN)` linkine tıkla, sonra benzersiz dosya-key'leri topla:
```js
var e=[...document.querySelectorAll('a,button,span,div,p')].filter(n=>/^Galeri \(\d+\)$/.test(n.textContent.trim()));e.length&&e[e.length-1].click();'clicked '+e.length
```
```js
var s=new Set();document.querySelectorAll('img').forEach(i=>{var u=i.currentSrc||i.src;var m=u.match(/upload\/([^\/]+\.jpg)/);if(m&&/odamax/.test(u))s.add(m[1])});[...s].join('\n')
```
> İndirme (bash): her key için `https://images.odamax.com/imgproxy/img/1600x1200/odamax/image/upload/{KEY}`
> (1600x1200 en yüksek; 300x300 thumb'ları ELE). Oda tipleri + m² için `get_page_text`.
Oda/özellik açılır butonları:
```js
['2 Oda Tipi Daha Gör','Bu Tesisin Tüm Özelliklerini Gör'].forEach(x=>{var e=[...document.querySelectorAll('a,button,span,div,p')].filter(n=>n.textContent.trim()===x);e.length&&e[e.length-1].click();})
```

## 3) Google Maps — telefon, adres, puan, CID, koordinat
`https://www.google.com/maps/search/<Otel+Adı+Şehir>` → `get_page_text` (adres/tel/puan/site verir).
"Sunulan diğer olanakları görüntüle" tıkla → olanak listesi. URL'den koordinat + CID:
```js
location.href   // .../@LAT,LNG,17z/data=...!1s0xHEX:0xHEX2... → CID = BigInt('0x'+HEX2).toString()
```
> CID → `map_url`/`review_url`: `https://www.google.com/maps?cid=<DECIMAL>`. share.google kısa linki AÇILMAZ, direkt Maps ara.
> TUZAK: "resmi site" başka otel olabilir — doğrula.

## 4) Resmi site (varsa) — metin + görsel + logo + sosyal
```js
({nav:[...document.querySelectorAll('a')].map(a=>a.textContent.trim()+' | '+a.href).filter((v,i,s)=>s.indexOf(v)===i),
  header:document.querySelector('header')?.innerText, footer:document.querySelector('footer')?.innerText,
  imgs:[...document.querySelectorAll('img')].map(i=>(i.currentSrc||i.src)+' :: '+(i.alt||'')),
  bg:[...new Set([...document.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(b=>/url\(/.test(b)))].slice(0,15)})
```
> Logo genelde `/images/logo*.png` (beyaz/şeffaf) — prep-images bunu hem koyu hem açık varyanta çevirir.

## 5) QA — TEK ÇAĞRIDA tüm kontroller (site localhost'ta açıkken)
```js
(()=>{var t=document.body.innerText;return{
 title:document.title, h1:document.querySelector('h1')?.innerText,
 sections:[...document.querySelectorAll('section')].map(s=>s.id).filter(Boolean),
 eskiMarka:(t.match(/konuk|emsa/gi)||[]).length,          // 0 olmalı
 broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),
 overflow:document.documentElement.scrollWidth>window.innerWidth+2,
 roomTitles:[...document.querySelectorAll('#rooms h3')].map(h=>h.innerText),
 phones:[...document.querySelectorAll('a[href^="tel"]')].map(a=>a.getAttribute('href')).filter((v,i,s)=>s.indexOf(v)==i),
 wa:[...document.querySelectorAll('a')].map(a=>a.href).filter(h=>h.includes('wa.me'))[0],
 accent:getComputedStyle(document.querySelector('footer')).backgroundColor
}})()
```
Rota + görsel 200 kontrolü (fetch):
```js
(async()=>{var r={};for(const p of ['/odalar','/hakkimizda','/imkanlar','/bloglar','/iletisim','/blog/1','/hero-1.webp','/logo-dark.webp','/rooms/business-1.webp','/og-image.png']){r[p]=(await fetch(p)).status;}return r;})()
```
> Ekran görüntüsü aracı bu makinede TAKILIR (30s timeout) — yukarıdaki DOM/fetch snippet'leriyle doğrula. resize_window (mobile) + overflow kontrolü çalışır.
