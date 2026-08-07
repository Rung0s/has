import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CorporateCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-16 sm:py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6"
        >
          <BriefcaseBusiness className="text-accent" size={32} />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
        >
          {t('corporate_cta.title')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('corporate_cta.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/iletisim" 
            className="inline-flex items-center justify-center px-10 py-4 bg-accent text-primary rounded-xl font-medium text-lg hover:bg-accent/90 transition-all hover:scale-105 hover:shadow-lg shadow-accent/20"
          >
            {t('corporate_cta.button')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CorporateCTA;
