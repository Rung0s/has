import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Navigation, Train, Bus, Car, ArrowLeft } from 'lucide-react';
import clientData from '../data/client.json';
import poi from '../data/poi.json';
import FAQ from '../components/FAQ';

const konumFaq = [
  {
    q: 'Odunpazarı Evleri’ne yakın otel hangisi?',
    a: 'Has Termal Otel, Odunpazarı Evleri’ne yaklaşık 600 metre (yürüyerek 8 dakika) mesafededir. Otel Deliklitaş Mahallesi Hamamyolu Caddesi No:7’de, tarihi bölgeyle çarşının tam arasında yer alır.',
  },
  {
    q: 'Eskişehir Tren Garı’na (YHT) en yakın termal otel nerede?',
    a: 'Has Termal Otel, Eskişehir YHT Garı’na yaklaşık 1,7 km uzaklıktadır; taksiyle 5, yürüyerek 20 dakika sürer. Termal havuz ve Türk hamamı otelin içindedir.',
  },
  {
    q: 'Otele araçla gelirsem otopark var mı?',
    a: 'Evet, tesiste otopark imkânı bulunur. Şehir merkezindeki konum sayesinde çoğu misafirimiz aracını bırakıp çarşı, müzeler ve Odunpazarı’nı yürüyerek geziyor.',
  },
  {
    q: 'Havalimanından otele nasıl gelinir?',
    a: 'Eskişehir Hasan Polatkan Havalimanı otele yaklaşık 11 km uzaklıktadır; araçla ortalama 20 dakika sürer. Ankara Esenboğa veya İstanbul’dan gelen misafirler genellikle YHT ile Eskişehir Garı’na inip 5 dakikada otele ulaşır.',
  },
  {
    q: 'Osmangazi ve Anadolu Üniversitesi’ne uzaklık ne kadar?',
    a: 'Anadolu Üniversitesi Yunusemre Kampüsü yaklaşık 4 km (araçla 10 dk), Osmangazi Üniversitesi Meşelik Kampüsü yaklaşık 6 km (araçla 12 dk) mesafededir. Tramvay hattı her ikisine de bağlantı sağlar.',
  },
];

const KonumPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        '@id': 'https://www.hastermalotel.com/konum#place',
        name: 'Has Termal Otel — Konum ve Çevre',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Deliklitaş Mah. Hamamyolu Cad. No:7',
          addressLocality: 'Odunpazarı',
          addressRegion: 'Eskişehir',
          postalCode: '26010',
          addressCountry: 'TR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: '39.7740076', longitude: '30.5193447' },
        hasMap: clientData.map_url,
        containedInPlace: { '@type': 'City', name: 'Eskişehir' },
      },
      {
        '@type': 'ItemList',
        name: 'Has Termal Otel çevresindeki önemli noktalar',
        itemListElement: poi.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'Place', name: p.name, description: `${p.note} Otele uzaklık: ${p.km}.` },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Konum & Ulaşım', item: 'https://www.hastermalotel.com/konum' },
        ],
      },
    ],
  };

  const transport = [
    { icon: Train, title: 'YHT / Tren Garı', text: '1,7 km — taksiyle 5 dk, yürüyerek 20 dk. Ankara ve İstanbul yüksek hızlı tren bağlantısı.' },
    { icon: Bus, title: 'Otogar & tramvay', text: 'Şehirlerarası otogar 4,5 km. Tramvay hattı çarşı ve üniversitelere doğrudan bağlanır.' },
    { icon: Car, title: 'Araçla geliş', text: 'Tesiste otopark mevcut. Ankara 3 saat, İstanbul 4,5 saat, Bursa 2,5 saat sürüş mesafesinde.' },
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Konum & Ulaşım | Odunpazarı Otel — Has Termal Otel</title>
        <meta
          name="description"
          content="Hamamyolu Cad. No:7, Odunpazarı: Odunpazarı Evleri 600 m, Cam Müzesi 800 m, YHT Garı 1,7 km. Çarşı kapının önünde, otopark mevcut."
        />
        <meta name="keywords" content="Odunpazarı otel, Hamamyolu otel, Eskişehir merkez otel, Odunpazarı Evleri yakın otel, tren garına yakın otel Eskişehir, Eskişehir şehir merkezi konaklama" />
        <link rel="canonical" href="https://www.hastermalotel.com/konum" />
        <meta property="og:title" content="Konum & Ulaşım | Has Termal Otel Eskişehir" />
        <meta property="og:description" content="Odunpazarı Hamamyolu Caddesi No:7 — çarşı, müzeler ve tarihi evler yürüme mesafesinde." />
        <meta property="og:image" content="https://www.hastermalotel.com/gallery/g6.webp" />
        <meta property="og:url" content="https://www.hastermalotel.com/konum" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <header className="relative pt-32 pb-16 bg-primary text-secondary">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            Deliklitaş · Hamamyolu Caddesi No:7
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Konum & Ulaşım: Eskişehir’in tam merkezinde
          </h1>
          <p className="mt-6 text-lg text-secondary/80 leading-relaxed max-w-3xl">
            Has Termal Otel, Eskişehir Odunpazarı’nda Hamamyolu Caddesi No:7’de bulunur. Odunpazarı Evleri
            600 metre, Cam Sanatları Müzesi 800 metre, Porsuk Çayı ve Adalar 1 kilometre mesafededir;
            çarşı otelin kapısının önündedir. YHT Garı’na 1,7 km, otogara 4,5 km uzaklıktayız ve tesiste
            otopark bulunur.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={clientData.map_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <Navigation size={18} /> Yol tarifi al
            </a>
            <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <MapPin size={18} /> {clientData.phone}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">Otele uzaklıklar</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-primary/15">
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Nokta</th>
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Tür</th>
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Mesafe</th>
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Yürüyerek</th>
                  <th className="py-3 text-xs uppercase tracking-widest text-primary/50 font-semibold">Not</th>
                </tr>
              </thead>
              <tbody>
                {poi.map((p) => (
                  <tr key={p.name} className="border-b border-primary/10 align-top">
                    <td className="py-3 pr-4 font-medium text-primary whitespace-nowrap">{p.name}</td>
                    <td className="py-3 pr-4 text-primary/60 whitespace-nowrap">{p.type}</td>
                    <td className="py-3 pr-4 text-primary/80 whitespace-nowrap">{p.km}</td>
                    <td className="py-3 pr-4 text-primary/60 whitespace-nowrap">{p.walk}</td>
                    <td className="py-3 text-primary/70">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">Ulaşım seçenekleri</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {transport.map((tr) => (
              <div key={tr.title} className="rounded-3xl border border-primary/10 bg-secondary/60 p-6">
                <div className="w-11 h-11 rounded-xl bg-accent/15 grid place-items-center mb-4">
                  <tr.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-primary text-lg mb-2">{tr.title}</h3>
                <p className="text-sm text-primary/70 leading-relaxed">{tr.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Harita</h2>
          <div className="rounded-3xl overflow-hidden border border-primary/10">
            <iframe
              title="Has Termal Otel konumu — Hamamyolu Caddesi No:7, Odunpazarı / Eskişehir"
              src={clientData.hamam.map_embed}
              className="w-full h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-6 text-primary/70 leading-relaxed">
            Termal havuz ve kaplıca ayrıntıları için{' '}
            <Link to="/termal" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Termal & Kaplıca</Link>,
            hamam için{' '}
            <Link to="/hamam" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Has Hamam</Link>,
            oda tipleri için{' '}
            <Link to="/odalar" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Odalarımız</Link> sayfasına bakabilirsiniz.
          </p>
        </section>
      </main>

      <FAQ items={konumFaq} title="Konum ve ulaşım hakkında sık sorulanlar" eyebrow="Konum SSS" />
    </div>
  );
};

export default KonumPage;
