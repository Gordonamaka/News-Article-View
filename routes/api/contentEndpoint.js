const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const articleUrl = req.query.url; // The article URL to fetch is passed as a query param
  if (!articleUrl) {
    return res.status(400).json({ error: 'No article URL provided' });
  }

  try {
    // Fetch the article HTML content
    const response = await axios.get(articleUrl);
    res.send(response.data); // Send the article HTML content to the client
  } catch (error) {
    console.error('Error fetching article content:', error);
    res.status(500).json({ error: 'Failed to fetch article content' });
  }
});

module.exports = router;
