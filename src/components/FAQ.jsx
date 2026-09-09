import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Plus, Minus } from 'lucide-react';
import faqData from '../data/faq.json';

const FAQ = ({ items = faqData, title = 'Sık Sorulan Sorular', eyebrow = 'Merak edilenler', withSchema = true }) => {
  const [open, setOpen] = useState(0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="sss" className="bg-secondary py-20 md:py-28">
      {withSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            <span className="w-8 h-px bg-accent" />
            {eyebrow}
            <span className="w-8 h-px bg-accent" />
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary">{title}</h2>
        </div>

        <div className="divide-y divide-primary/10 border-y border-primary/10">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left py-5 group"
                  >
                    <span className={`font-medium text-base sm:text-lg transition-colors ${isOpen ? 'text-accent' : 'text-primary group-hover:text-accent'}`}>
                      {f.q}
                    </span>
                    <span className="shrink-0 mt-1 w-7 h-7 rounded-full border border-primary/15 grid place-items-center text-accent">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                </h3>
                <div className={isOpen ? 'pb-6 pr-12' : 'hidden'}>
                  <p className="text-primary/70 leading-relaxed">{f.a}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
