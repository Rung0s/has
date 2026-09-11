import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RoomsSection from '../components/RoomCard';
import items from '../data/items.json';

const RoomsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-12 bg-white min-h-screen">
      <Helmet>
        <title>{t('rooms.title')} | Has Termal Otel Jakuzili Termal Odalar</title>
        <meta name="description" content="Has Termal Otel odaları: Standart, İki Ayrı Yataklı ve Aile odaları. Her odada jakuzili banyo, klima, uydu TV ve ücretsiz Wi-Fi. Kahvaltı dâhil konaklama." />
        <link rel="canonical" href="https://www.hastermalotel.com/odalar" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ItemList',
                name: 'Has Termal Otel oda tipleri',
                itemListElement: items.map((room, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  item: {
                    '@type': 'HotelRoom',
                    name: room.title.tr,
                    image: `https://www.hastermalotel.com${room.image}`,
                    bed: room.bedType ? { '@type': 'BedDetails', typeOfBed: room.bedType.tr } : undefined,
                    amenityFeature: room.features.tr.map((f) => ({
                      '@type': 'LocationFeatureSpecification',
                      name: f,
                      value: true,
                    })),
                    containedInPlace: { '@id': 'https://www.hastermalotel.com/#hotel' },
                  },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hastermalotel.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Odalar', item: 'https://www.hastermalotel.com/odalar' },
                ],
              },
            ],
          })}
        </script>
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
