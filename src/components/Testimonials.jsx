import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import testimonials from '../data/testimonials.json';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching main theme */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary/60 max-w-2xl mx-auto mb-8"
          >
            {t('testimonials.subtitle')}
          </motion.p>
          
          {/* Google Puanı Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-secondary px-8 py-4 rounded-full border border-primary/5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-8 h-8" />
              <div className="flex flex-col items-start">
                <span className="font-bold text-xl text-primary leading-none">4.2 <span className="text-sm font-normal text-primary/50">/ 5.0</span></span>
                <span className="text-yellow-400 text-sm tracking-widest mt-1">★★★★☆</span>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-primary/10"></div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-primary">{t('testimonials.ratings_title')}</p>
              <p className="text-xs text-primary/60">
                {lng === 'tr' ? "Google Maps ve TripAdvisor'daki değerlendirmeler" : "Reviews on Google Maps and TripAdvisor"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Image */}
          <div className="lg:col-span-5 aspect-video lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-sm">
            <img loading="lazy"
              src="/gallery/g5.webp"
              alt="Has Termal Otel Lobi"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Review Box */}
          <div className="lg:col-span-7 bg-secondary rounded-3xl border border-primary/5 p-6 lg:p-16 flex flex-col justify-center relative shadow-sm min-h-[250px] lg:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg md:text-2xl text-primary/80 leading-relaxed font-light mb-8 lg:mb-12">
                  "{current.quote[lng] || current.quote.tr}"
                </p>

                <div className="border-t border-primary/10 pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white border border-primary/10 flex items-center justify-center shrink-0">
                      <UserCircle2 size={36} className="text-primary/25" />
                    </div>
                    <div>
                      <h4 className="text-primary font-semibold text-lg">{current.author}</h4>
                      <p className="text-primary/50 text-sm">{current.location[lng] || current.location.tr}</p>
                    </div>
                  </div>
                  
                  {/* Arrows */}
                  <div className="flex gap-3">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 hover:bg-white transition-all bg-transparent"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 hover:bg-white transition-all bg-transparent"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
