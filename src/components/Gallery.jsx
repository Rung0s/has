import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import clientData from '../data/client.json';

const images = Array.from({ length: 12 }, (_, i) => `/gallery/g${i + 1}.webp`);

// Görsel arama ve AI tarayıcıları için tanımlayıcı alt metinler (sıra images ile aynı)
const imageAlts = [
  'Has Termal Otel kapalı termal havuzu, yaklaşık 36°C şifalı termomineral su',
  'Otel odasının penceresinden Eskişehir Odunpazarı manzarası',
  'Has Termal Otel kafeterya ve kahvaltı salonu',
  'Termal havuz detayı — Eskişehir Odunpazarı termal otel',
  'Has Termal Otel resepsiyonu ve karşılama alanı',
  'Hamamyolu Caddesi üzerindeki Has Termal Otel ve Has Hamam girişi',
  'Has Hamam — mermer kurnalar, göbek taşı ve soyunmalık bölümü',
  'Aile Suit Oda — geniş oturma alanı ve yatak düzeni',
  '3 kişilik oda (2+1) — Has Termal Otel',
  'Kahvaltı salonu ve Cafe Türk oturma alanı',
  'İki ayrı yataklı oda — Has Termal Otel Eskişehir',
  'Odalardaki jakuzi/küvetli banyo detayı',
];

const Gallery = () => {
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback((e) => { e && e.stopPropagation(); setActive((i) => (i - 1 + images.length) % images.length); }, []);
  const next = useCallback((e) => { e && e.stopPropagation(); setActive((i) => (i + 1) % images.length); }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = 'unset'; };
  }, [active, close, prev, next]);

  return (
    <section className="py-20 md:py-24 bg-primary" id="gallery">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent mb-5">
            <Images size={18} />
            <span className="text-xs font-semibold tracking-widest uppercase">Fotoğraf Galerisi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4">
            {clientData.name}'den Kareler
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">
            Odalarımız, kahvaltı salonumuz ve tesisimizden gerçek fotoğraflar. Büyütmek için dokunun.
          </motion.p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="mb-3 md:mb-4 w-full block rounded-2xl overflow-hidden group relative cursor-zoom-in break-inside-avoid"
            >
              <img loading="lazy" src={src} alt={imageAlts[i] || `${clientData.name} fotoğraf ${i + 1}`}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button onClick={close} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10">
              <X size={24} />
            </button>
            <button onClick={prev} className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10">
              <ChevronLeft size={26} />
            </button>
            <button onClick={next} className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10">
              <ChevronRight size={26} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              src={images[active]} alt={imageAlts[active] || `${clientData.name} fotoğraf ${active + 1}`}
              className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
              {active + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
