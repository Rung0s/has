import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Waves, Heart, Award, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clientData from '../data/client.json';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  const highlights = [
    { icon: Waves, title: "Şifalı Termal Su", desc: "Yer altından kaynayan, yüksek mineral içerikli termal suyumuz kapalı havuzumuzu ~36°C'de besler. Geleneksel olarak romatizma ve ağrılarda rahatlatıcı etkisiyle bilinir." },
    { icon: MapPin, title: "Şehrin Tam Merkezi", desc: "Odunpazarı Hamamyolu'nda; çarşı, Cam Sanatları Müzesi ve Odunpazarı Evleri yürüme mesafesinde. Ulaşımı son derece kolay." },
    { icon: Heart, title: "50 Yıllık Aile İşletmesi", desc: "yarım asırdır Eskişehir'de misafir ağırlayan, Kültür ve Turizm Bakanlığı işletme belgeli köklü bir tesis." },
    { icon: Clock, title: "7/24 Resepsiyon", desc: "Gece yarısı vardığınızda bile sizi karşılayacak güler yüzlü ekibimiz her an burada." },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <Helmet>
        <title>{t('navbar.about')} | Has Termal Otel</title>
        <meta name="description" content="Eskişehir Odunpazarı'nda 50 yıllık Has Termal Otel. Şifalı termal su, Has Hamam ve konforlu odalarımızla tanışın; hikayemizi keşfedin." />
        <link rel="canonical" href="https://www.hashotel.com/hakkimizda" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-12 font-medium">
          <ArrowLeft size={20} />
          {t('back_to_home', 'Ana Sayfaya Dön')}
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">{t('navbar.about')}</h1>

        <p className="text-2xl font-light text-primary/70 leading-relaxed mb-12 border-l-4 border-primary/20 pl-6">
          Eskişehir'in tam merkezinde, şifalı termal suyu köklü bir konukseverlikle buluşturan bir durak. Has Termal Otel; 50 yıldır misafirlerine huzur, sağlık ve dinlenme sunuyor.
        </p>
        
        <div className="rounded-3xl overflow-hidden mb-16 h-[400px]">
          <img loading="lazy" 
            src="/about-2.webp" 
            alt={clientData.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-secondary rounded-2xl p-6 border border-primary/5">
              <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary/60" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{title}</h3>
              <p className="text-sm text-primary/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="prose prose-lg max-w-none prose-p:text-primary/70 prose-headings:text-primary mb-16">
          <h2 className="text-2xl font-bold mb-4">
            {lng === 'tr' ? "Biz Kimiz?" : "Who Are We?"}
          </h2>
          <p className="mb-4">
            Has Termal Otel, Eskişehir Odunpazarı Hamamyolu Caddesi'nde 50 yılı aşkın süredir hizmet veren, Kültür ve Turizm Bakanlığı işletme belgeli köklü bir aile işletmesidir. Kuruluşumuzdan bu yana temel ilkemiz hep aynı olmuştur: Her misafirimize şifa, huzur ve temiz bir ortam sunmak.
          </p>
          <p className="mb-4">
            Tesisimizin en büyük ayrıcalığı, yer altından kaynayan şifalı termal suyudur. Kapalı termal havuzumuz ve Has Hamam Türk hamamımızla klasik bir arınma deneyimi sunuyoruz. 48 odamızda özel banyo bulunur; seçili odalarımızda jakuzili banyo ile termal konforu odanızın mahremiyetinde de yaşarsınız.
          </p>
          <p>
            Şehrin tam merkezinde olmamız sayesinde Eskişehir çarşısı, Cam Sanatları Müzesi, Odunpazarı Evleri ve tarihi noktalar yürüme mesafenizdedir. Zengin açık büfe kahvaltımız konaklamaya dâhildir. Hem şehir gezisi hem de sağlıklı bir mola için Has Termal Otel, Eskişehir'de doğru tercihtir.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-primary/10 text-center">
          <div>
            <p className="text-4xl font-light text-primary mb-1">4.2</p>
            <p className="text-xs text-primary/50">Google Puanı</p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary mb-1">48</p>
            <p className="text-xs text-primary/50">Termal Oda</p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary mb-1">45<span className="text-2xl"> yıl</span></p>
            <p className="text-xs text-primary/50">Tecrübe</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
