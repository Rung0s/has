import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Helmet>
        <title>Sayfa Bulunamadı - 404 | Has Termal Otel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-9xl font-playfair font-bold text-accent mb-4">404</h1>
      <h2 className="text-3xl font-outfit font-semibold text-primary mb-6">Aradığınız Sayfa Bulunamadı</h2>
      <p className="text-primary/70 max-w-md mx-auto mb-8">
        Üzgünüz, ulaşmaya çalıştığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak ulaşılamıyor olabilir.
      </p>
      <Link 
        to="/" 
        className="px-8 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-all hover:scale-105 inline-block"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
