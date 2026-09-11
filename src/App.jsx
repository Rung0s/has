import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingBar from './components/BookingBar'
import SignatureShowcase from './components/SignatureShowcase'
import HamamSection from './components/HamamSection'
import FAQ from './components/FAQ'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import RoomsSection from './components/RoomCard'
import CorporateCTA from './components/CorporateCTA'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LocationMap from './components/LocationMap'
import AboutSection from './components/AboutSection'
import { initAnalytics, trackPageView } from './lib/analytics'

const BlogList = lazy(() => import('./pages/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const RoomsPage = lazy(() => import('./pages/RoomsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AmenitiesPage = lazy(() => import('./pages/AmenitiesPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const HamamPage = lazy(() => import('./pages/HamamPage'))
const TermalPage = lazy(() => import('./pages/TermalPage'))
const KonumPage = lazy(() => import('./pages/KonumPage'))
const KurumsalPage = lazy(() => import('./pages/KurumsalPage'))
const SssPage = lazy(() => import('./pages/SssPage'))
const RezervasyonPage = lazy(() => import('./pages/RezervasyonPage'))
const FiyatlarPage = lazy(() => import('./pages/FiyatlarPage'))

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <span className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
  </div>
)

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

// Bölüm sırasını HER OTELDE değiştir (basmakalıbı kır). SignatureShowcase
// config.signature boşsa kendini gizler; istemiyorsan bu satırı sil.
// Has Termal: Termal imza bölümü öne, ardından 50 yıllık hikaye (About)
const Home = () => (
  <>
    <Helmet>
      <title>Eskişehir Termal Otel & Türk Hamamı | Has Termal Otel</title>
      <meta name="description" content="Eskişehir Odunpazarı'nda 50 yıllık termal otel: şifalı termal havuz, Has Hamam Türk hamamı, kahvaltı dâhil konaklama. Şehir merkezinde, çarşıya sıfır." />
      <meta name="keywords" content="Has Termal Otel, Eskişehir termal otel, Odunpazarı otel, Eskişehir kaplıca, termal havuz, Türk hamamı otel, jakuzili oda Eskişehir, Hamamyolu otel" />
      <link rel="canonical" href="https://www.hastermalotel.com/" />
      <meta property="og:url" content="https://www.hastermalotel.com/" />
      <meta property="og:image" content="https://www.hastermalotel.com/og-image.png" />
      <meta property="twitter:title" content="Has Termal Otel | Eskişehir Şifalı Termal Konaklama" />
      <meta property="twitter:description" content="Odunpazarı Hamamyolu'nda 50 yıllık termal otel. Termal havuz, Has Hamam ve konforlu odalar. Kahvaltı dâhil." />
      <meta property="twitter:url" content="https://www.hastermalotel.com/" />
      <meta property="og:title" content="Has Termal Otel | Eskişehir'in Kalbinde Şifalı Termal Konaklama" />
      <meta property="og:description" content="Odunpazarı Hamamyolu'nda 50 yıllık termal otel. Termal havuz, Has Hamam ve konforlu odalar. Kahvaltı dâhil." />
    </Helmet>
    <Hero />
    <BookingBar />
    <RoomsSection />
    <SignatureShowcase />
    <HamamSection />
    <AboutSection />
    <Gallery />
    <Amenities />
    <Testimonials />
    <CorporateCTA />
    <LocationMap />
    <FAQ />
    <Blog />
  </>
)

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-secondary flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/odalar" element={<RoomsPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/bloglar" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/imkanlar" element={<AmenitiesPage />} />
            <Route path="/hamam" element={<HamamPage />} />
            <Route path="/termal" element={<TermalPage />} />
            <Route path="/konum" element={<KonumPage />} />
            <Route path="/kurumsal" element={<KurumsalPage />} />
            <Route path="/sss" element={<SssPage />} />
            <Route path="/rezervasyon" element={<RezervasyonPage />} />
            <Route path="/fiyatlar" element={<FiyatlarPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </div>
        <Footer />
        <MobileCTA />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  )
}

export default App
