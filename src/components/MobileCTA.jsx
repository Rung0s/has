import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const MobileCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary/10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] sm:hidden">
      <div className="flex">
        <a 
          href={`tel:${clientData.phone.replace(/\s/g, '')}`} 
          className="flex-1 flex flex-col items-center justify-center py-3 text-primary border-r border-primary/10 hover:bg-secondary transition-colors"
        >
          <Phone size={20} className="mb-1" />
          <span className="text-xs font-medium">{t('navbar.call_now')}</span>
        </a>
        <a
          href={`https://wa.me/${clientData.whatsapp.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 text-primary hover:bg-secondary transition-colors"
        >
          <MessageCircle size={20} className="mb-1 text-[#25D366]" />
          <span className="text-xs font-medium">{t('rooms.whatsapp')}</span>
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
