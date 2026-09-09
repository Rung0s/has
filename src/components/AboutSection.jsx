import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <section className="py-16 lg:py-24 bg-white" id="about">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Block (Image + Text + Stats) */}
          <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-12">
            
            {/* Top part: Image + Text side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Photo */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden h-full min-h-[250px] sm:min-h-[300px]"
              >
                <img loading="lazy"
                  src="/about-1.webp"
                  alt="Has Termal Otel resepsiyonu — Odunpazarı Hamamyolu Caddesi"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Text + Button */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col justify-center py-4 text-center sm:text-left"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-primary mb-6 leading-tight">
                  45 yıldır Eskişehir'de <span className="font-semibold">şifalı termal konukseverliği</span> yaşatıyoruz
                </h2>
                <p className="text-primary/60 leading-relaxed mb-8">
                  Has Termal Otel olarak şehrin tam merkezinde, yer altından kaynayan <strong className="font-semibold">şifalı termal suyu</strong>; Türk hamamı, sauna ve kapalı termal havuzumuzla buluşturuyoruz. 48 odamızın her birinde <strong className="font-semibold">jakuzili banyo</strong> ve zengin açık büfe kahvaltıyla huzurlu bir konaklama vadediyoruz.
                </p>
                <Link 
                  to="/hakkimizda" 
                  className="inline-flex items-center justify-between px-6 py-3 border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-white transition-colors w-full sm:w-fit gap-4 group mt-auto mx-auto sm:mx-0"
                >
                  <span className="font-medium text-sm">{t('about_section.button')}</span>
                  <div className="w-8 h-8 rounded-full border border-primary/20 group-hover:border-white/20 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </motion.div>

            </div>

            {/* Bottom part: Stats spanning the left block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4 sm:gap-8 pt-8 border-t border-primary/10 text-center sm:text-left"
            >
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-primary mb-2">{t('about_section.rate_title')}</h3>
                <p className="text-xs sm:text-sm font-medium text-primary/60">{t('about_section.rate_desc')}</p>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-primary mb-2">{t('about_section.exp_title')}</h3>
                <p className="text-xs sm:text-sm font-medium text-primary/60">{t('about_section.exp_desc')}</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column (Large Vertical Image) - Hidden on mobile to save vertical space */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex lg:col-span-4 rounded-3xl overflow-hidden h-[300px] lg:h-full bg-secondary items-center justify-center border border-primary/5"
          >
            <img loading="lazy"
              src="/about-2.webp"
              alt="Has Termal Otel kahvaltı salonu ve Cafe Türk oturma alanı"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
