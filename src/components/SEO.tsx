import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  jsonLd?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'AI Inventory - Comprehensive Database of AI Models and Tools',
  description = 'Discover, compare, and explore the latest AI models and tools. Your comprehensive resource for artificial intelligence technologies, from GPT to BERT and beyond.',
  keywords = 'AI models, artificial intelligence, machine learning, GPT, BERT, AI tools, deep learning, natural language processing, computer vision, AI database',
  image = '/logo.webp',
  url = 'https://ai-inventory.com',
  type = 'website',
  author = 'AI Inventory Team',
  publishedTime,
  modifiedTime,
  siteName = 'AI Inventory',
  jsonLd
}) => {
  const fullTitle = title.includes('AI Inventory') ? title : `${title} | AI Inventory`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const fullUrl = url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@AIInventory" />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
