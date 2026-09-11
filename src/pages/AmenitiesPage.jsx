import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Amenities from '../components/Amenities';

const AmenitiesPage = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <div className="pt-24 bg-white min-h-screen">
      <Helmet>
        <title>{`İmkanlar: Termal Havuz, Has Hamam, Otopark | Has Termal Otel`}</title>
        <meta name="description" content={lng === 'tr' ? "Has Termal Otel'in sunduğu ayrıcalıklar: Yüksek hızlı Wi-Fi, 7/24 resepsiyon, lüks konaklama olanakları ve daha fazlası." : "Privileges offered by Has Termal Otel: High-speed Wi-Fi, 24/7 reception, luxury accommodation, and more."} />
        <link rel="canonical" href="https://www.hastermalotel.com/imkanlar" />
      </Helmet>

      <header className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
          Has Termal Otel imkanları
        </h1>
        <p className="mt-4 text-primary/70 leading-relaxed max-w-3xl">
          Kapalı termal havuz, kaplıca ve Has Hamam Türk hamamı aynı binada; şehrin tam merkezinde,
          çarşıya sıfır konumda. Otopark, ücretsiz Wi-Fi ve açık büfe kahvaltı ile 50 yıllık işletme
          tecrübesi bir arada.
        </p>
      </header>

      <Amenities />
    </div>
  );
};

export default AmenitiesPage;
