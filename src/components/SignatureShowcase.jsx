import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import configData from '../data/site-config.json';

const SignatureShowcase = () => {
  const { i18n } = useTranslation();
  const lng = i18n.language || 'tr';
  const items = configData.signature || [];
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-secondary" id="signature">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4"
          >
            {lng === 'tr' ? 'Bizi Ayıran Detaylar' : 'What Sets Us Apart'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold text-primary leading-tight"
          >
            {lng === 'tr'
              ? 'Şehir merkezinde nadiren bir arada bulunan ayrıcalıklar'
              : 'Ayrıcalıklar'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[4px] bg-white border border-primary/10 hover:border-accent/40 transition-colors"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.title[lng] || item.title.tr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[11px] font-bold tracking-widest uppercase rounded-sm">
                  {item.eyebrow[lng] || item.eyebrow.tr}
                </span>
              </div>

              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {item.title[lng] || item.title.tr}
                </h3>
                <p className="text-primary/60 leading-relaxed mb-6 text-sm">
                  {item.description[lng] || item.description.tr}
                </p>
                <ul className="space-y-2.5 border-t border-primary/10 pt-5">
                  {(item.points[lng] || item.points.tr).map((p, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-primary/80">
                      <span className="w-5 h-5 rounded-sm bg-accent/10 text-accent flex items-center justify-center shrink-0">
                        <Check size={13} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureShowcase;
