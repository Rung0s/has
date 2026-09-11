import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, Briefcase, Coffee, Building2, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import clientData from '../data/client.json';
import FAQ from '../components/FAQ';

const kurumsalFaq = [
  {
    q: 'Eskişehir’de toplantı yapılabilecek merkezi otel var mı?',
    a: 'Has Termal Otel’in geniş kafeterya ve kahvaltı salonu; iş görüşmeleri, küçük şirket toplantıları, eğitim grupları ve kalabalık aile buluşmaları için Hamamyolu Caddesi üzerinde merkezi bir alan sunar. Ayrıntı ve müsaitlik için 0530 433 85 87.',
  },
  {
    q: 'Grup konaklamada indirim uygulanıyor mu?',
    a: 'Grup, şirket ve uzun süreli konaklamalarda kuruma özel fiyat çalışılır. Kişi sayısı, tarih aralığı ve kahvaltı tercihinizi ileterek teklif isteyebilirsiniz.',
  },
  {
    q: 'Kaç kişilik gruplar ağırlanabiliyor?',
    a: '48 odalı tesisimizde standart, iki ayrı yataklı, 3 kişilik ve Aile Suit Oda tipleri bulunur; bu esneklik sayesinde farklı büyüklükteki ekipler tek çatı altında konaklayabilir. Kesin kapasite için tarih vererek teyit almanız gerekir.',
  },
  {
    q: 'Faturalı kurumsal konaklama mümkün mü?',
    a: 'Evet, kurumsal faturalı konaklama yapılabilir. Şirket bilgilerinizi rezervasyon sırasında iletmeniz yeterlidir.',
  },
  {
    q: 'Eğitim ve seminer grupları için uygun mu?',
    a: 'Şehir merkezindeki konum, tramvay ve YHT bağlantısı ile eğitim, sınav ve seminer grupları için elverişlidir. Konaklama sonrası termal havuz ve Has Hamam kullanımı ekiplerin dinlenmesini kolaylaştırır.',
  },
];

