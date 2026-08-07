import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Coffee, CheckCircle2, Droplets, Sparkles, Utensils, ShieldCheck, Wallet, MapPin, ChevronDown, Car, BedDouble, PartyPopper, Briefcase, Clock, Wind, Tv, Bath, Waves, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import configData from '../data/site-config.json';

// features[].icon buradaki adlardan biri; yoksa CheckCircle2 fallback. Yeni ikon gerekirse ekle.
const iconMap = {
  Wifi, Coffee, Droplets, Sparkles, Utensils, ShieldCheck, Wallet, MapPin,
  Car, BedDouble, PartyPopper, Briefcase, Clock, Wind, Tv, Bath, Waves, Flame
};

const Amenities = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-secondary" id="amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('navbar.amenities')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary/60 max-w-2xl mx-auto"
          >
            {lng === 'tr' ? "Konforlu bir konaklama için ihtiyacınız olan tüm detaylar düşünüldü." : "All details have been thought of for a comfortable stay."}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {configData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || CheckCircle2;
            const isExpanded = expandedIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleExpand(index)}
                className={`flex flex-col p-4 sm:p-5 bg-white rounded-2xl shadow-sm border transition-all cursor-pointer group ${isExpanded ? 'border-accent/40 shadow-md' : 'border-primary/5 hover:border-accent/20'}`}
              >
                <div className="flex flex-row items-center gap-4 w-full">
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-accent text-white' : 'bg-accent/10 text-accent group-hover:bg-accent/20'}`}>
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-primary text-left leading-tight flex-1">
                    {feature.name[lng] || feature.name.tr}
                  </h3>
                  <div className={`shrink-0 transition-colors ${isExpanded ? 'text-accent' : 'text-primary/30 group-hover:text-primary/50'}`}>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-primary/70 leading-relaxed border-t border-primary/5 mt-4">
                        {feature.description[lng] || feature.description.tr}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
