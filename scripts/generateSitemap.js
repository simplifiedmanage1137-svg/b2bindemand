const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: 'https://b2bindemand.com/', changefreq: 'daily', priority: '1.0' },
  { loc: 'https://b2bindemand.com/campaigns', changefreq: 'daily', priority: '0.9' },
  { loc: 'https://b2bindemand.com/intent-targeting', changefreq: 'daily', priority: '0.9' },
  { loc: 'https://b2bindemand.com/smart-syndication', changefreq: 'daily', priority: '0.9' },
  { loc: 'https://b2bindemand.com/event-based-lead-generation', changefreq: 'daily', priority: '0.9' },
  { loc: 'https://b2bindemand.com/blog', changefreq: 'daily', priority: '0.8' },
  { loc: 'https://b2bindemand.com/library', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/about-b2bindemand', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/b2bindemand-careers', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/faqs', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/contact-us', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/pricing', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/audience', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/roi-calculator', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://b2bindemand.com/audience-map', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/audience-status', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/b2b-in-demand', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/webinars/podcasts', changefreq: 'weekly', priority: '0.7' },
  { loc: 'https://b2bindemand.com/privacy-policy', changefreq: 'monthly', priority: '0.5' },
  { loc: 'https://b2bindemand.com/cookie-policy', changefreq: 'monthly', priority: '0.5' },
  { loc: 'https://b2bindemand.com/gdpr-policy', changefreq: 'monthly', priority: '0.5' },
  { loc: 'https://b2bindemand.com/unsubscribe', changefreq: 'monthly', priority: '0.5' },
  { loc: 'https://b2bindemand.com/sitemap', changefreq: 'monthly', priority: '0.5' }
];

// Function to transform WordPress post data
const transformWordPressPost = post => ({
  id: post.id,
  title: post.title?.rendered || "Untitled",
  slug: post.slug,
  date: post.date ? new Date(post.date).toISOString().split('T')[0] : currentDate
});

// Fetch blog posts from WordPress API
async function fetchBlogPosts() {
  try {
    const response = await axios.get('https://b2b-oldbackup.b2bindemand.com/wp-json/wp/v2/posts?_embed&per_page=100');
    return response.data.map(transformWordPressPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    return [];
  }
}

async function generateSitemap() {
  const blogPosts = await fetchBlogPosts();

  const blogUrls = blogPosts.map(post => ({
    loc: `https://b2bindemand.com/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: '0.6',
    date: post.date // Include post date for timestamp
  }));

  const allPages = [...staticPages, ...blogUrls];

  const urlEntries = allPages
    .map(
      ({ loc, changefreq, priority, date }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${date || currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated successfully with', allPages.length, 'URLs!');
}

generateSitemap().catch(console.error);
