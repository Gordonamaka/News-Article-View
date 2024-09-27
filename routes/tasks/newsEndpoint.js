require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

// API URL - Can add Date & Sort functionalities - Will not for simplicity
router.get("/", async (req, res) => {
  const keyword         = 'Apple';
  const API_KEY         = process.env.API_KEY
  const response        = await axios.get(
    `https://newsapi.org/v2/everything?` + 
    `q=${keyword}&` +
    `from=2024-09-01&` +
    `excludeDomains=yahoo.com&` +
    `language=en&` +
    `pageSize=20&` +
    `sortBy=relevancy&` +
    `apiKey=${API_KEY}`
  )

  // Article Formatter function 
  // Remove [Removed] Articles & Yahoo Articles (image formatting issues)
  const articlesJSON = response.data.articles;
  const filteredJSON = articlesJSON.filter(obj => !Object.values(obj).includes("[Removed]"));
  // Date Formatter
  filteredJSON.forEach(article => {
    if (article.publishedAt) {
      article.publishedAt = article.publishedAt.split('T')[0];
    }
  });
  try {
    res.send(filteredJSON);
  } catch (err) {
    res.send('Error Message', err);
  }
});


module.exports = router;