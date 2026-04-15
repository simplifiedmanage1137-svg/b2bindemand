import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sitemap.module.css';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';
import CookieConsent from './CookieConsent';

const Sitemap = () => {
  const sitemapData = {
    main: [
      { name: 'HOME', path: '/' },
      { name: 'ABOUT US', path: '/about-b2bindemand' },
      { name: 'CONTACT US', path: '/contact-us' },
      { name: 'CAREERS', path: '/b2bindemand-careers' }
    ],
    solutions: [
      { name: 'Campaigns', path: '/campaigns' },
      { name: 'Intent Targeting', path: '/intent-targeting' },
      { name: 'Smart Syndication', path: '/smart-syndication' },
      { name: 'Event Based Lead Generation', path: '/event-based-lead-generation' }
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Library', path: '/library' },
      { name: 'FAQ', path: '/faq' }
    ],
    policies: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Cookie Policy', path: '/cookie-policy' },
      { name: 'GDPR Policy', path: '/gdpr-policy' }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{seoConfig.sitemap.title}</title>
        <meta name="description" content={seoConfig.sitemap.description} />
        <meta name="keywords" content={seoConfig.sitemap.keywords} />
        <meta property="og:title" content={seoConfig.sitemap.title} />
        <meta property="og:description" content={seoConfig.sitemap.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.sitemap.url} />
        <meta property="og:image" content={seoConfig.sitemap.ogImage} />
        <meta property="og:site_name" content={seoConfig.sitemap.siteName} />
        <meta property="og:locale" content={seoConfig.sitemap.locale} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={seoConfig.sitemap.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={seoConfig.sitemap.url} />
      </Helmet>
      <div className={styles.sitemap} style={{ marginTop: '2rem' }}>
        <h1>Sitemap</h1>
        <div className={styles.sitemapGrid} style={{ marginBottom: '2rem' }}>
          <div className={styles.column}>
            <h2>MAIN</h2>
            {sitemapData.main.map((item, index) => (
              <Link key={index} to={item.path} className={styles.mainLink}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            <h2>SOLUTIONS</h2>
            {sitemapData.solutions.map((item, index) => (
              <Link key={index} to={item.path} className={styles.link}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            <h2>RESOURCES</h2>
            {sitemapData.resources.map((item, index) => (
              <Link key={index} to={item.path} className={styles.link}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            <h2>POLICIES</h2>
            {sitemapData.policies.map((item, index) => (
              <Link key={index} to={item.path} className={styles.link}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
};

export default Sitemap;
