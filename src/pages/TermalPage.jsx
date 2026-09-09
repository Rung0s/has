import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, ArrowLeft, Waves, Flame, Bath, Droplets } from 'lucide-react';
import clientData from '../data/client.json';
import FAQ from '../components/FAQ';

const termalFaq = [
  {
    q: 'Eskişehir\'de termal otel hangisi, şehir merkezinde mi?',
    a: 'Has Termal Otel, Eskişehir Odunpazarı Hamamyolu Caddesi No:7\'de, şehrin tam merkezinde bulunan bir termal oteldir. Kapalı termal havuz, kaplıca ve Has Hamam Türk hamamı otelin içindedir; çarşı ve Odunpazarı Evleri yürüme mesafesindedir.',
  },
  {
    q: 'Termal suyun analiz değerleri nedir?',
    a: 'Kaynaktaki termomineral suyun sıcaklığı 42°C, pH değeri 7,3 ve radyoaktivitesi 21,7\'dir. Kapalı termal havuzda su yaklaşık 36°C\'de kullanıma sunulur.',
  },
  {
    q: 'Termal su hangi şikâyetlerde tercih edilir?',
    a: 'Otelin resmî bilgilendirmesine göre bu şifalı sular romatizma, kırık ve çıkık sonrası rahatlama, bel ve sırt ağrıları ile böbrek taşı şikâyetlerinde geleneksel olarak tercih edilir. Kronik rahatsızlığı olanların hekimine danışması önerilir.',
  },
  {
    q: 'Termal havuz konaklamaya dâhil mi?',
    a: 'Konaklayan misafirlerimiz kapalı termal havuzu kullanabilir. Hamam, kese, köpük ve masaj gibi ek hizmetlerin güncel durumu için resepsiyonla ya da 0530 433 85 87 numarasıyla görüşebilirsiniz.',
  },
  {
    q: 'Kaplıca hangi gün kadınlara ayrılıyor?',
    a: 'Salı günleri kaplıca ve hamam yalnızca hanım misafirlere hizmet verir; diğer günler bay misafirlere ayrılmıştır. Program değişebildiği için önceden teyit alınmalıdır.',
  },
  {
    q: 'Odalarda termal banyo var mı?',
    a: 'Seçili odalarımızda jakuzili banyo bulunur; diğer odalarımızda küvetli ya da duşlu özel banyo vardır. Rezervasyon sırasında jakuzili oda talebinizi belirtebilirsiniz. Tüm odalarda klima, uydu TV, minibar ve ücretsiz Wi-Fi standarttır.',
  },
];

const facilities = [
  { icon: Waves, title: 'Kapalı termal havuz', text: 'Yaklaşık 36°C şifalı termomineral suyla dolu kapalı havuz, mevsim fark etmeksizin kullanıma açıktır.' },
  { icon: Flame, title: 'Kaplıca & Türk hamamı', text: 'Geleneksel hamam, kese ve köpük hizmeti; salı günleri hanım misafirlere ayrılan kaplıca programı.' },
  { icon: Droplets, title: 'Kese & köpük masajı', text: 'Hamamda deneyimli tellak eşliğinde geleneksel kese ve bol köpüklü masaj.' },
  { icon: Bath, title: 'Odada jakuzi / küvet', text: 'Seçili odalarda jakuzili banyo; diğer odalarda küvetli ya da duşlu özel banyo.' },
];

