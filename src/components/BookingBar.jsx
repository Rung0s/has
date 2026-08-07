import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Users, MessageCircle, LogIn, LogOut } from 'lucide-react';
import clientData from '../data/client.json';
import configData from '../data/site-config.json';

const todayStr = () => new Date().toISOString().split('T')[0];
const tomorrowStr = () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};
const fmt = (s) => {
  if (!s) return '';
  const d = new Date(s);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BookingBar = () => {
  const [checkIn, setCheckIn] = useState(todayStr());
  const [checkOut, setCheckOut] = useState(tomorrowStr());
  const [guests, setGuests] = useState(2);

  const wa = clientData.whatsapp.replace(/[^0-9]/g, '');
  const msg = encodeURIComponent(
    `Merhaba, ${fmt(checkIn)} – ${fmt(checkOut)} tarihleri için ${guests} kişilik oda müsaitliği ve fiyat bilgisi alabilir miyim?`
  );
  const waHref = `https://wa.me/${wa}?text=${msg}`;

  const field = "flex flex-col gap-1.5";
  const labelC = "text-[11px] font-semibold tracking-widest uppercase text-primary/50";
  const inputC = "bg-transparent text-primary font-medium text-sm sm:text-base focus:outline-none cursor-pointer w-full";

  return (
    <section className="relative z-30 px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1200px] mx-auto bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-primary/5 p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_0.9fr_auto] gap-4 md:gap-2 md:items-center">

          {/* Check-in */}
          <div className={`${field} md:px-5 md:border-r md:border-primary/10`}>
            <span className={labelC}>Giriş Tarihi</span>
            <div className="flex items-center gap-2 text-accent">
              <CalendarDays size={18} className="shrink-0" />
              <input type="date" value={checkIn} min={todayStr()}
                onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); setCheckOut(d.toISOString().split('T')[0]); } }}
                className={inputC} />
            </div>
          </div>

          {/* Check-out */}
          <div className={`${field} md:px-5 md:border-r md:border-primary/10`}>
            <span className={labelC}>Çıkış Tarihi</span>
            <div className="flex items-center gap-2 text-accent">
              <CalendarDays size={18} className="shrink-0" />
              <input type="date" value={checkOut} min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)} className={inputC} />
            </div>
          </div>

          {/* Guests */}
          <div className={`${field} md:px-5 md:border-r md:border-primary/10`}>
            <span className={labelC}>Misafir</span>
            <div className="flex items-center gap-2 text-accent">
              <Users size={18} className="shrink-0" />
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={`${inputC} appearance-none`}>
                <option value={1}>1 Kişi</option>
                <option value={2}>2 Kişi</option>
                <option value={3}>3 Kişi</option>
                <option value={4}>4 Kişi</option>
              </select>
            </div>
          </div>

          {/* CTA */}
          <a href={waHref} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-4 md:py-5 bg-accent text-white rounded-2xl font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:-translate-y-0.5 whitespace-nowrap">
            <MessageCircle size={18} />
            Müsaitlik Sorgula
          </a>
        </div>

        {/* Check-in / Check-out time note */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-primary/5 text-xs sm:text-sm text-primary/60">
          <span className="inline-flex items-center gap-1.5"><LogIn size={15} className="text-accent" /> Giriş saati: <strong className="text-primary font-semibold">{configData.policies.checkIn}</strong></span>
          <span className="inline-flex items-center gap-1.5"><LogOut size={15} className="text-accent" /> Çıkış saati: <strong className="text-primary font-semibold">{configData.policies.checkOut}</strong></span>
          <span className="inline-flex items-center gap-1.5 text-accent font-medium">Kahvaltı dâhil</span>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingBar;
