const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /tasks/content:
 *   get:
 *     summary: Fetch the HTML content of an article
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: The URL of the article to fetch.
 *         schema:
 *           type: string
 *           format: uri
 *           example: "https://www.example.com/article"
 *     responses:
 *       200:
 *         description: Successfully fetched the article content
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html><body><h1>Article Title</h1><p>Article content goes here...</p></body></html>"
 *       400:
 *         description: No article URL provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No article URL provided"
 *       500:
 *         description: Failed to fetch article content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch article content"
*/

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
