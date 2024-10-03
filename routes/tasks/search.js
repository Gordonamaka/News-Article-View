require('dotenv').config({ path: '../.env' });
const { Pool }           = require('pg');
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();
const { dbParams }         = require('../../db/params/dbParams');

const pool = new Pool(dbParams);

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