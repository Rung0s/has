import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(nextLng);
    localStorage.setItem('language', nextLng);
  };

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.rooms'), path: '/odalar' },
    { name: t('navbar.thermal', 'Termal & Kaplıca'), path: '/termal' },
    { name: t('navbar.hamam', 'Has Hamam'), path: '/hamam' },
    { name: t('navbar.amenities'), path: '/imkanlar' },
    { name: t('navbar.about'), path: '/hakkimizda' },
  ];

  return (
    <>
      <nav className="absolute top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-primary/5 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Mobile Hamburger Button */}
            <div className="flex-1 lg:hidden">
              <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-primary hover:text-accent transition-colors">
                <Menu size={28} />
              </button>
            </div>

            {/* Left Menu (Desktop) */}
            <div className="hidden lg:flex flex-1 items-center space-x-8 text-xs font-bold tracking-widest text-primary/80 uppercase">
              {navLinks.slice(0, 3).map((link) => (
                <Link key={link.name} to={link.path} className="hover:text-accent transition-colors">{link.name}</Link>
              ))}
            </div>

            {/* Logo Center */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex items-center justify-center group py-1">
                <img src="/logo-dark.webp" alt={clientData.name} className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              </Link>
            </div>

            {/* Right Menu (Desktop) */}
            <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
              {navLinks.slice(3, 5).map((link) => (
                <Link key={link.name} to={link.path} className="text-xs font-bold tracking-widest text-primary/80 uppercase hover:text-accent transition-colors">{link.name}</Link>
              ))}
              <a 
                href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=Merhabalar%20bilgi%20alabilir%20miyim?`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <MessageCircle size={18} />
                <span>WHATSAPP</span>
              </a>
              <Link
                to="/iletisim"
                className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-all"
              >
                {t('navbar.contact')}
              </Link>
            </div>

            {/* Right Placeholder for Mobile Center Alignment */}
            <div className="flex-1 lg:hidden flex justify-end">
              <a 
                href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=Merhabalar%20bilgi%20alabilir%20miyim?`}
                target="_blank"
                rel="noreferrer"
                className="p-2 -mr-2 text-primary hover:text-accent transition-colors"
              >
                <MessageCircle size={28} />
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col"
          >
            <div className="flex justify-between items-center h-20 px-4 border-b border-white/10">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center group py-1">
                <img src="/logo.webp" alt={clientData.name} className="h-14 w-auto object-contain" />
              </Link>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-white hover:text-accent transition-colors">
                  <X size={32} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-6 p-8 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={link.name} 
                >
                  <Link
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif font-medium text-white hover:text-accent transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
              >
                <Link
                  to="/iletisim" 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif font-medium text-accent hover:text-white transition-colors block"
                >
                  {t('navbar.contact')}
                </Link>
              </motion.div>
            </div>

            <div className="p-6 border-t border-white/10 flex flex-col gap-4 bg-primary">
              <a 
                href={`tel:${clientData.phone.replace(/\s/g, '')}`}
                className="w-full py-4 bg-white/10 text-white rounded-xl text-center font-medium hover:bg-white/20 transition-colors"
              >
                {t('navbar.call_now')}
              </a>
              <a
                href={`https://wa.me/${clientData.whatsapp.replace('+', '')}?text=Merhabalar%20bilgi%20alabilir%20miyim?`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-white/10 border border-white/15 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-white/15 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle size={16} />
                </span>
                {t('navbar.whatsapp_message')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
