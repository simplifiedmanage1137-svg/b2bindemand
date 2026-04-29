const fs = require('fs');
const axios = require('axios');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Base URL of your website
const BASE_URL = 'https://b2bindemand.com';

// Static routes with their configurations
const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/campaigns', changefreq: 'daily', priority: 0.9 },
  { url: '/intent-targeting', changefreq: 'weekly', priority: 0.8 },
  { url: '/smart-syndication', changefreq: 'weekly', priority: 0.8 },
  { url: '/event-based-lead-generation', changefreq: 'weekly', priority: 0.8 },
  { url: '/blog', changefreq: 'daily', priority: 0.9 },
  { url: '/careers', changefreq: 'weekly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.5 },
  { url: '/faq', changefreq: 'weekly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'weekly', priority: 0.7 },
  { url: '/about-b2bindemand', changefreq: 'weekly', priority: 0.7 },
  { url: '/pricing', changefreq: 'weekly', priority: 0.8 },
  { url: '/audience', changefreq: 'weekly', priority: 0.8 },
  { url: '/roi-calculator', changefreq: 'weekly', priority: 0.8 },
  { url: '/audience-map', changefreq: 'weekly', priority: 0.7 },
  { url: '/audience-status', changefreq: 'weekly', priority: 0.7 },
  { url: '/b2b-in-demand', changefreq: 'weekly', priority: 0.7 },
  { url: '/webinars/podcasts', changefreq: 'weekly', priority: 0.7 },
  { url: '/cookie-policy', changefreq: 'monthly', priority: 0.5 },
  { url: '/gdpr-policy', changefreq: 'monthly', priority: 0.5 },
  { url: '/unsubscribe', changefreq: 'monthly', priority: 0.5 },
  { url: '/sitemap', changefreq: 'monthly', priority: 0.5 }
];

async function generateSitemap() {
  try {
    // Fetch all blog posts from WordPress API
    const response = await axios.get('https://b2b-oldbackup.b2bindemand.com/wp-json/wp/v2/posts?_embed&per_page=100');
    const blogPosts = response.data.map(post => ({
      slug: post.slug,
      title: post.title?.rendered || "Untitled",
      publishedAt: post.date,
      updatedAt: post.modified
    }));

    // Create a sitemap stream
    const stream = new SitemapStream({ hostname: BASE_URL });

    // Add static routes to the sitemap
    staticRoutes.forEach(route => {
      stream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString()
      });
    });

    // Add dynamic blog post routes to the sitemap
    blogPosts.forEach(post => {
      stream.write({
        url: `/blog/${post.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: post.updatedAt || post.publishedAt,
        img: post.featuredImage ? [{
          url: post.featuredImage,
          caption: post.title
        }] : undefined,
        news: {
          publication: {
            name: 'B2BinDemand Blog',
            language: 'en'
          },
          publication_date: post.publishedAt,
          title: post.title
        }
      });
    });

    // End the stream
    stream.end();

    // Generate sitemap XML
    const sitemap = await streamToPromise(Readable.from(stream)).then(data => data.toString());

    // Write the sitemap to a file
    fs.writeFileSync('public/sitemap.xml', sitemap);

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Export the function for use in build scripts
module.exports = generateSitemap;
