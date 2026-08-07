import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Waves, Flame, Coffee, MapPin, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const heroImages = [
  '/hero-1.webp',
  '/hero-2.webp',
  '/hero-3.webp'
];

const Hero = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen md:h-screen flex flex-col md:justify-end overflow-hidden bg-primary md:bg-transparent md:pb-24 md:pt-24 pt-20">
      {/* Background Image Slideshow with Smooth Fade & Zoom */}
      <div className="relative h-[45vh] shrink-0 md:absolute md:inset-0 md:h-full z-0 overflow-hidden bg-black">
        <AnimatePresence>
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 md:from-black/90 md:via-black/40 md:to-black/20 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-[1400px] mx-auto flex flex-col justify-center flex-1 md:h-full bg-primary md:bg-transparent -mt-6 pt-8 pb-8 rounded-t-[2rem] md:mt-0 md:pt-20 md:rounded-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white mb-6 shadow-lg">
            <MapPin size={18} className="text-accent" />
            <span className="font-semibold text-sm tracking-widest uppercase">{t('hero.location_badge')}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t('hero.title')}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 md:mb-10">
            <span className="bg-white/5 md:bg-black/40 backdrop-blur-md border border-white/10 text-white/90 px-3 py-2 md:px-4 md:py-2 rounded-xl md:rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
              <Waves size={16} className="text-accent md:w-4 md:h-4" /> {t('hero.pool')}
            </span>
            <span className="bg-white/5 md:bg-black/40 backdrop-blur-md border border-white/10 text-white/90 px-3 py-2 md:px-4 md:py-2 rounded-xl md:rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
              <Flame size={16} className="text-accent md:w-4 md:h-4" /> {t('hero.hamam')}
            </span>
            <span className="bg-white/5 md:bg-black/40 backdrop-blur-md border border-white/10 text-white/90 px-3 py-2 md:px-4 md:py-2 rounded-xl md:rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
              <MapPin size={16} className="text-accent md:w-4 md:h-4" /> {t('hero.center')}
            </span>
            <span className="bg-white/5 md:bg-black/40 backdrop-blur-md border border-white/10 text-white/90 px-3 py-2 md:px-4 md:py-2 rounded-xl md:rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
              <Coffee size={16} className="text-accent md:w-4 md:h-4" /> {t('hero.breakfast')}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a 
              href="#rooms" 
              className="w-full md:w-auto justify-between md:justify-start group flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl md:rounded-full font-sans font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1"
            >
              {t('hero.view_rooms')}
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
                <ArrowRight size={16} />
              </div>
            </a>
            
            <a
              href={`https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto justify-between md:justify-start group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl md:rounded-full font-sans font-semibold hover:bg-white/15 transition-all shadow-lg hover:-translate-y-1"
            >
              {t('hero.whatsapp_price')}
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle size={16} />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
