import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <footer className="bg-primary text-white pt-12 pb-8 sm:pt-20 sm:pb-12 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 mb-8 sm:mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center py-1">
              <img loading="lazy" src="/logo.webp" alt={clientData.name} className="h-16 w-auto object-contain" />
            </div>
            <p className="text-white/60 leading-relaxed font-light text-sm sm:text-base">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {clientData.socials.instagram && (
              <a href={clientData.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              )}
              {clientData.socials.facebook && (
              <a href={clientData.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/5 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              )}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-base sm:text-lg font-serif font-medium text-white mb-4 relative inline-block">
              {t('footer.quick_links')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent/50"></span>
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/termal" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Termal Havuz & Kaplıca</Link></li>
              <li><Link to="/hamam" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Has Hamam</Link></li>
              <li><Link to="/odalar" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {t('navbar.rooms')}</Link></li>
              <li><Link to="/imkanlar" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {t('navbar.amenities')}</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {t('navbar.about')}</Link></li>
              <li><Link to="/iletisim" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {t('navbar.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-base sm:text-lg font-serif font-medium text-white mb-4 relative inline-block">
              {t('footer.contact_info')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent/50"></span>
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="leading-tight">{clientData.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{clientData.phone}</a>
                  <a href={`tel:${clientData.landline.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{clientData.landline}</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent shrink-0" />
                <a href={`mailto:${clientData.email}`} className="hover:text-accent transition-colors break-all">{clientData.email}</a>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-base sm:text-lg font-serif font-medium text-white mb-4 relative inline-block">
              {t('footer.newsletter_title')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-accent/50"></span>
            </h4>
            <p className="text-xs sm:text-sm text-white/60 mb-4">{t('footer.newsletter_desc')}</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')} 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-accent text-primary px-3 sm:px-4 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} {clientData.name}. {t('footer.rights_reserved')}
          </p>
          <div className="flex gap-4 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">{t('contact.kvkk_link')}</a>
            <span className="w-1 h-1 rounded-full bg-white/20 my-auto"></span>
            <a href="#" className="hover:text-white transition-colors">{lng === 'tr' ? "Kullanım Koşulları" : "Terms of Use"}</a>
          </div>
        </div>

        {/* Made by Suerta */}
        <div className="pt-4 mt-2 flex justify-center">
          <p className="text-xs text-white/25 flex items-center gap-1.5">
            {lng === 'tr' ? 'Bu site' : 'This site'}{' '}
            <a
              href="https://suerta.co"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-medium tracking-wide"
            >
              suerta.co
            </a>
            {' '}{lng === 'tr' ? 'tarafından yapılmıştır.' : 'was made by suerta.co.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
