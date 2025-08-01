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
  category?: string;
  model?: any;
  noIndex?: boolean;
  alternateLanguages?: Array<{ hreflang: string; href: string }>;
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
  jsonLd,
  category,
  model,
  noIndex = false,
  alternateLanguages = []
}) => {
  const fullTitle = title.includes('AI Inventory') ? title : `${title} | AI Inventory`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const fullUrl = url;

  // Enhanced keywords based on content
  const enhancedKeywords = React.useMemo(() => {
    let baseKeywords = keywords;
    
    if (model) {
      const modelKeywords = [
        model.name?.toLowerCase(),
        model.provider?.toLowerCase(),
        model.category?.toLowerCase(),
        ...(model.features || []).map((f: string) => f.toLowerCase()),
        'AI model',
        'artificial intelligence',
        'machine learning'
      ].filter(Boolean).join(', ');
      
      baseKeywords = `${modelKeywords}, ${baseKeywords}`;
    }
    
    if (category) {
      baseKeywords = `${category} AI models, ${category} machine learning, ${baseKeywords}`;
    }
    
    return baseKeywords;
  }, [keywords, model, category]);

  // Enhanced description
  const enhancedDescription = React.useMemo(() => {
    if (model) {
      const modelDesc = model.description || description;
      const provider = model.provider ? ` by ${model.provider}` : '';
      const features = model.features?.length ? ` Features: ${model.features.slice(0, 3).join(', ')}.` : '';
      
      return `${model.name}${provider} - ${modelDesc.substring(0, 120)}...${features}`.substring(0, 160);
    }
    
    if (category) {
      return `Explore ${category} AI models and tools. Compare features, performance, and capabilities of the latest artificial intelligence models in the ${category} category.`;
    }
    
    return description;
  }, [description, model, category]);

  // Generate dynamic structured data
  const enhancedJsonLd = React.useMemo(() => {
    if (jsonLd) return jsonLd;
    
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": url,
      "description": enhancedDescription,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    if (model) {
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": model.name,
        "description": model.description || enhancedDescription,
        "applicationCategory": "Artificial Intelligence",
        "operatingSystem": "Web-based",
        "offers": {
          "@type": "Offer",
          "price": model.requirements?.pricing?.includes('free') ? "0" : "Contact for pricing",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": model.provider || "Unknown"
        },
        "datePublished": model.releaseDate,
        "url": fullUrl,
        "image": fullImageUrl,
        "mainEntity": {
          "@type": "Thing",
          "name": model.name,
          "description": model.description
        }
      };
    }

    if (category) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${category} AI Models`,
        "description": enhancedDescription,
        "url": fullUrl,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${category} AI Models Collection`,
          "description": `Comprehensive list of ${category} artificial intelligence models`
        }
      };
    }

    return baseSchema;
  }, [jsonLd, model, category, siteName, url, enhancedDescription, fullUrl, fullImageUrl]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={fullUrl} />

      {/* Enhanced SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="revisit-after" content="7 Days" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {model && <meta property="article:section" content="AI Models" />}
      {model && <meta property="article:tag" content={model.category} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${model?.name || siteName} - AI Model Information`} />
      <meta name="twitter:site" content="@AIInventory" />
      <meta name="twitter:creator" content="@AIInventory" />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.openai.com" />
      <link rel="preconnect" href="https://huggingface.co" />

      {/* Alternate language versions */}
      {alternateLanguages.map((lang) => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}

      {/* JSON-LD Structured Data */}
      {enhancedJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(enhancedJsonLd, null, 2)}
        </script>
      )}

      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//api.openai.com" />
      <link rel="dns-prefetch" href="//huggingface.co" />
    </Helmet>
  );
};

export default SEO;
