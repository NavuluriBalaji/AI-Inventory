import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOAuditItem {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

const SEOAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<SEOAuditItem[]>([]);

  useEffect(() => {
    const runAudit = () => {
      const results: SEOAuditItem[] = [];

      // Check meta title
      const title = document.title;
      results.push({
        name: 'Page Title',
        status: title && title.length > 10 && title.length < 60 ? 'pass' : 'warning',
        message: title ? `Title: "${title}" (${title.length} chars)` : 'No title found'
      });

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const descContent = metaDescription?.getAttribute('content') || '';
      results.push({
        name: 'Meta Description',
        status: descContent && descContent.length > 120 && descContent.length < 160 ? 'pass' : 'warning',
        message: descContent ? `Description: "${descContent.substring(0, 50)}..." (${descContent.length} chars)` : 'No description found'
      });

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      results.push({
        name: 'Canonical URL',
        status: canonical ? 'pass' : 'warning',
        message: canonical ? `Canonical: ${canonical.getAttribute('href')}` : 'No canonical URL found'
      });

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      results.push({
        name: 'Open Graph Tags',
        status: ogTitle && ogDescription && ogImage ? 'pass' : 'warning',
        message: `OG Title: ${!!ogTitle}, OG Description: ${!!ogDescription}, OG Image: ${!!ogImage}`
      });

      // Check structured data
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      results.push({
        name: 'Structured Data',
        status: structuredData ? 'pass' : 'warning',
        message: structuredData ? 'JSON-LD structured data found' : 'No structured data found'
      });

      // Check images alt tags
      const images = document.getElementsByTagName('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
      results.push({
        name: 'Image Alt Tags',
        status: imagesWithoutAlt.length === 0 ? 'pass' : 'warning',
        message: `${images.length} images total, ${imagesWithoutAlt.length} without alt tags`
      });

      // Check headings hierarchy
      const h1s = document.getElementsByTagName('h1');
      results.push({
        name: 'H1 Tags',
        status: h1s.length === 1 ? 'pass' : 'warning',
        message: `${h1s.length} H1 tags found (should be exactly 1)`
      });

      setAuditResults(results);
    };

    // Run audit after a short delay to ensure all content is loaded
    const timer = setTimeout(runAudit, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <>
      <Helmet>
        <style>
          {`
            .seo-audit {
              position: fixed;
              top: 10px;
              right: 10px;
              width: 400px;
              max-height: 500px;
              overflow-y: auto;
              background: rgba(0, 0, 0, 0.9);
              border: 1px solid #10b981;
              border-radius: 8px;
              padding: 16px;
              font-family: monospace;
              font-size: 12px;
              z-index: 9999;
              color: white;
            }
            .seo-audit-header {
              font-weight: bold;
              margin-bottom: 12px;
              color: #10b981;
            }
            .seo-audit-item {
              margin-bottom: 8px;
              padding: 8px;
              border-radius: 4px;
            }
            .seo-audit-item.pass {
              background: rgba(16, 185, 129, 0.2);
              border-left: 3px solid #10b981;
            }
            .seo-audit-item.warning {
              background: rgba(245, 158, 11, 0.2);
              border-left: 3px solid #f59e0b;
            }
            .seo-audit-item.fail {
              background: rgba(239, 68, 68, 0.2);
              border-left: 3px solid #ef4444;
            }
            .seo-audit-name {
              font-weight: bold;
              margin-bottom: 4px;
            }
            .seo-audit-message {
              font-size: 11px;
              opacity: 0.8;
            }
          `}
        </style>
      </Helmet>
      <div className="seo-audit">
        <div className="seo-audit-header">🚀 SEO Audit</div>
        {auditResults.map((result, index) => (
          <div key={index} className={`seo-audit-item ${result.status}`}>
            <div className="seo-audit-name">
              {result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'} {result.name}
            </div>
            <div className="seo-audit-message">{result.message}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SEOAudit;
