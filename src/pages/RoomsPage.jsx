import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RoomsSection from '../components/RoomCard';

const RoomsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-12 bg-white min-h-screen">
      <Helmet>
        <title>{t('rooms.title')} | Has Termal Otel Jakuzili Termal Odalar</title>
        <meta name="description" content="Has Termal Otel odaları: Standart, İki Ayrı Yataklı ve Aile odaları. Her odada jakuzili banyo, klima, uydu TV ve ücretsiz Wi-Fi. Kahvaltı dâhil konaklama." />
        <link rel="canonical" href="https://www.hashotel.com/odalar" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-medium">
          <ArrowLeft size={20} />
          {t('back_to_home', 'Ana Sayfaya Dön')}
        </Link>
      </div>
      {/* RoomsSection already has its own container and titles */}
      <RoomsSection />
    </div>
  );
};

export default RoomsPage;
