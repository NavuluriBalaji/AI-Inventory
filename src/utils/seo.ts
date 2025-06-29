import { models, categories } from '../data/models';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (baseUrl: string = 'https://ai-inventory.com'): string => {
  const entries: SitemapEntry[] = [
    // Homepage
    {
      url: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0
    },
    // Terminology page
    {
      url: `${baseUrl}/terminology`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    },
    // Category pages
    ...categories.map(category => ({
      url: `${baseUrl}/category/${category.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: 0.9
    })),
    // Model pages
    ...models.map(model => ({
      url: `${baseUrl}/model/${model.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly' as const,
      priority: 0.8
    }))
  ];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const xmlFooter = `</urlset>`;

  const xmlBody = entries
    .map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`)
    .join('\n');

  return `${xmlHeader}\n${xmlBody}\n${xmlFooter}`;
};

export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  },

  // Generate keywords from content
  generateKeywords: (content: string[]): string => {
    return content.join(', ').toLowerCase();
  },

  // Generate canonical URL
  generateCanonicalUrl: (baseUrl: string, pathname: string): string => {
    return `${baseUrl}${pathname}`.replace(/\/+$/, '');
  },

  // Generate social media image URL
  generateSocialImageUrl: (baseUrl: string): string => {
    // This could be enhanced to generate dynamic social images
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
  }
};

export default seoUtils;
