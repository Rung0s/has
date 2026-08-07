import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Landmark, Bus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const LocationMap = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  const HOTEL = "39.7740076,30.5193447";
  const mapSources = {
    hotel: "https://maps.google.com/maps?q=Has+Termal+Otel,+Hamamyolu+Cd.+No:7,+Odunpazarı/Eskişehir&t=&z=16&ie=UTF8&iwloc=&output=embed",
    merkez: `https://maps.google.com/maps?saddr=${HOTEL}&daddr=Eskişehir+Şehir+Merkezi+Adalar&dirflg=w&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    muze: `https://maps.google.com/maps?saddr=${HOTEL}&daddr=Eskişehir+Cam+Sanatları+Müzesi&dirflg=w&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    evler: `https://maps.google.com/maps?saddr=${HOTEL}&daddr=Odunpazarı+Evleri&dirflg=w&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    otogar: `https://maps.google.com/maps?saddr=${HOTEL}&daddr=Eskişehir+Otogarı&dirflg=d&t=&z=13&ie=UTF8&iwloc=&output=embed`
  };

  const [activeMap, setActiveMap] = useState('hotel');

  return (
    <section className="py-24 bg-secondary" id="location">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('navbar.location')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary/60 max-w-2xl mx-auto"
          >
            {t('location.subtitle_desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Yakın Çevre Bilgileri */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white rounded-3xl border border-primary/5 p-8 shadow-sm flex flex-col justify-center h-full"
          >
            <h3 className="text-2xl font-semibold text-primary mb-8">{t('location.important_points')}</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setActiveMap('merkez')}
                className={`flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all ${activeMap === 'merkez' ? 'bg-primary/5 shadow-inner' : 'hover:bg-primary/5'}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent mb-2 sm:mb-3">
                  <Navigation size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm sm:text-base leading-tight">Şehir Merkezi & Çarşı</h4>
                  <p className="text-primary/60 text-xs mt-1">Yürüme mesafesi</p>
                </div>
              </div>

              <div
                onClick={() => setActiveMap('muze')}
                className={`flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all ${activeMap === 'muze' ? 'bg-primary/5 shadow-inner' : 'hover:bg-primary/5'}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent mb-2 sm:mb-3">
                  <Landmark size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm sm:text-base leading-tight">Cam Sanatları Müzesi</h4>
                  <p className="text-primary/60 text-xs mt-1">~0.4 km</p>
                </div>
              </div>

              <div
                onClick={() => setActiveMap('evler')}
                className={`flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all ${activeMap === 'evler' ? 'bg-primary/5 shadow-inner' : 'hover:bg-primary/5'}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent mb-2 sm:mb-3">
                  <Landmark size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm sm:text-base leading-tight">Odunpazarı Evleri</h4>
                  <p className="text-primary/60 text-xs mt-1">~2 km</p>
                </div>
              </div>

              <div
                onClick={() => setActiveMap('otogar')}
                className={`flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all ${activeMap === 'otogar' ? 'bg-primary/5 shadow-inner' : 'hover:bg-primary/5'}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent mb-2 sm:mb-3">
                  <Bus size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm sm:text-base leading-tight">Eskişehir Otogarı</h4>
                  <p className="text-primary/60 text-xs mt-1">Kısa araç mesafesi</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/10">
              <div 
                onClick={() => setActiveMap('hotel')}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeMap === 'hotel' ? 'bg-primary/5' : 'hover:bg-primary/5'}`}
              >
                <MapPin className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-primary/80 font-medium">
                    {clientData.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 aspect-video lg:aspect-auto lg:h-full min-h-[300px] min-w-0 w-full rounded-xl lg:rounded-3xl overflow-hidden border border-primary/5 shadow-sm relative group"
          >
            <iframe
              key={activeMap} // Force re-render when map source changes
              src={mapSources[activeMap]}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default LocationMap;
