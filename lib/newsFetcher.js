require('dotenv').config({ path: '../.env' });
const { default: axios }    = require('axios');

// API URL - Can add Date & Sort functionalities - Will not for simplicity
const API_KEY               = process.env.API_KEY

const newsFetcher = async (keyword) => {
  
  try {
    const response          = await axios.get(
      `https://newsapi.org/v2/everything?` + 
      `q=${keyword}&` +
      `from=2024-09-01&` +
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
    const articlesJSON      = response.data.articles;
    const filteredJSON      = articlesJSON.filter(obj => !Object.values(obj).includes("[Removed]"));
    // Date Formatter
    filteredJSON.forEach(article => {
      if (article.publishedAt) {
        article.publishedAt = article.publishedAt.split('T')[0];
      }
    });
    res.status(200).send([ symbol, page, totalResults, filteredJSON]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch articles" });
  }
};

newsFetcher('apple')

module.exports = newsFetcher;

