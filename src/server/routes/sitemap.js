const express = require('express');
const router = express.Router();
const { generateSitemap } = require('../../utils/generateSitemap');

// Serve sitemap.xml
router.get('/sitemap.xml', async (req, res) => {
  try {
    // Set the hostname based on environment
    const hostname = process.env.NODE_ENV === 'production' 
      ? 'https://b2bindemand.com'
      : `http://${req.headers.host}`;

    // Generate sitemap XML
    const xml = await generateSitemap(hostname);
    
    // Set appropriate headers
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
