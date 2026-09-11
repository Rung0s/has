import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import FAQ from '../components/FAQ';
import faqData from '../data/faq.json';

const extra = [
  {
    q: 'Rezervasyon nasıl yapılır, ön ödeme gerekiyor mu?',
    a: 'Rezervasyonlar telefon ve WhatsApp üzerinden alınır: 0530 433 85 87. Tarih, kişi sayısı ve kahvaltı tercihinizi iletmeniz yeterlidir; ön ödeme koşulları döneme göre değişir, görüşme sırasında bildirilir.',
  },
  {
    q: 'Otelde otopark var mı, ücretli mi?',
    a: 'Tesiste otopark imkânı bulunur. Doluluk ve güncel kullanım koşulları için resepsiyondan bilgi alabilirsiniz.',
  },
  {
    q: 'Evcil hayvan kabul ediliyor mu?',
    a: 'Hayır, otelimizde evcil hayvan kabul edilmemektedir.',
  },
  {
    q: 'Odalarda hangi donanımlar var?',
    a: 'Tüm odalarda klima, uydu TV, minibar, telefon, saç kurutma makinesi, ücretsiz Wi-Fi ve özel banyo bulunur. Seçili odalarda jakuzili banyo vardır; günlük temizlik yapılır.',
  },
  {
    q: 'Tek kişilik konaklama mümkün mü?',
    a: 'Evet. Standart ve iki ayrı yataklı odalarımız tek kişilik konaklamaya da uygundur; tek kişi fiyatı için 0530 433 85 87 numarasından bilgi alabilirsiniz.',
  },
  {
    q: 'Kredi kartı geçerli mi?',
    a: 'Nakit ve kart ile ödeme yapılabilir. Kurumsal faturalı konaklama da mümkündür; şirket bilgilerinizi rezervasyon sırasında iletmeniz yeterlidir.',
  },
  {
    q: 'Uzun süreli (haftalık/aylık) konaklama yapılıyor mu?',
    a: 'Evet, uzun süreli konaklamalarda döneme özel fiyat çalışılır. Tedavi, iş veya eğitim amaçlı uzun konaklamalar için doğrudan arayarak teklif isteyebilirsiniz.',
  },
  {
    q: 'Otel Kültür ve Turizm Bakanlığı belgeli mi?',
    a: 'Evet. Has Termal Otel, Kültür ve Turizm Bakanlığı işletme belgeli, yarım asırdır aynı ailenin işlettiği bir tesistir.',
  },
];

const all = [...faqData, ...extra];

const SssPage = () => (
  <div className="bg-white">
    <Helmet>
      <title>Sık Sorulan Sorular | Has Termal Otel & Has Hamam Eskişehir</title>
      <meta
        name="description"
        content="Has Termal Otel ve Has Hamam hakkında sık sorulan sorular: termal su değerleri, hamam seans günleri, kahvaltı, jakuzili oda, otopark, rezervasyon ve ulaşım. Bilgi: 0530 433 85 87."
      />
      <link rel="canonical" href="https://www.hastermalotel.com/sss" />
      <meta property="og:title" content="Sık Sorulan Sorular | Has Termal Otel" />
      <meta property="og:description" content="Termal su, hamam seansları, kahvaltı, odalar, ulaşım ve rezervasyon hakkında merak edilenler." />
      <meta property="og:url" content="https://www.hastermalotel.com/sss" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
            { '@type': 'ListItem', position: 2, name: 'Sık Sorulan Sorular', item: 'https://www.hastermalotel.com/sss' },
          ],
        })}
      </script>
    </Helmet>

    <header className="pt-32 pb-12 bg-primary text-secondary">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
          <ArrowLeft size={18} /> Ana Sayfa
        </Link>
        <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05]">
          Has Termal Otel & Has Hamam: sık sorulan sorular
        </h1>
        <p className="mt-5 text-secondary/80 leading-relaxed max-w-3xl">
          Termal suyun analiz değerlerinden hamam seans günlerine, kahvaltı ve oda donanımından ulaşım ve
          rezervasyona kadar en çok sorulan başlıkları tek sayfada topladık. Cevabını bulamadığınız bir
          konu olursa 0530 433 85 87 numarasından bize ulaşın.
        </p>
      </div>
    </header>

    <FAQ items={all} title="Tüm sorular" eyebrow="Has Termal Otel SSS" />
  </div>
);

export default SssPage;
