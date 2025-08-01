export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

export interface ModelSEOData {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  features: string[];
  lastUpdated?: string;
  popularity?: number;
}

export const generateSitemap = (
  models: ModelSEOData[] = [], 
  categories: any[] = [], 
  baseUrl: string = 'https://ai-inventory.com'
): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    // Core pages
    {
      url: `${baseUrl}/terminology`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/compare`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    // Category pages - high priority for navigation
    ...categories.map(category => ({
      url: `${baseUrl}/category/${category.id}`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.9
    })),
    // Model pages - dynamic priority based on popularity
    ...models.map(model => ({
      url: `${baseUrl}/model/${model.id}`,
      lastmod: model.lastUpdated || currentDate,
      changefreq: 'monthly' as const,
      priority: Math.min(0.8, 0.5 + (model.popularity || 0) / 200), // Scale 0.5-0.8 based on popularity
      images: [{
        loc: `${baseUrl}/api/og-image/${model.id}`,
        title: `${model.name} - AI Model`,
        caption: `${model.name} by ${model.provider} - ${model.description.substring(0, 100)}...`
      }]
    }))
  ];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const xmlFooter = `</urlset>`;

  const xmlBody = entries
    .map(entry => {
      let entryXml = `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;

      if (entry.images?.length) {
        entry.images.forEach(image => {
          entryXml += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
      ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
    </image:image>`;
        });
      }

      entryXml += `
  </url>`;
      return entryXml;
    })
    .join('\n');

  return `${xmlHeader}\n${xmlBody}\n${xmlFooter}`;
};
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`)
    .join('\n');

  return `${xmlHeader}\n${xmlBody}\n${xmlFooter}`;
};

export const seoUtils = {
  // Generate meta description from content with smart truncation
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    if (!content) return 'Discover the latest AI models and tools on AI Inventory.';
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    const lastSentence = truncated.lastIndexOf('.');
    
    // Prefer ending at sentence if close enough
    if (lastSentence > maxLength * 0.8) {
      return truncated.substring(0, lastSentence + 1);
    }
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  },

  // Generate enhanced keywords with semantic grouping
  generateKeywords: (content: string[], model?: any, category?: string): string => {
    const baseKeywords = content.join(', ').toLowerCase();
    const additionalKeywords: string[] = [];

    if (model) {
      additionalKeywords.push(
        model.name?.toLowerCase(),
        `${model.name?.toLowerCase()} ai model`,
        `${model.provider?.toLowerCase()} ai`,
        ...(model.features || []).map((f: string) => f.toLowerCase()),
        `${model.category} ai model`,
        'artificial intelligence',
        'machine learning model',
        'deep learning'
      );
    }

    if (category) {
      additionalKeywords.push(
        `${category} ai models`,
        `${category} machine learning`,
        `best ${category} ai tools`,
        `${category} artificial intelligence`
      );
    }

    const allKeywords = [...baseKeywords.split(', '), ...additionalKeywords]
      .filter(Boolean)
      .filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Remove duplicates
      .slice(0, 20); // Limit to 20 keywords

    return allKeywords.join(', ');
  },

  // Generate canonical URL with proper formatting
  generateCanonicalUrl: (baseUrl: string, pathname: string): string => {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const cleanPath = pathname.replace(/^\/+/, '');
    return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
  },

  // Generate dynamic social media image URL
  generateSocialImageUrl: (baseUrl: string, type: 'model' | 'category' | 'general' = 'general', id?: string): string => {
    if (type === 'model' && id) {
      return `${baseUrl}/api/og-image/model/${id}`;
    }
    if (type === 'category' && id) {
      return `${baseUrl}/api/og-image/category/${id}`;
    }
    return `${baseUrl}/logo.webp`;
  },

  // Validate and clean URL
  cleanUrl: (url: string): string => {
    return url.replace(/([^:]\/)\/+/g, '$1');
  },

  // Generate breadcrumb structured data
  generateBreadcrumbStructuredData: (items: Array<{ name: string; url: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  },

  // Generate FAQ structured data
  generateFAQStructuredData: (faqs: Array<{ question: string; answer: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  },

  // Generate product structured data for AI models
  generateModelStructuredData: (model: any, baseUrl: string) => {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": model.name,
      "description": model.description,
      "applicationCategory": "Artificial Intelligence Software",
      "operatingSystem": "Web-based",
      "url": `${baseUrl}/model/${model.id}`,
      "image": seoUtils.generateSocialImageUrl(baseUrl, 'model', model.id),
      "creator": {
        "@type": "Organization",
        "name": model.provider || "Unknown Provider"
      },
      "datePublished": model.releaseDate,
      "dateModified": model.lastUpdated || new Date().toISOString(),
      "aggregateRating": model.popularityScore ? {
        "@type": "AggregateRating",
        "ratingValue": Math.min(5, Math.max(1, model.popularityScore / 20)),
        "ratingCount": model.analytics?.viewCount || 1,
        "bestRating": 5,
        "worstRating": 1
      } : undefined,
      "offers": {
        "@type": "Offer",
        "price": model.requirements?.pricing?.toLowerCase().includes('free') ? "0" : "Contact for pricing",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": model.features || [],
      "category": model.category,
      "softwareVersion": model.trainingParameters?.parameters || "Latest"
    };
  },

  // Generate organization structured data
  generateOrganizationStructuredData: (baseUrl: string) => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Inventory",
      "description": "Comprehensive database of AI models and tools",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.webp`,
      "sameAs": [
        "https://twitter.com/AIInventory",
        "https://github.com/ai-inventory"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "contact@ai-inventory.com"
      }
    };
  },

  // Generate website structured data with search functionality
  generateWebsiteStructuredData: (baseUrl: string) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AI Inventory",
      "description": "Comprehensive database of AI models and tools",
      "url": baseUrl,
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "mainEntity": {
        "@type": "ItemList",
        "name": "AI Models Database",
        "description": "Comprehensive collection of artificial intelligence models and tools"
      }
    };
  },

  // Generate robots.txt content
  generateRobotsTxt: (baseUrl: string, disallowPaths: string[] = []) => {
    const defaultDisallows = ['/admin/', '/api/', '/_next/', '/private/'];
    const allDisallows = [...defaultDisallows, ...disallowPaths];

    return `User-agent: *
${allDisallows.map(path => `Disallow: ${path}`).join('\n')}

# Allow important bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# AdSense crawlers
User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
  },

  // Extract and clean text for SEO analysis
  extractTextContent: (html: string): string => {
    // Remove HTML tags and normalize whitespace
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  // Calculate content quality score
  calculateContentQuality: (content: string): {
    score: number;
    issues: string[];
    suggestions: string[];
  } => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Length checks
    if (content.length < 300) {
      issues.push('Content too short');
      suggestions.push('Add more detailed information (aim for 300+ characters)');
      score -= 20;
    }

    // Keyword density (basic check)
    const words = content.toLowerCase().split(/\s+/);
    const wordCount = words.length;
    
    if (wordCount < 50) {
      issues.push('Low word count');
      suggestions.push('Expand content with more details and examples');
      score -= 15;
    }

    // Readability (sentence length approximation)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = wordCount / sentences.length;
    
    if (avgSentenceLength > 25) {
      issues.push('Sentences may be too long');
      suggestions.push('Break down complex sentences for better readability');
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      issues,
      suggestions
    };
  }
};

export default seoUtils;