const TermalPage = () => {
  const wa = `https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Merhaba, termal havuz ve kaplıca hakkında bilgi alabilir miyim?')}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.hashotel.com/termal',
        name: 'Eskişehir Termal Otel & Kaplıca — Has Termal Otel',
        description:
          'Eskişehir Odunpazarı\'nda 42°C kaynaklı termomineral suyla beslenen kapalı termal havuz, kaplıca ve Has Hamam Türk hamamı. Seçili odalarda jakuzili banyo.',
        about: { '@id': 'https://www.hashotel.com/#hotel' },
        primaryImageOfPage: 'https://www.hashotel.com/hamam-1.webp',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hashotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Termal Havuz & Kaplıca', item: 'https://www.hashotel.com/termal' },
        ],
      },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Eskişehir Termal Otel | Kaplıca, Termal Havuz & Hamam — Has Termal Otel</title>
        <meta
          name="description"
          content="Eskişehir'de şehir merkezinde termal otel: 42°C kaynaklı termomineral su, ~36°C kapalı termal havuz, kaplıca ve Has Hamam Türk hamamı. Seçili odalarda jakuzili banyo, kahvaltı dâhil. 0530 433 85 87."
        />
        <meta name="keywords" content="Eskişehir termal otel, Eskişehir kaplıca, termal havuz Eskişehir, Odunpazarı termal, Eskişehir termal tatil, kaplıca oteli Eskişehir" />
        <link rel="canonical" href="https://www.hashotel.com/termal" />
        <meta property="og:title" content="Eskişehir Termal Otel & Kaplıca | Has Termal Otel" />
        <meta property="og:description" content="42°C kaynaklı termomineral su, kapalı termal havuz, kaplıca ve Has Hamam. Şehir merkezinde." />
        <meta property="og:image" content="https://www.hashotel.com/hamam-1.webp" />
        <meta property="og:url" content="https://www.hashotel.com/termal" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <header className="relative pt-32 pb-16 bg-primary text-secondary">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            Odunpazarı · Şehir merkezi
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Eskişehir Termal Otel: Kaplıca, Termal Havuz & Hamam
          </h1>
          <p className="mt-6 text-lg text-secondary/80 leading-relaxed max-w-3xl">
            Has Termal Otel, Eskişehir Odunpazarı Hamamyolu Caddesi No:7'de, şehrin tam merkezinde hizmet
            veren bir termal oteldir. Kaynaktaki 42°C, pH 7,3 termomineral su kapalı havuzu yaklaşık 36°C'de
            besler; aynı çatı altında kaplıca ve Has Hamam Türk hamamı bulunur. 48 odamızın
            tamamında özel banyo, seçili odalarda ise jakuzi vardır; konaklamalara açık büfe kahvaltı dâhildir.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <Phone size={18} /> {clientData.phone}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all">
              <MessageCircle size={18} /> Müsaitlik sor
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <figure className="rounded-[28px] overflow-hidden mb-14">
          <img
            src="/hamam-1.webp"
            alt="Has Hamam — Has Termal Otel içindeki Türk hamamının mermer kurnaları ve göbek taşı"
            width="1400"
            height="900"
            className="w-full h-[300px] sm:h-[440px] object-cover"
          />
          <figcaption className="mt-3 text-sm text-primary/50">
            Has Hamam — Has Termal Otel, Hamamyolu Cad. No:7, Odunpazarı / Eskişehir.
          </figcaption>
        </figure>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-5">Termal su analiz değerleri</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {[
                  ['Kaynak sıcaklığı', '42 °C'],
                  ['pH (reaksiyon)', '7,3'],
                  ['Radyoaktivite', '21,7'],
                  ['Havuz kullanım sıcaklığı', '≈ 36 °C'],
                  ['Su tipi', 'Termomineral (yer altı kaynağı)'],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-primary/10">
                    <td className="py-4 pr-6 font-medium text-primary whitespace-nowrap">{k}</td>
                    <td className="py-4 text-primary/70">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-primary/70 leading-relaxed">
            Otelin resmî bilgilendirmesine göre bu şifalı sular romatizma, kırık ve çıkık sonrası rahatlama,
            bel ve sırt ağrıları ile böbrek taşı şikâyetlerinde geleneksel olarak tercih edilir. Kronik
            rahatsızlığı olan misafirlerin hekimlerine danışması önerilir.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-8">Tesisteki termal imkânlar</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {facilities.map((f) => (
              <div key={f.title} className="rounded-3xl border border-primary/10 p-6 bg-secondary/60">
                <div className="w-11 h-11 rounded-xl bg-accent/15 grid place-items-center mb-4">
                  <f.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-primary text-lg mb-2">{f.title}</h3>
                <p className="text-primary/70 leading-relaxed text-sm">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-primary/70 leading-relaxed">
            Hamam hizmetlerinin ayrıntısı için{' '}
            <Link to="/hamam" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">Has Hamam sayfamıza</Link>,
            oda tipleri ve donanım için{' '}
            <Link to="/odalar" className="text-accent font-semibold underline decoration-accent/30 underline-offset-4">odalarımıza</Link> göz atabilirsiniz.
          </p>
        </section>
      </main>

      <FAQ items={termalFaq} title="Termal ve kaplıca hakkında sık sorulanlar" eyebrow="Termal SSS" />
    </div>
  );
};

export default TermalPage;
