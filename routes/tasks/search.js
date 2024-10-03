require('dotenv').config({ path: '../.env' });
const { Pool }           = require('pg');
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();
const { dbParams }         = require('../../db/params/dbParams');

const pool = new Pool(dbParams);


/**
 * @swagger
 * /tasks/search:
 *   post:
 *     summary: Fetch articles based on a search symbol
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "AAPL"
 *               pageNumber:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - symbol
 *     responses:
 *       200:
 *         description: Successfully retrieved articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     example: "AAPL"
 *                   page:
 *                     type: integer
 *                     example: 1
 *                   totalResults:
 *                     type: integer
 *                     example: 50
 *                   articles:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: "Apple Stock Hits All Time High"
 *                         description:
 *                           type: string
 *                           example: "Apple's stock has seen unprecedented growth..."
 *                         publishedAt:
 *                           type: string
 *                           example: "2024-09-07"
 *       400:
 *         description: Bad request (symbol is required)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Symbol is required"
 *       401:
 *         description: Unauthorized (user must be logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized. Please log in."
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

router.post("/", async (req, res) => {
  const ticker           = req.body
  // Symbol Object destructuring
  const { symbol, pageNumber }       = ticker;
  const keyword                      = symbol;
  const page                         = pageNumber || 1; // If number is ever not provided ( currently hardcoded )

  const API_KEY                      = process.env.API_KEY
  
  if (!symbol) {
    return res.status(400).send({ error: "Symbol is required" });
  }

  // Used Axios on the backend as opposed to Fetch for simplicity.
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?` + 
      `q=${keyword}&` +
      `from=2024-09-07&` +
      `excludeDomains=yahoo.com&` +
      `language=en&` +
      `pageSize=25&` +
      `page=${page}&` +
      `sortBy=relevancy&` +
      `apiKey=${API_KEY}`
    );

    // Total Results for Page Pagination
    const totalResults = response.data.totalResults;

    // Article Formatter
    const articlesJSON    = response.data.articles;
    const filteredJSON    = articlesJSON.filter(obj => !Object.values(obj).includes("[Removed]"));

    // Date Formatter
    filteredJSON.forEach(article => {
      if (article.publishedAt) {
        article.publishedAt = article.publishedAt.split('T')[0];
      }
    });

    // SEARCH HISTORY
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized. Please log in." });
    }

    // Add the search symbol to the history
    await pool
    .query(
      `
      INSERT INTO search_history (user_id, symbol, search_date)
      VALUES ($1, $2, NOW())
      `,
      [userId, symbol]
    );

    res.status(200).send([ symbol, page, totalResults, filteredJSON ]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
});


// GET Search history
router.get('/', async (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    return res.status(401).send({ error: "Unauthorized: Please log in." });
  }

  try {
    const result = await pool
    .query(
      `
      SELECT symbol, search_date
      FROM search_history
      WHERE user_id = $1
      ORDER BY search_date DESC;
      `,
      [userId]
    );

    res.status(200).json(result.rows); 
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to retrieve search history" });
  }
});



module.exports = router;