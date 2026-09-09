import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle, Navigation, Droplets, Flame, Sparkles, Clock } from 'lucide-react';
import clientData from '../data/client.json';

const hamam = clientData.hamam;

const ritual = [
  {
    icon: Flame,
    title: 'Sıcaklık & göbek taşı',
    text: 'Mermer göbek taşında ısınma, gözeneklerin açılması ve klasik hamam terletmesi.',
  },
  {
    icon: Sparkles,
    title: 'Kese & köpük',
    text: 'Deneyimli tellaklarımızla geleneksel kese, ardından bol köpük masajı.',
  },
  {
    icon: Droplets,
    title: 'Termal su & sauna',
    text: 'Kurnalarda akan şifalı termomineral su, sauna ve buhar odasıyla tamamlanan arınma.',
  },
];

const HamamSection = () => {
  const waHref = `https://wa.me/${hamam.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Merhaba, Has Hamam için seans saatleri ve fiyat bilgisi alabilir miyim?'
  )}`;

  return (
    <section id="has-hamam" className="relative bg-primary text-secondary overflow-hidden">
      {/* üst kenar dokusu */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">

          {/* Görsel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-black/40">
              <img
                src="/hamam-1.webp"
                alt="Has Hamam — Eskişehir Odunpazarı'nda tarihi Türk hamamı, mermer kurnalar ve göbek taşı"
                width="1800"
                height="1100"
                loading="lazy"
                className="w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            </div>

            {/* küçük cephe kartı */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 lg:-right-10 w-44 lg:w-56 rounded-2xl overflow-hidden border-4 border-primary shadow-xl">
              <img
                src="/hamam-2.webp"
                alt="Has Hamam girişi — Hamamyolu Caddesi'ndeki HAS HAMAM tabelası"
                width="1400"
                height="1000"
                loading="lazy"
                className="w-full h-28 lg:h-36 object-cover"
              />
            </div>
          </motion.div>

          {/* İçerik */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
              <span className="w-8 h-px bg-accent" />
              Otelin içinde, ayrı girişiyle
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05]">
              Has Hamam
            </h2>

            <p className="mt-5 text-secondary/75 text-base sm:text-lg leading-relaxed">
              Hamamyolu Caddesi'nin adını aldığı hamam geleneğini, Has Termal Otel'in içindeki
              <strong className="text-secondary font-semibold"> Has Hamam</strong> sürdürüyor. Yer altından
              çıkan şifalı termomineral suyla beslenen mermer kurnalarda kese, köpük, sauna ve buhar odası
              hizmeti veriyoruz. Otelde konaklamadan, dışarıdan misafir olarak da gelebilirsiniz.
            </p>

            <div className="mt-8 space-y-4">
              {ritual.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 grid place-items-center">
                    <r.icon size={19} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{r.title}</h3>
                    <p className="text-sm text-secondary/65 leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-secondary/[0.06] border border-secondary/10 p-4">
              <Clock size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-secondary/75 leading-relaxed">
                <strong className="text-secondary font-semibold">Seans düzeni:</strong> Salı günleri hamam ve
                kaplıca yalnızca hanım misafirlerimize, diğer günler bay misafirlerimize hizmet verir. Güncel
                saat ve ücretler için bizi arayın.
              </p>
            </div>

            {/* İletişim + harita */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${hamam.phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-3 rounded-2xl bg-secondary/[0.06] border border-secondary/10 p-4 hover:border-accent/40 transition-colors"
              >
                <Phone size={18} className="text-accent shrink-0" />
                <span>
                  <span className="block text-[11px] uppercase tracking-widest text-secondary/45">Hamam hattı</span>
                  <span className="block font-semibold group-hover:text-accent transition-colors">{hamam.phone}</span>
                </span>
              </a>

              <a
                href={hamam.map_url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-secondary/[0.06] border border-secondary/10 p-4 hover:border-accent/40 transition-colors"
              >
                <MapPin size={18} className="text-accent shrink-0" />
                <span>
                  <span className="block text-[11px] uppercase tracking-widest text-secondary/45">Google Maps</span>
                  <span className="block font-semibold group-hover:text-accent transition-colors">Hamamyolu Cad. No:7</span>
                </span>
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-black/20"
              >
                <MessageCircle size={18} /> WhatsApp'tan sor
              </a>
              <a
                href={hamam.map_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-secondary/25 font-semibold hover:border-accent hover:text-accent transition-all"
              >
                <Navigation size={18} /> Yol tarifi al
              </a>
            </div>
          </motion.div>
        </div>

        {/* Harita */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 lg:mt-20 rounded-[28px] overflow-hidden border border-secondary/10"
        >
          <iframe
            title="Has Hamam konumu — Hamamyolu Caddesi No:7, Odunpazarı / Eskişehir"
            src={hamam.map_embed}
            className="w-full h-[300px] sm:h-[380px] grayscale-[0.25] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HamamSection;
