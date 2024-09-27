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
    `language=en&` +
    `pageSize=20&` +
    `sortBy=popularity&` +
    `apiKey=${API_KEY}`
  )

  // Add Formatter function here

  try {
    res.send(response.data.articles);
  } catch (err) {
    res.send('Error Message', err);
  }
});


module.exports = router;