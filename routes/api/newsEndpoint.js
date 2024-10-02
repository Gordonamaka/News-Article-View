require('dotenv').config({ path: '../.env' });
const { default: axios } = require('axios');
const express            = require("express");
const router             = express.Router();

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
    
    // Total Results/Pages for Pagination
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
    
    res.status(200).send(filteredJSON);
  
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
});


module.exports = router;