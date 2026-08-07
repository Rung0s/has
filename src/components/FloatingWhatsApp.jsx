import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  // Show tooltip automatically after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappMessage = lng === 'tr' 
    ? 'Merhaba, fiyat ve müsaitlik hakkında bilgi almak istiyorum.' 
    : 'Hello, I would like to get information about rates and availability.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end hidden sm:flex">
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 bg-white p-4 rounded-2xl shadow-2xl border border-primary/10 relative w-64 origin-bottom-right"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-primary/40 hover:text-primary/70 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-xl">👋</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary mb-1">
                  {t('whatsapp_float.title', 'Size nasıl yardımcı olabiliriz?')}
                </p>
                <p className="text-xs text-primary/60 leading-relaxed">
                  {t('whatsapp_float.desc', 'Fiyat bilgisi, müsaitlik durumu veya aklınıza takılan her şey için bize yazın.')}
                </p>
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-primary/10 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Pulse effect rings */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
        <div className="absolute -inset-2 rounded-full bg-[#25D366] animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
        
        <a
          href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={32} />
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
