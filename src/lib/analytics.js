/**
 * Ölçüm katmanı — GA4 + dönüşüm olayları.
 *
 * GA4 kimliği src/data/site-config.json > analytics.ga4 alanına yazılır (örn. "G-XXXXXXXXXX").
 * Boş bırakılırsa hiçbir script yüklenmez, hiçbir istek gitmez.
 *
 * Otomatik izlenen dönüşümler (tüm sayfalarda, bileşenlere dokunmadan):
 *  - whatsapp_click : wa.me bağlantıları
 *  - phone_click    : tel: bağlantıları
 *  - email_click    : mailto: bağlantıları
 *  - map_click      : Google Maps bağlantıları
 *  - availability_query / reservation_request : ilgili formlardan elle tetiklenir
 */
import config from '../data/site-config.json';

const GA4_ID = (config.analytics && config.analytics.ga4) || '';

export const track = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // GA4 kurulu değilse olayları yine de dataLayer'a yaz (GTM veya sonraki kurulum için)
    window.dataLayer.push({ event: eventName, ...params });
  }
};

const classify = (href) => {
  if (!href) return null;
  if (href.includes('wa.me') || href.includes('api.whatsapp.com')) return 'whatsapp_click';
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (href.includes('google.com/maps') || href.includes('maps.google.com')) return 'map_click';
  return null;
};

export const initAnalytics = () => {
  if (typeof window === 'undefined' || window.__hasAnalyticsReady) return;
  window.__hasAnalyticsReady = true;

  if (GA4_ID) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { send_page_view: true });
  }

  // Dönüşüm bağlantılarını tek bir dinleyiciyle yakala
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      const eventName = classify(a.getAttribute('href'));
      if (!eventName) return;
      track(eventName, {
        link_url: a.getAttribute('href'),
        page_path: window.location.pathname,
        link_text: (a.textContent || '').trim().slice(0, 80),
      });
    },
    { capture: true }
  );
};

export const trackPageView = (path) => {
  if (!GA4_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href });
};
