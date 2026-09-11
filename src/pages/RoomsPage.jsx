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
        <title>{`Odalar — Aile Suit ve Standart Odalar | Has Termal Otel`}</title>
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
      <header className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
          Has Termal Otel odaları: Aile Suit, 3 kişilik ve standart odalar
        </h1>
        <p className="mt-4 text-primary/70 leading-relaxed max-w-3xl">
          Eskişehir Odunpazarı Hamamyolu Caddesi No:7'deki otelimizde 48 oda bulunur. Tüm odalarda klima,
          uydu TV, minibar, ücretsiz Wi-Fi ve özel banyo standarttır; seçili odalarda jakuzili banyo yer
          alır. Konaklamalara açık büfe kahvaltı dâhildir, talep hâlinde kahvaltısız fiyat da verilir.
        </p>
      </header>

      {/* RoomsSection already has its own container and titles */}
      <RoomsSection />
    </div>
  );
};

export default RoomsPage;
