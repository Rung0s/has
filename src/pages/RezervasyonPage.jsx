import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalendarDays, Users, Utensils, MessageCircle, Phone, Mail, ArrowLeft, Check } from 'lucide-react';
import clientData from '../data/client.json';
import configData from '../data/site-config.json';
import items from '../data/items.json';
import { track } from '../lib/analytics';

const todayStr = () => new Date().toISOString().split('T')[0];
const plusDays = (base, n) => {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};
const fmt = (s) => (s ? new Date(s).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-');
const nights = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));

const RezervasyonPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    checkIn: todayStr(),
    checkOut: plusDays(todayStr(), 1),
    adults: 2,
    children: 0,
    room: items[0]?.title?.tr || '',
    breakfast: 'dahil',
    hamam: 'hayir',
    note: '',
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = useMemo(
    () =>
      [
        '*Web sitesinden rezervasyon talebi*',
        `Ad Soyad: ${form.name || '-'}`,
        `Telefon: ${form.phone || '-'}`,
        `Giriş: ${fmt(form.checkIn)}`,
        `Çıkış: ${fmt(form.checkOut)} (${nights(form.checkIn, form.checkOut)} gece)`,
        `Kişi: ${form.adults} yetişkin${Number(form.children) > 0 ? `, ${form.children} çocuk` : ''}`,
        `Oda tipi: ${form.room || 'Fark etmez'}`,
        `Kahvaltı: ${form.breakfast === 'dahil' ? 'Dâhil' : 'Hariç (sadece oda)'}`,
        `Hamam kullanımı: ${form.hamam === 'evet' ? 'İlgileniyorum' : 'Hayır'}`,
        form.note ? `Not: ${form.note}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    [form]
  );

  const waHref = `https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${clientData.email}?subject=${encodeURIComponent(
    `Rezervasyon talebi — ${fmt(form.checkIn)} / ${fmt(form.checkOut)}`
  )}&body=${encodeURIComponent(message.replace(/\*/g, ''))}`;

  const submit = (channel) => (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Lütfen ad soyad ve telefon bilgisini girin.');
      return;
    }
    track('reservation_request', {
      channel,
      nights: nights(form.checkIn, form.checkOut),
      adults: Number(form.adults),
      breakfast: form.breakfast,
      room_type: form.room,
    });
    window.open(channel === 'whatsapp' ? waHref : mailHref, '_blank');
    setSent(true);
  };

  const label = 'block text-[11px] font-semibold tracking-widest uppercase text-primary/50 mb-2';
  const field =
    'w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.hashotel.com/rezervasyon',
        name: 'Rezervasyon talebi — Has Termal Otel',
        description:
          'Has Termal Otel için tarih, kişi sayısı ve kahvaltı tercihinizi ileterek müsaitlik ve fiyat talebi oluşturun. Talepler WhatsApp veya e-posta ile iletilir.',
        about: { '@id': 'https://www.hashotel.com/#hotel' },
        potentialAction: {
          '@type': 'ReserveAction',
          target: { '@type': 'EntryPoint', urlTemplate: 'https://www.hashotel.com/rezervasyon' },
          result: { '@type': 'LodgingReservation', name: 'Has Termal Otel konaklama talebi' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hashotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Rezervasyon', item: 'https://www.hashotel.com/rezervasyon' },
        ],
      },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Rezervasyon Talebi | Has Termal Otel Eskişehir</title>
        <meta
          name="description"
          content="Has Termal Otel rezervasyon talebi: tarih, kişi sayısı, oda tipi ve kahvaltı tercihinizi iletin; müsaitlik ve fiyat bilgisi WhatsApp ya da e-posta ile dönelim. 0530 433 85 87."
        />
        <link rel="canonical" href="https://www.hashotel.com/rezervasyon" />
        <meta property="og:title" content="Rezervasyon Talebi | Has Termal Otel" />
        <meta property="og:description" content="Tarih ve kişi sayısını iletin, müsaitlik ve fiyatı hemen dönelim." />
        <meta property="og:url" content="https://www.hashotel.com/rezervasyon" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <header className="pt-32 pb-12 bg-primary text-secondary">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary/60 hover:text-accent transition-colors text-sm mb-8">
            <ArrowLeft size={18} /> Ana Sayfa
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05]">Rezervasyon talebi</h1>
          <p className="mt-5 text-secondary/80 leading-relaxed max-w-2xl">
            Formu doldurun, talebiniz hazır mesaj hâlinde WhatsApp’a ya da e-postaya taşınsın. Müsaitlik ve
            fiyat bilgisini en kısa sürede dönüyoruz. Acele durumlar için doğrudan {clientData.phone}.
          </p>
          <p className="mt-3 text-sm text-secondary/60">
            Giriş {configData.policies.checkIn} · Çıkış {configData.policies.checkOut} · Açık büfe kahvaltı 08:00–10:00
          </p>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <form className="grid sm:grid-cols-2 gap-5" onSubmit={submit('whatsapp')}>
          <div className="sm:col-span-2 grid sm:grid-cols-2 gap-5">
            <div>
              <label className={label} htmlFor="r-name">Ad soyad *</label>
              <input id="r-name" className={field} value={form.name} onChange={set('name')} placeholder="Adınız Soyadınız" required />
            </div>
            <div>
              <label className={label} htmlFor="r-phone">Telefon *</label>
              <input id="r-phone" className={field} value={form.phone} onChange={set('phone')} placeholder="05xx xxx xx xx" inputMode="tel" required />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="r-in"><CalendarDays size={13} className="inline mr-1 text-accent" /> Giriş tarihi</label>
            <input id="r-in" type="date" className={field} min={todayStr()} value={form.checkIn}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => ({ ...f, checkIn: v, checkOut: v >= f.checkOut ? plusDays(v, 1) : f.checkOut }));
              }} />
          </div>
          <div>
            <label className={label} htmlFor="r-out"><CalendarDays size={13} className="inline mr-1 text-accent" /> Çıkış tarihi</label>
            <input id="r-out" type="date" className={field} min={plusDays(form.checkIn, 1)} value={form.checkOut} onChange={set('checkOut')} />
          </div>

          <div>
            <label className={label} htmlFor="r-adults"><Users size={13} className="inline mr-1 text-accent" /> Yetişkin</label>
            <select id="r-adults" className={field} value={form.adults} onChange={set('adults')}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} kişi</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="r-children">Çocuk</label>
            <select id="r-children" className={field} value={form.children} onChange={set('children')}>
              {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="r-room">Oda tipi</label>
            <select id="r-room" className={field} value={form.room} onChange={set('room')}>
              <option value="">Fark etmez</option>
              {items.map((r) => <option key={r.id} value={r.title.tr}>{r.title.tr}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="r-breakfast"><Utensils size={13} className="inline mr-1 text-accent" /> Kahvaltı</label>
            <select id="r-breakfast" className={field} value={form.breakfast} onChange={set('breakfast')}>
              <option value="dahil">Dâhil olsun</option>
              <option value="haric">Hariç (sadece oda)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={label} htmlFor="r-hamam">Has Hamam kullanımı</label>
            <select id="r-hamam" className={field} value={form.hamam} onChange={set('hamam')}>
              <option value="hayir">İlgilenmiyorum</option>
              <option value="evet">Hamam / kese-köpük için bilgi istiyorum</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={label} htmlFor="r-note">Eklemek istedikleriniz</label>
            <textarea id="r-note" rows={4} className={field} value={form.note} onChange={set('note')} placeholder="Örn. erken giriş, bitişik oda, kurumsal fatura…" />
          </div>

          <div className="sm:col-span-2 rounded-2xl bg-secondary/70 border border-primary/10 p-4 text-sm text-primary/70">
            <strong className="text-primary">Özet:</strong> {fmt(form.checkIn)} – {fmt(form.checkOut)} ·{' '}
            {nights(form.checkIn, form.checkOut)} gece · {form.adults} yetişkin
            {Number(form.children) > 0 ? `, ${form.children} çocuk` : ''} ·{' '}
            {form.breakfast === 'dahil' ? 'kahvaltı dâhil' : 'kahvaltı hariç'}
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all">
              <MessageCircle size={18} /> WhatsApp ile gönder
            </button>
            <button type="button" onClick={submit('email')} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-primary/20 font-semibold text-primary hover:border-accent hover:text-accent transition-all">
              <Mail size={18} /> E-posta ile gönder
            </button>
            <a href={`tel:${clientData.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-primary/20 font-semibold text-primary hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> {clientData.phone}
            </a>
          </div>

          {sent && (
            <p className="sm:col-span-2 inline-flex items-center gap-2 text-accent font-medium">
              <Check size={18} /> Talebiniz hazırlandı. Mesaj penceresi açılmadıysa {clientData.phone} numarasından ulaşabilirsiniz.
            </p>
          )}
        </form>

        <p className="mt-8 text-sm text-primary/55">
          Kişisel verileriniz yalnızca talebinizin yanıtlanması amacıyla kullanılır; ayrıntı için{' '}
          <Link to="/iletisim" className="text-accent underline decoration-accent/30 underline-offset-4">KVKK aydınlatma metni</Link>.
          Oda tipleri için <Link to="/odalar" className="text-accent underline decoration-accent/30 underline-offset-4">odalarımıza</Link>,
          hamam için <Link to="/hamam" className="text-accent underline decoration-accent/30 underline-offset-4">Has Hamam</Link> sayfasına bakabilirsiniz.
        </p>
      </main>
    </div>
  );
};

export default RezervasyonPage;
