import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, MapPin, Clock, ArrowLeft, Check } from 'lucide-react';
import clientData from '../data/client.json';
import FAQ from '../components/FAQ';

const hamamFaq = [
  {
    q: 'Eskişehir\'de Türk hamamı nerede var?',
    a: 'Has Hamam, Eskişehir Odunpazarı\'nda Deliklitaş Mahallesi Hamamyolu Caddesi No:7\'de, Has Termal Otel binası içinde ayrı girişiyle hizmet verir. Şehir merkezinde, Odunpazarı Evleri ve çarşıya yürüme mesafesindedir. Bilgi için 0530 433 85 87.',
  },
  {
    q: 'Has Hamam\'a otelde kalmadan gidebilir miyim?',
    a: 'Evet. Has Hamam dışarıdan gelen misafirlere de açıktır; otelde konaklama şartı yoktur. Kese ve köpük masajı hizmetlerinden günübirlik yararlanabilirsiniz.',
  },
  {
    q: 'Hamamda hangi hizmetler veriliyor?',
    a: 'Göbek taşında ısınma, geleneksel kese, köpük masajı ve şifalı termomineral suyla beslenen mermer kurnalar. Talebe göre masaj hizmeti de sunulmaktadır.',
  },
  {
    q: 'Hamam kadınlara hangi gün hizmet veriyor?',
    a: 'Salı günleri hamam ve kaplıca yalnızca hanım misafirlere ayrılır, diğer günler bay misafirlere hizmet verilir. Program dönemsel değişebildiği için gelmeden önce 0530 433 85 87 numarasından teyit alınması önerilir.',
  },
  {
    q: 'Hamam ücreti ne kadar?',
    a: 'Kese, köpük ve masaj gibi hizmetlerin ücretleri dönemsel olarak güncellenir. Güncel fiyat listesi için 0530 433 85 87 numarasını arayabilir veya WhatsApp\'tan yazabilirsiniz.',
  },
  {
    q: 'Hamama giderken ne götürmeliyim?',
    a: 'Peştemal ve temel malzemeler tesiste temin edilir. Yanınızda mayo/bikini, terlik ve kişisel bakım ürünlerinizi getirmeniz yeterlidir. Hamama girmeden önce duş alınması gerekir.',
  },
];

const services = [
  ['Göbek taşı & sıcaklık', 'Mermer göbek taşında ısınma, gözenek açma'],
  ['Kese', 'Deneyimli tellak eşliğinde geleneksel kese'],
  ['Köpük masajı', 'Bol köpüklü klasik hamam köpüğü'],
  ['Termal kurnalar', '42°C kaynaklı termomineral su'],
  ['Masaj', 'Talebe göre ek masaj hizmeti'],
];

