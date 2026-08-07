import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogs from '../data/blogs.json';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';

  return (
    <section className="py-20 bg-white" id="blog">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching main theme */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('blog.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary/60 max-w-2xl mx-auto mb-10"
          >
            {t('blog.subtitle')}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div 
              key={blog.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/blog/${blog.id}`} 
                className="block group"
              >
                {/* Desktop View */}
                <div className="hidden md:block relative aspect-[4/3] xl:aspect-[3/2] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                  <img loading="lazy" 
                    src={blog.image} 
                    alt={blog.title[lng] || blog.title.tr} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 text-xs mb-4">
                      <span className="px-3 py-1 bg-accent text-white rounded-full font-medium shadow-sm">
                        {blog.category[lng] || blog.category.tr}
                      </span>
                      <span className="text-white/80 font-medium">
                        {blog.date}
                      </span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white leading-snug line-clamp-3 mb-4 group-hover:text-accent transition-colors">
                      {blog.title[lng] || blog.title.tr}
                    </h3>
                    <span className="text-white text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      {t('blog.read_article')} <span className="text-accent text-lg leading-none">&rarr;</span>
                    </span>
                  </div>
                </div>

                {/* Mobile View (Horizontal List) */}
                <div className="md:hidden bg-secondary rounded-2xl border border-primary/5 overflow-hidden flex flex-row items-center p-3 gap-4 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img loading="lazy" 
                      src={blog.image} 
                      alt={blog.title[lng] || blog.title.tr} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 py-1 pr-2">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="text-accent font-medium">{blog.category[lng] || blog.category.tr}</span>
                      <span className="text-primary/40">{blog.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-primary leading-snug line-clamp-2 mb-2">
                      {blog.title[lng] || blog.title.tr}
                    </h3>
                    <span className="text-accent text-xs font-medium inline-flex items-center gap-1">
                      {t('blog.read_article')} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/bloglar" 
            className="inline-flex px-8 py-3 bg-secondary text-primary rounded-full font-medium border border-primary/10 hover:bg-primary/5 transition-colors"
          >
            {t('blog.view_all_articles', 'Tüm Yazıları Gör')}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Blog;
