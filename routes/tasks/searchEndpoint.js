require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

router.post("/", async (req, res) => {
  const ticker           = req.body
  const { symbol }       = ticker
  const keyword          = symbol
  const API_KEY          = process.env.API_KEY
  if (!symbol) {
    return res.status(400).send({ error: "Symbol is required" });
  }
  try {
  const response         = await axios.get(
    `https://newsapi.org/v2/everything?` + 
    `q=${keyword}&` +
    `from=2024-09-01&` +
    `excludeDomains=yahoo.com&` +
    `language=en&` +
    `pageSize=20&` +
    `sortBy=relevancy&` +
    `apiKey=${API_KEY}`
  );
    // Article Formatter
    const articlesJSON = response.data.articles;
    const filteredJSON = articlesJSON.filter(obj => !Object.values(obj).includes("[Removed]"));
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