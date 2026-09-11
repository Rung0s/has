import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users, Bath, Phone, MessageCircle, X, Image as ImageIcon, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import itemsData from '../data/items.json';
import clientData from '../data/client.json';

const ModalGallery = ({ room, lng }) => {
  if (room.noPhoto) return null;
  const mainImg = room.image;
  const otherImgs = (room.gallery || []).filter(img => img !== mainImg);
  const small1 = otherImgs[0] || mainImg;
  const small2 = otherImgs[1] || otherImgs[0] || mainImg;
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 aspect-[4/3] rounded-2xl overflow-hidden border border-primary/10 relative group">
        <img loading="lazy" src={mainImg} srcSet={`${mainImg.replace('.webp', '-700w.webp')} 700w, ${mainImg} 1400w`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={room.title[lng] || room.title.tr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <div className="flex-1 rounded-2xl overflow-hidden border border-primary/10 relative group">
          <img loading="lazy" src={small1} alt={`${room.title[lng] || room.title.tr} - 2`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 rounded-2xl overflow-hidden border border-primary/10 relative group">
          <img loading="lazy" src={small2} alt={`${room.title[lng] || room.title.tr} - 3`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
    </div>
  );
};

const RoomModal = ({ room, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';
  const whatsappText = lng === 'tr' 
    ? `Merhaba, ${room.title.tr} hakkında fiyat ve müsaitlik bilgisi alabilir miyim?` 
    : `Hello, can I get price and availability information for ${room.title.en || room.title.tr}?`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-primary/10">
            <h3 className="text-2xl font-bold text-primary">{t('rooms.modal_title', { roomTitle: room.title[lng] || room.title.tr })}</h3>
            <button onClick={onClose} className="p-2 bg-secondary rounded-full text-primary hover:bg-primary/10 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content scrollable */}
          <div className="overflow-y-auto p-6">
            {/* Gallery: 1 large + 2 small, all different */}
            <div className="mb-8">
              {room.noPhoto ? (
                <div className="aspect-[16/7] rounded-2xl overflow-hidden border border-primary/10 bg-secondary flex flex-col items-center justify-center gap-4 text-primary/60 p-8">
                  <img src="/logo.webp" alt="Has Termal Otel Logo" className="w-24 sm:w-32 h-auto opacity-70 mb-2 mix-blend-multiply" />
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{lng === 'tr' ? 'Detaylar İçin Arayınız' : 'Call For Details'}</p>
                  <p className="text-sm sm:text-base text-center max-w-sm px-4">
                    {lng === 'tr'
                      ? 'Bu oda tipimizin fotoğrafları güncellenmektedir. Detaylı bilgi almak için bizimle iletişime geçebilirsiniz.'
                      : 'Photos for this room type are being updated. You can contact us for detailed information.'}
                  </p>
                  <a
                    href={`tel:${clientData.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm mt-2"
                  >
                    <Phone size={16} />
                    {clientData.phone}
                  </a>
                </div>
              ) : (
                <ModalGallery room={room} lng={lng} />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">{t('rooms.room_features')}</h4>
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-primary/70">
                  <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                    <Users size={16} />
                    <span>{room.capacity[lng] || room.capacity.tr}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                    <Bath size={16} />
                    <span>{room.size}</span>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(room.features[lng] || room.features.tr).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-primary/80">
                      <Check size={18} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-4 bg-secondary p-6 rounded-2xl border border-primary/5">
                <p className="text-center text-primary/70 mb-2 font-medium">{t('rooms.for_reservation')}</p>
                <a 
                  href={`tel:${clientData.phone.replace(/\s/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone size={20} />
                  {t('rooms.call_now')}
                </a>
                <a
                  href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-primary/15 text-primary rounded-xl font-medium hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-colors"
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                  {t('rooms.whatsapp_message')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const RoomCard = ({ room, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';
  const whatsappText = lng === 'tr' 
    ? `Merhaba, ${room.title.tr} hakkında fiyat ve müsaitlik bilgisi alabilir miyim?` 
    : `Hello, can I get price and availability information for ${room.title.en || room.title.tr}?`;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-primary/5 group flex flex-col sm:flex-row lg:flex-col transition-all duration-300 h-full"
      >
        {/* Image Container - fixed height for symmetry */}
        <div className="relative h-56 sm:h-64 lg:h-56 overflow-hidden shrink-0">
          {room.noPhoto ? (
            <div className="w-full h-full bg-secondary flex flex-col items-center justify-center gap-3 text-primary/70 border-b border-primary/5">
              <img loading="lazy" src="/logo.webp" alt="Has Termal Otel Logo" className="w-16 sm:w-20 h-auto opacity-60 mix-blend-multiply" />
              <span className="text-lg font-bold text-center px-4 leading-relaxed text-primary">
                {lng === 'tr' ? 'Detaylar İçin Arayınız' : 'Call For Details'}
              </span>
            </div>
          ) : (
            <>
              <img loading="lazy" 
                src={room.image} 
                srcSet={`${room.image.replace('.webp', '-700w.webp')} 700w, ${room.image} 1400w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={room.title[lng] || room.title.tr} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img loading="lazy" 
                src="/logo.webp" 
                alt="Logo" 
                className="absolute bottom-3 right-3 w-16 sm:w-20 h-auto opacity-30 pointer-events-none select-none z-10 mix-blend-overlay"
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-primary">{room.title[lng] || room.title.tr}</h3>
          </div>

          <div className="flex flex-wrap gap-3 mb-6 text-xs sm:text-sm text-primary/70">
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg">
              <Users size={16} />
              <span>{room.capacity[lng] || room.capacity.tr}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg">
              <Bath size={16} />
              <span>{room.size}</span>
            </div>
          </div>

          {/* Features hidden to make card shorter and horizontal */}

          <div className="mt-auto flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:flex-1 lg:flex-none flex items-center justify-center gap-2 py-2.5 bg-secondary text-primary rounded-xl font-medium border border-primary/10 hover:bg-primary/5 transition-colors text-sm cursor-pointer"
            >
              <ImageIcon size={16} />
              {t('rooms.details')}
            </button>
            <div className="flex gap-2 sm:gap-3 w-full sm:flex-1 lg:flex-none">
              <a 
                href={`tel:${clientData.phone.replace(/\s/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                <Phone size={16} />
                {t('rooms.call')}
              </a>
              <a
                href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-primary/15 text-primary rounded-xl font-medium hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                {t('rooms.whatsapp')}
              </a>
            </div>
          </div>
          <p className="text-center text-[11px] sm:text-xs text-primary/40 italic mt-3 select-none">
            {t('rooms.discount_note')}
          </p>
        </div>
      </motion.div>

      <RoomModal room={room} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

const RoomsSection = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="py-20 bg-white" id="rooms">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('rooms.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary/60 max-w-2xl mx-auto mb-8"
          >
            {t('rooms.subtitle')}
          </motion.p>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8"
          >
            <div className="flex items-center gap-2 text-primary bg-secondary/50 px-4 py-2 rounded-xl border border-primary/5">
              <ShieldCheck className="text-accent" size={20} />
              <span className="font-medium text-sm sm:text-base">{i18n.language === 'en' ? 'Ministry of Tourism Approved' : 'T.C. Turizm Bakanlığı Onaylı'}</span>
            </div>
            <div className="flex items-center gap-2 text-primary bg-secondary/50 px-4 py-2 rounded-xl border border-primary/5">
              <Sparkles className="text-accent" size={20} />
              <span className="font-medium text-sm sm:text-base">{i18n.language === 'en' ? 'Daily Professional Cleaning' : 'Günlük Profesyonel Temizlik'}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto items-stretch">
          {itemsData.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
