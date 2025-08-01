import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOAuditItem {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  score: number;
  suggestion?: string;
}

interface SEOMetrics {
  totalScore: number;
  passCount: number;
  warningCount: number;
  failCount: number;
}

const SEOAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<SEOAuditItem[]>([]);
  const [metrics, setMetrics] = useState<SEOMetrics>({ totalScore: 0, passCount: 0, warningCount: 0, failCount: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const runAudit = () => {
      const results: SEOAuditItem[] = [];

      // Check meta title
      const title = document.title;
      let titleStatus: 'pass' | 'fail' | 'warning' = 'fail';
      let titleScore = 0;
      let titleSuggestion = '';

      if (!title) {
        titleStatus = 'fail';
        titleScore = 0;
        titleSuggestion = 'Add a descriptive page title';
      } else if (title.length < 30) {
        titleStatus = 'warning';
        titleScore = 60;
        titleSuggestion = 'Expand title to 50-60 characters';
      } else if (title.length > 60) {
        titleStatus = 'warning';
        titleScore = 70;
        titleSuggestion = 'Shorten title to under 60 characters';
      } else {
        titleStatus = 'pass';
        titleScore = 100;
      }

      results.push({
        name: 'Page Title',
        status: titleStatus,
        message: title ? `"${title}" (${title.length} chars)` : 'No title found',
        score: titleScore,
        suggestion: titleSuggestion
      });

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const descContent = metaDescription?.getAttribute('content') || '';
      let descStatus: 'pass' | 'fail' | 'warning' = 'fail';
      let descScore = 0;
      let descSuggestion = '';

      if (!descContent) {
        descStatus = 'fail';
        descScore = 0;
        descSuggestion = 'Add a compelling meta description';
      } else if (descContent.length < 120) {
        descStatus = 'warning';
        descScore = 60;
        descSuggestion = 'Expand description to 150-160 characters';
      } else if (descContent.length > 160) {
        descStatus = 'warning';
        descScore = 70;
        descSuggestion = 'Shorten description to under 160 characters';
      } else {
        descStatus = 'pass';
        descScore = 100;
      }

      results.push({
        name: 'Meta Description',
        status: descStatus,
        message: descContent ? `"${descContent.substring(0, 50)}..." (${descContent.length} chars)` : 'No description found',
        score: descScore,
        suggestion: descSuggestion
      });

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      results.push({
        name: 'Canonical URL',
        status: canonical ? 'pass' : 'warning',
        message: canonical ? `${canonical.getAttribute('href')}` : 'No canonical URL found',
        score: canonical ? 100 : 70,
        suggestion: canonical ? '' : 'Add canonical URL to avoid duplicate content issues'
      });

      // Check viewport meta tag
      const viewport = document.querySelector('meta[name="viewport"]');
      results.push({
        name: 'Viewport Meta Tag',
        status: viewport ? 'pass' : 'fail',
        message: viewport ? 'Viewport meta tag present' : 'Missing viewport meta tag',
        score: viewport ? 100 : 0,
        suggestion: viewport ? '' : 'Add viewport meta tag for mobile responsiveness'
      });

      // Check robots meta tag
      const robots = document.querySelector('meta[name="robots"]');
      const robotsContent = robots?.getAttribute('content') || '';
      let robotsStatus: 'pass' | 'fail' | 'warning' = 'warning';
      let robotsScore = 70;
      if (robotsContent.includes('noindex') || robotsContent.includes('nofollow')) {
        robotsStatus = 'warning';
        robotsScore = 50;
      } else if (robots) {
        robotsStatus = 'pass';
        robotsScore = 100;
      }

      results.push({
        name: 'Robots Meta Tag',
        status: robotsStatus,
        message: robots ? `Content: "${robotsContent}"` : 'No robots meta tag',
        score: robotsScore,
        suggestion: robotsContent.includes('noindex') ? 'Check if noindex is intended' : ''
      });

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      const ogType = document.querySelector('meta[property="og:type"]');
      
      const ogCount = [ogTitle, ogDescription, ogImage, ogUrl, ogType].filter(Boolean).length;
      let ogStatus: 'pass' | 'fail' | 'warning' = 'fail';
      let ogScore = (ogCount / 5) * 100;
      
      if (ogCount >= 4) ogStatus = 'pass';
      else if (ogCount >= 2) ogStatus = 'warning';

      results.push({
        name: 'Open Graph Tags',
        status: ogStatus,
        message: `${ogCount}/5 OG tags present (title, description, image, url, type)`,
        score: ogScore,
        suggestion: ogCount < 5 ? 'Add missing Open Graph tags for better social sharing' : ''
      });

      // Check Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      
      const twitterCount = [twitterCard, twitterTitle, twitterDescription, twitterImage].filter(Boolean).length;
      let twitterStatus: 'pass' | 'fail' | 'warning' = 'fail';
      let twitterScore = (twitterCount / 4) * 100;
      
      if (twitterCount >= 3) twitterStatus = 'pass';
      else if (twitterCount >= 1) twitterStatus = 'warning';

      results.push({
        name: 'Twitter Card Tags',
        status: twitterStatus,
        message: `${twitterCount}/4 Twitter tags present`,
        score: twitterScore,
        suggestion: twitterCount < 4 ? 'Add Twitter Card tags for better Twitter sharing' : ''
      });

      // Check structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      let structuredDataScore = 0;
      let structuredDataStatus: 'pass' | 'fail' | 'warning' = 'fail';
      
      if (structuredData.length > 0) {
        try {
          // Validate JSON-LD
          const jsonData = JSON.parse(structuredData[0].textContent || '{}');
          if (jsonData['@type'] && jsonData['@context']) {
            structuredDataStatus = 'pass';
            structuredDataScore = 100;
          } else {
            structuredDataStatus = 'warning';
            structuredDataScore = 70;
          }
        } catch {
          structuredDataStatus = 'warning';
          structuredDataScore = 50;
        }
      }

      results.push({
        name: 'Structured Data',
        status: structuredDataStatus,
        message: structuredData.length > 0 ? `${structuredData.length} JSON-LD scripts found` : 'No structured data found',
        score: structuredDataScore,
        suggestion: structuredDataScore < 100 ? 'Add valid JSON-LD structured data for better search results' : ''
      });

      // Check images alt tags
      const images = document.getElementsByTagName('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
      const altScore = images.length > 0 ? ((images.length - imagesWithoutAlt.length) / images.length) * 100 : 100;
      
      results.push({
        name: 'Image Alt Tags',
        status: imagesWithoutAlt.length === 0 ? 'pass' : imagesWithoutAlt.length < images.length / 2 ? 'warning' : 'fail',
        message: `${images.length} images total, ${imagesWithoutAlt.length} without alt tags`,
        score: altScore,
        suggestion: imagesWithoutAlt.length > 0 ? 'Add descriptive alt tags to all images' : ''
      });

      // Check headings hierarchy
      const h1s = document.getElementsByTagName('h1');
      const h2s = document.getElementsByTagName('h2');
      const h3s = document.getElementsByTagName('h3');
      
      let headingStatus: 'pass' | 'fail' | 'warning' = 'pass';
      let headingScore = 100;
      let headingSuggestion = '';

      if (h1s.length === 0) {
        headingStatus = 'fail';
        headingScore = 0;
        headingSuggestion = 'Add an H1 tag for the main page heading';
      } else if (h1s.length > 1) {
        headingStatus = 'warning';
        headingScore = 70;
        headingSuggestion = 'Use only one H1 tag per page';
      } else if (h2s.length === 0 && h3s.length > 0) {
        headingStatus = 'warning';
        headingScore = 80;
        headingSuggestion = 'Maintain proper heading hierarchy (H1 > H2 > H3)';
      }

      results.push({
        name: 'Heading Structure',
        status: headingStatus,
        message: `H1: ${h1s.length}, H2: ${h2s.length}, H3: ${h3s.length}`,
        score: headingScore,
        suggestion: headingSuggestion
      });

      // Check page loading performance hints
      const preconnects = document.querySelectorAll('link[rel="preconnect"]');
      const dnsPrefetch = document.querySelectorAll('link[rel="dns-prefetch"]');
      const preload = document.querySelectorAll('link[rel="preload"]');
      
      const performanceHints = preconnects.length + dnsPrefetch.length + preload.length;
      
      results.push({
        name: 'Performance Hints',
        status: performanceHints > 0 ? 'pass' : 'warning',
        message: `${performanceHints} performance hints found (preconnect, dns-prefetch, preload)`,
        score: performanceHints > 0 ? 100 : 60,
        suggestion: performanceHints === 0 ? 'Add preconnect/dns-prefetch for external resources' : ''
      });

      // Check favicon
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      results.push({
        name: 'Favicon',
        status: favicon ? 'pass' : 'warning',
        message: favicon ? 'Favicon present' : 'No favicon found',
        score: favicon ? 100 : 70,
        suggestion: favicon ? '' : 'Add a favicon for better brand recognition'
      });

      // Check language attribute
      const htmlLang = document.documentElement.lang;
      results.push({
        name: 'Language Declaration',
        status: htmlLang ? 'pass' : 'warning',
        message: htmlLang ? `Language: ${htmlLang}` : 'No language declared',
        score: htmlLang ? 100 : 70,
        suggestion: htmlLang ? '' : 'Add lang attribute to html element'
      });

      setAuditResults(results);

      // Calculate metrics
      const passCount = results.filter(r => r.status === 'pass').length;
      const warningCount = results.filter(r => r.status === 'warning').length;
      const failCount = results.filter(r => r.status === 'fail').length;
      const totalScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);

      setMetrics({ totalScore, passCount, warningCount, failCount });
    };

    // Run audit after a short delay to ensure all content is loaded
    const timer = setTimeout(runAudit, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#ef4444';
    return '#dc2626';
  };

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
              width: 420px;
              max-height: ${isMinimized ? '60px' : '600px'};
              overflow-y: auto;
              background: rgba(0, 0, 0, 0.95);
              border: 2px solid #10b981;
              border-radius: 12px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 13px;
              z-index: 9999;
              color: white;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
            }
            .seo-audit-header {
              padding: 16px;
              border-bottom: 1px solid #374151;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
              border-radius: 10px 10px 0 0;
            }
            .seo-audit-title {
              font-weight: bold;
              color: #10b981;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .seo-audit-score {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .score-circle {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              position: relative;
            }
            .score-metrics {
              font-size: 11px;
              text-align: right;
            }
            .minimize-btn {
              background: none;
              border: none;
              color: #9ca3af;
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;
              transition: all 0.2s;
            }
            .minimize-btn:hover {
              background: #374151;
              color: white;
            }
            .seo-audit-content {
              padding: 16px;
              max-height: 480px;
              overflow-y: auto;
            }
            .seo-audit-item {
              margin-bottom: 12px;
              padding: 12px;
              border-radius: 8px;
              border-left: 4px solid;
              background: rgba(55, 65, 81, 0.3);
              transition: all 0.2s ease;
            }
            .seo-audit-item:hover {
              background: rgba(55, 65, 81, 0.5);
              transform: translateY(-1px);
            }
            .seo-audit-item.pass {
              border-left-color: #10b981;
            }
            .seo-audit-item.warning {
              border-left-color: #f59e0b;
            }
            .seo-audit-item.fail {
              border-left-color: #ef4444;
            }
            .seo-audit-item-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 6px;
            }
            .seo-audit-name {
              font-weight: 600;
              font-size: 14px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .seo-audit-score-badge {
              background: rgba(255, 255, 255, 0.1);
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: bold;
            }
            .seo-audit-message {
              font-size: 12px;
              opacity: 0.9;
              margin-bottom: 4px;
              line-height: 1.4;
            }
            .seo-audit-suggestion {
              font-size: 11px;
              opacity: 0.8;
              font-style: italic;
              color: #93c5fd;
              margin-top: 4px;
            }
            .status-icon {
              font-size: 14px;
            }
          `}
        </style>
      </Helmet>
      <div className="seo-audit">
        <div className="seo-audit-header">
          <div className="seo-audit-title">
            🚀 SEO Audit
          </div>
          <div className="seo-audit-score">
            <div className="score-metrics">
              <div style={{ color: '#10b981' }}>✅ {metrics.passCount}</div>
              <div style={{ color: '#f59e0b' }}>⚠️ {metrics.warningCount}</div>
              <div style={{ color: '#ef4444' }}>❌ {metrics.failCount}</div>
            </div>
            <div 
              className="score-circle" 
              style={{ 
                background: `conic-gradient(${getScoreColor(metrics.totalScore)} ${metrics.totalScore * 3.6}deg, #374151 0deg)`,
                border: `3px solid ${getScoreColor(metrics.totalScore)}`
              }}
            >
              {metrics.totalScore}
            </div>
            <button 
              className="minimize-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <div className="seo-audit-content">
            {auditResults.map((result, index) => (
              <div key={index} className={`seo-audit-item ${result.status}`}>
                <div className="seo-audit-item-header">
                  <div className="seo-audit-name">
                    <span className="status-icon">
                      {result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'}
                    </span>
                    {result.name}
                  </div>
                  <div 
                    className="seo-audit-score-badge"
                    style={{ color: getScoreColor(result.score) }}
                  >
                    {result.score}/100
                  </div>
                </div>
                <div className="seo-audit-message">{result.message}</div>
                {result.suggestion && (
                  <div className="seo-audit-suggestion">
                    💡 {result.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SEOAudit;