const KurumsalPage = () => {
  const wa = `https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Merhaba, kurumsal / grup konaklama ve toplantı için teklif alabilir miyim?'
  )}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.hastermalotel.com/kurumsal#service',
        name: 'Kurumsal ve grup konaklama, toplantı alanı',
        serviceType: 'Kurumsal konaklama ve toplantı',
        provider: { '@id': 'https://www.hastermalotel.com/#hotel' },
        areaServed: { '@type': 'City', name: 'Eskişehir' },
        description:
          'Eskişehir Odunpazarı Hamamyolu Caddesi’nde şirket toplantıları, eğitim grupları ve kalabalık aile buluşmaları için kafeterya alanı ve 48 odalı kurumsal konaklama imkânı.',
        audience: { '@type': 'BusinessAudience', name: 'Şirketler, eğitim kurumları, gruplar' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Kurumsal & Grup', item: 'https://www.hastermalotel.com/kurumsal' },
        ],
      },
    ],
  };

  const blocks = [
    { icon: Coffee, title: 'Kafeterya & kahvaltı salonu', text: 'Geniş, aydınlık salon; iş görüşmeleri ve grup buluşmaları için gün boyu sıcak-soğuk ikram servisiyle kullanılabilir.' },
    { icon: Users, title: 'Grup konaklama', text: '48 oda; standart, iki ayrı yataklı, 3 kişilik ve Aile Suit Oda seçenekleriyle farklı ekip büyüklüklerine uygun.' },
    { icon: Briefcase, title: 'Kurumsal fatura & anlaşma', text: 'Şirketlere özel fiyat çalışması, faturalı konaklama ve tekrarlayan konaklamalar için anlaşma imkânı.' },
    { icon: Building2, title: 'Merkezi konum', text: 'Hamamyolu Caddesi; çarşı kapının önünde, YHT Garı 1,7 km, tramvay ve otopark erişimi kolay.' },
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Kurumsal & Grup Konaklama | Has Termal Otel Eskişehir</title>
        <meta
          name="description"
          content="Eskişehir merkezde kurumsal konaklama ve toplantı alanı: kafeterya salonu, 48 oda, faturalı konaklama, gruba özel fiyat. Teklif: 0530 433 85 87."
        />
        <meta name="keywords" content="Eskişehir kurumsal otel, grup konaklama Eskişehir, toplantı salonu Eskişehir, şirket konaklaması, eğitim grubu oteli, faturalı konaklama Eskişehir" />
        <link rel="canonical" href="https://www.hastermalotel.com/kurumsal" />
        <meta property="og:title" content="Kurumsal & Grup Konaklama | Has Termal Otel" />
        <meta property="og:description" content="Şirket toplantıları ve grup konaklamaları için Eskişehir merkezde kafeterya salonu ve 48 oda." />
        <meta property="og:image" content="https://www.hastermalotel.com/signature-2.webp" />
        <meta property="og:url" content="https://www.hastermalotel.com/kurumsal" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <header className="relative pt-32 pb-16 bg-primary text-secondary">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            Şirketler · Eğitim grupları · Aile buluşmaları
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Toplantılarınız ve grup konaklamanız için uygun adres
          </h1>
          <p className="mt-6 text-lg text-secondary/80 leading-relaxed max-w-3xl">
            Has Termal Otel, Eskişehir’in tam merkezinde 48 odası ve geniş kafeterya salonuyla şirket
            toplantıları, eğitim grupları, sınav dönemleri ve kalabalık aile buluşmaları için elverişli bir
            adrestir. Kurumsal faturalı konaklama yapılır; grup ve uzun süreli konaklamalarda kuruma özel
            fiyat çalışılır.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <MessageCircle size={18} /> Teklif iste
            </a>
            <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> {clientData.phone}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <figure className="rounded-[28px] overflow-hidden mb-14">
          <img
            src="/signature-2.webp"
            alt="Has Termal Otel kafeterya ve kahvaltı salonu — toplantı ve grup buluşmaları için kullanılabilen geniş alan"
            width="1400"
            height="1000"
            className="w-full h-[300px] sm:h-[420px] object-cover"
          />
          <figcaption className="mt-3 text-sm text-primary/50">
            Kafeterya salonu — Hamamyolu Cad. No:7, Odunpazarı / Eskişehir.
          </figcaption>
        </figure>

        <section className="mb-14 grid sm:grid-cols-2 gap-5">
          {blocks.map((b) => (
            <div key={b.title} className="rounded-3xl border border-primary/10 bg-secondary/60 p-6">
              <div className="w-11 h-11 rounded-xl bg-accent/15 grid place-items-center mb-4">
                <b.icon size={20} className="text-accent" />
              </div>
              <h2 className="font-semibold text-primary text-lg mb-2">{b.title}</h2>
              <p className="text-sm text-primary/70 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Teklif için gereken bilgiler</h2>
          <ol className="space-y-3 text-primary/75 leading-relaxed">
            <li><strong className="text-primary">1.</strong> Tarih aralığı ve gece sayısı</li>
            <li><strong className="text-primary">2.</strong> Kişi sayısı ve oda dağılımı (tek/çift/üç kişilik)</li>
            <li><strong className="text-primary">3.</strong> Kahvaltı dâhil mi, hariç mi</li>
            <li><strong className="text-primary">4.</strong> Toplantı alanı ve ikram ihtiyacı</li>
            <li><strong className="text-primary">5.</strong> Fatura bilgileri (kurumsal konaklama için)</li>
          </ol>
          <p className="mt-6 text-primary/70 leading-relaxed">
            Konaklama sonrası ekibinizin dinlenmesi için{' '}
            <Link to="/termal" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">termal havuz</Link> ve{' '}
            <Link to="/hamam" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Has Hamam</Link>{' '}
            aynı binadadır. Ulaşım ayrıntıları için{' '}
            <Link to="/konum" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">konum sayfamıza</Link> bakabilirsiniz.
          </p>
        </section>
      </main>

      <FAQ items={kurumsalFaq} title="Kurumsal konaklama hakkında sık sorulanlar" eyebrow="Kurumsal SSS" />
    </div>
  );
};

export default KurumsalPage;
