const fs = require('fs');
const path = require('path');

// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

const pages = [
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
  { loc: 'https://b2bindemand.com/contact-us', changefreq: 'weekly', priority: '0.8' }
];

const urlEntries = pages
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
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
console.log('Sitemap generated successfully!');
