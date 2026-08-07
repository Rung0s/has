import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import blogs from '../data/blogs.json';

const BlogList = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <div className="pt-32 pb-24 bg-secondary min-h-screen">
      <Helmet>
        <title>Blog ve Haberler | Has Termal Otel</title>
        <meta name="description" content="Has Termal Otel blog ve haberler. Eskişehir termal turizmi, Odunpazarı gezi rehberi, kaplıca kürü ipuçları ve konaklama hakkında makaleler." />
        <link rel="canonical" href="https://www.hashotel.com/bloglar" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-6 font-medium">
            <ArrowLeft size={20} />
            {t('back_to_home', 'Ana Sayfaya Dön')}
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">{t('blog.all_articles_title', 'Tüm Haberler ve Makaleler')}</h1>
          <p className="text-xl text-primary/60">{t('blog.all_articles_subtitle', 'Bölge hakkında en son seyahat ipuçları ve güncellemeler.')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div 
              key={blog.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-primary/5 overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden">
                <img loading="lazy" 
                  src={blog.image} 
                  alt={blog.title[lng] || blog.title.tr} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-medium text-primary mb-8 leading-snug line-clamp-3">
                  {blog.title[lng] || blog.title.tr}
                </h3>
                <div className="mt-auto flex items-center justify-between text-sm mb-6">
                  <span className="text-accent font-medium">{blog.category[lng] || blog.category.tr}</span>
                  <span className="text-primary/40">{blog.date}</span>
                </div>
                <Link 
                  to={`/blog/${blog.id}`} 
                  className="w-full py-3 text-center bg-secondary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
                >
                  {t('blog.read_article')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogList;
