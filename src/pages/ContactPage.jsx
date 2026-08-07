import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';
import LocationMap from '../components/LocationMap';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';
  const [isKvkkModalOpen, setIsKvkkModalOpen] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const text = `*Web Sitesinden Yeni Mesaj/Teklif*
Ad Soyad: ${data.name || '-'}
Telefon: ${data.phone || '-'}
Firma Adı: ${data.company || '-'}
Talep Türü: ${data.type || '-'}

*Mesaj:*
${data.message || '-'}`.trim();

    const whatsappUrl = `https://wa.me/${clientData.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText(clientData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const KvkkModal = () => {
    if (!isKvkkModalOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl relative text-left">
          <button 
            type="button" 
            onClick={() => setIsKvkkModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-secondary rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            <X size={20} />
          </button>
          <h3 className="text-2xl font-bold text-primary mb-6 pr-8">
            {lng === 'tr' ? 'KVKK Aydınlatma Metni' : 'Privacy Policy (KVKK)'}
          </h3>
          <div className="overflow-y-auto pr-2 text-sm text-primary/70 leading-relaxed space-y-4">
            {lng === 'tr' ? (
              <>
                <p className="font-semibold text-primary">1. Veri Sorumlusu</p>
                <p>Has Termal Otel olarak, kişisel verilerinizin güvenliği ve gizliliğine büyük önem vermekteyiz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, verileriniz aşağıda açıklanan şartlarda işlenecektir.</p>
                <p className="font-semibold text-primary">2. Kişisel Verilerin Hangi Amaçla İşleneceği</p>
                <p>Web sitemiz üzerinden bizimle paylaştığınız adınız, soyadınız, telefon numaranız, firma adınız ve mesaj içeriğiniz; taleplerinizin yanıtlanması, rezervasyon işlemlerinizin gerçekleştirilmesi, sizinle iletişim kurulması ve kurumsal taleplerinizin değerlendirilmesi amaçlarıyla sınırlı olarak işlenecektir.</p>
                <p className="font-semibold text-primary">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</p>
                <p>Kişisel verileriniz, yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşları hariç olmak üzere, kesinlikle hiçbir üçüncü taraf veya kurumla paylaşılmamaktadır.</p>
                <p className="font-semibold text-primary">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</p>
                <p>Kişisel verileriniz, bu iletişim formu vasıtasıyla elektronik ortamda toplanmakta olup, kanunun 5/2-c maddesinde belirtilen "sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması" ve 5/2-f maddesindeki "meşru menfaat" hukuki sebeplerine dayanarak işlenmektedir.</p>
                <p className="font-semibold text-primary">5. Veri Sahibi Olarak Haklarınız</p>
                <p>KVKK'nın 11. maddesi uyarınca, otelimize başvurarak verilerinizin silinmesini, düzeltilmesini veya işlenip işlenmediğini öğrenmeyi talep edebilirsiniz. Haklarınızı kullanmak için otelimizin iletişim kanallarından bize ulaşabilirsiniz.</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-primary">1. Data Controller</p>
                <p>As Has Termal Otel, we attach great importance to the security and privacy of your personal data. Within the scope of the Personal Data Protection Law No. 6698 ("KVKK"), your data will be processed under the conditions explained below.</p>
                <p className="font-semibold text-primary">2. Purpose of Processing Personal Data</p>
                <p>Your name, surname, phone number, company name, and message content shared with us via our website will be processed solely to respond to your requests, perform reservation procedures, communicate with you, and evaluate your corporate requests.</p>
                <p className="font-semibold text-primary">3. To Whom and for What Purpose Processed Personal Data Can Be Transferred</p>
                <p>Your personal data is strictly not shared with any third party or institution, except for authorized public institutions and organizations for the fulfillment of legal obligations.</p>
                <p className="font-semibold text-primary">4. Method and Legal Grounds of Collecting Personal Data</p>
                <p>Your personal data is collected electronically through this contact form and is processed based on the legal grounds of "being directly related to the establishment or performance of a contract" (Article 5/2-c) and "legitimate interest" (Article 5/2-f).</p>
                <p className="font-semibold text-primary">5. Your Rights as a Data Subject</p>
                <p>Under Article 11 of the KVKK, you can apply to our hotel to request deletion, correction, or to learn whether your data has been processed. You can reach us via our contact channels to exercise your rights.</p>
              </>
            )}
          </div>
          <button 
            type="button" 
            onClick={() => setIsKvkkModalOpen(false)}
            className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-colors"
          >
            {lng === 'tr' ? 'Kapat ve Devam Et' : 'Close and Continue'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 bg-secondary min-h-screen overflow-x-hidden">
      <Helmet>
        <title>{t('contact.title')} | Has Termal Otel</title>
        <meta name="description" content={lng === 'tr' ? "Has Termal Otel iletişim bilgileri. Bize telefon, e-posta veya WhatsApp üzerinden kolayca ulaşabilirsiniz." : "Has Termal Otel contact details. You can easily reach us via phone, email or WhatsApp."} />
        <link rel="canonical" href="https://www.hashotel.com/iletisim" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">{t('contact.title')}</h1>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">{t('contact.contact_info')}</h3>
              
              <div className="space-y-6">
                <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary/60 mb-1">{t('contact.landline')}</p>
                    <p className="text-lg font-medium text-primary group-hover:text-accent transition-colors">{clientData.phone}</p>
                  </div>
                </a>

                <a href={`tel:${clientData.mobile.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary/60 mb-1">{t('contact.mobile')}</p>
                    <p className="text-lg font-medium text-primary group-hover:text-accent transition-colors">{clientData.mobile}</p>
                  </div>
                </a>

                <a href={`mailto:${clientData.email}`} onClick={handleEmailClick} className="flex items-start gap-4 group text-left w-full">
                  <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary/60 mb-1">
                      {t('contact.email')}
                      {copiedEmail && (
                        <span className="ml-2 text-xs font-semibold text-accent">
                          ({lng === 'tr' ? 'Kopyalandı!' : 'Copied!'})
                        </span>
                      )}
                    </p>
                    <p className="text-lg font-medium text-primary group-hover:text-accent transition-colors break-all">{clientData.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-primary/60 mb-1">{t('contact.address')}</p>
                    <p className="text-lg font-medium text-primary leading-snug">{clientData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">{t('contact.form_title')}</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-2">{t('contact.full_name')}</label>
                  <input name="name" type="text" className="w-full px-4 py-3 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-accent outline-none" placeholder={t('contact.full_name')} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-2">{t('contact.phone_number')}</label>
                  <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-accent outline-none" placeholder="05XX XXX XX XX" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-2">{t('contact.company')} <span className="text-primary/40 text-xs">{t('contact.company_hint')}</span></label>
                  <input name="company" type="text" className="w-full px-4 py-3 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-accent outline-none" placeholder={t('contact.company')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-2">{t('contact.request_type')}</label>
                  <select name="type" className="w-full px-4 py-3 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-accent outline-none text-primary/80 appearance-none">
                    <option value="Bireysel Konaklama / Bilgi">{t('contact.type_individual')}</option>
                    <option value="Kurumsal Konaklama (Pazarlama & Personel)">{t('contact.type_corporate')}</option>
                    <option value="Grup Rezervasyonu">{t('contact.type_group')}</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2">{t('contact.message')}</label>
                <textarea name="message" rows="4" className="w-full px-4 py-3 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-accent outline-none" placeholder={t('contact.message_placeholder')} required></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="kvkk" name="kvkk" required className="mt-1 w-4 h-4 text-accent border-primary/20 rounded focus:ring-accent cursor-pointer shrink-0" />
                <label htmlFor="kvkk" className="text-sm text-primary/70 cursor-pointer select-none">
                  {lng === 'tr' ? (
                    <>
                      Kişisel verilerimin <button type="button" onClick={() => setIsKvkkModalOpen(true)} className="text-accent underline font-medium hover:text-accent/80 focus:outline-none">KVKK Aydınlatma Metni</button> kapsamında işlenmesini onaylıyorum.
                    </>
                  ) : (
                    <>
                      I consent to the processing of my personal data under the <button type="button" onClick={() => setIsKvkkModalOpen(true)} className="text-accent underline font-medium hover:text-accent/80 focus:outline-none">Privacy Policy</button>.
                    </>
                  )}
                </label>
              </div>

              <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2 group">
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <LocationMap />
      
      {/* KVKK Modal */}
      <KvkkModal />
    </div>
  );
};

export default ContactPage;
