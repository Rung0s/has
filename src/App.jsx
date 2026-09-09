import React, { useEffect } from 'react'
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
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import LocationMap from './components/LocationMap'
import RoomsPage from './pages/RoomsPage'
import AboutSection from './components/AboutSection'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AmenitiesPage from './pages/AmenitiesPage'
import NotFound from './pages/NotFound'
import HamamPage from './pages/HamamPage'
import TermalPage from './pages/TermalPage'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Bölüm sırasını HER OTELDE değiştir (basmakalıbı kır). SignatureShowcase
// config.signature boşsa kendini gizler; istemiyorsan bu satırı sil.
// Has Termal: Termal imza bölümü öne, ardından 50 yıllık hikaye (About)
const Home = () => (
  <>
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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Helmet>
        <title>Has Termal Otel | Eskişehir Odunpazarı Termal Otel, Kaplıca & Hamam</title>
        <meta name="description" content="Eskişehir'in kalbinde 50 yıllık termal otel. Şifalı termal havuz, Has Hamam Türk hamamı ve seçili odalarda jakuzili banyo. Kahvaltı dâhil, şehir merkezinde konforlu konaklama." />
        <meta name="keywords" content="Has Termal Otel, Eskişehir termal otel, Odunpazarı otel, Eskişehir kaplıca, termal havuz, Türk hamamı otel, jakuzili oda Eskişehir, Hamamyolu otel" />
        <link rel="canonical" href="https://www.hashotel.com/" />
        <meta property="og:title" content="Has Termal Otel | Eskişehir'in Kalbinde Şifalı Termal Konaklama" />
        <meta property="og:description" content="Odunpazarı Hamamyolu'nda 50 yıllık termal otel. Termal havuz, Has Hamam ve konforlu odalar. Kahvaltı dâhil." />
      </Helmet>
      <div className="w-full min-h-screen bg-secondary flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <MobileCTA />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  )
}

export default App
