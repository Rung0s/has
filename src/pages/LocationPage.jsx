import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import LocationMap from '../components/LocationMap';

const LocationPage = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <div className="pt-32 pb-24 bg-secondary min-h-screen flex flex-col">
      <Helmet>
        <title>{t('navbar.location')} | Has Termal Otel</title>
        <meta name="description" content="Has Termal Otel konumu: Eskişehir Odunpazarı Hamamyolu Caddesi. Çarşı, Cam Müzesi ve Odunpazarı Evleri yürüme mesafesinde. Ulaşım detayları ve harita." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">{t('navbar.location')}</h1>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">
            Eskişehir'in tam merkezinde, Hamamyolu Caddesi'ndeyiz. Çarşı, müzeler ve tarihi noktalar yürüme mesafesinde. Bize nasıl ulaşabileceğinizi aşağıdan inceleyebilirsiniz.
          </p>
        </div>
      </div>

      <div className="flex-1">
        <LocationMap />
      </div>
    </div>
  );
};

export default LocationPage;
