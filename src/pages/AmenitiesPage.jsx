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
        <title>{t('navbar.amenities')} | Has Termal Otel</title>
        <meta name="description" content={lng === 'tr' ? "Has Termal Otel'in sunduğu ayrıcalıklar: Yüksek hızlı Wi-Fi, 7/24 resepsiyon, lüks konaklama olanakları ve daha fazlası." : "Privileges offered by Has Termal Otel: High-speed Wi-Fi, 24/7 reception, luxury accommodation, and more."} />
        <link rel="canonical" href="https://www.hashotel.com/imkanlar" />
      </Helmet>

      <Amenities />
    </div>
  );
};

export default AmenitiesPage;
