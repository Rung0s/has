import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import blogs from '../data/blogs.json';

const BlogPost = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'tr';
  
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen">
        <h2 className="text-3xl font-bold text-primary mb-4">{t('blog.not_found', 'Yazı Bulunamadı')}</h2>
        <Link to="/bloglar" className="text-accent hover:underline">{t('blog.back_to_list', 'Blog listesine dön')}</Link>
      </div>
    );
  }

  const currentTitle = blog.title ? (blog.title[lng] || blog.title.tr) : '';
  const currentCategory = blog.category ? (blog.category[lng] || blog.category.tr) : '';
  const currentContent = blog.content ? (blog.content[lng] || blog.content.tr) : '';

  // Create a plain text description from HTML content
  const plainTextContent = currentContent ? currentContent.replace(/<[^>]+>/g, '').substring(0, 160) + '...' : '';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://www.hashotel.com/blog/${id}#article`,
        headline: currentTitle,
        description: plainTextContent,
        image: `https://www.hashotel.com${blog.image}`,
        articleSection: currentCategory,
        inLanguage: 'tr-TR',
        datePublished: blog.datePublished || undefined,
        dateModified: blog.dateModified || blog.datePublished || undefined,
        author: { '@type': 'Organization', name: 'Has Termal Otel', url: 'https://www.hashotel.com' },
        publisher: { '@id': 'https://www.hashotel.com/#hotel' },
        mainEntityOfPage: `https://www.hashotel.com/blog/${id}`,
        about: { '@id': 'https://www.hashotel.com/#hotel' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.hashotel.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.hashotel.com/bloglar' },
          { '@type': 'ListItem', position: 3, name: currentTitle, item: `https://www.hashotel.com/blog/${id}` },
        ],
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <Helmet>
        <title>{currentTitle} | Has Termal Otel</title>
        <meta name="description" content={plainTextContent} />
        <link rel="canonical" href={`https://www.hashotel.com/blog/${id}`} />
        <meta property="og:title" content={`${currentTitle} | Has Termal Otel`} />
        <meta property="og:description" content={plainTextContent} />
        <meta property="og:image" content={`https://www.hashotel.com${blog.image}`} />
        <meta property="article:section" content={currentCategory} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/bloglar" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft size={20} />
          {t('blog.back_to_all', 'Tüm Yazılara Dön')}
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
          {currentTitle}
        </h1>

        <div className="flex items-center gap-4 text-primary/60 mb-10 pb-10 border-b border-primary/10">
          <span className="font-medium text-accent">{currentCategory}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>

        <div className="rounded-3xl overflow-hidden mb-12 h-[400px] md:h-[500px]">
          <img loading="lazy" src={blog.image} alt={currentTitle} className="w-full h-full object-cover" />
        </div>

        <div 
          className="prose prose-lg max-w-none prose-p:text-primary/80 prose-headings:text-primary prose-headings:font-serif prose-h2:text-3xl prose-h3:text-2xl"
          dangerouslySetInnerHTML={{ __html: currentContent }}
        />

      </div>
    </div>
  );
};

export default BlogPost;
