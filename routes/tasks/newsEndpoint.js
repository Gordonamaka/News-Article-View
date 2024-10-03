require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

/**
 * @swagger
 * /tasks/news:
 *   get:
 *     summary: Retrieve news articles related to a specific keyword
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: Keyword to search for in news articles. Defaults to "Apple".
 *         schema:
 *           type: string
 *           example: "Apple"
 *     responses:
 *       200:
 *         description: Successfully retrieved news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   source:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "the-verge"
 *                       name:
 *                         type: string
 *                         example: "The Verge"
 *                   author:
 *                     type: string
 *                     example: "John Doe"
 *                   title:
 *                     type: string
 *                     example: "Apple announces new products"
 *                   description:
 *                     type: string
 *                     example: "Apple has unveiled new features..."
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://www.example.com/apple-announces-new-products"
 *                   urlToImage:
 *                     type: string
 *                     format: uri
 *                     example: "https://www.example.com/image.jpg"
 *                   publishedAt:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-07"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch articles"
*/

// API URL - Can add Date & Sort functionalities - Will not for simplicity
router.get("/", async (req, res) => {
  const keyword         = 'Apple';
  const API_KEY         = process.env.API_KEY
  
  // Used Axios as opposed to Fetch for simplicity.
  // Serverside Practice for search field functionality
  try {
    const response         = await axios.get(
      `https://newsapi.org/v2/everything?` + 
      `q=${keyword}&` +
      `from=2024-09-07&` +
      `excludeDomains=yahoo.com&` +
      `language=en&` +
      `pageSize=25&` +
      `page=1&` +
      `sortBy=relevancy&` +
      `apiKey=${API_KEY}`
    );
    // Article Formatter
    const articlesJSON    = response.data.articles;
    const filteredJSON    = articlesJSON.filter(obj => !Object.values(obj).includes("[Removed]"));
    
    // Date Formatter
    filteredJSON.forEach(article => {
      if (article.publishedAt) {
        article.publishedAt = article.publishedAt.split('T')[0];
      }
    });
    
    res.status(200).send(filteredJSON);
  
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
});


module.exports = router;