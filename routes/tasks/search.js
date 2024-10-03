require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

router.post("/", async (req, res) => {
  const ticker           = req.body
  // Symbol Object destructuring
  const { symbol }       = ticker
  const keyword          = symbol
  // Page Number Object destructuring
  const { pageNumber }   = ticker
  const page             = pageNumber

  const API_KEY          = process.env.API_KEY
  
  if (!symbol) {
    return res.status(400).send({ error: "Symbol is required" });
  }


  // Used Axios as opposed to Fetch for simplicity.
  try {
    const response         = await axios.get(
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
    res.status(200).send([ symbol, page, totalResults, filteredJSON ]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
});

module.exports = router;