const HamamPage = () => {
  const h = clientData.hamam;
  const wa = `https://wa.me/${h.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Merhaba, Has Hamam seans saatleri ve fiyatları hakkında bilgi alabilir miyim?')}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HealthAndBeautyBusiness', 'DaySpa'],
        '@id': 'https://www.hastermalotel.com/hamam#hamam',
        name: 'Has Hamam',
        alternateName: 'Has Termal Otel Türk Hamamı',
        description:
          'Eskişehir Odunpazarı Hamamyolu Caddesi\'nde, Has Termal Otel içinde ayrı girişiyle hizmet veren Türk hamamı. Kese, köpük masajı ve şifalı termomineral su.',
        url: 'https://www.hastermalotel.com/hamam',
        image: 'https://www.hastermalotel.com/hamam-1.webp',
        telephone: '+905304338587',
        priceRange: '₺₺',
        parentOrganization: { '@id': 'https://www.hastermalotel.com/#hotel' },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Deliklitaş Mah. Hamamyolu Cad. No:7',
          addressLocality: 'Odunpazarı',
          addressRegion: 'Eskişehir',
          postalCode: '26010',
          addressCountry: 'TR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: h.coords.lat, longitude: h.coords.lng },
        areaServed: { '@type': 'City', name: 'Eskişehir' },
        hasMap: h.map_url,
        makesOffer: services.map(([name, desc]) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name, description: desc },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Has Hamam', item: 'https://www.hastermalotel.com/hamam' },
        ],
      },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Eskişehir Hamam | Has Hamam — Odunpazarı Türk Hamamı & Kese</title>
        <meta
          name="description"
          content="Eskişehir Odunpazarı Hamamyolu'nda Türk hamamı: Has Hamam. Kese, köpük masajı ve 42°C termomineral su. Dışarıdan misafir kabul edilir. Bilgi: 0530 433 85 87."
        />
        <meta name="keywords" content="Eskişehir hamam, Odunpazarı hamam, Türk hamamı Eskişehir, Has Hamam, Eskişehir kese köpük, Hamamyolu hamam, Odunpazarı Türk hamamı" />
        <link rel="canonical" href="https://www.hastermalotel.com/hamam" />
        <meta property="og:title" content="Has Hamam | Eskişehir Odunpazarı'nda Türk Hamamı" />
        <meta property="og:description" content="Kese, köpük ve termomineral su. Has Termal Otel içinde ayrı girişli Türk hamamı." />
        <meta property="og:image" content="https://www.hastermalotel.com/hamam-1.webp" />
        <meta property="og:url" content="https://www.hastermalotel.com/hamam" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative pt-32 pb-16 bg-primary text-secondary">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            Odunpazarı · Hamamyolu Caddesi
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Eskişehir'de Türk Hamamı: Has Hamam
          </h1>
          <p className="mt-6 text-lg text-secondary/80 leading-relaxed max-w-3xl">
            Has Hamam, Eskişehir Odunpazarı'nda Hamamyolu Caddesi No:7'de, Has Termal Otel binası içinde
            ayrı girişiyle hizmet veren bir Türk hamamıdır. Göbek taşı, kese ve köpük masajı
            sunar; kurnaları 42°C sıcaklığındaki şifalı termomineral suyla beslenir. Otelde
            konaklamayan misafirler de gelebilir.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${h.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <Phone size={18} /> {h.phone}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a href={h.map_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <MapPin size={18} /> Yol tarifi
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <figure className="rounded-[28px] overflow-hidden mb-14">
          <img
            src="/hamam-1.webp"
            alt="Has Hamam'ın mermer kurnaları, göbek taşı ve soyunmalık bölümü — Eskişehir Odunpazarı"
            width="1800"
            height="1100"
            className="w-full h-[300px] sm:h-[460px] object-cover"
          />
          <figcaption className="mt-3 text-sm text-primary/50">
            Has Hamam — mermer kurnalar ve soyunmalık bölümü, Hamamyolu Caddesi No:7, Odunpazarı / Eskişehir.
          </figcaption>
        </figure>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Hamam ritüeli nasıl işler?</h2>
          <ol className="space-y-4 text-primary/75 leading-relaxed">
            <li><strong className="text-primary">1. Isınma:</strong> Göbek taşında 10–15 dakika ısınarak gözenekler açılır, kas gerginliği çözülür.</li>
            <li><strong className="text-primary">2. Kese:</strong> Deneyimli tellak eşliğinde ölü deri tabakası arındırılır; cilt pürüzsüzleşir.</li>
            <li><strong className="text-primary">3. Köpük:</strong> Bol köpüklü masajla temizlik tamamlanır, dolaşım hızlanır.</li>
            <li><strong className="text-primary">4. Durulama:</strong> Termomineral suyla beslenen kurnalarda serinleme ve durulama yapılır.</li>
            <li><strong className="text-primary">5. Dinlenme:</strong> Ritüel sonrası soyunmalıkta çay eşliğinde dinlenilir.</li>
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Hizmetler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/15">
                  <th className="py-3 pr-4 text-sm uppercase tracking-widest text-primary/50 font-semibold">Hizmet</th>
                  <th className="py-3 text-sm uppercase tracking-widest text-primary/50 font-semibold">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {services.map(([name, desc]) => (
                  <tr key={name} className="border-b border-primary/10">
                    <td className="py-4 pr-4 font-medium text-primary whitespace-nowrap">
                      <span className="inline-flex items-center gap-2"><Check size={16} className="text-accent" /> {name}</span>
                    </td>
                    <td className="py-4 text-primary/70">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-primary/55">
            Güncel seans saatleri ve ücretler için {h.phone} numarasını arayabilirsiniz.
          </p>
        </section>

        <section className="mb-14 rounded-3xl bg-secondary p-6 sm:p-8 border border-primary/10">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 flex items-center gap-3">
            <Clock size={22} className="text-accent" /> Kadın & erkek seans düzeni
          </h2>
          <p className="text-primary/75 leading-relaxed">
            Salı günleri hamam ve kaplıca yalnızca hanım misafirlerimize ayrılmıştır; haftanın diğer
            günlerinde bay misafirlerimize hizmet verilir. Program dönemsel olarak değişebildiğinden,
            gelmeden önce <a href={`tel:${h.phone.replace(/\s/g, '')}`} className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">{h.phone}</a> numarasından
            teyit almanızı öneririz.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Konum ve ulaşım</h2>
          <p className="text-primary/75 leading-relaxed mb-6">
            Adres: <strong className="text-primary">Deliklitaş Mah. Hamamyolu Cad. No:7, Odunpazarı / Eskişehir</strong>.
            Hamamyolu Caddesi, adını yüzyıllardır bu bölgede süren hamam geleneğinden alır. Odunpazarı Evleri,
            Cam Sanatları Müzesi, Haller Gençlik Merkezi ve Eskişehir çarşısı yürüme mesafesindedir.
            Termal konaklama ile birlikte planlamak isteyenler için{' '}
            <Link to="/termal" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">termal havuz ve kaplıca sayfamıza</Link>{' '}
            ya da <Link to="/odalar" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">odalarımıza</Link> göz atabilirsiniz.
          </p>
          <div className="rounded-3xl overflow-hidden border border-primary/10">
            <iframe
              title="Has Hamam konumu — Hamamyolu Caddesi No:7, Odunpazarı / Eskişehir"
              src={h.map_embed}
              className="w-full h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <FAQ items={hamamFaq} title="Has Hamam hakkında sık sorulanlar" eyebrow="Hamam SSS" />
    </div>
  );
};

export default HamamPage;
