import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, ArrowLeft, Info } from 'lucide-react';
import clientData from '../data/client.json';
import config from '../data/site-config.json';
import FAQ from '../components/FAQ';

const pricing = config.pricing || {};
const hamamRows = (pricing.hamam || []).filter((r) => r.name);
const roomRows = (pricing.rooms || []).filter((r) => r.name);
const hasHamamPrices = hamamRows.some((r) => r.price);
const hasRoomPrices = roomRows.some((r) => r.from);

const fiyatFaq = [
  {
    q: 'Eskişehir hamam fiyatları ne kadar?',
    a: 'Has Hamam’da kese, köpük masajı ve masaj hizmetlerinin ücretleri dönemsel olarak güncellenir. Güncel liste için 0530 433 85 87 numarasını arayabilir veya WhatsApp’tan yazabilirsiniz; fiyat bilgisi aynı gün paylaşılır.',
  },
  {
    q: 'Otel fiyatına neler dâhil?',
    a: 'Standart konaklama fiyatına açık büfe kahvaltı (08:00–10:00), termal havuz kullanımı, ücretsiz Wi-Fi ve otopark dâhildir. Talep hâlinde kahvaltısız (sadece oda) fiyat da verilir.',
  },
  {
    q: 'Fiyatlar kişi başı mı, oda başı mı?',
    a: 'Fiyatlandırma oda ve gece bazlıdır; kişi sayısına göre değişir. Tek kişilik konaklamada farklı fiyat uygulanır, rezervasyon sırasında belirtmeniz yeterlidir.',
  },
  {
    q: 'Grup ve uzun konaklamada indirim var mı?',
    a: 'Evet. Şirket, eğitim grubu ve haftalık/aylık konaklamalarda döneme özel fiyat çalışılır. Kişi sayısı ve tarih aralığını ileterek teklif isteyebilirsiniz.',
  },
  {
    q: 'Ödeme nasıl yapılır?',
    a: 'Nakit ve kartla ödeme yapılabilir; kurumsal faturalı konaklama mümkündür. Ön ödeme koşulları döneme göre değişir, rezervasyon görüşmesinde bildirilir.',
  },
];

const FiyatlarPage = () => {
  const wa = `https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Merhaba, güncel oda ve hamam fiyatları hakkında bilgi alabilir miyim?'
  )}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.hastermalotel.com/fiyatlar',
        name: 'Fiyatlar ve hizmet kapsamı — Has Termal Otel & Has Hamam',
        description:
          'Has Termal Otel konaklama ve Has Hamam hizmetlerinin kapsamı, fiyata neyin dâhil olduğu ve güncel fiyat alma yolları.',
        about: { '@id': 'https://www.hastermalotel.com/#hotel' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Fiyatlar', item: 'https://www.hastermalotel.com/fiyatlar' },
        ],
      },
    ],
  };

  const included = [
    ['Konaklama fiyatına dâhil', ['Açık büfe kahvaltı (08:00–10:00)', 'Kapalı termal havuz kullanımı', 'Ücretsiz Wi-Fi', 'Otopark', 'Günlük oda temizliği']],
    ['Ek ücretli hizmetler', ['Has Hamam kese ve köpük masajı', 'Masaj', 'Kahvaltısız konaklamada ek kahvaltı talebi']],
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Fiyatlar & Hizmet Kapsamı | Has Termal Otel</title>
        <meta
          name="description"
          content="Konaklama ve Has Hamam kese-köpük fiyatları: fiyata neler dâhil, hangi hizmetler ek ücretli. Güncel fiyat için 0530 433 85 87."
        />
        <meta name="keywords" content="Eskişehir hamam fiyatları, Has Hamam fiyat, Eskişehir termal otel fiyatları, kese köpük fiyatı Eskişehir, Odunpazarı otel fiyat" />
        <link rel="canonical" href="https://www.hastermalotel.com/fiyatlar" />
        <meta property="og:title" content="Fiyatlar & Hizmet Kapsamı | Has Termal Otel" />
        <meta property="og:description" content="Fiyata neler dâhil, hangi hizmetler ek ücretli — ve güncel fiyatı nasıl alırsınız." />
        <meta property="og:url" content="https://www.hastermalotel.com/fiyatlar" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <header className="pt-32 pb-12 bg-primary text-secondary">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05]">Fiyatlar ve hizmet kapsamı</h1>
          <p className="mt-5 text-secondary/80 leading-relaxed max-w-2xl">
            Konaklama fiyatına açık büfe kahvaltı ve termal havuz kullanımı dâhildir; Has Hamam’ın kese ve
            köpük hizmetleri ek ücretlidir. Fiyatlar sezona ve doluluğa göre değiştiği için güncel rakamı
            telefonla ya da WhatsApp’tan paylaşıyoruz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <MessageCircle size={18} /> Güncel fiyat sor
            </a>
            <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> {clientData.phone}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <section className="mb-12 grid sm:grid-cols-2 gap-5">
          {included.map(([title, list]) => (
            <div key={title} className="rounded-3xl border border-primary/10 bg-secondary/60 p-6">
              <h2 className="font-semibold text-primary text-lg mb-3">{title}</h2>
              <ul className="space-y-2 text-sm text-primary/75">
                {list.map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-accent">•</span> {x}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-primary mb-5">Has Hamam hizmetleri</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/15">
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Hizmet</th>
                  <th className="py-3 text-xs uppercase tracking-widest text-primary/50 font-semibold">Ücret</th>
                </tr>
              </thead>
              <tbody>
                {hamamRows.map((r) => (
                  <tr key={r.name} className="border-b border-primary/10">
                    <td className="py-3 pr-4 text-primary">{r.name}</td>
                    <td className="py-3 text-primary/70">{r.price || 'Güncel fiyat için arayın'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-primary mb-5">Oda tipleri</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/15">
                  <th className="py-3 pr-4 text-xs uppercase tracking-widest text-primary/50 font-semibold">Oda</th>
                  <th className="py-3 text-xs uppercase tracking-widest text-primary/50 font-semibold">Gecelik başlangıç</th>
                </tr>
              </thead>
              <tbody>
                {roomRows.map((r) => (
                  <tr key={r.name} className="border-b border-primary/10">
                    <td className="py-3 pr-4 text-primary">{r.name}</td>
                    <td className="py-3 text-primary/70">{r.from || 'Tarihe göre değişir — sorun'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {!(hasHamamPrices && hasRoomPrices) && (
          <div className="flex items-start gap-3 rounded-2xl bg-secondary border border-primary/10 p-5 text-sm text-primary/75">
            <Info size={18} className="text-accent shrink-0 mt-0.5" />
            <p>
              Fiyatlar sezona, doluluğa ve konaklama süresine göre değiştiği için sabit liste yayınlamıyoruz.
              Tarihinizi iletin, aynı gün net fiyat dönelim:{' '}
              <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">{clientData.phone}</a>{' '}
              ya da <Link to="/rezervasyon" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">rezervasyon formu</Link>.
              {pricing.updated ? ` Son güncelleme: ${pricing.updated}.` : ''}
            </p>
          </div>
        )}
      </main>

      <FAQ items={fiyatFaq} title="Fiyatlar hakkında sık sorulanlar" eyebrow="Fiyat SSS" />
    </div>
  );
};

export default FiyatlarPage;
